"use client";

import { clsx } from "clsx";
import styles from "./style.module.css";
import React, { useMemo, useState } from "react";
// import WelcomePeriod from "@/app/boundless-travel/component/WelcomePeriod/index";
import ExploreVizing from "@/app/boundless-travel/component/ExploreVizing/index";
import VPass from "@/app/boundless-travel/component/VPass/index";
// import TempComponent from "../TempCompoent";
// assets
import IconDropsown from "@/assets/images/icon/dropdown.svg";

enum SidebarItem {
  EXPLOREVIZING = "exploreVizing",
  VPASS = "vPass",
  BOUNDLESSTRAVEL = "boundlessTravel",
  BRIDGETRAVEL = "bridgeTravel",
  DEFITRAVEL = "defiTravel",
  GAMINGTRAVEL = "gamingTravel",
  NFTTRAVEL = "nftTravel",
  UNLOCKTICKETNNFT = "unlockTicketNft",
}

export default function BoundlessTravelContent() {
  const [currentSidebarItem, setCurrentSidebarItem] = useState(SidebarItem.EXPLOREVIZING);

  const sidebarList = useMemo(() => {
    return [
      {
        id: SidebarItem.EXPLOREVIZING,
        text: "Explore Vizing",
        children: [],
      },
      {
        id: SidebarItem.VPASS,
        text: "V Pass",
        children: [],
      },
      // {
      //   id: SidebarItem.BOUNDLESSTRAVEL,
      //   text: "Boundless Travel",
      //   children: [
      //     {
      //       id: SidebarItem.BRIDGETRAVEL,
      //       text: "Bridge Travel",
      //       children: [],
      //     },
      //     {
      //       id: SidebarItem.DEFITRAVEL,
      //       text: "DeFi Travel",
      //       children: [],
      //     },
      //     {
      //       id: SidebarItem.GAMINGTRAVEL,
      //       text: "Gaming Travel",
      //       children: [],
      //     },
      //     {
      //       id: SidebarItem.NFTTRAVEL,
      //       text: "NFT Travel",
      //       children: [],
      //     },
      //   ],
      // },
      // {
      //   id: SidebarItem.UNLOCKTICKETNNFT,
      //   text: "Unlock Ticket NFT",
      //   children: [],
      // },
    ];
  }, []);

  const handleSidebarItemClick = (sidebarItem: SidebarItem) => {
    setCurrentSidebarItem(sidebarItem);
  };

  return (
    <div className="w-full mt-[64px]">
      {/* <WelcomePeriod /> */}
      {/* <TempComponent /> */}
      <div className="relative w-full pl-[272px]">
        <div className="w-[181px] px-[16px] py-[32px] absolute top-0 left-0 border-[1px] border-[rgba(255,255,255,0.2)] rounded-[16px] bg-[rgba(255,255,255,0.06)]">
          {sidebarList.map((sidebarItem) => {
            return (
              <div
                className={clsx(
                  "flex items-center mb-[24px] text-[rgba(255,255,255,0.6)] hover:cursor-pointer last:mb-[0]",
                  currentSidebarItem === sidebarItem.id ? styles.selectedSidebarItem : "",
                )}
                key={sidebarItem.id}
                onClick={() => {
                  handleSidebarItemClick(sidebarItem.id);
                }}
              >
                {sidebarItem.text}
                {sidebarItem.children.length > 0 && <IconDropsown className="w-[16px] h-[16px]" />}
              </div>
            );
          })}
        </div>
        {currentSidebarItem === SidebarItem.EXPLOREVIZING && <ExploreVizing />}
        {currentSidebarItem === SidebarItem.VPASS && <VPass />}
      </div>
    </div>
  );
}
