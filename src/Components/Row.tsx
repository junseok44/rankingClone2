import React, { useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { DropResultPlus } from "../App";
import { dataAtom } from "../Atom";
import { Rankenum } from "../modules/item";

const RowContainer = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
  min-height: 12vh;
  max-width: 100%;
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
const DragContainer = styled.div`
  width: 100%;
`;
export const DroppableItem = styled.div`
  height: 100%;
  display: flex;
  overflow: auto;
  background-color: ${({
    isDraggingOver,
    bgColor,
  }: {
    isDraggingOver: boolean;
    bgColor: string;
  }) => (isDraggingOver ? bgColor : "#dfe6e9")};
`;
export const DraggableItem = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props: { bgColor: string }) =>
    props.bgColor ? props.bgColor : "black"};
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  ${(props: { draggableStyle: DraggingStyle | NotDraggingStyle }) => ({
    ...props.draggableStyle,
  })};
`;

const SettingBtn = styled.div`
  background-color: black;
  width: 5%;
  height: 100%;
  border-right: 1px solid white;
`;

const MoveContainer = styled.div`
  background-color: black;

  width: 5%;
  height: 100%;
`;

const Row = ({
  bgColor,
  droppableId,
  item,
  onDragEnd,
}: {
  bgColor: string;
  droppableId: Rankenum;
  item: string[];
  onDragEnd: (result: DropResultPlus) => void;
}) => {
  const setitemArray = useSetRecoilState(dataAtom);

  useEffect(() => {
    console.log("rendered" + droppableId);
  });

  return (
    <>
      <RowContainer>
        <RowRank bgColor={bgColor}>{droppableId}</RowRank>
        <DragContainer>
          <Droppable droppableId={droppableId} direction="horizontal">
            {(provided, snapshot) => (
              <DroppableItem
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
                bgColor={bgColor}
              >
                {item.map((color, index) => (
                  <Draggable key={color} index={index} draggableId={color}>
                    {(provided, snapshot) => (
                      <DraggableItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        bgColor={color}
                        draggableStyle={provided.draggableProps.style}
                      >
                        {color}
                      </DraggableItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </DroppableItem>
            )}
          </Droppable>
        </DragContainer>
        <SettingBtn></SettingBtn>
        <MoveContainer></MoveContainer>
      </RowContainer>
    </>
  );
};

export default React.memo(Row);
