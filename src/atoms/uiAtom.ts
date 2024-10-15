// src/atoms/counterAtom.ts
import { atom } from "jotai";

import { HeaderItemKey } from "@/Container/Header";

export const currentHeaderTab = atom<HeaderItemKey>();
