import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Row from "./Components/Row";
import Container_item from "./Components/ItemContainer";
import { useDispatch } from "react-redux";
import {
  changeRankbarColor,
  changeRankbarName,
  moveCrossLine,
  moveRankbarDown,
  moveRankbarUp,
  moveSingleLine,
} from "./modules/item";
import { useSelector } from "react-redux";
import { RootState } from ".";
import { Rankenum } from "./modules/item";
import { exitItemSetting } from "./modules/mode";

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
const SettingColor = styled(SettingItem)`
  display: flex;
  flex-direction: column;
  & > h1 {
    font-size: 2rem;
  }
  & > * {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const SettingName = styled(SettingItem)`
  & > h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  & > * {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > input {
    margin: 0 auto;
    width: 70%;
    height: 2rem;
  }
`;
const SettingBtnRow = styled.div`
  background-color: pink;
  height: 17%;
  display: flex;
  justify-content: center;
`;

const ColorContainer = styled.div`
  display: flex;
`;

interface ColorBoxProps {
  bgColor: string;
  currentColor: string;
}
const ColorBox = styled.div<{ bgColor: string; currentColor: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props: ColorBoxProps) =>
    props.bgColor ? props.bgColor : "black"};
  display: flex;
  border: ${(props: ColorBoxProps) =>
    props.currentColor === props.bgColor ? "3px solid black" : "none"};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const SettingBtn = styled.button`
  width: 40%;
  padding: 5px 15px;
  background-color: #dfe6e9;
  border-radius: 5px;
  max-height: 2.5rem;
  cursor: pointer;
`;

const App = () => {
  const itemArray = useSelector((state: RootState) => state.item);
  const settingMode = useSelector((state: RootState) => state.mode.setting);
  const currentSettingRow = useSelector(
    (state: RootState) => state.mode.currentSettingItem
  );
  // 이제 currentSettingRow는 string으로 된 id입니다.
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

  const onRowMoveBtn = (direction: string, droppableId: Rankenum): void => {
    if (direction === "up") dispatch(moveRankbarUp(droppableId));
    else if (direction === "down") dispatch(moveRankbarDown(droppableId));
  };
  const onChangeRowColor = (color: string) => {
    dispatch(changeRankbarColor(color, currentSettingRow));
  };
  const onChangeRowName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("rejecte");
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
                  droppableId={obj.name}
                  item={obj.item}
                  bgColor={obj.bgColor}
                  id={obj.id}
                  onRowMoveBtn={onRowMoveBtn}
                ></Row>
              );
            })}
        </Container_Row>
        <Container_item
          onDragEnd={onDragEnd}
          item={itemArray.find((item) => item.name === Rankenum.ITEM)?.item!}
          // 이부분 그냥 row로 바꾸어버리자.
          droppableId={Rankenum.ITEM}
        ></Container_item>
      </DragDropContext>
      {settingMode && (
        <SettingOverlay onClick={() => dispatch(exitItemSetting())}>
          <Setting
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
            }}
          >
            <SettingColor>
              <h1>choose background color</h1>
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
                  return (
                    <ColorBox
                      currentColor={
                        itemArray.find((obj) => obj.id === currentSettingRow)
                          ?.bgColor
                      }
                      bgColor={color}
                      onClick={() => onChangeRowColor(color)}
                    ></ColorBox>
                  );
                })}
              </ColorContainer>
            </SettingColor>
            <SettingName>
              <h1>edit label name</h1>
              <input
                type="text"
                placeholder={
                  itemArray.find((obj) => obj.id === currentSettingRow)?.name
                }
                onChange={onChangeRowName}
              ></input>
            </SettingName>
            <SettingBtnRow>
              <SettingBtn>Delete Row</SettingBtn>
              <SettingBtn>Clear Row Images</SettingBtn>
            </SettingBtnRow>
            <SettingBtnRow>
              <SettingBtn>Add a Row above</SettingBtn>
              <SettingBtn>Add a Row below</SettingBtn>
            </SettingBtnRow>
          </Setting>
        </SettingOverlay>
      )}
    </Home>
  );
};

export default App;
