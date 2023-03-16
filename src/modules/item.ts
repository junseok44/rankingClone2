import { produce } from "immer";
import { v4 } from "uuid";
export interface rankObj {
  name: string;
  bgColor: string;
  item: string[];
  id: string;
}
type TinitialState1 = rankObj[];

interface Taction {
  type: string;
  sourceDropId: string;
  destDropId: string;
  sourceIndex: number;
  destIndex: number;
  droppableId: string;
  color: string;
  name: string;
  currentSettingRowId: string;
  direction: "up" | "down";
}

interface TactionWithIndex<T> extends Taction {
  index: T;
}

const RankNameArray = ["A", "B", "C", "D", "E", "ITEM"] as const;
type RankName = typeof RankNameArray[number];

const MOVE_SINGLELINE = "item/move/singleLine";
const MOVE_CROSSLINE = "item/move/crossLine";
const MOVE_RANKBAR_UP = "item/move/RankUp";
const MOVE_RANKBAR_DOWN = "item/move/RankDown";
const CHANGE_RANKBAR_COLOR = "rank/change/Color";
const CHANGE_RANKBAR_NAME = "rank/change/Name";
const DELETE_RANKBAR = "rank/delete";
const CLEAR_RANKBAR_ITEM = "rank/clear/item";
const CREATE_RANKBAR = "rank/create";
const MOVE_RANKBAR = "item/move/Rankbar";

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

export const moveRankbarUp = (droppableId: string) => ({
  type: MOVE_RANKBAR_UP,
  droppableId,
});

export const moveRankbarDown = (droppableId: string) => ({
  type: MOVE_RANKBAR_DOWN,
  droppableId,
});

export const changeRankbarColor = (
  color: string,
  currentSettingRowId: string | null
) => ({
  type: CHANGE_RANKBAR_COLOR,
  color,
  currentSettingRowId,
});

export const changeRankbarName = (
  name: string,
  currentSettingRowId: string | null
) => ({
  type: CHANGE_RANKBAR_NAME,
  name,
  currentSettingRowId,
});
export const deleteRankbar = (currentSettingRowId: string) => {
  return {
    type: DELETE_RANKBAR,
    currentSettingRowId,
  };
};
export const clearRankbarItem = (currentSettingRowId: string) => {
  return {
    type: CLEAR_RANKBAR_ITEM,
    currentSettingRowId,
  };
};
export const createRankbar = (index: number, direction: string) => ({
  type: CREATE_RANKBAR,
  index,
  direction,
});

export const moveRankbar = (sourceIndex: number, destIndex: number) => {
  return {
    type: MOVE_RANKBAR,
    sourceIndex,
    destIndex,
  };
};

const ReorderFunction = <T>(
  list: T[],
  sourceIndex: number,
  destIndex: number
): T[] => {
  const result = Array.from(list);
  const [moveItem] = result.splice(sourceIndex, 1);
  result.splice(destIndex, 0, moveItem);

  return result;
};

const initialState1: TinitialState1 = [
  {
    name: RankNameArray[0],
    id: v4(),
    bgColor: "#FF6633",
    item: [],
  },
  {
    name: RankNameArray[1],
    id: v4(),
    bgColor: "#FFB399",
    item: [],
  },
  {
    name: RankNameArray[2],
    id: v4(),
    bgColor: "#FF33FF",
    item: [],
  },
  {
    name: RankNameArray[3],
    id: v4(),
    bgColor: "#FFFF99",
    item: [],
  },
  {
    name: RankNameArray[4],
    id: v4(),
    bgColor: "#00B3E6",
    item: [],
  },
  {
    name: RankNameArray[5],
    bgColor: "#636e72",
    id: v4(),
    item: ["red"],
  },
];

const colorArray = [
  "#9b59b6",
  "#fab1a0",
  "red",
  "orange",
  "purple",
  "pink",
  "#00b894",
  "#2d3436",
  "#0984e3",
  "#ffeaa7",
  "black",
  "#a29bfe",
];

export const itemReducer = (
  state = initialState1,
  action: TactionWithIndex<number>
) => {
  const { sourceDropId, destDropId, sourceIndex, destIndex } = action;
  switch (action.type) {
    case MOVE_SINGLELINE: {
      const moveObj = state.find((item) => item.id === sourceDropId);
      if (sourceIndex === destIndex || !moveObj) return state;
      const index = state.findIndex((item) => item.id === moveObj.id);
      return produce(state, (draft) => {
        draft[index].item = ReorderFunction(
          moveObj.item,
          sourceIndex,
          destIndex
        );
      });
    }
    case MOVE_CROSSLINE: {
      return produce(state, (draft) => {
        const moveObj = draft.find((item) => item.id === sourceDropId);
        const destObj = draft.find((item) => item.id === destDropId);
        if (!moveObj) return;
        const [moveItem] = moveObj.item.splice(sourceIndex, 1);
        destObj?.item.splice(destIndex, 0, moveItem);
      });
    }
    case MOVE_RANKBAR_UP: {
      return produce(state, (draft) => {
        const moveObj = draft.find((obj) => obj.id === action.droppableId);
        if (!moveObj) return;
        const index = draft.indexOf(moveObj);
        if (index === 0) return;
        draft.splice(index, 1);
        draft.splice(index - 1, 0, moveObj);
      });
    }
    case MOVE_RANKBAR_DOWN: {
      return produce(state, (draft) => {
        const moveObj = draft.find((obj) => obj.id === action.droppableId);
        if (!moveObj) return;
        const index = draft.indexOf(moveObj);
        if (index === draft.length - 1) return;
        draft.splice(index, 1);
        draft.splice(index + 1, 0, moveObj);
      });
    }
    case CHANGE_RANKBAR_COLOR: {
      return produce(state, (draft) => {
        const obj1 = draft.find((obj) => obj.id === action.currentSettingRowId);
        if (!obj1) return;
        obj1.bgColor = action.color;
      });
    }
    case CHANGE_RANKBAR_NAME: {
      return produce(state, (draft) => {
        const obj1 = draft.find((obj) => obj.id === action.currentSettingRowId);
        if (!obj1) return;
        obj1.name = action.name;
      });
    }
    case DELETE_RANKBAR: {
      return produce(state, (draft) => {
        const index = draft.findIndex(
          (item) => item.id === action.currentSettingRowId
        );
        draft.splice(index, 1);
      });
    }
    case CLEAR_RANKBAR_ITEM: {
      return produce(state, (draft) => {
        const index = draft.findIndex(
          (item) => item.id === action.currentSettingRowId
        );
        draft[index].item = [];
      });
    }
    case CREATE_RANKBAR: {
      if (action.direction === "up") {
        return produce(state, (draft) => {
          const newRankBar: rankObj = {
            bgColor: "#b2bec3",
            id: Math.random().toString().substring(2, 16),
            item: [],
            name: "NEW",
          };
          draft.splice(action.index, 0, newRankBar);
        });
      } else if (action.direction === "down") {
        return produce(state, (draft) => {
          const newRankBar: rankObj = {
            bgColor: "#b2bec3",
            id: Math.random().toString().substring(2, 16),
            item: [],
            name: "NEW",
          };
          draft.splice(action.index + 1, 0, newRankBar);
        });
      } else {
        return state;
      }
    }
    case MOVE_RANKBAR: {
      return ReorderFunction(state, sourceIndex, destIndex);
    }
    default: {
      return state;
    }
  }
};

export default MOVE_CROSSLINE;
