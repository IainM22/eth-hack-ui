"use client";

import Link from "next/link";
import { RiskProfileSurvey } from "./RiskProfileSurvey";

export default function SurveyPage() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      <div className="mt-12 flex w-full items-center justify-between px-8 py-4 sm:px-12 md:px-16 lg:px-24">
        <Link href="/" className="rounded-md bg-black px-4 py-2 text-white">
          &lt; Back to Home
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 transform">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
        </div>
        <div className="w-[120px]"></div> {/* Spacer to balance the layout */}
      </div>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <RiskProfileSurvey />
      </div>
    </main>
  );
}
