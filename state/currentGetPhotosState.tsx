import { atom } from "recoil";
import { FlickrApiType } from "../types/FlickrApi";

export const currentGetPhotosState = atom<FlickrApiType[]>({
  key: "currentGetPhotosState",
  default: [],
  });