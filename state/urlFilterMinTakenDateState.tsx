import { atom } from "recoil";

export const urlFilterMinTakenDateState = atom<string>({
  key: "urlFilterMinTakenDateState",
  default: "",
  });