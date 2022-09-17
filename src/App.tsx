import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
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
  destination: {
    droppableId: "S" | "A" | "B" | "C" | "D" | "ITEM";
    index: number;
  };
}

const App = () => {
  const [itemArray, setitemArray] = useRecoilState(dataAtom);

  // 근데 이렇게 prop으로 함수를 전달하는거랑. 각자의 컴포넌트에서 정의하는거랑
  // 성능차이가 구체적으로 어떻게나는거지.
  // 각 컴포넌트에서 함수를 만들어주니까 그게 힘들겠지.

  // 또 다른 문제는. 배열에 만약 같은 아이템이 있어버리면. 하나 움직일때
  // 다른 라인에 있는 애도 움직여버린다. 그건 왜그런거지?
  // S라인에 있는 A를 선택해도. S가 움직여버리니까.
  // DraggableId에 있는것이 똑같은 "string"으로 되어버려서.
  // 내가 s라인에 있는걸 옮겨도 그걸 a라인에 있는 아이템으로 인식해버리는것.

  const onDragEnd = useCallback(
    (result: DropResultPlus) => {
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
        if (sourceIndex === destIndex) return;
        setitemArray((current) => {
          return produce(current, (draft) => {
            const moveItem = draft[sourceDropId][sourceIndex];
            // 여기서 moveItem하는거는 불변성에 위배되지는 않나?
            // 지금은 그냥 string이라서 괜찮지만. 객체인 경우에는?
            // 지금은 produce를 활용하고 있기 때문에 이것도 괜찮지 않을까 싶다.
            draft[sourceDropId].splice(sourceIndex, 1);
            if (result.destination) {
              draft[sourceDropId].splice(
                result.destination?.index,
                0,
                moveItem
              );
            }
          });
        });
      } else if (sourceDropId !== destDropId) {
        setitemArray((current) =>
          produce(current, (draft) => {
            const moveItem = draft[sourceDropId][sourceIndex];
            draft[sourceDropId].splice(sourceIndex, 1);
            draft[destDropId].splice(destIndex, 0, moveItem);
          })
        );
      }
    },
    [setitemArray]
  );

  return (
    <Home>
      <DragDropContext onDragEnd={onDragEnd}>
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
      </DragDropContext>
    </Home>
  );
};

export default App;
