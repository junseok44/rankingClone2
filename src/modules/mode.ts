import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "mode",
  initialState: {
    currentSettingItemId: null,
  },
  reducers: {
    enterItemSetting(state, action) {
      state.currentSettingItemId = action.payload;
    },
    exitItemSetting(state) {
      state.currentSettingItemId = null;
    },
  },
});

export const { exitItemSetting, enterItemSetting } = slice.actions;
export const { reducer: mode } = slice;
