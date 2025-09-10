import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";

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
        console.log("credentials>>", credentials);
        return null;
      },
    }),
  ], // TODO: GET / POST
  callbacks: {
    async signIn({ user, profile, account }) {
      const isCredential = account?.provider === "credentials";
      console.log("💻 ~ isCredential:", isCredential);
      console.log("💻 ~ profile:", profile);
      console.log("💻 ~ user:", user);

      const { email, name: nickname, image } = user;
      if (!email) return false;

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
