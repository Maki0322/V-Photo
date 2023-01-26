import { atom } from "recoil";
import { FlickrApiType } from "../types/FlickrApi";
import { currentGetPhotosState } from "./currentGetPhotosState";

export const filterPhotosState = atom<FlickrApiType[]>({
  key: "filterPhotosState",
  default: currentGetPhotosState,
  });