import { atom } from "recoil";

export const dayFilterState = atom<string>({
  key: "dayFilterState",
  default: "すべて",
  });