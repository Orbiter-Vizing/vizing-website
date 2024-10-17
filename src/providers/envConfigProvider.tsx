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
import { getCurrentEnvChainConfig } from "@/utils/chainConfig";

interface EnvContextType {
  currentEnvExternalUrls: ExternalUrls;
  vizingConfig: ChainConfig;
  currentEnvChainConfig: ChainConfig[];
}

const EnvContext = createContext<EnvContextType | undefined>(undefined);

export const EnvProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const currentEnvExternalUrls = getCurrentEnvExternalUrls();
  const currentEnvChainConfig = getCurrentEnvChainConfig();
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
          contracts: {
            vizingPad: "0x5D77b0c9855F44a8fbEf34E670e243E988682a82",
          },
        }
      : {
          name: "Vizing",
          IconUrl: IconVizing,
          id: 28516,
          rpcUrl: "https://rpc-sepolia.vizing.com",
          explorerUrl: "https://explorer-sepolia.vizing.com",
          nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
          contracts: {
            vizingPad: "0x0B5a8E5494DDE7039781af500A49E7971AE07a6b",
          },
        };

  return (
    <EnvContext.Provider value={{ currentEnvExternalUrls, vizingConfig, currentEnvChainConfig }}>
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
