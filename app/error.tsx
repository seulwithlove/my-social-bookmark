"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  // useEffect(() => {}, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      {process.env.NODE_ENV === "development" ? (
        <pre className="font-sm text-red-500">
          {error.stack || error.message}
        </pre>
      ) : (
        <div className="text-red-500">{error.message}</div>
      )}
      <Button onClick={() => reset()}>Try again</Button>
      <Button onClick={() => router.back()}>Go Back</Button>
    </div>
  );
}
