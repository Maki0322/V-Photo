import { atom } from "recoil";

type Profile = {
  userName: string,
  userBirthday: string,
}

export const profileState = atom<Profile>({
  key: "profileState",
  default: {
    userName: "なまえ",
    userBirthday:"よろしく。",
  },
})