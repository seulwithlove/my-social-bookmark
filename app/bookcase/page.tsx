import { redirect } from "next/navigation";
import { use } from "react";
import { auth } from "@/lib/auth";

export default function Bookcase() {
  const session = use(auth());
  const didLogin = !!session?.user?.email;
  if (!session?.user?.name) redirect("/");
  const nickname = encodeURI(session.user.name);
  redirect(didLogin ? `bookcase/${nickname}` : "/");
}
