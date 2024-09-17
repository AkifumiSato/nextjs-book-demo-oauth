import Redis from "ioredis";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import React from "react";
import { v4 as uuid } from "uuid";
import { SESSION_COOKIE_NAME } from "./cookie-names";
import { encrypt } from "./jwt";
import { SessionSchema, type SessionValues } from "./schema";
import { getSessionId } from "./utils";

export const redis = new Redis({
  enableAutoPipelining: true,
});

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
