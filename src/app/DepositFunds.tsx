import { useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button } from "~/components/ui/button";
import { getPimlicoSmartAccountClient } from "./utils/safe";
import { APP_CHAIN, USDC_DECIMALS } from "./utils/constants";
import { rebalance } from "./utils/rebalance";
import { parseUnits } from "viem";
const TransferETH = () => {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const { user, primaryWallet } = useDynamicContext();

  const handleTransferETH = async () => {
    setLoading(true);

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

      const smartAccountClient = await getPimlicoSmartAccountClient(
        APP_CHAIN,
        primaryWallet,
      );

      const hash = await rebalance(smartAccountClient, [
        parseUnits("1.1", USDC_DECIMALS),
        parseUnits("0.7", USDC_DECIMALS),
      ]);

      setTxHash(hash);
    } catch (err) {
      console.error("Failed to transfer ETH.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  } else if (user && !txHash) {
    return (
      <div>
        <Button onClick={handleTransferETH} disabled={loading}>
          {loading ? "Executing..." : "Perform action"}
        </Button>
      </div>
    );
  } else if (user && txHash) {
    return (
      <div>
        <h1>Action successful</h1>
        <p>Transaction Hash: {txHash}</p>
      </div>
    );
  }
};

const DepositFunds = () => {
  return (
    <div>
      <h1>Deposit Funds</h1>
      <TransferETH />
    </div>
  );
};

export default DepositFunds;
