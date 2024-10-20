import { APP_CHAIN } from "./constants";

export const LOCAL_STORAGE_KEYS = {
  SMART_ACCOUNT_ADDRESS: "smartAccountAddress",
  RISK_SCORE: "riskScore",
};

export function addToLocalStorage(key: string, value: any): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(`${APP_CHAIN.id}-${key}`, serializedValue);
  } catch (error) {
    console.error("Error adding to local storage:", error);
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(`${APP_CHAIN.id}-${key}`);
  } catch (error) {
    console.error("Error removing from local storage:", error);
  }
}

export function getFromLocalStorage(key: string): any {
  try {
    const serializedValue = localStorage.getItem(`${APP_CHAIN.id}-${key}`);
    return serializedValue;
  } catch (error) {
    console.error("Error getting from local storage:", error);
    return null;
  }
}
