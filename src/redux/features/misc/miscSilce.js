import { createSlice } from "@reduxjs/toolkit";

export const miscSilce = createSlice({
  name: "misc",
  initialState: {
    isSettingsRendered: false,
    backgroundLoaded: false,
    guesserLoaded: false,
    vibrationEnabled: true,
  },
  reducers: {
    setIsSettingsRendered: (state) => {
      state.isSettingsRendered = !state.isSettingsRendered;
    },
    setIsBackgroundLoaded: (state, { payload }) => {
      state.backgroundLoaded = payload;
    },
    setIsGuesserLoaded: (state, { payload }) => {
      state.guesserLoaded = payload;
    },
    setVibrationEnabled: (state) => {
      state.vibrationEnabled = !state.vibrationEnabled;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsSettingsRendered,
  setIsBackgroundLoaded,
  setIsGuesserLoaded,
  setVibrationEnabled,
} = miscSilce.actions;

export default miscSilce.reducer;
