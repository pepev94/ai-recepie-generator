import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  debug: true,
  adapter: MongoDBAdapter(clientPromise),
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    // async encode() {},
    // async decode() {},
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID ||
        "56918078583-9qndhlbcn4hg9i6i2b9gd3cue66cscvt.apps.googleusercontent.com",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ||
        "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",
    }),
  ],
  callbacks: {
    //@ts-ignore
    async session({ session, user, token }) {
      session.user = user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
