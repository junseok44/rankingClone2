import React from "react";
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import styled from "styled-components";

export const StyledItemBox = styled.div<{ imgSrc: string }>`
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  background: ${(props: { imgSrc: string }) =>
    props.imgSrc ? `url(${props.imgSrc})` : "black"};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  color: white;
  cursor: pointer;
  ${(props: { draggableStyle: DraggingStyle | NotDraggingStyle }) => ({
    ...props.draggableStyle,
  })};
`;

const DraggableComponent = ({
  id,
  imgSrc,
  index,
}: {
  id: string;
  index: number;
  imgSrc: string;
}) => {
  return (
    <>
      <Draggable key={id} index={index} draggableId={id}>
        {(provided, snapshot) => (
          <StyledItemBox
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            imgSrc={imgSrc}
            draggableStyle={provided.draggableProps.style}
          ></StyledItemBox>
        )}
      </Draggable>
    </>
  );
};

export default DraggableComponent;
