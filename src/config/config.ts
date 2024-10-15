"use client";

import { http, createStorage, cookieStorage, createConfig } from "wagmi";
import { sepolia, bscTestnet, blastSepolia, mainnet, base, arbitrumSepolia } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain, type Chain } from "viem";
// import { type Chain } from "viem";

import { getCurrentEnvChainConfig } from "@/utils/chainConfig";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  walletConnectWallet,
  okxWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { Chilanka } from "next/font/google";
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      // wallets: [metaMaskWallet],
      wallets: [metaMaskWallet, walletConnectWallet, okxWallet],
    },
  ],
  {
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
  },
);

const projectId = "8e191c21ba991e40848e4355139cd3bb";

// const supportedChains: Chain[] = [sepolia, bscTestnet, blastSepolia];

// export const config = getDefaultConfig({
//   appName: "BoundlessTravel",
//   projectId,
//   chains: supportedChains as any,
//   ssr: true,
//   storage: createStorage({
//     storage: cookieStorage,
//   }),
//   transports: supportedChains.reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {}),
// });

// const customChain: Chain = {
//   id: 123, // 替换为你的链 ID
//   name: 'Custom Chain', // 替换为你的链名称
//   rpcUrls: {
//     default: 'https://your-custom-rpc-url.com', // 替换为你的 RPC URL
//   },
//   nativeCurrency: {
//     name: 'Custom Token', // 替换为你的代币名称
//     symbol: 'CTK', // 替换为你的代币符号
//     decimals: 18, // 替换为你的代币小数位数
//   },
// };

export const vizingSepolia = defineChain({
  id: 28516,
  name: "Vizing",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-sepolia.vizing.com"] },
  },
  blockExplorers: {
    default: { name: "VizingScan", url: "https://scan.vizing.com/" },
  },
  contracts: {},
});

const transportsConfig: Record<number, ReturnType<typeof http>> = {};

const chains = getCurrentEnvChainConfig().map((chain) => {
  transportsConfig[chain.id] = http();
  const definedChainForCreateConfig = defineChain({
    id: chain.id,
    name: chain.name,
    nativeCurrency: {
      name: chain.nativeCurrency.name,
      symbol: chain.nativeCurrency.symbol,
      decimals: chain.nativeCurrency.decimals,
    },
    rpcUrls: {
      default: { http: [chain.rpcUrl] },
    },
    blockExplorers: {
      default: { name: chain.name, url: chain.explorerUrl },
    },
    contracts: {},
    fees: undefined,
    formatters: undefined,
    network: chain.name,
    serializers: undefined,
  });
  // const definedChainForCreateConfig = {
  //   id: chain.id,
  //   name: chain.name,
  //   nativeCurrency: {
  //     name: chain.nativeCurrency.name,
  //     symbol: chain.nativeCurrency.symbol,
  //     decimals: chain.nativeCurrency.decimals,
  //   },
  //   rpcUrls: {
  //     default: { http: [chain.rpcUrl] },
  //   },
  //   blockExplorers: {
  //     default: { name: chain.name, url: chain.explorerUrl },
  //   },
  //   contracts: {},
  //   fees: undefined,
  //   formatters: undefined,
  //   network: chain.name,
  //   serializers: undefined,
  // } as const satisfies Chain;
  return definedChainForCreateConfig;
});

export const config = createConfig({
  chains: [mainnet, ...chains],
  connectors,
  transports: transportsConfig,
});
