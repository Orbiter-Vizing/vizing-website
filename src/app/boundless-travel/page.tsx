"use client";

import { clsx } from "clsx";
import styles from "./style.module.css";
import React, { useMemo } from "react";
import WelcomePeriod from "@/app/boundless-travel/component/WelcomePeriod/index";
import ExploreVizing from "@/app/boundless-travel/component/ExploreVizing/index";
// assets

export default function BoundlessTravel() {
  return (
    <div className="w-full">
      {/* <WelcomePeriod /> */}
      <div className="relative w-full pl-[272px]">
        <div className="w-[181px] h-[456px] border rounded absolute top-0 left-0">sidebar</div>
        <ExploreVizing />
      </div>
    </div>
  );
}
