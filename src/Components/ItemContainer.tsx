import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { DropResultPlus } from "../App";
import DraggableContainer from "./DraggableContainer";
import { DroppableItem } from "./Row";

const Container_Item = styled.div`
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 20px;
  margin-top: 2rem;
`;

const ItemContainer = ({
  item,
  droppableId,
}: {
  item: string[];
  droppableId: string;
}) => {
  return (
    <Container_Item>
      <Droppable
        droppableId={droppableId}
        direction="horizontal"
        type="itemDrop"
      >
        {(provided, snapshot) => (
          <DroppableItem
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {item.map((color, index) => (
              <DraggableContainer
                key={color}
                index={index}
                color={color}
              ></DraggableContainer>
            ))}
            {provided.placeholder}
          </DroppableItem>
        )}
      </Droppable>
    </Container_Item>
  );
};

export default ItemContainer;
