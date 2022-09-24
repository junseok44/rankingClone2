import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Row from "./Components/Row";
import Container_item from "./Components/ItemContainer";
import { useDispatch } from "react-redux";
import {
  changeRankbarColor,
  changeRankbarName,
  clearRankbarItem,
  deleteRankbar,
  moveCrossLine,
  moveRankbarDown,
  moveRankbarUp,
  moveSingleLine,
} from "./modules/item";
import { useSelector } from "react-redux";
import { RootState } from ".";
import { Rankenum } from "./modules/item";
import Overlay from "./Components/Overlay";
import { exitItemSetting } from "./modules/mode";

export interface DropResultPlus extends DropResult {
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  };
}

const Home = styled.div`
  width: 80vw;
  margin: 5% auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Container_Row = styled.div`
  width: 100%;
  border: 1px solid black;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  margin-bottom: 2rem;
`;

const App = () => {
  const itemArray = useSelector((state: RootState) => state.item);
  const settingMode = useSelector((state: RootState) => state.mode.setting);
  const currentSettingRowId = useSelector(
    (state: RootState) => state.mode.currentSettingItem
  );
  // 이제 currentSettingRowId는 string으로 된 id입니다.
  // 근데 그것보다는 그냥 currentSe
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("app home rendered");
  });

  const onDragEnd = useCallback((result: DropResultPlus) => {
    console.log(result);

    if (!result.destination) {
      console.log("no dest");
      return;
    }
    // 왜 빈 배열로 가면 result.dest가 없는거지?
    const {
      source: { droppableId: sourceDropId, index: sourceIndex },
      destination: { droppableId: destDropId, index: destIndex },
    } = result;
    if (sourceDropId === destDropId) {
      dispatch(moveSingleLine(sourceDropId, sourceIndex, destIndex));
    } else if (sourceDropId !== destDropId) {
      dispatch(moveCrossLine(sourceDropId, destDropId, sourceIndex, destIndex));
    }
  }, []);
  const onRowMoveBtn = useCallback(
    (direction: string, droppableId: string): void => {
      if (direction === "up") dispatch(moveRankbarUp(droppableId));
      else if (direction === "down") dispatch(moveRankbarDown(droppableId));
    },
    [dispatch, moveRankbarUp, moveRankbarDown]
  );

  const onChangeRowColor = (color: string) => {
    dispatch(changeRankbarColor(color, currentSettingRowId));
  };
  const onChangeRowName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    dispatch(changeRankbarName(e.target.value, currentSettingRowId));
  };
  const onDeleteRow = () => {
    dispatch(exitItemSetting());
    dispatch(deleteRankbar(currentSettingRowId!));
    // 여기서 ! 해주는것도 좋지 않은것같은데 따로 처리해줄 수 있나.
  };
  const onClearRowItem = () => {
    dispatch(clearRankbarItem(currentSettingRowId!));
  };
  return (
    <Home>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container_Row>
          {itemArray
            .filter((item) => item.name !== Rankenum.ITEM)
            .map((obj) => {
              return (
                <Row
                  key={obj.id}
                  droppableId={obj.id}
                  name={obj.name}
                  itemArray={obj.item}
                  bgColor={obj.bgColor}
                  onRowMoveBtn={onRowMoveBtn}
                ></Row>
              );
            })}
        </Container_Row>
        <Container_item
          onDragEnd={onDragEnd}
          item={itemArray.find((item) => item.name === Rankenum.ITEM)?.item!}
          // 이부분 그냥 row로 바꾸어버리자.
          droppableId={
            itemArray.find((item) => item.name === Rankenum.ITEM)?.id!
          }
        ></Container_item>
      </DragDropContext>
      {settingMode && (
        <Overlay
          currentObj={itemArray.find((obj) => obj.id === currentSettingRowId)!}
          onDeleteRow={onDeleteRow}
          onClearRowItem={onClearRowItem}
          onChangeRowName={onChangeRowName}
          onChangeRowColor={onChangeRowColor}
        ></Overlay>
      )}
    </Home>
  );
};

export default App;
