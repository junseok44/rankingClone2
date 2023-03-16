import React, { useCallback } from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Row from "./Components/Row";
import { useDispatch } from "react-redux";
import {
  moveCrossLine,
  moveRankbar,
  moveRankbarDown,
  moveRankbarUp,
  moveSingleLine,
} from "./modules/item";
import { useSelector } from "react-redux";
import { RootState } from ".";
import OverlayContainer from "./Container/OverlayContainer";

export interface DropResultWithPosition extends DropResult {
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  };
}

const Home = styled.div`
  width: 80vw;
  margin: 5% auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledRowContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  display: grid;
  grid-auto-rows: 100px;
  margin-bottom: 2rem;
`;
const StyledH2 = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const DisplayFlex = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FixedContainer = styled.div`
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 20px;
  margin-top: 2rem;
`;

const App = () => {
  const rankArray = useSelector((state: RootState) => state.item);
  const rankObj_item = rankArray.find((item) => item.name === "ITEM");
  const currentSettingRowId = useSelector(
    (state: RootState) => state.mode.currentSettingItemId
  );
  const dispatch = useDispatch();

  const onDragEnd = useCallback(
    (result: DropResultWithPosition) => {
      if (result.type === "rowDrop") {
        console.log("row dropping");
        const {
          source: { index: sourceIndex },
          destination: { index: destIndex },
        } = result;
        dispatch(moveRankbar(sourceIndex, destIndex));
        return;
      }
      if (!result.destination) {
        console.log("no dest");
        return;
      }

      const {
        source: { droppableId: sourceDropId, index: sourceIndex },
        destination: { droppableId: destDropId, index: destIndex },
      } = result;
      if (sourceDropId === destDropId) {
        dispatch(moveSingleLine(sourceDropId, sourceIndex, destIndex));
      } else if (sourceDropId !== destDropId) {
        dispatch(
          moveCrossLine(sourceDropId, destDropId, sourceIndex, destIndex)
        );
      }
    },
    [moveSingleLine, moveCrossLine]
  );

  return (
    <Home>
      <StyledH2>anime tier list</StyledH2>
      <DisplayFlex>
        <button
          onClick={() => window.location.reload()}
          style={{ marginBottom: "2rem" }}
        >
          reload
        </button>
        {/* <StyledForm onSubmit={handleSubmit}>
          <label htmlFor="imgFile">upload your image</label>
          <input id="imgFile" type="file" onChange={handleFileChange} />
          <button type="submit">submit</button>
        </StyledForm> */}
      </DisplayFlex>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="rowDrop" type="rowDrop">
          {(provided, snapshot) => (
            <StyledRowContainer ref={provided.innerRef}>
              {rankArray
                .filter((rankObj) => rankObj.name !== "ITEM")
                .map((rankObj, index) => {
                  return (
                    <Draggable
                      index={index}
                      draggableId={rankObj.id}
                      key={rankObj.id}
                    >
                      {(provided, snapshot) => (
                        <Row provided={provided} rankObj={rankObj}></Row>
                      )}
                    </Draggable>
                  );
                })}
            </StyledRowContainer>
          )}
        </Droppable>
        {rankObj_item ? (
          <FixedContainer>
            <Row rankObj={rankObj_item}></Row>
          </FixedContainer>
        ) : null}
      </DragDropContext>
      {currentSettingRowId && <OverlayContainer></OverlayContainer>}
    </Home>
  );
};

export default App;
