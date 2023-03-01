import { atom } from "recoil";
import { FavoritePhotosType } from "../types/FavoritePhotosType";


export const favoritePhotosState = atom<FavoritePhotosType[]>({
  key: "favoritePhotosState",
  default: [],
  });