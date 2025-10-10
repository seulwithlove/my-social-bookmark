"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { newToken } from "@/lib/utils";
import { validate } from "@/lib/validator";
import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import z from "zod";
import type { ValidError } from "./../../lib/validator";
import { sendRegistCheck } from "./mail.action";

export type Provider = "google" | "github" | "naver" | "kakao";

export const login = async (provider: Provider, callback?: string | null) => {
  await signIn(provider, { redirectTo: callback || "/bookcase" });
};

export const loginNaver = async (redirectTo?: string | null) =>
  await login("naver", redirectTo);

// credential login(email, passwd)
export const authorize = async (
  _preValidError: ValidError | undefined,
  formData: FormData,
) => {
  const zobj = z.object({
    email: z.email(),
    passwd: z.string().min(6, "More than 6 characters!"),
  });

  const [err, data] = validate(zobj, formData);
  if (err) {
    console.log("💻 - sign.action.ts - err:", err);
    return err;
  }

  try {
    const redirectTo = formData.get("redirectTo")?.toString() || "/bookcase";
    await signIn("credentials", { ...data, redirectTo });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
      }
    }
    console.log("💻 - sign.action.ts - error:", error);
    if (error instanceof AuthError) {
      let typeErr: string;
      switch (error.type) {
        case "AccessDenied":
        case "EmailSignInError":
          typeErr = error.message.split(". Read more")[0];
          break;
        case "OAuthAccountNotLinked":
          typeErr = `Already registed with SNS Account`;
          break;
        case "CredentialsSignin":
          typeErr =
            error.message.split(". Read more")[0] ||
            "Not matched Email or Password!";
          break;
        default:
          typeErr = error.message || "Something went wrong!";
      }
      return {
        email: { errors: [typeErr], value: data.email },
        passwd: { errors: [], valude: data.passwd },
      } as ValidError;
    }
    throw error;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/sign" }); //QQQ : '/'
};

export const regist = async (
  _preValidError: ValidError | undefined,
  formData: FormData,
) => {
  // 1. Define Zod schema
  const zobj = z
    .object({
      email: z.email(),
      passwd: z.string().min(6),
      passwd2: z.string().min(6),
      nickname: z.string().min(3),
    })
    .refine(({ passwd, passwd2 }) => passwd === passwd2, {
      path: ["passwd2"],
      message: "Passwords are not matched",
    });

  // 2. Validate
  const [err, data] = validate(zobj, formData);
  if (err) return err;

  // 3. Process data
  const { email, nickname, passwd: orgPasswd } = data;
  const mbr = await findMemberByEmail(email);
  if (mbr)
    return {
      email: { errors: ["Duplicated Email Address"], value: email },
    };

  const passwd = await hash(orgPasswd, 10);
  const emailcheck = newToken();

  await prisma.member.create({
    data: { email, nickname, passwd, emailcheck },
  });

  // 4. Send email notification
  // await sendRegistCheck(email, emailcheck);
  sendmailByFetch({ email, emailcheck });

  // 5. Redirect
  redirect(`/sign/error?error=CheckEmail&email=${email}`);
};

export const findMemberByEmail = async (
  email: string,
  passwd: boolean = false,
) =>
  prisma.member.findUnique({
    select: {
      id: true,
      nickname: true,
      emailcheck: true,
      isadmin: true,
      outdt: true,
      passwd,
    },
    where: { email },
  });
