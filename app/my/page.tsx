import Link from "next/link";
import SignOutButton from "@/components/singout-button";

export default function My() {
  return (
    <div className="grid h-full place-items-center">
      <div className="w-96 border p-5 text-center">
        <h1 className="mb-5 text-3xl">My</h1>
        <div className="flex justify-around gap-3">
          <Link className={"text-btn"} href="/api/auth/signout">
            Go to SignOut
          </Link>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
