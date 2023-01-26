import { atom } from "recoil";

export const urlFilterMinUploadDateState = atom<string>({
  key: "urlFilterMinUploadDateState",
  default: "",
  });