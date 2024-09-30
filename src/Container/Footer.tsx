"use client";
import React from "react";
import Logo from "images/footerLogo.svg";
import BoxCenter from "@/components/BoxCenter";
import { externalURLs } from "@/utils/constant";

const Footer = () => {
  const arr = [
    {
      title: "Build",
      arr: [
        {
          title: "GitHub",
          url: externalURLs.github,
        },
        {
          title: "Documentation",
          url: externalURLs.developerDocs,
        },
        {
          title: "Testnet bridge",
          url: externalURLs.testNetBridge,
        },
        {
          title: "Testnet browser",
          url: externalURLs.testNetBrowser,
        },
      ],
    },
    {
      title: "Vizing Station",
      arr: [
        {
          title: "Status page",
          url: externalURLs.status,
        },
        {
          title: "Bridge",
          url: externalURLs.bridge,
        },
        {
          title: "Explorer",
          url: externalURLs.explorer,
        },
        {
          title: "VizingScan",
          url: externalURLs.vizingScan,
        },
      ],
    },
    {
      title: "Community",
      arr: [
        {
          title: "Discord",
          url: externalURLs.discord,
        },
        {
          title: "Twitter",
          url: externalURLs.twitter,
        },
        {
          title: "Medium",
          url: externalURLs.medium,
        },
        {
          title: "Telegram",
          url: externalURLs.telegram,
        },
      ],
    },
  ];
  return (
    <BoxCenter className="pb-[52px]">
      <div
        className={
          "flex gap-[10%] pb-16 border-b mb-[52px] border-[rgba(255,255,255,0.12)]"
        }
      >
        <div className={"hidden lg:block max-w-[125px] h-10 mr-[264px]"}>
          <Logo className={"h-full w-auto"} />
        </div>
        <div className={"flex-1 grid grid-cols-2 lg:grid-cols-3 px-4 lg:px-0"}>
          {arr.map(({ title, arr }, index) => (
            <div key={index}>
              <h3 className={"font-semibold text-lg mb-5"}>{title}</h3>
              <ul className={"text-[#666666]"}>
                {arr.map(({ title, url }, index) => (
                  <li
                    key={index}
                    className={"mb-5 last:mb-0 cursor-pointer"}
                    onClick={() => {
                      url && window.open(url);
                    }}
                  >
                    {title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="px-4 lg:px-0">Copyright © {new Date().getFullYear()} Vizing, Inc. All rights reserved.</p>
    </BoxCenter>
  );
};

export default Footer;
