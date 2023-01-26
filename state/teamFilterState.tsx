import { atom } from "recoil";

export const teamFilterState = atom<string>({
  key: "teamFilterState",
  default: "すべて",
  });