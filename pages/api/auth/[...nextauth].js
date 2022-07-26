import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import { postSignIn } from '../../../hooks/api/postSignIn';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        accountId: {label: "accountId",type: "text",placeholder: "アカウントID"},
        password: {label: "password", type: "password"},
      },
      authorize: async (credentials, req) => {
        const postData = {
          accountId: credentials?.accountId,
          encryptPassword: credentials?.password,
        };
        const user = await postSignIn(postData)

        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        return {
          ...token,
          accountId: user.accountId,
          userId: user.userId
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.user.accountId = token.accountId
      session.user.userId = token.userId

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  debug: process.env.NODE_ENV === "development",
});