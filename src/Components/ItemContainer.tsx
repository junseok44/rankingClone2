import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { DropResultPlus } from "../App";
import { DraggableItem, DroppableItem } from "./Row";

const Container_Item = styled.div`
  width: 100%;
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
    </Container_Item>
  );
};

export default ItemContainer;
