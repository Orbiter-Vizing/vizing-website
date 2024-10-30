"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import Logo from "@/assets/images/footerLogo.svg";
import { cn } from "@/lib/utils";
import styles from "./header.style.module.css";
import { useTranslation } from "@/hooks/i18n/server/useTranslation";
import { externalURLs } from "@/utils/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PopoverComponent } from "@/components/ui/popover";
import { useAccount } from "wagmi";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useDisconnect } from "wagmi";
// atom
import { useAtom } from "jotai";
import { accountAddressAtom, combinedTravelInfoAtom } from "@/atoms/accountAtom";
import { currentHeaderTab } from "@/atoms/uiAtom";
// assets
import IconCaretDown from "@/assets/images/icon/avatar-caret-down.svg";
import IconLogout from "@/assets/images/icon/logout.svg";
import IconLink from "@/assets/images/icon/link.svg";
import clsx from "clsx";

export enum HeaderItemType {
  INTERNALLINK = "internalLink",
  EXTERNALLINK = "externalLink",
  CATEGORY = "category",
}

export enum HeaderItemKey {
  HOME = "home",
  BOUNDLESSTRAVEL = "boundlessTravel",
  BRIDGE = "bridge",
  DEVELOPER = "developer",
  ECOSYSTEM = "ecosystem",
  COMMUNITY = "community",
}

interface HeaderItem {
  id: HeaderItemKey;
  type: HeaderItemType;
  text: string;
  jumpLink: string;
  isCurrentSite?: boolean;
  children?: Omit<HeaderItem, "id">[];
}

function openLink(url: string | undefined, currentSitePath?: string) {
  window.open(url);
}

const Header = ({ lang }: ConLangParams) => {
  const pathname = usePathname();
  const account = useAccount();
  const { disconnect } = useDisconnect();

  const [currentTab, setCurrentTab] = useAtom(currentHeaderTab);
  const [combindedTravelInfo, setCombindedTravelInfo] = useAtom(combinedTravelInfoAtom);
  const [t, setT] = useState<Function | null>(null);
  const [addressShortcut, setAddressShortcut] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const handleScanClick = () => {
    if (!account.address) {
      return;
    }
    window.open(`${externalURLs.scan}/address/${account.address}`);
  };

  const handleLogoutClick = () => {
    setCombindedTravelInfo({
      travelInfo: null,
      isWelcomeViewed: false,
    });
    console.log("handleLogoutClick");
    disconnect();
  };

  useEffect(() => {
    const LoadTranslation = async () => {
      const { t } = await useTranslation(lang);
      setT(() => t);
    };
    LoadTranslation();
  }, [lang]);

  useEffect(() => {
    const addressShortcut = getAccountShortcut(account.address);
    if (addressShortcut) {
      setAddressShortcut(addressShortcut);
    }
  }, [account]);

  const getAccountShortcut = (address: string | undefined) => {
    if (!address) {
      return;
    }
    const headLength = 8;
    const tailLength = 4;
    const head = address.slice(0, headLength);
    const tail = address.slice(address.length - tailLength, address.length);
    return `${head}...${tail}`;
  };

  const getTicketsProgress = () => {
    const userTickets = combindedTravelInfo.travelInfo?.tickets;
    const totalTickets = combindedTravelInfo.travelSettings?.totalTickets;
    if (!userTickets || !totalTickets) {
      return "0";
    }
    const progressPercentage = `${(userTickets / totalTickets) * 100}%`;
    return progressPercentage;
  };

  const headerItemArray: HeaderItem[] = useMemo(() => {
    return [
      {
        id: HeaderItemKey.HOME,
        type: HeaderItemType.INTERNALLINK,
        text: "Home",
        jumpLink: "/",
        isCurrentSite: true,
      },
      {
        id: HeaderItemKey.BOUNDLESSTRAVEL,
        type: HeaderItemType.INTERNALLINK,
        text: "Boundless Travel",
        jumpLink: "/boundless-travel",
        isCurrentSite: true,
      },
      {
        id: HeaderItemKey.BRIDGE,
        type: HeaderItemType.EXTERNALLINK,
        text: "Bridge",
        isCurrentSite: false,
        jumpLink: externalURLs.bridge,
      },
      {
        id: HeaderItemKey.DEVELOPER,
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
        id: HeaderItemKey.ECOSYSTEM,
        type: HeaderItemType.INTERNALLINK,
        text: "Ecosystem",
        jumpLink: "/ecosystem",
        isCurrentSite: true,
      },
      {
        id: HeaderItemKey.COMMUNITY,
        type: HeaderItemType.CATEGORY,
        text: "Community",
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

  const renderHeaderItem = (item: HeaderItem) => {
    switch (item.type) {
      case HeaderItemType.INTERNALLINK:
        return (
          <Link onClick={() => setCurrentTab(item.id)} href={item.jumpLink}>
            {item.text}
          </Link>
        );
        break;
      case HeaderItemType.EXTERNALLINK:
        return <span onClick={() => openLink(item.jumpLink)}>{item.text}</span>;
        break;
      case HeaderItemType.CATEGORY:
        return (
          <PopoverComponent trigger={item.text} sideOffset={20}>
            <div className="flex flex-col px-[24px] py-[16px]">
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

  const accountTriggerButton = () => {
    return (
      <div className="flex flex-row items-center py-[12px] px-[16px] justify-between bg-[rgba(255,255,255,0.1)] rounded-[12px]">
        <div className="inline-block w-[24px] h-[24px] mr-[8px] bg-[rgba(255,255,255,0.1)] rounded-full">
          {account.address && <Jazzicon diameter={24} seed={jsNumberForAddress(account.address)} />}
        </div>
        <p className="inline-block text-white text-[16px] font-[500] mr-[8px]">
          {getAccountShortcut(account.address)}
        </p>
        <span className="inline-block">
          <IconCaretDown className="w-[16px] h-[16px]" />
        </span>
      </div>
    );
  };

  useEffect(() => {
    setIsConnected(account.isConnected);
  }, [account.isConnected]);

  return (
    <header className="relative h-20 flex items-center justify-center z-[1]">
      <Logo className="absolute left-0 top-1/2 translate-y-[-50%] h-10 w-auto cursor-pointer" />
      <ul className="w-fit justify-center text-[16px] gap-[24px] font-[400] text-[#fff]/80 lg:flex flex flex-row items-center">
        {headerItemArray.map((item, index) => {
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
      <div className="absolute right-0 top-1/2 translate-y-[-50%]">
        {isConnected && (
          <PopoverComponent
            trigger={accountTriggerButton()}
            align="start"
            sideOffset={20}
            alignOffset={-112}
          >
            <div className="p-[24px]">
              <div className="flex items-center">
                <div className="w-[44px] h-[44px] bg-white rounded-full mr-[16px]">
                  {account.address && (
                    <Jazzicon diameter={44} seed={jsNumberForAddress(account.address)} />
                  )}
                </div>
                <div className="flex flex-col text-white flex-1 mr-[14px]">
                  <div className="text-[16px] font-[500]">{addressShortcut}</div>
                </div>
                {/* <div className="flex flex-col text-white flex-1">
                  <div className="text-[16px] font-[500] mb-[8px]">{addressShortcut}</div>
                  <div className="text-[14px] font-[400]">V Pass</div>
                </div> */}
                <div className="flex">
                  <IconLink
                    onClick={handleScanClick}
                    className="h-[32px] w-[32px] mr-[14px] hover:cursor-pointer"
                  />
                  <IconLogout
                    onClick={handleLogoutClick}
                    className="h-[32px] w-[32px] hover:cursor-pointer"
                  />
                </div>
              </div>
              {/* <div className="w-full h-[112px] bg-[#302D2E] p-[16px] flex flex-col justify-between rounded-[12px]">
                <div className="text-white text-[14(px] font-[500] opacity-60 rounded-md">
                  {combindedTravelInfo.travelInfo?.tickets}/
                  {combindedTravelInfo.travelSettings?.totalTickets} Tickets
                </div>
                <div className="text-white text-[14px] opacity-60 rounded-md">
                  to earn big prize
                </div>
                <div className="bg-[#595758] w-full h-[20px] rounded-[4px]">
                  <div
                    className={clsx("bg-[#FF486D] h-full w-[0px] rounded-[4px]")}
                    style={{ width: getTicketsProgress() }}
                  ></div>
                </div>
              </div> */}
            </div>
          </PopoverComponent>
        )}
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
