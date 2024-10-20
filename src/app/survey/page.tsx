"use client";

import { useAccount } from "wagmi";

import { RiskProfileSurvey } from "../RiskProfileSurvey";

export default function HomePage() {
  const { address } = useAccount();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <RiskProfileSurvey />
      </div>
    </main>
  );
}
