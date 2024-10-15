import { ethers, JsonRpcProvider } from "ethers";
import { EnvMode } from "@/utils/constant";
// assets
import IconArbitrum from "@/assets/images/chain-icon/ArbitrumOne.png";
import IconEthereum from "@/assets/images/chain-icon/Ethereum.png";
import IconBase from "@/assets/images/chain-icon/Base.png";
import IconLinea from "@/assets/images/chain-icon/Linea.png";
import IconScroll from "@/assets/images/chain-icon/Scroll.png";
import IconOptimism from "@/assets/images/chain-icon/Optimism.png";
import IconPolygon from "@/assets/images/chain-icon/Polygon.png";
import IconBlast from "@/assets/images/chain-icon/Blast.png";
import IconTaiko from "@/assets/images/chain-icon/Taiko.png";
import IconBOB from "@/assets/images/chain-icon/BOB.png";
import IconVizing from "@/assets/images/chain-icon/vizing.png";
import IconBNB from "@/assets/images/chain-icon/BNBChain.png";
import IconZksyncEra from "@/assets/images/chain-icon/zkSyncEra.png";

export interface ChainConfigInterface {
  development: ChainConfig[];
  production: ChainConfig[];
  test: ChainConfig[];
}

export interface ChainConfig {
  name: string;
  IconUrl: any;
  id: number;
  rpcUrl: string;
  balance?: bigint;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export const ChainsConfigMap: ChainConfigInterface = {
  development: [
    {
      name: "Arbitrum",
      IconUrl: IconArbitrum,
      id: 421614,
      rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
      explorerUrl: "https://sepolia.arbiscan.io",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Ethereum",
      IconUrl: IconEthereum,
      id: 11155111,
      rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/_8hM_H2lFo-7ub_l5x8x01AhpdUMkRJm",
      explorerUrl: "https://sepolia.etherscan.io",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Base",
      IconUrl: IconBase,
      id: 84532,
      rpcUrl: "https://sepolia.base.org",
      explorerUrl: "https://sepolia.basescan.org",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Linea",
      IconUrl: IconLinea,
      id: 59141,
      rpcUrl: "https://rpc.sepolia.linea.build",
      explorerUrl: "https://sepolia.lineascan.build",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Scroll",
      IconUrl: IconScroll,
      id: 534351,
      rpcUrl: "https://sepolia-rpc.scroll.io",
      explorerUrl: "https://sepolia.scrollscan.com",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Optimism",
      IconUrl: IconOptimism,
      id: 11155420,
      rpcUrl: "https://optimism-sepolia.blastapi.io/71f50f84-77e9-4594-8278-c6552c9f0b7e",
      explorerUrl: "https://sepolia-optimism.etherscan.io",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Polygon zkEVM",
      IconUrl: IconPolygon,
      id: 2442,
      rpcUrl: "https://etherscan.cardona.zkevm-rpc.com",
      explorerUrl: "https://cardona-zkevm.polygonscan.com",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Blast",
      IconUrl: IconBlast,
      id: 168587773,
      rpcUrl: "https://sepolia.blast.io",
      explorerUrl: "https://sepolia.blastscan.io",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Taiko",
      IconUrl: IconTaiko,
      id: 167009,
      rpcUrl: "https://rpc.hekla.taiko.xyz",
      explorerUrl: "https://hekla.taikoscan.network",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "BOB",
      IconUrl: IconBOB,
      id: 111,
      rpcUrl: "https://testnet.rpc.gobob.xyz",
      explorerUrl: "https://testnet-explorer.gobob.xyz",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Vizing",
      IconUrl: IconVizing,
      id: 28516,
      rpcUrl: "https://rpc-sepolia.vizing.com",
      explorerUrl: "https://explorer.vizing.com",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
  ],
  production: [
    {
      name: "Arbitrum",
      IconUrl: IconArbitrum,
      id: 42161,
      rpcUrl: "https://arb1.arbitrum.io/rpc",
      explorerUrl: "https://arbiscan.io",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Ethereum",
      IconUrl: IconEthereum,
      id: 1,
      rpcUrl: "https://ethereum.publicnode.com",
      explorerUrl: "https://etherscan.io",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Base",
      IconUrl: IconBase,
      id: 8453,
      rpcUrl: "https://mainnet.base.org",
      explorerUrl: "https://basescan.org",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Linea",
      IconUrl: IconLinea,
      id: 59144,
      rpcUrl: "https://rpc.linea.build",
      explorerUrl: "https://lineascan.build",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Scroll",
      IconUrl: IconScroll,
      id: 534352,
      rpcUrl: "https://rpc.scroll.io",
      explorerUrl: "https://scrollscan.com",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Optimism",
      IconUrl: IconOptimism,
      id: 10,
      rpcUrl: "https://optimism.publicnode.com",
      explorerUrl: "https://optimistic.etherscan.io",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Polygon zkEVM",
      IconUrl: IconPolygon,
      id: 1101,
      rpcUrl: "https://zkevm-rpc.com",
      explorerUrl: "https://polygonscan.com",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Blast",
      IconUrl: IconBlast,
      id: 81457,
      rpcUrl: "https://rpc.blast.io",
      explorerUrl: "https://blastexplorer.io",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Taiko",
      IconUrl: IconTaiko,
      id: 167000,
      rpcUrl: "https://rpc.mainnet.taiko.xyz",
      explorerUrl: "https://taikoscan.io",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "BOB",
      IconUrl: IconBOB,
      id: 60808,
      rpcUrl: "https://rpc.gobob.xyz",
      explorerUrl: "https://explorer.gobob.xyz",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Vizing",
      IconUrl: IconVizing,
      id: 28518,
      rpcUrl: "https://rpc.vizing.com",
      explorerUrl: "https://explorer.vizing.com",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
  ],
  test: [
    {
      name: "Arbitrum",
      IconUrl: IconArbitrum,
      id: 421614,
      rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
      explorerUrl: "https://sepolia.arbiscan.io",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Ethereum",
      IconUrl: IconEthereum,
      id: 11155111,
      rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/_8hM_H2lFo-7ub_l5x8x01AhpdUMkRJm",
      explorerUrl: "https://sepolia.etherscan.io",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Base",
      IconUrl: IconBase,
      id: 84532,
      rpcUrl: "https://sepolia.base.org",
      explorerUrl: "https://sepolia.basescan.org",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Linea",
      IconUrl: IconLinea,
      id: 59141,
      rpcUrl: "https://rpc.sepolia.linea.build",
      explorerUrl: "https://sepolia.lineascan.build",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Scroll",
      IconUrl: IconScroll,
      id: 534351,
      rpcUrl: "https://sepolia-rpc.scroll.io",
      explorerUrl: "https://sepolia.scrollscan.com",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Optimism",
      IconUrl: IconOptimism,
      id: 11155420,
      rpcUrl: "https://optimism-sepolia.blastapi.io/71f50f84-77e9-4594-8278-c6552c9f0b7e",
      explorerUrl: "https://sepolia-optimism.etherscan.io",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Polygon zkEVM",
      IconUrl: IconPolygon,
      id: 2442,
      rpcUrl: "https://etherscan.cardona.zkevm-rpc.com",
      explorerUrl: "https://cardona-zkevm.polygonscan.com",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Blast",
      IconUrl: IconBlast,
      id: 168587773,
      rpcUrl: "https://sepolia.blast.io",
      explorerUrl: "https://sepolia.blastscan.io",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Taiko",
      IconUrl: IconTaiko,
      id: 167009,
      rpcUrl: "https://rpc.hekla.taiko.xyz",
      explorerUrl: "https://hekla.taikoscan.network",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "BOB",
      IconUrl: IconBOB,
      id: 111,
      rpcUrl: "https://testnet.rpc.gobob.xyz",
      explorerUrl: "https://testnet-explorer.gobob.xyz",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
    {
      name: "Vizing",
      IconUrl: IconVizing,
      id: 28516,
      rpcUrl: "https://rpc-sepolia.vizing.com",
      explorerUrl: "https://explorer.vizing.com",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    },
  ],
};

export const getCurrentEnvChainConfig = () => {
  const environment = process.env.NEXT_PUBLIC_ENV as EnvMode;
  return ChainsConfigMap[environment];
};

export const getCurrentEnvChainBalance = async () => {
  const environment = process.env.NEXT_PUBLIC_ENV as EnvMode;
  const currentEnvChainList = ChainsConfigMap[environment];

  const balances = await Promise.all(
    currentEnvChainList.map(async (chain) => {
      const provider = new JsonRpcProvider(chain.rpcUrl);
      const balance = await provider.getBalance("0x24F4F8e83eA08b7DCb7A579B1236fc3155300854");
      return {
        ...chain,
        balance,
      };
    }),
  );

  return balances;
};

export const getChainId = (chainName: string) => {
  const environment = process.env.NEXT_PUBLIC_ENV as EnvMode;
  const currentEnvChainList = ChainsConfigMap[environment];
  const targetChain = currentEnvChainList.find((chain) => {
    return chain.name === chainName;
  });
  return targetChain;
};
