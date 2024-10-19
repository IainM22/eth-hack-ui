import { useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { getOrMapViemChain } from "@dynamic-labs/ethereum-core";
import { sepolia } from "viem/chains";
import { Button } from "~/components/ui/button";
import { getPimlicoSmartAccountClient2 } from "./utils/safe";

const DeploySafe = () => {
  const [loading, setLoading] = useState(false);
  const [safeAddress, setSafeAddress] = useState("");
  const [safeDeployed, setSafeDeployed] = useState(false);

  const { user, primaryWallet, network } = useDynamicContext();

  const handleDeploySafe = async () => {
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

      const { account } = await getPimlicoSmartAccountClient2(
        sepolia,
        primaryWallet,
      );
      setSafeAddress(account.address);
      setSafeDeployed(true);
    } catch (err) {
      console.error("Failed to deploy Safe account.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  } else if (user && !safeDeployed) {
    return (
      <div>
        <Button onClick={handleDeploySafe}>Deploy Safe</Button>
      </div>
    );
  } else if (user && safeDeployed) {
    return (
      <div>
        <h1>Safe Account Deployed</h1>
        <p>Safe Address: {safeAddress}</p>
      </div>
    );
  }
};

export default DeploySafe;
