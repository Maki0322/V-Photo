import { atom } from "recoil";

export const headerModalShowState = atom<boolean>({
  key: "headerModalShowState",
  default: false,
})