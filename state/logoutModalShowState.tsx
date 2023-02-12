import { atom } from "recoil";

export const logoutModalShowState = atom<boolean>({
  key: "logoutModalShowState",
  default: false,
})