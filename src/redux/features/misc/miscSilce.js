import { createSlice } from "@reduxjs/toolkit";

export const miscSilce = createSlice({
  name: "misc",
  initialState: {
    isSettingsRendered: false
  },
  reducers: {
      setIsSettingsRendered: (state) => {
        state.isSettingsRendered = !state.isSettingsRendered
      }
  },
});

// Action creators are generated for each case reducer function
export const { setIsSettingsRendered } = miscSilce.actions;

export default miscSilce.reducer;
