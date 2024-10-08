"use client";
import { clsx } from "clsx";
import styles from "./style.module.css";
import React, { useMemo, useState } from "react";
import AuthCode from "react-auth-code-input";
// assets
import IconNextArrow from "@/assets/images/icon/arrow-right.svg";
import IconWalletconnect from "@/assets/images/wallets/walletconnect.svg";
import IconMetamask from "@/assets/images/wallets/metamask.svg";
import IconOkxWallet from "@/assets/images/wallets/okx.svg";
import IconTwitter from "@/assets/images/social-media/twitter.svg";
import IconDiscord from "@/assets/images/social-media/discord.svg";

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

  return (
    <div className="w-full">
      <div className="flex justify-center text-[48px] text-white font-semibold mb-[54px] mt-[64px]">
        Welcome to Vizing
      </div>
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
            <div className="w-full h-[100px] bg-[#302D2E] pl-[287px] mb-[20px] rounded-[12px] flex items-center justify-start text-[20px]">
              <IconMetamask className="w-[60px] h-[60px] rounded mr-[20px]" />
              Metamask
            </div>
            <div className="w-full h-[100px] bg-[#302D2E] pl-[287px] mb-[20px] rounded-[12px] flex items-center justify-start text-[20px]">
              <IconOkxWallet className="w-[60px] h-[60px] rounded mr-[20px]" />
              OKX Wallet
            </div>
            <div className="w-full h-[100px] bg-[#302D2E] pl-[287px] mb-[20px] rounded-[12px] flex items-center justify-start text-[20px]">
              <IconWalletconnect className="w-[60px] h-[60px] rounded mr-[20px]" />
              Wallet Connect
            </div>
            <div
              onClick={() => handlePeriodChange(WelcomeTabIndex.CONNECTSOCIAL)}
              className="w-full h-[56px] flex items-center justify-center w-full bg-[#FF486D] text-white rounded-[12px] text-[20px] font-bold hover:cursor-pointer"
            >
              Next
            </div>
          </div>
        )}
        {currentTabIndex === WelcomeTabIndex.CONNECTSOCIAL && (
          <div>
            <div className="w-full flex flex-col">
              <div className="w-full h-[100px] bg-[#302D2E] mb-[20px] rounded-[12px] flex items-center justify-center text-[20px]">
                <IconTwitter className="w-[60px] h-[60px] rounded mr-[20px]" />
                Follow @Vizing_L2 on X
              </div>
              <div className="w-full h-[100px] bg-[#302D2E] mb-[20px] rounded-[12px] flex items-center justify-center text-[20px]">
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
                // onClick={() => handlePeriodChange(WelcomeTabs.INVITECODE)}
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
