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
`;

const ItemContainer = ({
  onDragEnd,
  item,
  droppableId,
}: {
  onDragEnd: (result: DropResultPlus) => void;
  item: string[];
  droppableId: string;
}) => {
  return (
    <Container_Item>
      <Droppable droppableId={droppableId} direction="horizontal">
        {(provided, snapshot) => (
          <DroppableItem
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {item.map((item, index) => (
              <DraggableContainer
                index={index}
                color={item}
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
