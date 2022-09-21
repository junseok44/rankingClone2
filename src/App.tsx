import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Row from "./Components/Row";
import Container_item from "./Components/ItemContainer";
import { useDispatch } from "react-redux";
import { moveCrossLine, moveSingleLine } from "./modules/item";
import { useSelector } from "react-redux";
import { RootState } from ".";
import { Rankenum } from "./modules/item";

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

const App = () => {
  const itemArray = useSelector((state: RootState) => state.item);
  console.log(itemArray);
  const dispatch = useDispatch();
  // 근데 이렇게 prop으로 함수를 전달하는거랑. 각자의 컴포넌트에서 정의하는거랑
  // 성능차이가 구체적으로 어떻게나는거지.
  // 각 컴포넌트에서 함수를 만들어주니까 그게 힘들겠지.

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
                  onDragEnd={onDragEnd}
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
    </Home>
  );
};

export default App;
