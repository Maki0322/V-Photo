import { atom } from "recoil";

export const tourFilterState = atom<string>({
  key: "tourFilterState",
  default: "すべて",
  });