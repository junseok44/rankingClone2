import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { DropResultPlus } from "../App";
import DraggableContainer from "./DraggableComponent";
import { StyledItemContainer } from "./Row";

const FixedContainer = styled.div`
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
    <FixedContainer>
      <Droppable
        droppableId={droppableId}
        direction="horizontal"
        type="itemDrop"
      >
        {(provided, snapshot) => (
          <StyledItemContainer
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
          </StyledItemContainer>
        )}
      </Droppable>
    </FixedContainer>
  );
};

export default ItemContainer;
