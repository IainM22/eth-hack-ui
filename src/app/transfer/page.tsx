"use client";

import { useRouter } from "next/navigation";

export default function TransferPage() {
  const router = useRouter();

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center"
      style={{ backgroundImage: "url('/images/transfer_usdc.png')" }}
      onClick={() => router.push("/rebalance")}
    />
  );
}
