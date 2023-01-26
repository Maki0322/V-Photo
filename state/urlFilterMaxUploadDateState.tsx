import { atom } from "recoil";

export const urlFilterMaxUploadDateState = atom<string>({
  key: "urlFilterMaxUploadDateState",
  default: "",
  });