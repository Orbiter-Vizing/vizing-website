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
  value: string;
  name: string;
  IconUrl: any;
  id: string;

  explorerUrl: string;
}

export const ChainsConfigMap: ChainConfigInterface = {
  development: [
    {
      value: "421614",
      name: "Arbitrum",
      IconUrl: IconArbitrum,
      id: "421614",

      explorerUrl: "https://sepolia.arbiscan.io",
    },
    {
      value: "11155111",
      name: "Ethereum",
      IconUrl: IconEthereum,
      id: "11155111",

      explorerUrl: "https://sepolia.etherscan.io",
    },
    {
      value: "84532",
      name: "Base",
      IconUrl: IconBase,
      id: "84532",

      explorerUrl: "https://sepolia.basescan.org",
    },
    {
      value: "59141",
      name: "Linea",
      IconUrl: IconLinea,
      id: "59141",

      explorerUrl: "https://sepolia.lineascan.build",
    },
    {
      value: "534351",
      name: "Scroll",
      IconUrl: IconScroll,
      id: "534351",

      explorerUrl: "https://sepolia.scrollscan.com",
    },
    {
      value: "11155420",
      name: "Optimism",
      IconUrl: IconOptimism,
      id: "11155420",

      explorerUrl: "https://sepolia-optimism.etherscan.io",
    },
    {
      value: "2442",
      name: "Polygon zkEVM",
      IconUrl: IconPolygon,
      id: "2442",

      explorerUrl: "https://cardona-zkevm.polygonscan.com",
    },
    {
      value: "168587773",
      name: "Blast",
      IconUrl: IconBlast,
      id: "168587773",

      explorerUrl: "https://sepolia.blastscan.io",
    },
    {
      value: "167009",
      name: "Taiko",
      IconUrl: IconTaiko,
      id: "167009",

      explorerUrl: "https://hekla.taikoscan.network",
    },
    {
      value: "111",
      name: "BOB",
      IconUrl: IconBOB,
      id: "111",

      explorerUrl: "https://testnet-explorer.gobob.xyz",
    },
    // {
    //   value: "28516",
    //   name: "Vizing",
    //   IconUrl: IconVizing,
    //   id: "28516",

    //   explorerUrl: "https://explorer-sepolia.vizing.com",
    // },
    // {
    //   value: "56",
    //   name: "BNB Chain",
    //   IconUrl: IconBNB,
    //   id: "56",

    //   explorerUrl: "https://bscscan.com",
    // },
    {
      value: "324",
      name: "Zksync Era",
      IconUrl: IconZksyncEra,
      id: "324",

      explorerUrl: "https://explorer.zksync.io",
    },
  ],
  production: [
    {
      value: "42161",
      name: "Arbitrum",
      IconUrl: IconArbitrum,
      id: "42161",

      explorerUrl: "https://arbiscan.io",
    },
    {
      value: "1",
      name: "Ethereum",
      IconUrl: IconEthereum,
      id: "1",

      explorerUrl: "https://etherscan.io",
    },
    {
      value: "8453",
      name: "Base",
      IconUrl: IconBase,
      id: "8453",

      explorerUrl: "https://basescan.org",
    },
    {
      value: "59144",
      name: "Linea",
      IconUrl: IconLinea,
      id: "59144",

      explorerUrl: "https://lineascan.build",
    },
    {
      value: "534352",
      name: "Scroll",
      IconUrl: IconScroll,
      id: "534352",

      explorerUrl: "https://scrollscan.com",
    },
    {
      value: "10",
      name: "Optimism",
      IconUrl: IconOptimism,
      id: "10",

      explorerUrl: "https://optimistic.etherscan.io",
    },
    {
      value: "1101",
      name: "Polygon zkEVM",
      IconUrl: IconPolygon,
      id: "1101",

      explorerUrl: "https://polygonscan.com",
    },
    {
      value: "81457",
      name: "Blast",
      IconUrl: IconBlast,
      id: "81457",

      explorerUrl: "https://blastexplorer.io",
    },
    {
      value: "167000",
      name: "Taiko",
      IconUrl: IconTaiko,
      id: "167000",

      explorerUrl: "https://taikoscan.io",
    },
    {
      value: "60808",
      name: "BOB",
      IconUrl: IconBOB,
      id: "60808",

      explorerUrl: "https://explorer.gobob.xyz",
    },
    {
      value: "28518",
      name: "Vizing",
      IconUrl: IconVizing,
      id: "28518",

      explorerUrl: "https://explorer.vizing.com",
    },
    // {
    //   value: "56",
    //   name: "BNB Chain",
    //   IconUrl: IconBNB,
    //   id: "56",

    //   explorerUrl: "https://bscscan.com",
    // },
    {
      value: "324",
      name: "Zksync Era",
      IconUrl: IconZksyncEra,
      id: "324",

      explorerUrl: "https://explorer.zksync.io",
    },
  ],
  test: [
    {
      value: "421614",
      name: "Arbitrum",
      IconUrl: IconArbitrum,
      id: "421614",

      explorerUrl: "https://sepolia.arbiscan.io",
    },
    {
      value: "11155111",
      name: "Ethereum",
      IconUrl: IconEthereum,
      id: "11155111",

      explorerUrl: "https://sepolia.etherscan.io",
    },
    {
      value: "84532",
      name: "Base",
      IconUrl: IconBase,
      id: "84532",

      explorerUrl: "https://sepolia.basescan.org",
    },
    {
      value: "59141",
      name: "Linea",
      IconUrl: IconLinea,
      id: "59141",

      explorerUrl: "https://sepolia.lineascan.build",
    },
    {
      value: "534351",
      name: "Scroll",
      IconUrl: IconScroll,
      id: "534351",

      explorerUrl: "https://sepolia.scrollscan.com",
    },
    {
      value: "11155420",
      name: "Optimism",
      IconUrl: IconOptimism,
      id: "11155420",

      explorerUrl: "https://sepolia-optimism.etherscan.io",
    },
    {
      value: "2442",
      name: "Polygon zkEVM",
      IconUrl: IconPolygon,
      id: "2442",

      explorerUrl: "https://cardona-zkevm.polygonscan.com",
    },
    {
      value: "168587773",
      name: "Blast",
      IconUrl: IconBlast,
      id: "168587773",

      explorerUrl: "https://sepolia.blastscan.io",
    },
    {
      value: "167009",
      name: "Taiko",
      IconUrl: IconTaiko,
      id: "167009",

      explorerUrl: "https://hekla.taikoscan.network",
    },
    {
      value: "111",
      name: "BOB",
      IconUrl: IconBOB,
      id: "111",

      explorerUrl: "https://testnet-explorer.gobob.xyz",
    },
    // {
    //   value: "28516",
    //   name: "Vizing",
    //   IconUrl: IconVizing,
    //   id: "28516",

    //   explorerUrl: "https://explorer-sepolia.vizing.com",
    // },
    // {
    //   value: "56",
    //   name: "BNB Chain",
    //   IconUrl: IconBNB,
    //   id: "56",

    //   explorerUrl: "https://bscscan.com",
    // },
    {
      value: "324",
      name: "Zksync Era",
      IconUrl: IconZksyncEra,
      id: "324",

      explorerUrl: "https://explorer.zksync.io",
    },
  ],
};

export const getCurrentEnvChainConfig = () => {
  const environment = process.env.NEXT_PUBLIC_ENV as EnvMode;
  return ChainsConfigMap[environment];
};
