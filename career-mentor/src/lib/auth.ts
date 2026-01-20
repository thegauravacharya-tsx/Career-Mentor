import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // LOG 1: Check if input is arriving
        console.log("Login Attempt:", credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email }
        });

        // LOG 2: Check if user exists
        if (!user) {
            console.log("User not found in DB");
            return null;
        }

        // LOG 3: Check if user has a password set (Google users won't)
        if (!user.password) {
            console.log("User has no password (likely Google account)");
            return null;
        }

        const passwordMatch = await compare(credentials.password, user.password);

        // LOG 4: Check the comparison result
        console.log("Password match result:", passwordMatch);

        if (!passwordMatch) {
          console.log("Password comparison failed");
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        }
      }
    })
  ],
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        // @ts-ignore
        session.user.id = token.sub;
        // @ts-ignore
        session.user.name = token.name;
        // @ts-ignore
        session.user.email = token.email;
        // @ts-ignore
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
        if (user) {
            return {
                ...token,
                id: user.id,
            }
        }
        return token
    }
  },
};