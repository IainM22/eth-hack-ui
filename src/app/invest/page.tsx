"use client";

import { useRouter } from "next/navigation";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

export default function InvestPage() {
  const router = useRouter();
  const { setShowAuthFlow } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();

  const handleClick = () => {
    if (isLoggedIn) {
      router.push("/invest");
    } else {
      setShowAuthFlow(true);
    }
  };
  return (
    <main
      className="flex min-h-[1884px] flex-col items-center justify-center"
      style={{ backgroundImage: "url('/images/risk_results.png')" }}
      onClick={handleClick}
    />
  );
}
