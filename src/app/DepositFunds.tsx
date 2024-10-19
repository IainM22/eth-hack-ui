import { useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button } from "~/components/ui/button";
import { getPimlicoSmartAccountClient } from "./utils/safe";
import { APP_CHAIN } from "./utils/constants";
import { rebalance } from "./utils/rebalance";
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

      const hash = await rebalance(
        smartAccountClient,
        "0xF65A28BFF84BDcD85e74b2d47a35dd2BfC17F0BB",
        1000000000000000000n,
        "0x994A42f111645C33FF24926450cCAb4cFC9a4770",
      );

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
