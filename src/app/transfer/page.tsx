"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TransferPage() {
  const router = useRouter();

  useEffect(() => {
    // TODO: call rebalance on page load. Redirect to dashboard on success
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center"
      style={{ backgroundImage: "url('/images/transfer_usdc.png')" }}
      onClick={() => router.push("/rebalance")}
    />
  );
}
