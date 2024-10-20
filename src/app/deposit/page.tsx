"use client";

import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Card></Card>
      </div>
    </main>
  );
}
