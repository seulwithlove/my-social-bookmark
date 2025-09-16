"use client";

import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useActionState, useReducer } from "react";
import LabelInput from "@/components/label-input";
import { Button } from "@/components/ui/button";
import { authorize, regist } from "./sign.action";

export default function SignForm() {
  const [isSignin, toggleSign] = useReducer((pre) => !pre, false);
  return (
    <>
      {isSignin ? (
        <SignIn toggleSign={toggleSign} />
      ) : (
        <SignUp toggleSign={toggleSign} />
      )}
    </>
  );
}

function SignIn({ toggleSign }: { toggleSign: () => void }) {
  const [validError, makeLogin, isPending] = useActionState(
    authorize,
    undefined,
  );

  return (
    <>
      <form action={makeLogin} className="flex flex-col gap-3">
        <LabelInput
          label="email"
          type="email"
          name="email"
          error={validError}
          defaultValue={"anfrhrl0313@naver.com"}
          placeholder="email@bookmark.com"
        />

        <LabelInput
          label="password"
          type="password"
          name="passwd"
          error={validError}
          defaultValue={""}
          placeholder="password"
        />
        <div className="flex justify-between">
          <label htmlFor="remember" className="cursor-pointer">
            <input
              type="checkbox"
              id="remember"
              className="mr-0.5 translate-y-[1px]"
            />
            Remember me
          </label>

          <Link href="/forgotpasswd">Forgot password?</Link>
        </div>

        <Button
          disabled={isPending}
          type="submit"
          variant={"love"}
          className="w-full"
        >
          {isPending ? "Signing..." : "Sign In"}
        </Button>
      </form>
      <div className="mt-5 flex gap-5">
        <span>Don&apos;t have Account?</span>
        <Link onClick={toggleSign} href="#">
          Sign Up
        </Link>
      </div>
    </>
  );
}

const dummy = {
  email: "love.and.seul@gmail.com",
  passwd: "121212",
  passwd2: "121211",
  nickname: "안녕안녕",
};

function SignUp({ toggleSign }: { toggleSign: () => void }) {
  const [validError, makeRegist, isPending] = useActionState(regist, undefined);

  return (
    <>
      <form action={makeRegist} className="flex flex-col gap-3">
        <LabelInput
          label="email"
          type="email"
          name="email"
          defaultValue={dummy.email}
          error={validError}
          placeholder="email@bookmark.com"
          focus={true}
        />

        <LabelInput
          label="nickname"
          type="text"
          name="nickname"
          defaultValue={dummy.nickname}
          error={validError}
          placeholder="your nickname"
        />

        <LabelInput
          label="password"
          type="password"
          name="passwd"
          defaultValue={dummy.passwd}
          error={validError}
          placeholder="password"
        />

        <LabelInput
          label="password confirm"
          type="password"
          name="passwd2"
          defaultValue={dummy.passwd2}
          error={validError}
          placeholder="password confirm"
        />

        <Button
          disabled={isPending}
          type="submit"
          variant={"love"}
          className="w-full"
        >
          {isPending ? "Singing Up... " : "Sign Up"}
          {isPending && <LoaderIcon className="animate-spin" />}
        </Button>
      </form>
      <div className="mt-5 flex gap-5">
        <span>Already have Account?</span>
        <Link onClick={toggleSign} href="#">
          Sign In
        </Link>
      </div>
    </>
  );
}
