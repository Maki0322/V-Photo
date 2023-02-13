import { atom } from "recoil";

export const loginModalShowState = atom<boolean>({
  key: "loginModalShowState",
  default: false,
})