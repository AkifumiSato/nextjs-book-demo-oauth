import Redis from "ioredis";
import { cookies } from "next/headers";
import React from "react";
import { v4 as uuid } from "uuid";
import { type SessionKeys, SessionSchema, type SessionValues } from "./schema";

const SESSION_COOKIE_NAME = "sessionId";

export const redis = new Redis({
  enableAutoPipelining: true,
});

async function getServerSession(): Promise<Readonly<SessionValues>> {
  // todo: JWT
  const sessionIdFromCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (sessionIdFromCookie === undefined) {
    return undefined;
  }
  const session = sessionIdFromCookie
    ? await redis.get(sessionIdFromCookie)
    : null;
  if (session) {
    return SessionSchema.parse(JSON.parse(session));
  }
  return undefined;
}

const getCachedServerSession = React.cache(getServerSession);

export async function session() {
  const sessionValues = await getCachedServerSession();
  return {
    get<K extends SessionKeys>(name: K) {
      if (sessionValues === undefined) {
        return undefined;
      }
      return sessionValues[name] as Exclude<SessionValues, undefined>[K];
    },
    getAll() {
      return sessionValues;
    },
    async update(updater: (prev: SessionValues) => SessionValues) {
      let sessionId = cookies().get(SESSION_COOKIE_NAME)?.value;
      if (sessionId === undefined) {
        sessionId = uuid();
        cookies().set(SESSION_COOKIE_NAME, sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
        });
      }
      const newSession = SessionSchema.parse(updater(sessionValues));
      await redis.set(sessionId, JSON.stringify(newSession));
    },
  };
}
