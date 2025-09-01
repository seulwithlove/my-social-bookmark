import { BookHeartIcon } from "lucide-react";
import Link from "next/link";
import ThemeChanger from "@/components/theme-changer";

export default function Nav() {
  return (
    <div className="flex items-center gap-5">
      <Link href={"/bookcase"} className="btn-icon">
        <BookHeartIcon />
      </Link>
      <ThemeChanger />
      <Link href="/my" className={"text-btn"}>
        My
      </Link>
      <Link href="/sign" className={"text-btn"}>
        Login
      </Link>
    </div>
  );
}
