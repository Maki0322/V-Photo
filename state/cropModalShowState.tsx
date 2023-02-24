import { atom } from "recoil";

export const cropModalShowState = atom<boolean>({
  key: "cropModalShowState",
  default: false,
})