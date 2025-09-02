"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

export default function My() {
  return (
    <div className="grid place-items-center">
      <div className="w-96 border p-5 text-center">
        <h1 className="mb-5 text-3xl">My</h1>
        <div className="flex justify-around gap-3">
          <Link className={"text-btn"} href="/api/auth/signout">
            Go to SignOut
          </Link>
          <Button onClick={async () => await signOut()} variant={"info"}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
