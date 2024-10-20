"use client";

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useAccount } from "wagmi";
import DeploySafe from "../DeploySafe";
import DepositFunds from "../DepositFunds";
import { getFromLocalStorage, LOCAL_STORAGE_KEYS } from "../utils/storage";

export default function HomePage() {
  const { address } = useAccount();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Undegen
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
        </div>
      </div>
    </main>
  );
}
