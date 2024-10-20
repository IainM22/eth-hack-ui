"use client";

import { useRouter } from "next/navigation";

export default function TransferPage() {
  const router = useRouter();

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center"
      style={{ backgroundImage: "url('/images/empty_dashboard.png')" }}
      onClick={() => router.push("/transfer")}
    />
  );
}
