"use client";

import { clsx } from "clsx";
import styles from "./style.module.css";
import React, { useMemo } from "react";
import WelcomePeriod from "@/app/boundless-travel/component/WelcomePeriod/index";
// assets

export default function BoundlessTravel() {
  return (
    <div className="w-full">
      <WelcomePeriod />
    </div>
  );
}
