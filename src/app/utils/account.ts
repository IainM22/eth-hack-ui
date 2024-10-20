import { type Wallet } from "@dynamic-labs/wallet-connector-core";
import { LOCAL_STORAGE_KEYS, addToLocalStorage } from "./storage";
import { getPimlicoSmartAccountClient, enableModule } from "./safe";
import { APP_CHAIN, UNDEGEN_MODULE_ADDRESS } from "./constants";

export const initializeAccount = async (wallet: Wallet) => {
  try {
    const smartAccountClient = await getPimlicoSmartAccountClient(
      APP_CHAIN,
      wallet,
    );
    addToLocalStorage(
      LOCAL_STORAGE_KEYS.SMART_ACCOUNT_ADDRESS,
      smartAccountClient.account.address,
    );

    await enableModule(smartAccountClient, UNDEGEN_MODULE_ADDRESS);
  } catch (e: any) {
    console.error("Failed to initialize account");
    console.error(e);
  }
};
