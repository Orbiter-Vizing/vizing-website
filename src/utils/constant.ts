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
};

export function openExternalURLs(key: keyof typeof externalURLs) {
  window.open(externalURLs[key], "_blank");
}

export type EnvMode = "development" | "test" | "production";
