import { atom } from "recoil";

export const imgSrcState = atom<string>({
  key: "imgSrcState",
  default: "",
  });

export const cropState = atom({
  key: "cropState",
  default: { x: 0, y: 0, width:100, height:100 },
  });

export const zoomState = atom<number>({
  key: "cropState",
  default: 1,
  });