"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RebalancePendingPage() {
  const router = useRouter();
  useEffect(() => {
    // TODO: call rebalance on page load. Redirect to dashboard on success
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center"
      style={{ backgroundImage: "url('/images/pending_rebalance.png')" }}
    />
  );
}
