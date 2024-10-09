"use client";
import React, { useMemo, useState } from "react";
import { clsx } from "clsx";
import Image from "next/image";

import styles from "./style.module.css";
import { externalURLs } from "@/utils/constant";
import { activityList } from "./data";
import { getCurrentEnvChainConfig } from "@/utils/chainConfig";
// assets
import IconSocialLinkArrow from "@/assets/images/icon/social-link-arrow.svg";
import ImgPassport from "@/assets/images/boundless-travel/nft-passport.png";
import ImgReferral from "@/assets/images/boundless-travel/referral.png";
import IconTwitterWhite from "@/assets/images/social-media/twitter-white.svg";
import IconCopy from "@/assets/images/icon/copy.svg";

export default function VPass() {
  const [isMint, setIsMint] = useState(false);
  const [inviteLink, setInviteLink] = useState("http://vizing.com/boundless-travel?9778");
  const [selectedChain, setSelectedChain] = useState<string>();
  const passportId = 9527;

  const copyInviteLink = async () => {
    if (!inviteLink) {
      return;
    }
    try {
      await navigator.clipboard.writeText(inviteLink);
      // TODO: cppy success toast
      // setsnackbarOpen(true);
    } catch (err) {
      console.error("copy clipboard failed:", err);
    }
  };

  const currentEnvChainConfig = useMemo(() => {
    return getCurrentEnvChainConfig();
  }, []);

  const handleSelectChain = (chainId: string) => {
    setSelectedChain(chainId);
  };

  return (
    <div className="w-full text-white">
      <h1 className="mb-[56px] text-white text-[48px] font-medium">V Pass</h1>
      <div className="flex flex-col p-[44px] border border-[1px] border-[rgba(255,255,255,0.12)] rounded-[24px] bg-[#232021]">
        <div className="flex justify-center mb-[40px]">
          <Image
            className="h-[250px] w-[250px] mr-[97px]"
            src={ImgPassport}
            alt="boundless-travel-passport"
          />
          <div className="flex flex-col">
            <div className="mb-[16px]">{isMint ? `ID: ${passportId}` : "Select Networks"}</div>
            <div className="w-[290px] h-[94px] flex flex-wrap items-between justify-start pl-[13px] py-[9px] mb-[19px] rounded-[12px] bg-[rgba(145,114,120,0.24)]">
              {currentEnvChainConfig.map((chain) => {
                return (
                  <div
                    className={clsx(
                      "relative mr-[14px] mb-[14px] rounded-full border-[1px] border-transparent hover:cursor-pointer duration-300",
                      selectedChain === chain.id ? styles.selectedChain : "",
                    )}
                    key={chain.id}
                    onClick={() => handleSelectChain(chain.id)}
                  >
                    {/* TODO: check chain balance and add mask */}
                    {/* <div className="absolute top-0 left-0 h-full w-full rounded-full bg-[rgba(255,72,109,0.3)]"></div> */}
                    <Image className="h-[30px] w-[30px]" src={chain.IconUrl} alt="chain-icon" />
                  </div>
                );
              })}
            </div>
            <div className="text-[16px] font-[400] mb-[10px]">
              <span className="text-white">Price：</span>
              <span className="text-[rgba(255,255,255,0.6)]">0.001ETH</span>
            </div>
            <div className="relative h-[56px] w-[262px] flex justify-center items-center text-[20px] font-[700] text-white bg-[#FF486D] rounded-[12px]">
              Mint
              <div className="absolute right-[6px] top-[6px] h-[44px] w-[44px] flex flex-col items-center justify-center rounded-[12px] text-[#FF486D] text-[14px] font-[600] bg-white">
                <span>50%</span>
                <span>OFF</span>
              </div>
            </div>
          </div>
        </div>
        <p className="mb-[24px] text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          Share to Earn：For every successful referral that results in a mint, you will receive a
          rebate of 0.0005 ETH.
        </p>
        <p className="mb-[24px] text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          The Passport SBT is a non-transferable NFT card pack that records all your travel traces
          in Vizing. It serves as a symbol of your status as an early participant.
        </p>
        <p className="mb-[24px] text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          Let&apos;s expand the Vizing ecosystem together by collecting commemorative stamps!
        </p>
      </div>
      <h1 className="mt-[88px] mb-[56px] text-white text-[48px] font-medium">Referral NFTs</h1>
      <div className="flex flex-col p-[44px] border border-[1px] border-[rgba(255,255,255,0.12)] rounded-[24px] bg-[#232021]">
        <div className="flex mb-[40px]">
          <Image className="h-[166px] w-[178px] mr-[54px]" src={ImgReferral} alt="referral-image" />
          <div className="flex flex-col">
            <div className="text-[16px] font-[400] mb-[10px] leading-[30px]">
              <span className="text-white">Amount：</span>
              <span className="text-[rgba(255,255,255,0.6)]">7</span>
            </div>
            <div className="text-[16px] font-[400] mb-[34px] leading-[30px]">
              <span className="text-white">Successfully invited：</span>
              <span className="text-[rgba(255,255,255,0.6)]">3</span>
              <span className="w-[75px] h-[40px] inline-flex items-center justify-center ml-[44px] border-[1px] border-[rgba(242,63,93,0.3)] text-[16px] font-[500] rounded-[12px] bg-[rgba(242,63,93,0.1)]">
                Claim
              </span>
            </div>
            <div className="flex">
              {/* <div className="relative h-[56px] flex justify-center items-center mr-[18px] text-[20px] font-[700] text-white bg-[#FF486D] rounded-[12px]">
                Share &gt;&gt;
                <div className="absolute right-[6px] top-[6px] h-[44px] w-[44px] flex flex-col items-center justify-center rounded-[12px] text-[#FF486D] text-[14px] font-[600] bg-white">
                  <span>Earn</span>
                  <span>50%</span>
                </div>
              </div> */}
              <div className="h-[56px] flex items-center justify-between pl-[10px] mr-[10px] rounded-[12px] bg-[rgba(255,72,109,0.5)]">
                <p className="w-[260px] truncate">{inviteLink}</p>
                <div
                  onClick={copyInviteLink}
                  className="h-[56px] w-[56px] flex items-center justify-center rounded-[12px] bg-[#FF486D] hover:cursor-pointer"
                >
                  <IconCopy className="h-[30px] w-[30px]" />
                </div>
              </div>
              <div className="h-[56px] w-[56px] flex items-center justify-center mr-[10px] rounded-[12px] bg-[rgba(255,72,109,0.5)]">
                <IconTwitterWhite className="h-[23px] w-[27px]" />
              </div>
            </div>
          </div>
        </div>
        <p className="mb-[24px] text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          Share your invite code or Twitter post with friends. When a friend successfully mints a
          passport and completes any Boundless Travel Renew task, they&apos;ll be considered a
          successfully activated referral. As the referrer, you&apos;ll earn a reward.
        </p>
        <p className="mb-[24px] text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          For each successfully referred user, you&apos;ll receive an Invite Commemorative Stamp as
          a reward.
        </p>
      </div>
      <div className="flex flex-wrap justify-between mt-[20px]">
        {activityList.map((protocolActivity) => {
          return (
            <div
              className={clsx(
                "h-[186px] w-[calc(50%-10px)] mb-[20px] py-[34px] pl-[44px] bg-[#232021] border-[1px] border-white012 rounded-[24px]",
                styles.protocolActivityWrap,
              )}
              key={protocolActivity.protocolName}
            >
              {protocolActivity.protocolName}
              <div className="flex mt-[24px]">
                {protocolActivity.activityList.map((activity) => {
                  return (
                    <div className="mr-[14px]" key={activity.activityName}>
                      <Image
                        className="h-[70px] w-[70px]"
                        src={activity.activityIcon}
                        alt="activity-icon"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
