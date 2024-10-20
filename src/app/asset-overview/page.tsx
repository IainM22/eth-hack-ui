"use client";

import { useRouter } from "next/navigation";

export default function RebalancePendingPage() {
  const router = useRouter();

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center"
      style={{ backgroundImage: "url('/images/funded_dashboard.png')" }}
    />
  );
}
