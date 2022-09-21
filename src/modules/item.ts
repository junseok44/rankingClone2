import { produce } from "immer";

interface TinitialState {
  S: string[];
  A: string[];
  B: string[];
  C: string[];
  D: string[];
  ITEM: string[];
}

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
const initialState: TinitialState = {
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
};

// const initialState1 = [
//   {
//     rank: Rankenum.S,
//     bgColor: "#ff7675",
//     array: ["#0984e3", "#ffeaa7", "black", "#a29bfe"],
//   },
//   {
//     rank: Rankenum.,
//     bgColor: "#ff7675",
//     array: ["#0984e3", "#ffeaa7", "black", "#a29bfe"],
//   },
// ];

export const itemReducer = (state = initialState, action: Taction) => {
  const { sourceDropId, destDropId, sourceIndex, destIndex } = action;
  switch (action.type) {
    case MOVE_SINGLELINE: {
      // 여기서 해야할일은. state의 [dropid] 를 받아서. 거기 index를 하나 제거하고
      // 같은 droppid의 index에다가 밀어넣는것.
      if (sourceIndex === destIndex) return state;
      return produce(state, (draft) => {
        const moveItem = draft[sourceDropId][sourceIndex];
        draft[sourceDropId].splice(sourceIndex, 1);
        draft[sourceDropId].splice(destIndex, 0, moveItem);
      });
    }
    case MOVE_CROSSLINE: {
      return produce(state, (draft) => {
        const moveItem = draft[sourceDropId][sourceIndex];
        draft[sourceDropId].splice(sourceIndex, 1);
        draft[destDropId].splice(destIndex, 0, moveItem);
      });
    }
    default: {
      return state;
    }
  }
};

export default MOVE_CROSSLINE;
