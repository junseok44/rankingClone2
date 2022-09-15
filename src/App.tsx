import React from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

const ItemBox = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props: { bgColor: string }) =>
    props.bgColor ? props.bgColor : "red"};
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`;
const Container_Item = styled.div`
  width: 70vw;
  min-height: 12vh;
  border: 1px solid black;
  display: flex;
`;
const Container_Row = styled.div`
  width: 70vw;
  border: 1px solid black;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  margin-bottom: 2rem;
  .row {
    &:not(:last-child) {
      border-bottom: 1px solid black;
    }
    min-height: 12vh;
    display: flex;
    .row__rank {
      width: 100px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 1.5rem;
      &.pink {
        background-color: $pink;
      }
      &.orange {
        background-color: $orange;
      }
      &.lemon {
        background-color: $lemon;
      }
      &.purple {
        background-color: $purple;
      }
      &.grey {
        background-color: $grey;
      }
    }
  }
`;
const Row = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
  min-height: 12vh;
  display: flex;
`;
const RowRank = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  background-color: ${(props: { bgColor: string }) =>
    props.bgColor ? props.bgColor : "black"};
`;

const App = () => {
  const itemArray = ["red", "orange", "black", "purple"];

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
  };
  return (
    <div className="Home">
      <Container_Row>
        <Row>
          <RowRank bgColor={"#ff7675"}>S</RowRank>
        </Row>
        <Row>
          <RowRank bgColor={"#ffeaa7"}>A</RowRank>
        </Row>
        <Row>
          <RowRank bgColor={"#fab1a0"}>B</RowRank>
        </Row>
        <Row>
          <RowRank bgColor={"#a29bfe"}>C</RowRank>
        </Row>
        <Row>
          <RowRank bgColor={"#636e72"}>D</RowRank>
        </Row>
      </Container_Row>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Container_Item
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {itemArray.map((item, index) => (
                <Draggable key={item} index={index} draggableId={item}>
                  {(provided, snapshot) => (
                    <ItemBox
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      bgColor={item}
                    >
                      {item}
                    </ItemBox>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Container_Item>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
