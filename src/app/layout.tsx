"use client";

import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import { useRouter } from "next/navigation";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <DynamicContextProvider
          settings={{
            environmentId: "42e04834-7850-4513-a3d7-954d93983644",
            walletConnectors: [EthereumWalletConnectors],
            events: {
              onAuthSuccess: (args) => {
                console.log("onAuthSuccess was called", args);
                if (args.isAuthenticated) {
                  router.push("/invest");
                } else {
                  router.push("/error");
                }
              },
            },
          }}
        >
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
            </QueryClientProvider>
          </WagmiProvider>
        </DynamicContextProvider>
      </body>
    </html>
  );
}
