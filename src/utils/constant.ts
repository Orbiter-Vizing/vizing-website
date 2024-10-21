export function getOptions(lng = fallbackLng, ns = "common") {
  return {
    // debug: true,
    supportedLngs: languageArr,
    fallbackLng,
    lng,
    fallbackNS: ns,
    defaultNS: ns,
    ns,
  };
}
const languageMap = [
  {
    path: "en",
    alias: "en-us",
    text: "English",
  },
  // {
  //     path: "zh",
  //     alias: "zh-cn",
  //     text: "中文",
  // },
];
export const languageArr = languageMap.map((item) => item.path);
export const languageCookieName = "NEXT_LOCALE";

export const fallbackLng = "en";

export const externalURLs = {
  discord: "https://discord.com/invite/FbztTBvnBT",
  bridge: "https://bridge.vizing.com",
  docs: "https://docs.vizing.com/docs/intro",
  status: "https://vizing.instatus.com",
  telegram: "https://t.me/orbiter_vizing_chat",
  testNetBridge: "https://bridge-sepolia.vizing.com",
  testNetBrowser: "https://explorer-sepolia.vizing.com/",
  youtube: "https://www.youtube.com/@OrbiterVizing",
  tgBot: "https://t.me/orbiter_vizing_bot/app",
  // developer
  developerDocs: "https://docs.vizing.com/",
  explorer: "https://explorer.vizing.com",
  vizingScan: "https://scan.vizing.com/",
  github: "https://github.com/Orbiter-Vizing",
  // community
  brandKit: "https://docs.vizing.com/build-on-vizing/brand-kit",
  medium: "https://medium.com/@Vizing_L2",
  twitter: "https://x.com/Vizing_L2",
  scan: "https://scan.vizing.com",
};

export interface ExternalUrls {
  twitter: string;
  discord: string;
  medium: string;
  github: string;
  bridge: string;
  explorer: string;
  docs: string;
  status: string;
  scan: string;
  homepage: string;
  telegram: string;
}

export interface EnvExternalURLs {
  development: ExternalUrls;
  test: ExternalUrls;
  production: ExternalUrls;
}

export const envExternalURLs: EnvExternalURLs = {
  development: {
    twitter: "https://x.com/Vizing_L2",
    discord: "https://discord.com/invite/FbztTBvnBT",
    medium: "https://medium.com/@Vizing_L2",
    github: "https://github.com/Orbiter-Vizing",
    bridge: "https://bridge-sepolia.vizing.com",
    explorer: "https://explorer-sepolia.vizing.com",
    docs: "https://docs.vizing.com",
    status: "https://vizing.instatus.com",
    scan: "https://scan.vizing.com",
    homepage: "https://www.vizing.com",
    telegram: "https://t.me/orbiter_vizing_chat",
  },
  test: {
    twitter: "https://x.com/Vizing_L2",
    discord: "https://discord.com/invite/FbztTBvnBT",
    medium: "https://medium.com/@Vizing_L2",
    github: "https://github.com/Orbiter-Vizing",
    bridge: "https://bridge-sepolia.vizing.com",
    explorer: "https://explorer-sepolia.vizing.com",
    docs: "https://docs.vizing.com",
    status: "https://vizing.instatus.com",
    scan: "https://scan.vizing.com",
    homepage: "https://www.vizing.com",
    telegram: "https://t.me/orbiter_vizing_chat",
  },
  production: {
    twitter: "https://x.com/Vizing_L2",
    discord: "https://discord.com/invite/FbztTBvnBT",
    medium: "https://medium.com/@Vizing_L2",
    github: "https://github.com/Orbiter-Vizing",
    bridge: "https://bridge.vizing.com",
    explorer: "https://explorer.vizing.com",
    docs: "https://docs.vizing.com",
    status: "https://vizing.instatus.com",
    scan: "https://scan.vizing.com",
    homepage: "https://www.vizing.com",
    telegram: "https://t.me/orbiter_vizing_chat",
  },
};

export const getCurrentEnvExternalUrls = () => {
  const envString = process.env.NEXT_PUBLIC_ENV as EnvMode;
  return envExternalURLs[envString];
};

export function openExternalURLs(key: keyof typeof externalURLs) {
  window.open(externalURLs[key], "_blank");
}

export type EnvMode = "development" | "test" | "production";

const envConfig = {
  development: {
    apiUrl: "https://testnet-analytics-api.vizing.com",
  },
  test: {
    apiUrl: "https://testnet-analytics-api.vizing.com",
  },
  production: {
    apiUrl: "https://openapi.vizing.com",
  },
};

export const getCurrentEnvApiUrl = () => {
  const envString = process.env.NEXT_PUBLIC_ENV as EnvMode;
  return envConfig[envString].apiUrl;
};

export const referralContractAddress = "0x464D7c5ab53Bd53EA8d69C461587D654b09356FC";
export const vizingPassSBTContractAddress = "0x464D7c5ab53Bd53EA8d69C461587D654b09356FC";

export const zeroAddress = "0x0000000000000000000000000000000000000000";

export const normalMintFee = "0.001"; // ETH
export const invitedMintFee = "0.0008"; // ETH

export enum TxStatus {
  SUCCESS = 1,
  FAILED = 0,
}
