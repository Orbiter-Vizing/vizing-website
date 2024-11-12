import React, { useCallback, useEffect, useState } from "react";
import { Contract, Signer, Provider } from "ethers";
import { useChainId } from "wagmi";

import { EnvMode } from "@/utils/constant";
import { referralERC20Abi } from "@/abi/referralErc20";
import { vizingPassSBTAbi } from "@/abi/vizingPassSBT";
import { vizingLaunchPadAbi } from "@/abi/vizingLaunchPad";
import { useEnv } from "@/providers/envConfigProvider";

const envContractConfig = {
  development: {
    referral: "0xe001B8c6b74118d586Dd35845EA748400A41ff50",
    sbt: "0x4fd3CD27dCe3eE0d9bFeE237c1607f564Ab54783",
  },
  test: {
    referral: "0xe001B8c6b74118d586Dd35845EA748400A41ff50",
    sbt: "0x4fd3CD27dCe3eE0d9bFeE237c1607f564Ab54783",
  },
  production: {
    referral: "0xa94e3Bb280aC192a13D23EBf12171362cd1126D4",
    sbt: "0x8aEDdEa4d4e32FE9f0F6a7433792717cdC038b4C",
  },
};

export function getCurrentEnvContract() {
  const environment = process.env.NEXT_PUBLIC_ENV as EnvMode;
  return envContractConfig[environment];
}

export function useContract() {
  const chainId = useChainId();
  const { currentEnvChainConfig } = useEnv();
  const contractConfig = getCurrentEnvContract();

  const [currentChainVizingPadAddress, setCurrentChainVizingPadAddress] = useState<string>("");

  const initCotractReferralERC20 = useCallback(
    async (signerOrProvider: Signer | Provider) => {
      const contract = new Contract(contractConfig.referral, referralERC20Abi, signerOrProvider);
      return contract;
    },
    [contractConfig.referral],
  );
  const initCotractVizingPassSBT = useCallback(
    async (signerOrProvider: Signer | Provider) => {
      const contract = new Contract(contractConfig.sbt, vizingPassSBTAbi, signerOrProvider);
      return contract;
    },
    [contractConfig.sbt],
  );
  const initCotractVizingLaunchPad = useCallback(
    async (signerOrProvider: Signer | Provider) => {
      const currentChainConfig = currentEnvChainConfig.find((chain) => {
        return chain.id === chainId;
      });
      if (!currentChainConfig) {
        return;
      }
      const contract = new Contract(
        currentChainConfig.contracts.vizingPad,
        vizingLaunchPadAbi,
        signerOrProvider,
      );
      return contract;
    },
    [chainId, currentEnvChainConfig],
  );

  useEffect(() => {
    const currentChainConfig = currentEnvChainConfig.find((chain) => {
      return chain.id === chainId;
    });
    if (currentChainConfig) {
      setCurrentChainVizingPadAddress(currentChainConfig.contracts.vizingPad);
    }
  }, [chainId, currentEnvChainConfig]);

  return {
    initCotractReferralERC20,
    initCotractVizingPassSBT,
    initCotractVizingLaunchPad,
  };
}
