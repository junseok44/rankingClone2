import { createSlice } from "@reduxjs/toolkit";
import { Action } from "redux-actions";

const slice = createSlice({
  name: "mode",
  initialState: {
    setting: false,
  },
  reducers: {
    changeSettingMode(state) {
      state.setting = !state.setting;
    },
  },
});

export const { changeSettingMode } = slice.actions;
export const { reducer: mode } = slice;
