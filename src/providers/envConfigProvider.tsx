"use client";

import React, { createContext, useContext, ReactNode } from "react";

import {
  EnvExternalURLs,
  EnvMode,
  ExternalUrls,
  getCurrentEnvExternalUrls,
} from "@/utils/constant";
import { ChainConfig } from "@/utils/chainConfig";
import IconVizing from "@/assets/images/chain-icon/vizing.png";

interface EnvContextType {
  currentEnvExternalUrls: ExternalUrls;
  vizingConfig: ChainConfig;
}

const EnvContext = createContext<EnvContextType | undefined>(undefined);

export const EnvProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const currentEnvExternalUrls = getCurrentEnvExternalUrls();
  const envString = process.env.NEXT_PUBLIC_ENV as EnvMode;
  const vizingConfig =
    envString === "production"
      ? {
          name: "Vizing",
          IconUrl: IconVizing,
          id: 28518,
          rpcUrl: "https://rpc.vizing.com",
          explorerUrl: "https://explorer.vizing.com",
          nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
        }
      : {
          name: "Vizing",
          IconUrl: IconVizing,
          id: 28516,
          rpcUrl: "https://rpc-sepolia.vizing.com",
          explorerUrl: "https://explorer-sepolia.vizing.com",
          nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
        };

  return (
    <EnvContext.Provider value={{ currentEnvExternalUrls, vizingConfig }}>
      {children}
    </EnvContext.Provider>
  );
};

export const useEnv = () => {
  const context = useContext(EnvContext);
  if (context === undefined) {
    throw new Error("useEnv must be used within an EnvProvider");
  }
  return context;
};
