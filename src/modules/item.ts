import { produce } from "immer";

interface rankObj {
  name: any;
  bgColor: string;
  item: string[];
  id: string;
}
type TinitialState1 = rankObj[];

interface Taction {
  type: string;
  sourceDropId: Rankenum;
  destDropId: Rankenum;
  sourceIndex: number;
  destIndex: number;
  droppableId: Rankenum;
  color: string;
  name: Rankenum;
  currentSettingRow: Rankenum;
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
const MOVE_RANKBAR_UP = "item/move/RankUp";
const MOVE_RANKBAR_DOWN = "item/move/RankDown";
const CHANGE_RANKBAR_COLOR = "rank/change/Color";
const CHANGE_RANKBAR_NAME = "rank/change/Name";

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

export const moveRankbarUp = (droppableId: Rankenum) => ({
  type: MOVE_RANKBAR_UP,
  droppableId,
});

export const moveRankbarDown = (droppableId: Rankenum) => ({
  type: MOVE_RANKBAR_DOWN,
  droppableId,
});

export const changeRankbarColor = (
  color: string,
  currentSettingRow: string | null
) => ({
  type: CHANGE_RANKBAR_COLOR,
  color,
  currentSettingRow,
});

export const changeRankbarName = (
  name: Rankenum,
  currentSettingRow: Rankenum
) => ({
  type: CHANGE_RANKBAR_NAME,
  name,
  currentSettingRow,
});

const initialState1: TinitialState1 = [
  {
    name: Rankenum.S,
    id: "6158222534814353",
    bgColor: "#FF6633",
    item: ["#0984e3", "#ffeaa7", "black", "#a29bfe"],
  },
  {
    name: Rankenum.A,
    id: "8040881574028147",
    bgColor: "#FFB399",
    item: [],
  },
  {
    name: Rankenum.B,
    id: "5214879317176004",
    bgColor: "#FF33FF",
    item: [],
  },
  {
    name: Rankenum.C,
    id: "8189987661048699",
    bgColor: "#FFFF99",
    item: [],
  },
  {
    name: Rankenum.D,
    id: "5335203244999249",
    bgColor: "#00B3E6",
    item: [],
  },
  {
    name: Rankenum.ITEM,
    bgColor: "#636e72",
    id: "5539690055555553",
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
        const moveObj = draft.find((item) => item.name === sourceDropId);
        if (!moveObj) return;
        const moveItem = moveObj.item[sourceIndex];
        moveObj.item.splice(sourceIndex, 1);
        moveObj.item.splice(destIndex, 0, moveItem);
      });
    }
    case MOVE_CROSSLINE: {
      return produce(state, (draft) => {
        const moveObj = draft.find((item) => item.name === sourceDropId);
        const destObj = draft.find((item) => item.name === destDropId);
        if (!moveObj) return;
        const moveItem = moveObj.item[sourceIndex];
        moveObj.item.splice(sourceIndex, 1);
        destObj?.item.splice(destIndex, 0, moveItem);
      });
    }
    case MOVE_RANKBAR_UP: {
      return produce(state, (draft) => {
        const moveObj = draft.find((obj) => obj.name === action.droppableId);
        if (!moveObj) return;
        const index = draft.indexOf(moveObj);
        if (index === 0) return;
        draft.splice(index, 1);
        draft.splice(index - 1, 0, moveObj);
      });
    }
    case MOVE_RANKBAR_DOWN: {
      return produce(state, (draft) => {
        const moveObj = draft.find((obj) => obj.name === action.droppableId);
        if (!moveObj) return;
        const index = draft.indexOf(moveObj);
        if (index === draft.length - 1) return;
        draft.splice(index, 1);
        draft.splice(index + 1, 0, moveObj);
      });
    }
    case CHANGE_RANKBAR_COLOR: {
      return produce(state, (draft) => {
        const obj1 = draft.find((obj) => obj.id === action.currentSettingRow);
        if (!obj1) return;
        obj1.bgColor = action.color;
      });
    }
    case CHANGE_RANKBAR_NAME: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default MOVE_CROSSLINE;
