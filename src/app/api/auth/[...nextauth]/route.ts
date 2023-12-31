import { connect } from "@planetscale/database";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { config } from "@/db/config";
import { users } from "@/db/schema";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const con = connect(config);
        const db = drizzle(con);

        if (credentials) {
          const dbUser = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email))
            .then((res) => res[0]);

          const validPassword = await bcrypt.compare(
            credentials.password,
            dbUser.password
          );
          if (validPassword) {
            const jwtUser = {
              id: dbUser.id.toString(),
              name: dbUser.username,
              email: dbUser.email,
              role: dbUser.role,
            };
            return jwtUser;
          } else return null;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-ignore
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
