import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Row, {
  DragContainer,
  DroppableItem,
  MoveBtn,
  MoveContainer,
  RowContainer,
  RowRank,
  SettingBtn,
} from "./Components/Row";
import Container_item from "./Components/ItemContainer";
import { useDispatch } from "react-redux";
import {
  changeRankbarColor,
  changeRankbarName,
  clearRankbarItem,
  createRankbar,
  deleteRankbar,
  moveCrossLine,
  moveRankbar,
  moveRankbarDown,
  moveRankbarUp,
  moveSingleLine,
} from "./modules/item";
import { useSelector } from "react-redux";
import { RootState } from ".";
import { Rankenum } from "./modules/item";
import Overlay from "./Components/Overlay";
import { enterItemSetting, exitItemSetting, mode } from "./modules/mode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import DraggableContainer from "./Components/DraggableContainer";
import OverlayContainer from "./Container/OverlayContainer";

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
  grid-auto-rows: 100px;
  margin-bottom: 2rem;
`;

const App = () => {
  const currentSettingRowId = useSelector(
    (state: RootState) => state.mode.currentSettingItem
  );
  const itemArray = useSelector((state: RootState) => state.item);
  const dispatch = useDispatch();
  const onDragEnd = useCallback((result: DropResultPlus) => {
    console.log(result);
    if (result.type === "rowDrop") {
      console.log("row dropping");
      const {
        source: { index: sourceIndex },
        destination: { index: destIndex },
      } = result;
      dispatch(moveRankbar(sourceIndex, destIndex));
      return;
    }
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
  return (
    <Home>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
        anime tier list
      </h1>
      <button
        onClick={() => window.location.reload()}
        style={{ marginBottom: "2rem" }}
      >
        reload
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="rowDrop" type="rowDrop">
          {(provided, snapshot) => (
            <Container_Row ref={provided.innerRef}>
              {itemArray
                .filter((item) => item.name !== Rankenum.ITEM)
                .map((obj, index) => {
                  return (
                    <Draggable index={index} draggableId={obj.id} key={obj.id}>
                      {(provided, snapshot) => (
                        <Row
                          provided={provided}
                          obj={obj}
                          onRowMoveBtn={onRowMoveBtn}
                        ></Row>
                      )}
                    </Draggable>
                  );
                })}
            </Container_Row>
          )}
        </Droppable>
        <Container_item
          item={itemArray.find((item) => item.name === Rankenum.ITEM)?.item!}
          // 이부분 그냥 row로 바꾸어버리자.
          droppableId={
            itemArray.find((item) => item.name === Rankenum.ITEM)?.id!
          }
        ></Container_item>
      </DragDropContext>
      {currentSettingRowId && <OverlayContainer></OverlayContainer>}
    </Home>
  );
};

export default App;
