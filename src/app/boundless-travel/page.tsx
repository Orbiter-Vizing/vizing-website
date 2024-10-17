"use client";

import React from "react";
import WelcomePeriod from "@/app/boundless-travel/component/WelcomePeriod/index";
import BoundlessTravelContent from "@/app/boundless-travel/component/Travel/index";
// atom
import { useAtom } from "jotai";
import { combinedTravelInfoAtom } from "@/atoms/accountAtom";

export default function BoundlessTravel() {
  const [combindedTravelInfo, setCombindedTravelInfo] = useAtom(combinedTravelInfoAtom);

  return (
    <div className="w-full mt-[64px]">
      {combindedTravelInfo.isWelcomeViewed ? <BoundlessTravelContent /> : <WelcomePeriod />}
    </div>
  );
}
