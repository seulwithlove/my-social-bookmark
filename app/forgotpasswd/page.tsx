import Link from "next/link";
import LabelInput from "@/components/label-input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswd() {
  const sendResetPassword = async () => {
    "use server";
  };

  return (
    <div className="grid h-full place-items-center">
      <div className="w-96">
        <h1 className="mb-3 font-semibold text-2xl">Forgot Password</h1>
        <div className="mb-5 text-gray-500 text-sm">
          Enter your email address when joined, and send to instructions to
          reset password.
        </div>

        <form action={sendResetPassword} className="">
          <LabelInput
            label="email"
            name="email"
            type="email"
            placeholder="email@bookmark.com"
            focus={true}
          />

          <Button
            className="my-5 w-full cursor-pointer"
            type="submit"
            variant={"love"}>
            Send Email
          </Button>
        </form>

        <div className="text-center">
          Back to <Link href="/sign">Login</Link>
        </div>
      </div>
    </div>
  );
}
