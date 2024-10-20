"use client";

import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="mb-8 mt-12 text-center text-4xl font-bold">
          Responsibly grow your investments
          <br />
          Harvest a brighter future
        </h1>
        <Button
          variant="default"
          size="lg"
          className="transform px-10 py-6 text-xl shadow-lg transition duration-300 ease-in-out hover:scale-105"
        >
          Take our risk quiz to get started
        </Button>
      </div>
    </main>
  );
}
