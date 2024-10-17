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
    referral: "0xa31c0Cd83e9f01Dd31F6226C57d9b29B378270c1",
    sbt: "0x23f5e5bc8733562129fD5978dCA91485c9F91b8a",
    arbitrum: "0x0B5a8E5494DDE7039781af500A49E7971AE07a6b",
  },
  test: {
    referral: "0xa31c0Cd83e9f01Dd31F6226C57d9b29B378270c1",
    sbt: "0x23f5e5bc8733562129fD5978dCA91485c9F91b8a",
    arbitrum: "0x0B5a8E5494DDE7039781af500A49E7971AE07a6b",
  },
  production: {
    referral: "0xa31c0Cd83e9f01Dd31F6226C57d9b29B378270c1",
    sbt: "0x23f5e5bc8733562129fD5978dCA91485c9F91b8a",
    arbitrum: "0xD725Bc299a232201984FEcb4FF106d84E894193f",
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
