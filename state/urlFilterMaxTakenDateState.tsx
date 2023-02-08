import { atom } from "recoil";

export const urlFilterMaxTakenDateState = atom<string>({
  key: "urlFilterMaxTakenDateState",
  default: "",
  });