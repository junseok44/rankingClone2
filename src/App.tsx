import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Row from "./Components/Row";
import Row_Item from "./Components/ItemContainer";
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
import DraggableContainer from "./Components/DraggableComponent";
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
const StyledRowContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  display: grid;
  grid-auto-rows: 100px;
  margin-bottom: 2rem;
`;
const StyledH2 = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const DisplayFlex = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const App = () => {
  const rankArray = useSelector((state: RootState) => state.item);
  const settingMode = useSelector((state: RootState) => state.mode.setting);
  const currentSettingRowId = useSelector(
    (state: RootState) => state.mode.currentSettingItem
  );
  const itemArray = useSelector((state: RootState) => state.item);
  const dispatch = useDispatch();
  const onDragEnd = useCallback(
    (result: DropResultPlus) => {
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
        dispatch(
          moveCrossLine(sourceDropId, destDropId, sourceIndex, destIndex)
        );
      }
    },
    [moveSingleLine, moveCrossLine]
  );
  const onRowMoveBtn = useCallback(
    (direction: string, droppableId: string): void => {
      if (direction === "up") dispatch(moveRankbarUp(droppableId));
      else if (direction === "down") dispatch(moveRankbarDown(droppableId));
    },
    [dispatch, moveRankbarUp, moveRankbarDown]
  );
  return (
    <Home>
      <StyledH2>anime tier list</StyledH2>
      <DisplayFlex>
        <button
          onClick={() => window.location.reload()}
          style={{ marginBottom: "2rem" }}
        >
          reload
        </button>
        {/* <StyledForm onSubmit={handleSubmit}>
          <label htmlFor="imgFile">upload your image</label>
          <input id="imgFile" type="file" onChange={handleFileChange} />
          <button type="submit">submit</button>
        </StyledForm> */}
      </DisplayFlex>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="rowDrop" type="rowDrop">
          {(provided, snapshot) => (
            <StyledRowContainer ref={provided.innerRef}>
              {rankArray
                .filter((rank) => rank.name !== Rankenum.ITEM)
                .map((rank, index) => {
                  return (
                    <Draggable
                      index={index}
                      draggableId={rank.id}
                      key={rank.id}
                    >
                      {(provided, snapshot) => (
                        <Row
                          provided={provided}
                          rankObj={rank}
                          onRowMoveBtn={onRowMoveBtn}
                        ></Row>
                      )}
                    </Draggable>
                  );
                })}
            </StyledRowContainer>
          )}
        </Droppable>
        <Row_Item
          item={rankArray.find((rank) => rank.name === Rankenum.ITEM)?.item!}
          // 이부분 그냥 row로 바꾸어버리자.
          droppableId={
            rankArray.find((rank) => rank.name === Rankenum.ITEM)?.id!
          }
        ></Row_Item>
      </DragDropContext>
      {currentSettingRowId && <OverlayContainer></OverlayContainer>}
    </Home>
  );
};

export default App;
