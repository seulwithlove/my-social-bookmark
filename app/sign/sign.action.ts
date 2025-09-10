"use server";

import { signIn, signOut } from "@/lib/auth";

type Provider = "google" | "github" | "naver" | "kakao";

export const login = async (provider: Provider, callback?: string) => {
  await signIn(provider, { redirectTo: callback || "/bookcase" });
};

export const loginNaver = async () => login("naver");

export const logout = async () => {
  await signOut({ redirectTo: "/sign" }); //QQQ : '/'
};
