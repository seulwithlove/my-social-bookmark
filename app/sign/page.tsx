import { GithubLoginButton } from "./(sign-buttons)/github-login-button";
import { GoogleLoginButton } from "./(sign-buttons)/google-login-button";
import { KakaoLoginButton } from "./(sign-buttons)/kakao-login-button";
import { NaverLoginButton } from "./(sign-buttons)/naver-login-button";
import SignForm from "./sign-form";

export default function Sign() {
  return (
    <div className="grid h-full place-items-center px-6">
      <div className="flex w-full overflow-hidden rounded-md border shadow-md">
        <div className="flex-1 bg-pink-300 p-4 text-white">
          <div className="flex items-center gap-5">
            <h1 className="text-2xl">Book & Mark</h1>
            <span className="text-gray-200">Sign with</span>
          </div>

          <div className="mt-5 mb-2 grid grid-cols-2 gap-3">
            <GoogleLoginButton />
            <GithubLoginButton />
            <NaverLoginButton />
            <KakaoLoginButton />
          </div>

          <div className='relative text-center text-gray-200 before:absolute before:top-[50%] before:left-0 before:h-[1px] before:w-[45%] before:bg-gray-200 before:content-[""] after:absolute after:top-[50%] after:right-0 after:h-[1px] after:w-[45%] after:bg-gray-200 after:content-[""]'>
            or
          </div>

          <SignForm />
        </div>

        <div className="flex-1 bg-sky-400 p-4 text-white">right</div>
      </div>
    </div>
  );
}
