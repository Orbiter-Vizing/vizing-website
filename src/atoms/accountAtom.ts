// src/atoms/counterAtom.ts
import { atom, useAtomValue } from "jotai";

import { AccountTravelInfoRes } from "@/hooks/i18n/client/useAccountTravelInfo";
import { RequestUserLoginInfoOutput } from "@/api/boundlessTravel";

export const counterAtom = atom(0);

export const accountTravelInfoAtom = atom<RequestUserLoginInfoOutput | null>(null);

export const accountAddressAtom = atom<string | null>(null);

export const isWelcomeViewedAtom = atom(false);

export const combinedTravelInfoAtom = atom(
  (get) => ({
    travelInfo: get(accountTravelInfoAtom),
    isWelcomeViewed: get(isWelcomeViewedAtom),
  }),
  (get, set, newValue: { travelInfo: AccountTravelInfoRes | null; isWelcomeViewed: boolean }) => {
    set(accountTravelInfoAtom, newValue.travelInfo);
    set(isWelcomeViewedAtom, newValue.isWelcomeViewed);
  },
);

// const [combied, setCombined] = useAtom(combinedTravelInfoAtom)

// setCombined({});

export const emptyInvitedCode = "000000";
export const encodeEmptyInvitedCode = "0x303030303030";
// export const beInvitedAtom = atom(false);
export const beInvitedAtom = atom((get) => {
  const invitedCode = get(accountTravelInfoAtom)?.invitedCode;
  console.log("get inviteCode atom", invitedCode && invitedCode !== emptyInvitedCode);
  return invitedCode && invitedCode !== emptyInvitedCode;
});
