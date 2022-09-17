import { atom } from "recoil";

export const dataAtom = atom({
  key: "data",
  default: {
    S: ["#0984e3", "#ffeaa7", "black", "#a29bfe"],
    A: [],
    B: [],
    C: [],
    D: [],
    ITEM: [
      "red",
      "orange",
      "purple",
      "pink",
      "#9b59b6",
      "#fab1a0",
      "#00b894",
      "#2d3436",
    ],
  },
});
