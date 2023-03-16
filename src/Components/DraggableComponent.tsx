import React from "react";
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import styled from "styled-components";

export const StyledItemBox = styled.div`
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  background-color: ${(props: { bgColor: string }) =>
    props.bgColor ? props.bgColor : "black"};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  ${(props: { draggableStyle: DraggingStyle | NotDraggingStyle }) => ({
    ...props.draggableStyle,
  })};
`;

const DraggableComponent = ({
  color,
  index,
}: {
  color: string;
  index: number;
}) => {
  return (
    <>
      <Draggable key={color} index={index} draggableId={color}>
        {(provided, snapshot) => (
          <StyledItemBox
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            bgColor={color}
            draggableStyle={provided.draggableProps.style}
          >
            {color}
          </StyledItemBox>
        )}
      </Draggable>
    </>
  );
};

export default DraggableComponent;
