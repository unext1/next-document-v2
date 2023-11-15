import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { connect } from "@planetscale/database";

import { config } from "@/db/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { documents, users } from "@/db/schema";

import { asc, desc, eq } from "drizzle-orm";
import { use } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};
const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const con = connect(config);
        const db = drizzle(con);

        if (credentials) {
          const user = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email))
            .then((res) => res[0]);

          const passwordCorrect = await compare(
            credentials.password,
            user.password
          );

          if (passwordCorrect) {
            return {
              id: user.id,
              name: user.username,
              email: user.email,
              role: user.role,
            } as User;
          }

          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
