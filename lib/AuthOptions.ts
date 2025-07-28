import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDb } from "@/config/db";

import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await connectDb();

          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const randomPassword =
              Math.random().toString(36).slice(-8) +
              Math.random().toString(36).toUpperCase().slice(-8);
            const hashedPassword = await bcrypt.hash(randomPassword, 12);

            const newUser = new User({
              email: user.email,
              fullName: profile?.name || user.name || "Google User",
              password: hashedPassword,
              image: user.image || "",
              provider: "google",
            });

            await newUser.save();
            user.id = newUser._id.toString();
          } else {
            user.id = existingUser._id.toString();
          }
        } catch (error) {
          console.error("Error saving Google user:", error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id.toString();
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
  },

  secret: process.env.NEXTAUTH_SECRET,
};
