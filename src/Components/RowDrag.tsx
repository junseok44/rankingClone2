import produce from "immer";
import React, { useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { dataAtom } from "../Atom";

const Row = styled.div`
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
  display: flex;
  overflow: auto;
  background-color: ${({ isDraggingOver }: { isDraggingOver: boolean }) =>
    isDraggingOver ? "#a29bfe" : "#dfe6e9"};
`;
export const DraggableItem = styled.div`
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
  ${(props: { draggableStyle: DraggingStyle | NotDraggingStyle }) => ({
    ...props.draggableStyle,
  })};
`;

const RowDrag = ({
  bgColor,
  droppableId,
  item,
}: {
  bgColor: string;
  droppableId: "S" | "A" | "B" | "C" | "D";
  item: string[];
}) => {
  const setitemArray = useSetRecoilState(dataAtom);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    setitemArray((current) => {
      return produce(current, (draft) => {
        const moveItem = draft[droppableId][result.source.index];
        draft[droppableId].splice(result.source.index, 1);
        if (result.destination) {
          draft[droppableId].splice(result.destination?.index, 0, moveItem);
        }
      });
    });
  };

  useEffect(() => {
    console.log("rendered" + droppableId);
  });

  return (
    <>
      <Row>
        <RowRank bgColor={bgColor}>{droppableId}</RowRank>
        <DragContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="S" direction="horizontal">
              {(provided, snapshot) => (
                <DroppableItem
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
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
          </DragDropContext>
        </DragContainer>
      </Row>
    </>
  );
};

export default React.memo(RowDrag);
