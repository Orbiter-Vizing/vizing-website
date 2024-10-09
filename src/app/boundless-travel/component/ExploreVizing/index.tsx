"use client";
import { clsx } from "clsx";
import styles from "./style.module.css";
import React, { useMemo } from "react";
import { externalURLs } from "@/utils/constant";
// assets
import IconSocialLinkArrow from "@/assets/images/icon/social-link-arrow.svg";

export default function ExploreVizing() {
  const socialMediaList = useMemo(() => {
    return [
      {
        title: "Follow on X",
        content:
          "Follow @Vizing_L2 on X to stay updated on our latest developments and project progress.",
        buttonText: "Follow on",
        link: externalURLs.twitter,
      },
      {
        title: "Retweet Announcement",
        content:
          "Retweet this announcement to spread the word and get more people involved in the event!",
        buttonText: "Retweet",
        link: externalURLs.twitter,
      },
      {
        title: "Join Discord",
        content: "Join our community, engage in discussions, and help us grow together!",
        buttonText: "Join",
        link: externalURLs.discord,
      },
    ];
  }, []);

  const handleClickLink = (link: string) => {
    window.open(link);
  };

  return (
    <div className="w-full">
      <h1 className="mb-[56px] text-white text-[48px] font-medium">Explore Vizing</h1>
      <div className="flex flex-col p-[44px] mb-[24px] border border-[1px] border-[rgba(255,255,255,0.12)] rounded-[24px] bg-[rgba(242,63,93,0.06)]">
        <p className="mb-[24px] text-[20px] text-white font-medium leading-[30px]">
          Vizing is a cross-chain interoperability environment based on advanced zk technology and
          enhanced with Rollup L2, developed by Orbiter Finance.
        </p>
        <p className="mb-[24px] text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          The passport SBT NFT will be the foundation for you to start your boundless travel and
          collect commemorative stamps. You must first obtain a passport.
        </p>
        <p className="text-[14px] text-[rgba(255,255,255,0.6)] font-[400] leading-[20px]">
          Each destination has its own commemorative stamp. You will receive the corresponding stamp
          after completing all the activities at a destination. We hope you enjoy this journey!
        </p>
      </div>
      <div className="flex space-x-[20px]">
        {socialMediaList.map((socialItem) => {
          return (
            <div
              key={socialItem.title}
              className="flex flex-1 flex-col p-[44px] rounded-[24px] border-[1px] border-[rgba(255,255,255,0.12)] bg-[rgba(242,63,93,0.06)]"
            >
              <h2 className="text-[16px] text-white font-[500] mb-[10px]">{socialItem.title}</h2>
              <p className="flex-1 text-[14px] text-[rgba(255,255,255,0.6)] font-[400] mb-[24px]">
                {socialItem.content}
              </p>
              <div className="inline-flex w-fit justify-center items-center p-[3px] pl-[12px] text-[14px] font-[500] text-black bg-white rounded-[8px]">
                {socialItem.buttonText}
                <IconSocialLinkArrow
                  onClick={() => handleClickLink(socialItem.link)}
                  className="h-[28px] w-[28px] ml-[10px] hover:cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
