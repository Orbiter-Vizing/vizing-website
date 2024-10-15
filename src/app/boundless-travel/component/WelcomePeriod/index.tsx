"use client";
import { clsx } from "clsx";
import styles from "./style.module.css";
import React, { useEffect, useMemo, useState } from "react";
import AuthCode from "react-auth-code-input";
import { useRouter } from "next/navigation";
import { useConnect, useConnectors } from "wagmi";
import { injected } from "wagmi/connectors";
import { useChains } from "wagmi";
import { toast } from "react-toastify";
import { useAccountTravelInfo } from "@/hooks/i18n/client/useAccountTravelInfo";
import { useAccount } from "wagmi";
import { externalURLs } from "@/utils/constant";
import { useCheckInviteCode } from "@/hooks/i18n/client/useAccountTravelInfo";
import { RequestUserLoginInfoOutput } from "@/api/boundlessTravel";
// atom
import { useAtom } from "jotai";
import {
  accountTravelInfoAtom,
  accountAddressAtom,
  beInvitedAtom,
  combinedTravelInfoAtom,
} from "@/atoms/accountAtom";
// assets
import IconNextArrow from "@/assets/images/icon/arrow-right.svg";
import IconWalletconnect from "@/assets/images/wallets/walletconnect.svg";
import IconMetamask from "@/assets/images/wallets/metamask.svg";
import IconOkxWallet from "@/assets/images/wallets/okx.svg";
import IconTwitter from "@/assets/images/social-media/twitter.svg";
import IconDiscord from "@/assets/images/social-media/discord.svg";
import { checkIsInviteCodeValid, requestUserLoginInfo } from "@/api/boundlessTravel";

enum WelcomeTabs {
  CONNECTWALLET = "connectWallet",
  CONNECTSOCIAL = "connectSocial",
  INVITECODE = "inviteCode",
}

enum WelcomeTabIndex {
  CONNECTWALLET = 1,
  CONNECTSOCIAL = 2,
  INVITECODE = 3,
}

export default function WelcomePeriod() {
  const [currentTabIndex, setCurrentTabIndex] = useState(1);
  const [authCode, setAuthCode] = useState<string>();
  const [accountTravelInfo, setAccountTravelInfo] = useAtom(accountTravelInfoAtom);
  const [isInvited, setIsInvited] = useAtom(beInvitedAtom);
  const [accountAddress] = useAtom(accountAddressAtom);
  const [combindedTravelInfo, setCombindedTravelInfo] = useAtom(combinedTravelInfoAtom);
  const account = useAccount();
  const router = useRouter();

  // const { isPending, isFetching, isLoading, data, refetch } = useAccountTravelInfo(account.address);

  // console.log("welcome signIn data", data);

  const { connect } = useConnect();
  const connectors = useConnectors();
  const chains = useChains();

  console.log("connectors", connectors);
  console.log("chains", chains);

  const handleOnChange = (res: string) => {
    setAuthCode(res);
  };

  const tabsArray = useMemo(() => {
    return [
      {
        id: WelcomeTabs.CONNECTWALLET,
        name: "Connect Wallet ",
        hasPrePeriod: false,
        hasNextPerid: true,
        index: WelcomeTabIndex.CONNECTWALLET,
      },
      {
        id: WelcomeTabs.CONNECTSOCIAL,
        name: "Connect Socials",
        hasPrePeriod: true,
        hasNextPerid: true,
        index: WelcomeTabIndex.CONNECTSOCIAL,
      },
      {
        id: WelcomeTabs.INVITECODE,
        name: "Enter Invite Code",
        hasPrePeriod: false,
        hasNextPerid: false,
        index: WelcomeTabIndex.INVITECODE,
      },
    ];
  }, []);

  const handlePeriodChange = (tab: number) => {
    setCurrentTabIndex(tab);
  };

  // const handleAdd1 = () => {
  //   setCount((prev) => prev + 1);
  // };

  const handleConect = () => {
    console.log("injected", injected());
    connect({ connector: injected() });
  };

  const connectMetamask = () => {
    const targetConnector = connectors.find((connector) => {
      return connector.name === "MetaMask";
    });
    if (targetConnector) {
      connect({ connector: targetConnector });
    }
  };

  const connectOkxWallet = () => {
    const targetConnector = connectors.find((connector) => {
      const rkDetails = connector.rkDetails as { id: string };
      return rkDetails && rkDetails.id === "okx";
    });
    if (targetConnector) {
      connect({ connector: targetConnector });
    }
  };
  // "walletConnect"
  const connectWalletConnect = () => {
    const targetConnector = connectors.find((connector) => {
      const rkDetails = connector.rkDetails as { id: string };
      return rkDetails && rkDetails.id === "walletConnect";
    });
    if (targetConnector) {
      connect({ connector: targetConnector });
    }
  };

  const handleRequestClick = () => {
    // const data = useAccountTravelInfo();
    // console.log("account travel data", data);
    // console.log("isFetching", isFetching);
    // console.log("isPending", isPending);
    // console.log("isLoading", isLoading);
  };

  const handleClickXlink = () => {
    window.open(externalURLs.twitter);
  };

  const handleClickDiscordlink = () => {
    window.open(externalURLs.discord);
  };

  const enterTravelActivity = async () => {
    console.log("dive into");
    if (!authCode) {
      console.log("no code, just jump");
      setCombindedTravelInfo({
        ...combindedTravelInfo,
        isWelcomeViewed: true,
      });
      // router.push("/boundless-travel/travel");
    } else {
      // check if the code is valid
      console.log("authCode", authCode);
      const address = account.address;
      if (address && authCode) {
        try {
          const res = await checkIsInviteCodeValid({
            account: address,
            invitedCode: authCode,
          });
          setCombindedTravelInfo({
            ...combindedTravelInfo,
            isWelcomeViewed: true,
          });
          // router.push("/boundless-travel/travel");
          // console.log("check code vaid res", res);
          // const res = {
          //   code: 0,
          //   data: {
          //     success: true
          //   }
          // }
          // update account info
        } catch (error) {
          toast.error("Invalid invite code");
          console.log("check res error", error);
        }
      }
    }
  };

  const initUserLoginInfo = async () => {
    if (!accountTravelInfo && account.address) {
      // const { isPending, isFetching, isLoading, data, refetch } = useAccountTravelInfo();
      const accountLoginInfo = await requestUserLoginInfo({
        account: account.address,
      });
      console.log("init: accountLoginInfo", accountLoginInfo);
      setAccountTravelInfo(accountLoginInfo);
      // if (data) {
      //   // Check if data is defined
      //   console.log("welcome effect data", data);
      //   setAccountTravelInfo(data);
      // }
    }
  };

  useEffect(() => {
    initUserLoginInfo();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-center text-[48px] text-white font-semibold mb-[54px] mt-[64px]">
        Welcome to Vizing
      </div>
      {/* <div>count: {count}</div> */}
      {/* <div onClick={handleAdd1} className="h-[30px] w-[30px] rounded border-[1px] border-white">
        +1
      </div> */}
      <div className="w-[800px] bg-[#232021] rounded-[24px] p-[24px] pb-[32px] mx-auto">
        <div className="flex justify-between mb-[24px]">
          {tabsArray.map((tab) => {
            return (
              <div
                // className="flex items-center border-l-[4px] border-white text-[20px] font-medium"
                className={clsx(
                  "flex items-center border-l-[4px] border-white text-[20px] text-[rgba(255,255,255,0.6)] font-medium",
                  tab.index <= currentTabIndex ? styles.passedPeriod : "",
                )}
                key={tab.id}
              >
                <div
                  className={clsx(
                    "ml-[10px] mr-[40px]",
                    currentTabIndex === tab.index ? styles.currentTab : "",
                  )}
                >
                  {tab.name}
                </div>
                {tab.hasNextPerid && (
                  <IconNextArrow
                    className={clsx("w-[40px] h-[24px] opacity-80", styles.ecosystemWrap)}
                  />
                )}
              </div>
            );
          })}
        </div>
        {currentTabIndex === WelcomeTabIndex.CONNECTWALLET && (
          <div>
            <div
              onClick={connectMetamask}
              className="w-full h-[100px] bg-[#302D2E] pl-[287px] mb-[20px] rounded-[12px] flex items-center justify-start text-[20px] hover:cursor-pointer"
            >
              <IconMetamask className="w-[60px] h-[60px] rounded mr-[20px]" />
              Metamask
            </div>
            <div
              onClick={connectOkxWallet}
              className="w-full h-[100px] bg-[#302D2E] pl-[287px] mb-[20px] rounded-[12px] flex items-center justify-start text-[20px] hover:cursor-pointer"
            >
              <IconOkxWallet className="w-[60px] h-[60px] rounded mr-[20px]" />
              OKX Wallet
            </div>
            <div
              onClick={connectWalletConnect}
              className="w-full h-[100px] bg-[#302D2E] pl-[287px] mb-[20px] rounded-[12px] flex items-center justify-start text-[20px] hover:cursor-pointer"
            >
              <IconWalletconnect className="w-[60px] h-[60px] rounded mr-[20px]" />
              Wallet Connect
            </div>
            <div
              onClick={() => handlePeriodChange(WelcomeTabIndex.CONNECTSOCIAL)}
              className={clsx(
                "w-full h-[56px] flex items-center justify-center w-full bg-[#FF486D] text-white rounded-[12px] text-[20px] font-bold hover:cursor-pointer",
                !account.isConnected ? styles.disableButton : "",
              )}
            >
              Next
            </div>
          </div>
        )}
        {currentTabIndex === WelcomeTabIndex.CONNECTSOCIAL && (
          <div>
            <div className="w-full flex flex-col">
              <div
                onClick={handleClickXlink}
                className="w-full h-[100px] bg-[#302D2E] mb-[20px] rounded-[12px] flex items-center justify-center text-[20px] font-[500] hover:cursor-pointer"
              >
                <IconTwitter className="w-[60px] h-[60px] rounded mr-[20px]" />
                Follow @Vizing_L2 on X
              </div>
              <div
                onClick={handleClickDiscordlink}
                className="w-full h-[100px] bg-[#302D2E] mb-[20px] rounded-[12px] flex items-center justify-center text-[20px] font-[500] hover:cursor-pointer"
              >
                <IconDiscord className="w-[60px] h-[60px] rounded mr-[20px]" />
                Join Discord
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div
                onClick={() => handlePeriodChange(WelcomeTabIndex.CONNECTWALLET)}
                className="h-[56px] flex items-center justify-center mr-[20px] bg-[rgba(255,255,255,0.8)] text-black rounded-[12px] text-[20px] font-bold hover:cursor-pointer w-1/2"
              >
                Previous
              </div>
              <div
                onClick={() => handlePeriodChange(WelcomeTabIndex.INVITECODE)}
                className="h-[56px] flex items-center justify-center bg-[#FF486D] text-white rounded-[12px] text-[20px] font-bold hover:cursor-pointer w-1/2"
              >
                Next
              </div>
            </div>
          </div>
        )}
        {currentTabIndex === WelcomeTabIndex.INVITECODE && (
          <div>
            <div className="w-full bg-[#302D2E] mb-[20px] rounded-[12px] flex items-center justify-center text-[30px]">
              <AuthCode
                containerClassName={styles.authCodeContainer}
                inputClassName={styles.authCodeInput}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full flex justify-between">
              <div
                onClick={() => handlePeriodChange(WelcomeTabIndex.CONNECTSOCIAL)}
                className="h-[56px] flex items-center justify-center mr-[20px] bg-[rgba(255,255,255,0.8)] text-black rounded-[12px] text-[20px] font-bold hover:cursor-pointer w-1/2"
              >
                Previous
              </div>
              <div
                onClick={enterTravelActivity}
                className="h-[56px] flex items-center justify-center bg-[#FF486D] text-white rounded-[12px] text-[20px] font-bold hover:cursor-pointer w-1/2"
              >
                Dive into Vizing
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
