import React, { useCallback, useEffect } from "react";
import {
  Draggable,
  DraggableProvided,
  DraggingStyle,
  Droppable,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { Rankenum } from "../modules/item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { enterItemSetting } from "../modules/mode";
import DraggableContainer from "./DraggableContainer";

export const RowContainer = styled.div`
  border-bottom: 1px solid black;
  height: 100px;
  max-width: 100%;
  display: flex;
  ${(props: any) => (props.draggableStyle ? { ...props.draggableStyle } : "")}
`;
export const RowRank = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  background-color: ${(props: { bgColor: string }) =>
    props.bgColor ? props.bgColor : "black"};
`;
export const DragContainer = styled.div`
  width: 100%;
`;
export const DroppableItem = styled.div`
  height: 100%;
  min-height: 10vh;
  display: flex;
  overflow: none;
  z-index: 100;
  background-color: ${({
    isDraggingOver,
    bgColor,
  }: {
    isDraggingOver: boolean;
    bgColor: string;
  }) => (isDraggingOver ? bgColor : "#dfe6e9")};
`;

export const SettingBtn = styled.div`
  background-color: black;
  width: 5%;
  height: 100%;
  border-right: 1px solid white;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.5rem;
`;

export const MoveContainer = styled.div`
  background-color: black;
  width: 5%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const MoveBtn = styled.div`
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid white;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Row = ({
  provided,
  obj: { id: droppableId, item: itemArray, name, bgColor },
  onRowMoveBtn,
}: {
  provided: DraggableProvided;
  obj: {
    id: string;
    item: string[];
    name: string;
    bgColor: string;
  };
  onRowMoveBtn: (direction: string, droppableId: string) => void;
}) => {
  useEffect(() => {
    console.log("rendered" + droppableId + name);
  });
  const dispatch = useDispatch();
  return (
    <>
      <RowContainer
        ref={provided.innerRef}
        {...provided.draggableProps}
        draggableStyle={provided.draggableProps.style}
      >
        <RowRank bgColor={bgColor} {...provided.dragHandleProps}>
          {name}
        </RowRank>
        <DragContainer>
          <Droppable
            droppableId={droppableId}
            direction="horizontal"
            type="itemDrop"
          >
            {(provided, snapshot) => (
              <DroppableItem
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
                bgColor={bgColor}
              >
                {itemArray.map((color, index) => (
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
        </DragContainer>
        <SettingBtn
          onClick={useCallback(() => {
            dispatch(enterItemSetting(droppableId));
          }, [dispatch])}
        >
          <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
        </SettingBtn>
        <MoveContainer>
          <MoveBtn onClick={() => onRowMoveBtn("up", droppableId)}>
            <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
          </MoveBtn>
          <MoveBtn onClick={() => onRowMoveBtn("down", droppableId)}>
            <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
          </MoveBtn>
        </MoveContainer>
      </RowContainer>
    </>
  );
};

export default React.memo(Row);
