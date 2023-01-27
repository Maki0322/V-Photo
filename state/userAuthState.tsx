import { atom } from "recoil";

export const userAuthState = atom<boolean>({
  key: "userAuthState",
  default: false,
})