import { produce } from "immer";

interface TinitialState {
  S: string[];
  A: string[];
  B: string[];
  C: string[];
  D: string[];
  ITEM: string[];
}

interface rankObj {
  rank: Rankenum;
  bgColor: string;
  item: string[];
}
type TinitialState1 = rankObj[];

interface Taction {
  type: string;
  sourceDropId: Rankenum;
  destDropId: Rankenum;
  sourceIndex: number;
  destIndex: number;
}

export enum Rankenum {
  "S" = "S",
  "A" = "A",
  "B" = "B",
  "C" = "C",
  "D" = "D",
  "ITEM" = "ITEM",
}

const MOVE_SINGLELINE = "item/move/singleLine";
const MOVE_CROSSLINE = "item/move/crossLine";

export const moveSingleLine = (
  sourceDropId: string,
  sourceIndex: number,
  destIndex: number
) => ({
  type: MOVE_SINGLELINE,
  sourceDropId,
  sourceIndex,
  destIndex,
});
export const moveCrossLine = (
  sourceDropId: string,
  destDropId: string,
  sourceIndex: number,
  destIndex: number
) => ({
  type: MOVE_CROSSLINE,
  sourceDropId,
  destDropId,
  sourceIndex,
  destIndex,
});

// const initialState: TinitialState = {
//   S: ["#0984e3", "#ffeaa7", "black", "#a29bfe"],
//   A: [],
//   B: [],
//   C: [],
//   D: [],
// ITEM: [
//   "red",
//   "orange",
//   "purple",
//   "pink",
//   "#9b59b6",
//   "#fab1a0",
//   "#00b894",
//   "#2d3436",
// ],
// };

const initialState1: TinitialState1 = [
  {
    rank: Rankenum.S,
    bgColor: "#ff7675",
    item: ["#0984e3", "#ffeaa7", "black", "#a29bfe"],
  },
  {
    rank: Rankenum.A,
    bgColor: "#fdcb6e",
    item: [],
  },
  {
    rank: Rankenum.B,
    bgColor: "#81ecec",
    item: [],
  },
  {
    rank: Rankenum.C,
    bgColor: "#a29bfe",
    item: [],
  },
  {
    rank: Rankenum.D,
    bgColor: "#636e72",
    item: [],
  },
  {
    rank: Rankenum.ITEM,
    bgColor: "#636e72",
    item: [
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
];

export const itemReducer = (state = initialState1, action: Taction) => {
  const { sourceDropId, destDropId, sourceIndex, destIndex } = action;
  switch (action.type) {
    case MOVE_SINGLELINE: {
      // 여기서 해야할일은. state의 [dropid] 를 받아서. 거기 index를 하나 제거하고
      // 같은 droppid의 index에다가 밀어넣는것.
      if (sourceIndex === destIndex) return state;
      return produce(state, (draft) => {
        const moveObj = draft.find((item) => item.rank === sourceDropId);
        if (!moveObj) return;
        const moveItem = moveObj.item[sourceIndex];
        moveObj.item.splice(sourceIndex, 1);
        moveObj.item.splice(destIndex, 0, moveItem);
      });
    }
    case MOVE_CROSSLINE: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default MOVE_CROSSLINE;
