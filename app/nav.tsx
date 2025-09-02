import { BookHeartIcon } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import ThemeChanger from "@/components/theme-changer";
import { auth } from "@/lib/auth";

export default function Nav() {
  const session = use(auth());
  const didLogin = !!session?.user;
  // console.log("💻 ~ session:", session);
  return (
    <div className="flex items-center gap-5">
      <Link href={"/bookcase"} className="btn-icon">
        <BookHeartIcon />
      </Link>
      <ThemeChanger />
      {didLogin ? (
        <Link href="/my" className={"text-btn"}>
          {session.user?.name}
        </Link>
      ) : (
        <Link href="/sign" className={"text-btn"}>
          Login
        </Link>
      )}
    </div>
  );
}
