"use client";

import { useSession } from "next-auth/react";
import { logout } from "@/app/sign/sign.action";
import { Button } from "./ui/button";

export default function SignOutButton() {
  const session = useSession();
  // if (!session?.data?.user) {
  //   redirect("/sign");
  // }

  return (
    <form action={logout}>
      <Button variant={"info"}>Sign Out {session.data?.user?.name}</Button>
    </form>
  );
}
