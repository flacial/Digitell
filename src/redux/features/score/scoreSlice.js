import { createSlice } from "@reduxjs/toolkit";

export const scoreSlice = createSlice({
  name: "score",
  initialState: {
    scoreType: "Start!",
    scoreValue: 0
  },
  reducers: {
    setScoreType: (state, action) => {
        state.scoreType = action.payload
    },
    setScoreValue: (state) => {
      state.scoreValue += 10
    }
  },
});

// Action creators are generated for each case reducer function
export const { setScoreType, setScoreValue } = scoreSlice.actions;

export default scoreSlice.reducer;
