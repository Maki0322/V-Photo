import { atom } from "recoil";
import { ProfileType } from "../types/ProfileType";
import { recoilPersist } from "recoil-persist";


const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: typeof window === "undefined" ? undefined : sessionStorage,
});

export const profileState = atom<ProfileType>({
  key: "profileState",
  default: {
    userName: "",
    userMemo: "",
    userPickUpPhoto: "",
    userPickUpDescription: "",
    userIcon: "",
  },
  effects_UNSTABLE: [persistAtom],
})