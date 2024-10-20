import { type getPimlicoSmartAccountClient } from "./safe";
import abi from "../abis/undegenModule";
import { UNDEGEN_MODULE_ADDRESS, USDC_DECIMALS } from "./constants";
import { parseUnits } from "viem";

export const rebalance = async (
  smartAccountClient: ReturnType<typeof getPimlicoSmartAccountClient>,
  amounts: bigint[],
) => {
  // TODO: accept these as params instead of hardcoding
  const _maxDeviationPPM = parseUnits("0.01", USDC_DECIMALS);
  const _minLongDeposit = parseUnits("100", USDC_DECIMALS);
  return await smartAccountClient.writeContract({
    address: UNDEGEN_MODULE_ADDRESS,
    abi,
    functionName: "rebalance",
    args: [amounts, _maxDeviationPPM, _minLongDeposit],
  });
};
