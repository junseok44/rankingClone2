import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "mode",
  initialState: {
    setting: false,
    currentSettingItem: null,
  },
  reducers: {
    enterItemSetting(state, action) {
      state.setting = true;
      state.currentSettingItem = action.payload;
    },
    exitItemSetting(state) {
      state.setting = !state.setting;
    },
  },
});

export const { exitItemSetting, enterItemSetting } = slice.actions;
export const { reducer: mode } = slice;
