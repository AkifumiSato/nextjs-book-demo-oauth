import "server-only";
import Redis from "ioredis";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import React from "react";
import { v4 as uuid } from "uuid";
import { decrypt, encrypt } from "./jwt";
import { SessionSchema, type SessionValues } from "./schema";

const SESSION_COOKIE_NAME = "sessionId";

export const redis = new Redis({
  enableAutoPipelining: true,
});

async function getSessionId() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (sessionCookie === undefined) {
    return undefined;
  }
  const payload = await decrypt(sessionCookie);
  return payload?.sessionId;
}

async function getServerSession() {
  const sessionId = await getSessionId();
  if (sessionId !== undefined) {
    const session = await redis.get(sessionId);
    if (session) {
      try {
        const sessionJson = JSON.parse(session);
        return SessionSchema.parse(sessionJson);
      } catch (e) {
        console.error("Failed to parse session", e);
      }
    }
  }
  return undefined;
}

const getCachedServerSession = React.cache(getServerSession);

export async function session() {
  const sessionValues = await getCachedServerSession();
  return {
    get() {
      return sessionValues;
    },
    async start(initialValue: SessionValues) {
      if (cookies().get(SESSION_COOKIE_NAME)?.value !== undefined) {
        throw new Error("Session already started");
      }
      const sessionId = uuid();
      await redis.set(sessionId, JSON.stringify(initialValue));
      const cookieValue = await encrypt({ sessionId });
      cookies().set(SESSION_COOKIE_NAME, cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
      });
    },
    async update(updater: (prev: SessionValues) => SessionValues) {
      const sessionId = await getSessionId();
      if (sessionId === undefined) {
        throw new Error("Session not started");
      }
      const newSession = SessionSchema.parse(updater(sessionValues));
      await redis.set(sessionId, JSON.stringify(newSession));
      // 他処理と異なりcookieの操作が発生しないため、revalidateで代用
      revalidateTag("session");
    },
    async destroy() {
      const sessionId = await getSessionId();
      if (sessionId === undefined) {
        throw new Error("Session not started");
      }
      await redis.del(sessionId);
      cookies().delete(SESSION_COOKIE_NAME);
    },
  };
}
