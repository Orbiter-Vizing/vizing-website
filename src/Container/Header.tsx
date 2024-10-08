"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Logo from "@/assets/images/footerLogo.svg";
import { cn } from "@/lib/utils";
import styles from "./header.style.module.css";
import { useTranslation } from "@/hooks/i18n/server/useTranslation";
import headerX from "images/headerX.svg";
import headerMedium from "images/headerMedium.svg";
import headerDisc from "images/headerDisc.svg";
import { externalURLs } from "@/utils/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PopoverComponent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
// assets
import IconCaretUp from "@/assets/images/icon/caret-up.svg";
import IconCaretDown from "@/assets/images/icon/caret-down.svg";
import IconLogout from "@/assets/images/icon/logout.svg";
import IconLink from "@/assets/images/icon/link.svg";

export enum HeaderItemType {
  INTERNALLINK = "internalLink",
  EXTERNALLINK = "externalLink",
  CATEGORY = "category",
}

interface HeaderItem {
  type: HeaderItemType;
  text: string;
  jumpLink: string;
  isCurrentSite?: boolean;
  children?: HeaderItem[];
}

function openLink(url: string | undefined, currentSitePath?: string) {
  window.open(url);
}

const Header = ({ lang }: ConLangParams) => {
  const pathname = usePathname();
  const [t, setT] = useState<Function | null>(null);
  const [showSelectPanel, setShowSelectPanel] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const LoadTranslation = async () => {
      const { t } = await useTranslation(lang);
      setT(() => t);
    };
    LoadTranslation();
  }, [lang]);
  const anchorRef = useRef(null);

  const handleOpenChange = useCallback((isShowSelectPanel: boolean) => {
    console.log("isShowSelectPanel", isShowSelectPanel);
    setShowSelectPanel(isShowSelectPanel);
  }, []);

  const renderHeaderItem = (item: HeaderItem) => {
    switch (item.type) {
      case HeaderItemType.INTERNALLINK:
        return <Link href={item.jumpLink}>{item.text}</Link>;
        break;
      case HeaderItemType.EXTERNALLINK:
        return <span onClick={() => openLink(item.jumpLink)}>{item.text}</span>;
        break;
      case HeaderItemType.CATEGORY:
        return (
          <PopoverComponent trigger={item.text}>
            <div className="px-[24px] py-[16px]">
              {item.children?.map((item) => {
                return (
                  <span
                    className="text-gray-100 my-[8px] cursor-pointer hover:text-white"
                    key={item.text}
                    onClick={() => openLink(item.jumpLink)}
                  >
                    {item.text}
                  </span>
                );
              })}
            </div>
          </PopoverComponent>
        );
        break;
      default:
        break;
    }
  };

  const arr: HeaderItem[] = useMemo(() => {
    return [
      {
        type: HeaderItemType.INTERNALLINK,
        text: "Home",
        jumpLink: "/",
        isCurrentSite: true,
      },
      {
        type: HeaderItemType.INTERNALLINK,
        text: "Boundless Travel",
        jumpLink: "/boundless-travel",
        isCurrentSite: true,
      },
      {
        type: HeaderItemType.EXTERNALLINK,
        text: "Bridge",
        isCurrentSite: false,
        jumpLink: externalURLs.bridge,
      },
      {
        type: HeaderItemType.CATEGORY,
        text: "Developer",
        jumpLink: "",
        children: [
          {
            type: HeaderItemType.EXTERNALLINK,
            text: "Developer Docs",
            jumpLink: "",
            isCurrentSite: false,
          },
          {
            type: HeaderItemType.EXTERNALLINK,
            text: "Explorer",
            jumpLink: "",
            isCurrentSite: false,
          },
          {
            type: HeaderItemType.EXTERNALLINK,
            text: "Vizingscan",
            jumpLink: "",
            isCurrentSite: false,
          },
        ],
      },
      {
        type: HeaderItemType.INTERNALLINK,
        text: "Ecosystem",
        jumpLink: "/ecosystem",
        isCurrentSite: true,
      },
      {
        type: HeaderItemType.CATEGORY,
        text: "Communit",
        jumpLink: "",
        children: [
          {
            type: HeaderItemType.EXTERNALLINK,
            text: "Blog",
            jumpLink: "",
            isCurrentSite: false,
          },
          {
            type: HeaderItemType.EXTERNALLINK,
            text: "Brand Kit",
            jumpLink: "",
            isCurrentSite: false,
          },
          {
            type: HeaderItemType.EXTERNALLINK,
            text: "Twitter",
            jumpLink: "",
            isCurrentSite: false,
          },
        ],
      },
    ];
  }, []);

  const accountTriggerButton = () => {
    return (
      <div className="flex flex-row items-center py-[12px] px-[16px] justify-between bg-[rgba(255,255,255,0.1)] rounded-[12px]">
        <span className="inline-block w-[24px] h-[24px] mr-[8px] bg-[rgba(255,255,255,0.1)] rounded-full"></span>
        <p className="inline-block text-white text-base font-semibold mr-[8px]">0x23c234..8hyg</p>
        <span className="inline-block">⬇️</span>
      </div>
    );
  };

  return (
    <header className={"h-20 flex items-center justify-between header-center relative z-[999999]"}>
      <Logo className={"h-10 w-auto cursor-pointer"} />
      <ul
        className={
          "text-[16px] gap-16 font-[400] text-[#fff]/80 lg:flex flex flex-row items-center"
        }
      >
        {arr.map((item, index) => {
          return (
            <li
              key={index}
              className={cn(
                "relative cursor-pointer",
                pathname === item.jumpLink ? styles.textSelected : "",
              )}
            >
              {renderHeaderItem(item)}
            </li>
          );
        })}
      </ul>
      <div>
        <PopoverComponent trigger={accountTriggerButton()}>
          <div className="w-[380px] h-[230px] p-[24px]">
            <div className="flex items-center mb-[20px]">
              <div className="w-[44px] h-[44px] bg-white rounded-full mr-[16px]"></div>
              <div className="flex flex-col text-white flex-1">
                <div className="mb-[8px]">0x23c234..8hyg</div>
                <div>V Pass</div>
              </div>
              <div className="flex">
                <IconLink className="h-[32px] w-[32px] mr-[14px]" />
                <IconLogout className="h-[32px] w-[32px]" />
              </div>
            </div>
            <div className="w-full h-[112px] bg-[#302D2E] p-[16px] flex flex-col justify-between rounded-[12px]">
              <div className="text-white text-[14px] font-[500] opacity-60 rounded-md">
                2/21 Tickets
              </div>
              <div className="text-white text-[14px] opacity-60 rounded-md">to earn big prize</div>
              <div className="bg-[#595758] w-full h-[20px] rounded-[4px]">
                <div className="bg-[#FF486D] h-full w-[60px] rounded-[4px]"></div>
              </div>
            </div>
          </div>
        </PopoverComponent>
      </div>
      {/* <div className="flex">
        {iconList.map((item, index) => (
          <div key={index} className="ml-[20px] cursor-pointer" onClick={() => openLink(item.jumpLink)}>
            <item.icon />
          </div>
        ))}
      </div> */}
    </header>
  );
};

export default Header;
