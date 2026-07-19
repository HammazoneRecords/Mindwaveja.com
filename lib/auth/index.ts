import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import { user, session, account, verification } from "@/lib/db/schema/auth";
import { APIError } from "better-auth/api";

function adminEmails() {
  return (process.env.MW_ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema: { user, session, account, verification } }),
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  databaseHooks: {
    user: {
      create: {
        before: async (newUser) => {
          if (!adminEmails().includes(newUser.email.toLowerCase())) {
            throw new APIError("FORBIDDEN", { message: "This admin area is invitation-only." });
          }
          return { data: newUser };
        },
      },
    },
  },
  session: { expiresIn: 60 * 60 * 24 * 30, cookieCache: { enabled: true, maxAge: 60 * 5 } },
});
