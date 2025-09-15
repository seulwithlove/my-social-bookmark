"use client";

import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useActionState, useReducer } from "react";
import z from "zod";
import LabelInput from "@/components/label-input";
import { Button } from "@/components/ui/button";
import type { ValidError } from "@/lib/validator";

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
  const [validError, makeRegist, isPending] = useActionState(
    async (_preValidError: ValidError | undefined, formData: FormData) => {
      const validator = z
        .object({
          email: z.email(),
          passwd: z.string().min(6),
          passwd2: z.string().min(6),
          nickname: z.string().min(3),
        })
        .refine(
          ({ passwd, passwd2 }) => passwd === passwd2,
          "Passwords are not matched"
        )
        .safeParse(Object.fromEntries(formData.entries()));

      if (!validator.success) {
        const err = z.treeifyError(validator.error).properties;
        // console.log("💻 - sign-form.tsx - err:", err);
        return err;
      }
    },
    undefined
  );

  return (
    <>
      <form action={makeRegist} className="flex flex-col gap-3">
        <LabelInput
          label="email"
          type="email"
          name="email"
          error={validError}
          placeholder="email@bookmark.com"
          // focus={true} // 첫 화면에서의 focus
        />

        <LabelInput
          label="password"
          type="password"
          name="passwd"
          error={validError}
          placeholder="password"
        />

        <LabelInput
          label="password confirm"
          type="password"
          name="passwd2"
          error={validError}
          placeholder="password confirm"
        />

        <LabelInput
          label="nickname"
          type="text"
          name="nickname"
          error={validError}
          placeholder="your nickname"
        />

        <Button
          disabled={isPending}
          type="submit"
          variant={"love"}
          className="w-full">
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
