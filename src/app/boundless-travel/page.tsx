"use client";

import React from "react";
import WelcomePeriod from "@/app/boundless-travel/component/WelcomePeriod/index";
import BoundlessTravelContent from "@/app/boundless-travel/component/Travel/index";
// atom
import { useAtom } from "jotai";
import { combinedTravelInfoAtom } from "@/atoms/accountAtom";
// assets
import TravelBgPattern from "@/assets/images/boundless-travel/travel-bg-pattern.svg";

export default function BoundlessTravel() {
  const [combindedTravelInfo, setCombindedTravelInfo] = useAtom(combinedTravelInfoAtom);

  return (
    <div className="relative w-full mt-[64px]">
      <TravelBgPattern className="absolute z-1 top-[-616px] left-[-70px]" />
      <div className="relative z-2">
        {combindedTravelInfo.isWelcomeViewed ? <BoundlessTravelContent /> : <WelcomePeriod />}
      </div>
    </div>
  );
}
