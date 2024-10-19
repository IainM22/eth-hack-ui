import { useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Button } from "~/components/ui/button";
import { parseEther } from "viem";

import { getPimlicoSmartAccountClient } from "./utils/safe";
import { APP_CHAIN } from "./utils/constants";

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

      // Replace with the actual recipient address
      const recipientAddress = "0x994A42f111645C33FF24926450cCAb4cFC9a4770";
      const amountInEth = "0.001"; // Transfer 0.01 ETH

      const hash = await smartAccountClient.sendTransaction({
        to: recipientAddress,
        value: parseEther(amountInEth),
      });

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
          {loading ? "Transferring..." : "Transfer 0.01 ETH"}
        </Button>
      </div>
    );
  } else if (user && txHash) {
    return (
      <div>
        <h1>ETH Transfer Successful</h1>
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
