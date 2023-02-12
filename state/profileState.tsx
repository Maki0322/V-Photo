import { atom } from "recoil";
import { ProfileType } from "../types/ProfileType";

export const profileState = atom<ProfileType>({
  key: "profileState",
  default: {
    userName: "なまえ",
    userMemo: "",
    userPickUpPhoto: "",
    userPickUpDescription: "",
  },
})