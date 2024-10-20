import { type getPimlicoSmartAccountClient } from "./safe";
import abi from "../abis/undegenModule";

export const rebalance = async (
  smartAccountClient: ReturnType<typeof getPimlicoSmartAccountClient>,
  tokenAddress: string,
  amount: bigint,
  spender: string,
) => {
  return await smartAccountClient.writeContract({
    address: tokenAddress,
    abi,
    functionName: "approve",
    args: [spender, amount.toString()],
  });
};
