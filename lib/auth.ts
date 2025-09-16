import NextAuth, { AuthError, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";
import z from "zod";
import { findMemberByEmail } from "@/app/sign/sign.action";
import prisma from "./db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google,
    Github,
    Kakao,
    Naver,
    Credentials({
      // TODO: csrf
      credentials: {
        email: {},
        passwd: {},
      },
      async authorize(credentials) {
        // console.log("credentials>>", credentials);
        const { email, passwd } = credentials;
        const validator = z
          .object({
            email: z.email("Wrong email address!"),
            passwd: z.string().min(6, "More than 6 characters!"),
          })
          .safeParse({ email, passwd });

        if (!validator.success) {
          console.log("Error:", validator.error);
          throw new AuthError(validator.error.message);
        }
        return { email, passwd } as User;
      },
    }),
  ], // TODO: GET / POST
  callbacks: {
    async signIn({ user, profile, account }) {
      const isCredential = account?.provider === "credentials";
      // console.log("💻 ~ isCredential:", isCredential);
      // console.log("💻 ~ profile:", profile);
      // console.log("💻 ~ user:", user);

      const { email, name: nickname, image } = user;
      if (!email) return false;

      const mbr = await findMemberByEmail(email, isCredential);

      if (mbr?.emailcheck) {
        return `/sign/error?error=CheckEmail&email=${email}`;
      }

      if (isCredential) {
        if (!mbr) throw new AuthError("NotExistsMember");
      } else {
        if (!mbr && nickname) {
          await prisma.member.create({
            data: { email, nickname, image },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, account, session }) {
      console.log("💻 ~ account:", account);
      const userData = trigger === "update" ? session : user;
      if (userData) {
        token.id = userData.id;
        token.email = userData.email;
        token.name = userData.name || userData.nickname;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id?.toString() || "";
        session.user.name = token.name;
        session.user.email = token.email as string;
      }
      return session;
    },
  },

  trustHost: true, // TODO: crs 문제 해결?
  jwt: { maxAge: 30 * 60 }, // 30mins
  pages: {
    signIn: "/sign",
    error: "sign/error", // http://localhost:3000/api/auth/signin?error=CredentialsSignin&code=credentials
  },
  session: {
    strategy: "jwt",
  },
});
