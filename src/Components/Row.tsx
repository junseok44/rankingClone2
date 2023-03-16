import React, { useCallback, useEffect } from "react";
import {
  Draggable,
  DraggableProvided,
  DraggingStyle,
  Droppable,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { enterItemSetting } from "../modules/mode";
import DraggableComponent from "./DraggableComponent";
import { moveRankbarDown, moveRankbarUp } from "../modules/item";

export const RowContainer = styled.div`
  border-bottom: 1px solid black;
  height: 100px;
  max-width: 100%;
  display: flex;
  ${(props: any) => (props.draggableStyle ? { ...props.draggableStyle } : "")}
`;
export const RowTitle = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  background-color: ${(props: { bgColor: string }) =>
    props.bgColor ? props.bgColor : "black"};
`;
export const Width100 = styled.div`
  width: 100%;
`;
export const StyledItemContainer = styled.div`
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
  rankObj: { id: droppableId, item: itemArray, name, bgColor },
}: {
  provided?: DraggableProvided;
  rankObj: {
    id: string;
    item: string[];
    name: string;
    bgColor: string;
  };
}) => {
  const dispatch = useDispatch();

  const onRowMoveBtn = useCallback(
    (direction: string, droppableId: string): void => {
      if (direction === "up") dispatch(moveRankbarUp(droppableId));
      else if (direction === "down") dispatch(moveRankbarDown(droppableId));
    },
    [dispatch, moveRankbarUp, moveRankbarDown]
  );
  return (
    <>
      {provided ? (
        <RowContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          draggableStyle={provided.draggableProps.style}
        >
          <RowTitle bgColor={bgColor} {...provided.dragHandleProps}>
            {name}
          </RowTitle>
          <Width100>
            <Droppable
              droppableId={droppableId}
              direction="horizontal"
              type="itemDrop"
            >
              {(provided, snapshot) => (
                <StyledItemContainer
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                  bgColor={bgColor}
                >
                  {itemArray.map((color, index) => (
                    <DraggableComponent
                      key={color}
                      index={index}
                      color={color}
                    ></DraggableComponent>
                  ))}
                  {provided.placeholder}
                </StyledItemContainer>
              )}
            </Droppable>
          </Width100>
          <SettingBtn
            onClick={() => {
              dispatch(enterItemSetting(droppableId));
            }}
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
      ) : (
        <RowContainer>
          <Droppable
            droppableId={droppableId}
            direction="horizontal"
            type="itemDrop"
          >
            {(provided, snapshot) => (
              <StyledItemContainer
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
                bgColor={bgColor}
              >
                {itemArray.map((color, index) => (
                  <DraggableComponent
                    key={color}
                    index={index}
                    color={color}
                  ></DraggableComponent>
                ))}
                {provided.placeholder}
              </StyledItemContainer>
            )}
          </Droppable>
        </RowContainer>
      )}
    </>
  );
};

export default React.memo(Row);
