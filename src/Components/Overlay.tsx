import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { rankObj } from "../modules/item";
import { exitItemSetting } from "../modules/mode";

interface ColorBoxProps {
  bgColor: string;
  currentColor: string;
}

const SettingOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Setting = styled.div`
  background-color: white;
  width: 70vw;
  height: 70vh;
`;
const SettingItem = styled.div`
  background-color: pink;
  height: 33%;
`;
const SettingColor = styled(SettingItem)`
  display: flex;
  flex-direction: column;
  & > h1 {
    font-size: 2rem;
  }
  & > * {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const SettingName = styled(SettingItem)`
  & > h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  & > * {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > input {
    margin: 0 auto;
    width: 70%;
    height: 2rem;
  }
`;
const SettingBtnRow = styled.div`
  background-color: pink;
  height: 17%;
  display: flex;
  justify-content: center;
`;

const ColorContainer = styled.div`
  display: flex;
`;
const ColorBox = styled.div<{ bgColor: string; currentColor: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props: ColorBoxProps) =>
    props.bgColor ? props.bgColor : "black"};
  display: flex;
  border: ${(props: ColorBoxProps) =>
    props.currentColor === props.bgColor ? "3px solid black" : "none"};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const SettingBtn = styled.button`
  width: 40%;
  padding: 5px 15px;
  background-color: #dfe6e9;
  border-radius: 5px;
  max-height: 2.5rem;
  cursor: pointer;
`;

const Overlay = ({
  onChangeRowName,
  onChangeRowColor,
  onDeleteRow,
  onClearRowItem,
  onCreateRankbar,
  currentObj,
}: {
  currentObj: rankObj;
  onDeleteRow: () => void;
  onClearRowItem: () => void;
  onChangeRowColor: (color: string) => void;
  onChangeRowName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCreateRankbar: (direction: string) => void;
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <SettingOverlay onClick={() => dispatch(exitItemSetting())}>
        <Setting
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
          }}
        >
          <SettingColor>
            <h1>choose background color</h1>
            <ColorContainer>
              {[
                "#FF6633",
                "#FFB399",
                "#FF33FF",
                "#FFFF99",
                "#00B3E6",
                "#E6B333",
                "#3366E6",
                "#999966",
                "#a29bfe",
                "#fab1a0",
                "#b2bec3",
                "#ffeaa7",
              ].map((color) => {
                return (
                  <ColorBox
                    currentColor={currentObj.bgColor}
                    bgColor={color}
                    onClick={() => onChangeRowColor(color)}
                  ></ColorBox>
                );
              })}
            </ColorContainer>
          </SettingColor>
          <SettingName>
            <h1>edit label name</h1>
            <input
              type="text"
              value={currentObj.name}
              placeholder={currentObj.name}
              onChange={onChangeRowName}
            ></input>
          </SettingName>
          <SettingBtnRow>
            <SettingBtn onClick={onDeleteRow}>Delete Row</SettingBtn>
            <SettingBtn onClick={onClearRowItem}>Clear Row Images</SettingBtn>
          </SettingBtnRow>
          <SettingBtnRow>
            <SettingBtn onClick={() => onCreateRankbar("up")}>
              Add a Row above
            </SettingBtn>
            <SettingBtn onClick={() => onCreateRankbar("down")}>
              Add a Row below
            </SettingBtn>
          </SettingBtnRow>
        </Setting>
      </SettingOverlay>
    </>
  );
};

export default Overlay;
