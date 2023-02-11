import { atom } from "recoil";
import { FavoritePhotosType } from "../components/FavoriteIcon";

export const favoritePhotosState = atom<FavoritePhotosType[]>({
  key: "favoritePhotosState",
  default: [],
  });