import { atom } from "recoil";

export const itemsPerPageState = atom({
  key: "itemsPerPageState",
  default: 100,
  });