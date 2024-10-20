"use client";

import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="mb-8 mt-12 text-center text-4xl font-bold">
          Responsibly grow your investments
          <br />
          Harvest a brighter future
        </h1>
        <Link href="/survey">
          <Button
            variant="default"
            size="lg"
            className="transform px-10 py-6 text-xl shadow-lg transition duration-300 ease-in-out hover:scale-105"
          >
            Take our risk quiz to get started
          </Button>
        </Link>
        <div className="mx-auto mt-6 w-3/4">
          <Card className="m-6 rounded-md bg-white p-6 text-card-foreground shadow-md">
            <p className="mb-4">
              Undegen helps investors build a diversified crypto portfolio
              tailored to their individual risk tolerance, automatically
              adjusting the asset mix over time to align with long-term
              financial goals. Undegen continuously monitors market conditions
              and individual holdings, making strategic adjustments to ensure
              the portfolio stays balanced and optimized.
              <br />
              <br />
              By leveraging automation and data-driven insights, Undegen
              provides a hands-off approach for users to grow their crypto
              investments alongside other investments, all while managing
              volatility and maximizing potential returns based on their risk
              profile.
            </p>
            <div className="flex justify-center">
              <Link
                href="/survey"
                className={buttonVariants({ variant: "default" })}
              >
                Start investing
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
