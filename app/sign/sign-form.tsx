"use client";

import Link from "next/link";
import { useReducer } from "react";
import LabelInput from "@/components/label-input";
import { Button } from "@/components/ui/button";

export default function SignForm() {
  const [isSignin, toggleSign] = useReducer((pre) => !pre, true);
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
  return (
    <>
      <form className="flex flex-col gap-3">
        <LabelInput
          label="email"
          type="email"
          name="email"
          defaultValue={"anfrhrl0313@naver.com"}
          placeholder="email@bookmark.com"
        />

        <LabelInput
          label="password"
          type="password"
          name="password"
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

          <Link href="#">Forgot password?</Link>
        </div>

        <Button type="submit" variant={"love"} className="w-full">
          Login
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

function SignUp({ toggleSign }: { toggleSign: () => void }) {
  return (
    <>
      <form className="flex flex-col gap-3">
        <LabelInput
          label="email"
          type="email"
          name="email"
          placeholder="email@bookmark.com"
        />

        <LabelInput
          label="password confirm"
          type="password"
          name="password"
          placeholder="password"
        />

        <LabelInput
          label="nickname"
          type="text"
          name="nickname"
          placeholder="your nickname"
        />

        <Button type="submit" variant={"love"} className="w-full">
          Sign Up
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
