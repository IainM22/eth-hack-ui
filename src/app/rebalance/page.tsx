"use client";

import { useRouter } from "next/navigation";
import { rebalance } from "../utils/rebalance";
import { getPimlicoSmartAccountClient } from "../utils/safe";
import { APP_CHAIN } from "../utils/constants";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { parseEther } from "viem";

export default function RebalancePendingPage() {
  const router = useRouter();

  const { primaryWallet } = useDynamicContext();

  const handleRebalance = async () => {
    try {
      const smartAccountClient = await getPimlicoSmartAccountClient(
        APP_CHAIN,
        primaryWallet,
      );
      await rebalance(smartAccountClient, [
        parseEther("0.01"),
        parseEther("0.01"),
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      router.push("/asset-overview");
    }
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center"
      style={{ backgroundImage: "url('/images/pending_rebalance.png')" }}
      onClick={handleRebalance}
    />
  );
}
