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
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@bookmark.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        console.log("credentials>>", credentials);
        return null;
      },
    }),
  ], // TODO: GET / POST
  callbacks: {
    async signIn({ user, profile }) {
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
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
  secret: process.env.AUTH_SECRET as string,
});
