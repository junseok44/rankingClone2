import { produce } from "immer";

export interface rankObj {
  name: any;
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

const initialState1: TinitialState1 = [
  {
    name: Rankenum.S,
    id: "6158222534814353",
    bgColor: "#FF6633",
    item: ["#9b59b6", "#fab1a0"],
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
      "#00b894",
      "#2d3436",
      "#0984e3",
      "#ffeaa7",
      "black",
      "#a29bfe",
    ],
  },
];

export const itemReducer = (
  state = initialState1,
  action: TactionWithIndex<number>
) => {
  const { sourceDropId, destDropId, sourceIndex, destIndex } = action;
  switch (action.type) {
    case MOVE_SINGLELINE: {
      // 여기서 해야할일은. state의 [dropid] 를 받아서. 거기 index를 하나 제거하고
      // 같은 droppid의 index에다가 밀어넣는것.
      if (sourceIndex === destIndex) return state;
      return produce(state, (draft) => {
        const moveObj = draft.find((item) => item.id === sourceDropId);
        if (!moveObj) return;
        const moveItem = moveObj.item[sourceIndex];
        moveObj.item.splice(sourceIndex, 1);
        moveObj.item.splice(destIndex, 0, moveItem);
      });
    }
    case MOVE_CROSSLINE: {
      return produce(state, (draft) => {
        const moveObj = draft.find((item) => item.id === sourceDropId);
        const destObj = draft.find((item) => item.id === destDropId);
        // 여기서 item.name === dropId로 하고
        // dropId를 name으로 하면 골치아파지는 이유는
        // 나중에 이름을 바꾸거나 했을때.
        // item.name은 바뀌는데, dropId는 안바뀌니까.
        // 그냥 id property를 만들어서 그걸로 조회를 했다.
        if (!moveObj) return;
        const moveItem = moveObj.item[sourceIndex];
        moveObj.item.splice(sourceIndex, 1);
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
        console.log("up", action.index);
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
        console.log("down", action.index);
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

      //   const newRankBar: rankObj = {
      //     bgColor: "#b2bec3",
      //     id: Math.random().toString().substring(2, 16),
      //     item: [],
      //     name: "NEW",
      //   };
      //   if (action.direction === "up") {
      //     console.log("up");
      //     draft.splice(action.index - 1, 0, newRankBar);
      //   } else if (action.direction === "down") {
      //     console.log("down");
      //     draft.splice(action.index, 0, newRankBar);
      //   }
    }
    case MOVE_RANKBAR: {
      return produce(state, (draft) => {
        const [moveObj] = draft.splice(action.sourceIndex, 1);
        draft.splice(action.destIndex, 0, moveObj);
      });
    }
    default: {
      return state;
    }
  }
};

export default MOVE_CROSSLINE;
