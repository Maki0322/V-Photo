import { User } from "firebase/auth";
import { atom } from "recoil";

type UserState = User | null;

export const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});