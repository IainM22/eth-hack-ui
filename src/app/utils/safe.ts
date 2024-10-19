import { isEthereumWallet } from "@dynamic-labs/ethereum";
import { type WalletClient, http, type Chain, createPublicClient } from "viem";
import {
  ENTRYPOINT_ADDRESS_V07,
  createSmartAccountClient,
  walletClientToSmartAccountSigner,
} from "permissionless";
import {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient,
} from "permissionless/clients/pimlico";
import { signerToSafeSmartAccount } from "permissionless/accounts";
import { type Wallet } from "@dynamic-labs/wallet-connector-core";

const transportUrl = (chain: Chain) =>
  `https://api.pimlico.io/v2/${chain.id}/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`;

const publicClient = (chain: Chain) =>
  createPublicClient({
    chain,
    transport: http(),
  });

export const pimlicoBundlerClient = (chain: Chain) =>
  createPimlicoBundlerClient({
    transport: http(transportUrl(chain)),
    entryPoint: ENTRYPOINT_ADDRESS_V07,
  });

export const paymasterClient = (chain: Chain) =>
  createPimlicoPaymasterClient({
    transport: http(transportUrl(chain)),
    entryPoint: ENTRYPOINT_ADDRESS_V07,
  });

export const getPimlicoSmartAccountClient = async (
  chain: Chain,
  wallet: Wallet,
) => {
  if (!isEthereumWallet(wallet)) return;
  const walletClient = (await wallet.getWalletClient()) as WalletClient;
  const signer = walletClientToSmartAccountSigner(walletClient);

  const safeSmartAccountClient = await signerToSafeSmartAccount(
    publicClient(chain),
    {
      entryPoint: ENTRYPOINT_ADDRESS_V07,
      signer: signer,
      safeVersion: "1.4.1",
    },
  );

  return createSmartAccountClient({
    account: safeSmartAccountClient,
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    chain,
    bundlerTransport: http(transportUrl(chain)),
    middleware: {
      gasPrice: async () =>
        (await pimlicoBundlerClient(chain).getUserOperationGasPrice()).fast, // use pimlico bundler to get gas prices
      sponsorUserOperation: paymasterClient(chain).sponsorUserOperation, // optional
    },
  });
};
