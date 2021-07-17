import { createSlice } from "@reduxjs/toolkit";

export const miscSilce = createSlice({
  name: "misc",
  initialState: {
    isSettingsRendered: false,
    backgroundLoaded: false,
    guesserLoaded: false
  },
  reducers: {
    setIsSettingsRendered: (state) => {
      state.isSettingsRendered = !state.isSettingsRendered;
    },
    setIsBackgroundLoaded: (state, { payload }) => {
      state.backgroundLoaded = payload;
    },
    setIsGuesserLoaded: (state, { payload }) => {
      state.guesserLoaded = payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setIsSettingsRendered, setIsBackgroundLoaded, setIsGuesserLoaded } =
  miscSilce.actions;

export default miscSilce.reducer;
