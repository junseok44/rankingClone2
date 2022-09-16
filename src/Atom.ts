import { atom } from "recoil";

export const dataAtom = atom({
  key: "data",
  default: {
    S: ["#0984e3", "#00b894", "#a29bfe"],
    A: ["#fab1a0", "#00b894", "#a29bfe", "black"],
    B: [],
    C: [],
    D: [],
    ITEM: ["red", "orange", "black", "purple", "pink"],
  },
});
