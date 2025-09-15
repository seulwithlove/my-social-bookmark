/** biome-ignore-all lint/performance/noImgElement: img tag */
/** biome-ignore-all lint/correctness/useJsxKeyInIterable: img tag */
import { GithubLoginButton } from "./(sign-buttons)/github-login-button";
import { GoogleLoginButton } from "./(sign-buttons)/google-login-button";
import { KakaoLoginButton } from "./(sign-buttons)/kakao-login-button";
import { NaverLoginButton } from "./(sign-buttons)/naver-login-button";
import { BookImages, MarkImages, PeopleImages } from "./imgaes";
import SignForm from "./sign-form";
import SoMany from "./so-many";

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

        <div className="flex flex-1 flex-col justify-around bg-sky-400 p-4 text-white">
          <div>
            <h1 className="text-3xl">Social BookMark,</h1>
            <h2 className="text-3xl">Record than Remember!</h2>
            <div>
              Your go-to hub for sharing and discovering great and useful
              websites. Connect with others, swap your favorite links, and
              explore a world of useful resources — all powered by this
              community.
            </div>
          </div>

          <div className="space-y-3">
            <SoMany images={BookImages} />
            <SoMany images={MarkImages} />
            <SoMany images={PeopleImages} />
          </div>
        </div>
      </div>
    </div>
  );
}
