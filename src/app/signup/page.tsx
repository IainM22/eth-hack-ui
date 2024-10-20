"use client";

import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function SignupPage() {
  const { setShowAuthFlow } = useDynamicContext();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <DynamicWidget />
        <button onClick={() => setShowAuthFlow(true)}>Open modal</button>
      </div>
    </main>
  );
}
