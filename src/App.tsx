import React, { useState } from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import produce from "immer";
import { useRecoilState } from "recoil";
import { dataAtom } from "./Atom";
import RowDrag, { DroppableItem, DraggableItem } from "./Components/RowDrag";

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
const Container_Item = styled.div`
  width: 100%;
`;

const App = () => {
  const [itemArray, setitemArray] = useRecoilState(dataAtom);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    setitemArray((current) => {
      return produce(current, (draft) => {
        const moveItem = current.ITEM[result.source.index];
        draft.ITEM.splice(result.source.index, 1);
        if (result.destination) {
          draft.ITEM.splice(result.destination?.index, 0, moveItem);
        }
      });
    });
  };
  return (
    <Home>
      <Container_Row>
        <RowDrag
          item={itemArray["S"]}
          bgColor="#ff7675"
          droppableId="S"
        ></RowDrag>
        <RowDrag
          item={itemArray["A"]}
          bgColor="#fdcb6e"
          droppableId="A"
        ></RowDrag>
        <RowDrag
          item={itemArray["B"]}
          bgColor="#81ecec"
          droppableId="B"
        ></RowDrag>
        <RowDrag
          item={itemArray["C"]}
          bgColor="#a29bfe"
          droppableId="C"
        ></RowDrag>
        <RowDrag
          item={itemArray["D"]}
          bgColor="#636e72"
          droppableId="D"
        ></RowDrag>
      </Container_Row>
      <Container_Item>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="ITEM" direction="horizontal">
            {(provided, snapshot) => (
              <DroppableItem
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {itemArray.ITEM.map((item, index) => (
                  <Draggable key={item} index={index} draggableId={item}>
                    {(provided, snapshot) => (
                      <DraggableItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        bgColor={item}
                        draggableStyle={provided.draggableProps.style}
                      >
                        {item}
                      </DraggableItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </DroppableItem>
            )}
          </Droppable>
        </DragDropContext>
      </Container_Item>
    </Home>
  );
};

export default App;
