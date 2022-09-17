import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { DropResult } from "react-beautiful-dnd";
import produce from "immer";
import { useRecoilState } from "recoil";
import { dataAtom } from "./Atom";
import Row from "./Components/Row";
import Container_item from "./Components/ItemContainer";

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
    droppableId: "S" | "A" | "B" | "C" | "D" | "ITEM";
    index: number;
  };
}

const App = () => {
  const [itemArray, setitemArray] = useRecoilState(dataAtom);

  // 근데 이렇게 prop으로 함수를 전달하는거랑. 각자의 컴포넌트에서 정의하는거랑
  // 성능차이가 구체적으로 어떻게나는거지.
  // 각 컴포넌트에서 함수를 만들어주니까 그게 힘들겠지.

  const onDragEnd = useCallback(
    (result: DropResultPlus) => {
      if (!result.destination) {
        return;
      }
      console.log(result);
      const { droppableId, index } = result.source;
      setitemArray((current) => {
        return produce(current, (draft) => {
          const moveItem = draft[droppableId][index];
          draft[droppableId].splice(index, 1);
          if (result.destination) {
            draft[droppableId].splice(result.destination?.index, 0, moveItem);
          }
        });
      });
    },
    [setitemArray]
  );

  return (
    <Home>
      <Container_Row>
        <Row
          onDragEnd={onDragEnd}
          item={itemArray["S"]}
          bgColor="#ff7675"
          droppableId="S"
        ></Row>
        <Row
          onDragEnd={onDragEnd}
          item={itemArray["A"]}
          bgColor="#fdcb6e"
          droppableId="A"
        ></Row>
        <Row
          onDragEnd={onDragEnd}
          item={itemArray["B"]}
          bgColor="#81ecec"
          droppableId="B"
        ></Row>
        <Row
          onDragEnd={onDragEnd}
          item={itemArray["C"]}
          bgColor="#a29bfe"
          droppableId="C"
        ></Row>
        <Row
          onDragEnd={onDragEnd}
          item={itemArray["D"]}
          bgColor="#636e72"
          droppableId="D"
        ></Row>
      </Container_Row>
      <Container_item
        onDragEnd={onDragEnd}
        item={itemArray.ITEM}
        droppableId={"ITEM"}
      ></Container_item>
    </Home>
  );
};

export default App;
