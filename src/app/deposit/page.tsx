"use client";
import { useState } from "react";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { enableModule, getPimlicoSmartAccountClient } from "../utils/safe";
import { APP_CHAIN, UNDEGEN_MODULE_ADDRESS } from "../utils/constants";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const { primaryWallet } = useDynamicContext();

  const handleEnableModule = async () => {
    try {
      if (!primaryWallet) {
        console.error("No wallet found");
        return;
      }

      if (!process.env.NEXT_PUBLIC_PIMLICO_API_KEY) {
        console.error(
          "Please set NEXT_PUBLIC_PIMLICO_API_KEY in .env file and restart",
        );
        return;
      }

      setLoading(true);

      const smartAccountClient = await getPimlicoSmartAccountClient(
        APP_CHAIN,
        primaryWallet,
      );

      const hash = await enableModule(
        smartAccountClient,
        UNDEGEN_MODULE_ADDRESS,
      );

      console.log("hash", hash);
    } catch (err) {
      console.error("Failed enable module");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Card>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Button onClick={() => handleEnableModule()}>Enable Module</Button>
          )}
        </Card>
      </div>
    </main>
  );
}
