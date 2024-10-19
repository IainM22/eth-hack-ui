"use client";

import { type FC, type FormEventHandler, useState } from "react";

import { parseEther } from "viem";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { isEthereumWallet } from "@dynamic-labs/ethereum";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const SimpleTx: FC = () => {
  const { primaryWallet } = useDynamicContext();

  const [txnHash, setTxnHash] = useState("");

  if (!primaryWallet || !isEthereumWallet(primaryWallet)) return null;

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const address = formData.get("address") as `0x${string}`;
    const amount = formData.get("amount") as string;

    const publicClient = await primaryWallet.getPublicClient();
    const walletClient = await primaryWallet.getWalletClient();

    const transaction = {
      to: address,
      value: amount ? parseEther(amount) : undefined,
    };

    const hash = await walletClient.sendTransaction(transaction);
    setTxnHash(hash);

    const receipt = await publicClient.getTransactionReceipt({
      hash,
    });

    console.log(receipt);
  };

  return (
    <form onSubmit={onSubmit}>
      <p>Send to ETH address</p>
      <Input name="address" type="text" required placeholder="Address" />
      <Input name="amount" type="text" required placeholder="0.05" />
      <Button type="submit">Send</Button>
      <span>{txnHash}</span>
    </form>
  );
};
