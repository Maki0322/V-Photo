import { atom } from "recoil";
import { FavoritePhotosType } from "../components/atoms/icons/FavoriteIcon";

export const favoritePhotosState = atom<FavoritePhotosType[]>({
  key: "favoritePhotosState",
  default: [],
  });