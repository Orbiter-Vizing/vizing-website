"use client";

import React, { useCallback } from "react";
import { sendGAEvent } from "@next/third-parties/google";

export default function useGoogleEvent() {
  const sendGoogleEvent = useCallback(
    ({ event, value }: { event: string; value: string | Record<string, string> }) => {
      const payload = typeof value === "object" ? { ...value } : { value };
      sendGAEvent("event", event, payload);
    },
    [],
  );

  return {
    sendGoogleEvent,
  };
}
