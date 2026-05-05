import { Lucia } from "lucia";

import db from "./db";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { cookies } from "next/headers";

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export async function createAuthSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  const cookieStore = await cookies();

  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
}
