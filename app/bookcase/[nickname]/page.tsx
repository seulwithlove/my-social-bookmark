import { use } from "react";

type Props = {
  params: Promise<{ nickname: string }>;
};

export default function BookcaseNickname({ params }: Props) {
  const { nickname } = use(params);
  return (
    <div>
      <h1 className="font-semibold text-3l">
        {decodeURI(nickname)}`s Bookcase
      </h1>
    </div>
  );
}
