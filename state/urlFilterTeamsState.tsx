import { atom } from "recoil";

export const urlFilterTeamsState = atom<string>({
  key: "urlFilterTeamsState",
  default: "",
  });