"use client";

import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useAccount } from "wagmi";
import { Button } from "~/components/ui/button";
import { useState } from "react";

import { getFromLocalStorage, LOCAL_STORAGE_KEYS } from "../utils/storage";
import { initializeAccount } from "../utils/account";
import { rebalance } from "../utils/rebalance";
import { parseEther } from "viem";
import { getPimlicoSmartAccountClient } from "../utils/safe";
import { APP_CHAIN } from "../utils/constants";

export default function DebugPage() {
  const { address } = useAccount();
  const { primaryWallet } = useDynamicContext();
  const [loadingAccountInit, setLoadingAccountInit] = useState(false);
  const [loadingRebalance, setLoadingRebalance] = useState(false);

  const handleInitializeAccount = async () => {
    setLoadingAccountInit(true);
    await initializeAccount(primaryWallet);
    setLoadingAccountInit(false);
  };

  const handleRebalance = async () => {
    setLoadingRebalance(true);
    try {
      const smartAccountClient = await getPimlicoSmartAccountClient(
        APP_CHAIN,
        primaryWallet,
      );
      // TODO: use Merton share formula and an optimization
      // to calculate the optimal allocation
      await rebalance(smartAccountClient, [
        parseEther("0"),
        parseEther("0"),
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingRebalance(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Debug
        </h1>
        <div>
          <DynamicWidget />
          <br />
          <p suppressHydrationWarning>EOA Account:{address}</p>
          <br />
          <p suppressHydrationWarning>
            Safe Smart Account:
            {getFromLocalStorage(LOCAL_STORAGE_KEYS.SMART_ACCOUNT_ADDRESS)}
          </p>
          <br />
          <div className="flex space-x-4">
            {primaryWallet && (
              <Button
                onClick={handleInitializeAccount}
                disabled={loadingAccountInit}
              >
                {loadingAccountInit ? "Initializing..." : "Initialize Account"}
              </Button>
            )}
            {primaryWallet && (
              <Button onClick={handleRebalance} disabled={loadingRebalance}>
                {loadingRebalance ? "Rebalancing..." : "Rebalance"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
