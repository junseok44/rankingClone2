import React from "react";
import {
  changeRankbarColor,
  changeRankbarName,
  clearRankbarItem,
  createRankbar,
  deleteRankbar,
} from "../modules/item";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "..";
import { exitItemSetting } from "../modules/mode";
import Overlay from "../Components/Overlay";

const OverlayContainer = () => {
  const currentSettingRowId = useSelector(
    (state: RootState) => state.mode.currentSettingItem
  );
  const itemArray = useSelector((state: RootState) => state.item);
  const dispatch = useDispatch();

  const onChangeRowColor = (color: string) => {
    dispatch(changeRankbarColor(color, currentSettingRowId));
  };
  const onChangeRowName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeRankbarName(e.target.value, currentSettingRowId));
  };
  const onDeleteRow = () => {
    dispatch(exitItemSetting());
    dispatch(deleteRankbar(currentSettingRowId!));
    // 여기서 ! 해주는것도 좋지 않은것같은데 따로 처리해줄 수 있나.
  };
  const onClearRowItem = () => {
    dispatch(clearRankbarItem(currentSettingRowId!));
  };
  const onCreateRankbar = (direction: string) => {
    dispatch(
      createRankbar(
        itemArray.findIndex((item) => item.id === currentSettingRowId),
        direction
      )
    );
  };
  return (
    <Overlay
      currentObj={itemArray.find((obj) => obj.id === currentSettingRowId)!}
      onDeleteRow={onDeleteRow}
      onClearRowItem={onClearRowItem}
      onChangeRowName={onChangeRowName}
      onChangeRowColor={onChangeRowColor}
      onCreateRankbar={onCreateRankbar}
    ></Overlay>
  );
};

export default OverlayContainer;
