import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Row from "./Components/Row";
import Container_item from "./Components/ItemContainer";
import { useDispatch } from "react-redux";
import {
  moveCrossLine,
  moveRankbarDown,
  moveRankbarUp,
  moveSingleLine,
} from "./modules/item";
import { useSelector } from "react-redux";
import { RootState } from ".";
import { Rankenum } from "./modules/item";
import { changeSettingMode } from "./modules/mode";

export interface DropResultPlus extends DropResult {
  source: {
    droppableId: Rankenum;
    index: number;
  };
  destination: {
    droppableId: Rankenum;
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

const SettingOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Setting = styled.div`
  background-color: white;
  width: 70vw;
  height: 70vh;
`;

const SettingItem = styled.div`
  background-color: pink;
  height: 33%;
`;

const ColorContainer = styled.div`
  display: flex;
`;

const ColorBox = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${({ bgColor }: { bgColor: string }) =>
    bgColor ? bgColor : "black"};
  display: flex;
  justify-content: center;
  align-items: center;
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const SettingButton = styled.button`
  width: 40%;
  padding: 5px 15px;
  background-color: grey;
  border-radius: 5px;
`;

const App = () => {
  const itemArray = useSelector((state: RootState) => state.item);
  const settingMode = useSelector((state: RootState) => state.mode.setting);
  const dispatch = useDispatch();

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

  const onRowMoveClick = (direction: string, droppableId: Rankenum): void => {
    if (direction === "up") dispatch(moveRankbarUp(droppableId));
    else if (direction === "down") dispatch(moveRankbarDown(droppableId));
  };
  return (
    <Home>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container_Row>
          {itemArray
            .filter((item) => item.rank !== Rankenum.ITEM)
            .map((obj) => {
              return (
                <Row
                  droppableId={obj.rank}
                  item={obj.item}
                  bgColor={obj.bgColor}
                  onRowMoveBtn={onRowMoveClick}
                ></Row>
              );
            })}
        </Container_Row>
        <Container_item
          onDragEnd={onDragEnd}
          item={itemArray.find((item) => item.rank === Rankenum.ITEM)?.item!}
          // 이부분 그냥 row로 바꾸어버리자.
          droppableId={Rankenum.ITEM}
        ></Container_item>
      </DragDropContext>
      {settingMode && (
        <SettingOverlay onClick={() => dispatch(changeSettingMode())}>
          <Setting
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
            }}
          >
            <SettingItem>
              <div>choose background color</div>
              <ColorContainer>
                {[
                  "#FF6633",
                  "#FFB399",
                  "#FF33FF",
                  "#FFFF99",
                  "#00B3E6",
                  "#E6B333",
                  "#3366E6",
                  "#999966",
                ].map((color) => {
                  return <ColorBox bgColor={color}>a</ColorBox>;
                })}
              </ColorContainer>
            </SettingItem>
            <SettingItem>
              <div>edit label name</div>
              <input type="text"></input>
            </SettingItem>
            <SettingItem>
              <SettingButton>create</SettingButton>
              <SettingButton>create</SettingButton>
              <SettingButton>create</SettingButton>
              <SettingButton>create</SettingButton>
            </SettingItem>
          </Setting>
        </SettingOverlay>
      )}
    </Home>
  );
};

export default App;
