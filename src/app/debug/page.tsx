"use client";

import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useAccount } from "wagmi";
import DeploySafe from "../DeploySafe";
import DepositFunds from "../DepositFunds";
import { getFromLocalStorage, LOCAL_STORAGE_KEYS } from "../utils/storage";
import { initializeAccount } from "../utils/account";
import { Button } from "~/components/ui/button";
import { useState } from "react";

export default function DebugPage() {
  const { address } = useAccount();
  const { primaryWallet } = useDynamicContext();
  const [loadingAccountInit, setLoadingAccountInit] = useState(false);

  const handleInitializeAccount = async () => {
    setLoadingAccountInit(true);
    await initializeAccount(primaryWallet);
    setLoadingAccountInit(false);
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
          {primaryWallet && (
            <Button
              onClick={handleInitializeAccount}
              disabled={loadingAccountInit}
            >
              {loadingAccountInit ? "Initializing..." : "Initialize Account"}
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
