import { atom } from "recoil";

export const logoutCompleteModalShowState = atom<boolean>({
  key: "logoutCompleteModalShowState",
  default: false,
})