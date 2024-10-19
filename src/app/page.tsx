import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Undegen
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <DynamicContextProvider
            settings={{
              environmentId: "42e04834-7850-4513-a3d7-954d93983644",
              walletConnectors: [EthereumWalletConnectors],
            }}
          >
            <DynamicWidget />
          </DynamicContextProvider>
        </div>
      </div>
    </main>
  );
}
