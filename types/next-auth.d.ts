import NextAuth, { DefaultSession, Session, User } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      accountId: string | null
      userId: number | null
    } & DefaultSession["user"]
  }

  interface User {
    accountId: string | null
    userId: number | null
  }
}