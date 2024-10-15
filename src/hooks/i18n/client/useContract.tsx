import React, { useCallback } from "react";
import { Contract, Signer, Provider } from "ethers";

import { EnvMode } from "@/utils/constant";
import { referralERC20Abi } from "@/abi/referralErc20";
import { vizingPassSBTAbi } from "@/abi/vizingPassSBT";
import { vizingLaunchPadAbi } from "@/abi/vizingLaunchPad";
import { arbitrum } from "viem/chains";

const testNetReferralERC20 = "0x25Ba7eF375988e28Dd40eC196B4cD3477Ba817C9";
const testNetVizingPassSBT = "0x3517FDF66C688E70C3b65273e76DccaE94871B91";

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
  const contractConfig = getCurrentEnvContract();
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
      const contract = new Contract(contractConfig.arbitrum, vizingLaunchPadAbi, signerOrProvider);
      return contract;
    },
    [contractConfig.arbitrum],
  );

  return {
    initCotractReferralERC20,
    initCotractVizingPassSBT,
    initCotractVizingLaunchPad,
  };
}
