import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const deleteInputCode = createAsyncThunk(
  "guesser/deleteCodeInput",
  async (inputCode, thunkAPI) => {
    const oldArrayLastElement = inputCode.length - 1;
    const splicedArr = [...inputCode];
    const removeEl = splicedArr.splice(0, oldArrayLastElement);
    return thunkAPI.fulfillWithValue(removeEl);
  }
);

export const guesserSlice = createSlice({
  name: "guesserD",
  initialState: {
    currentBinary: "0",
    digitNumber: 0,
    inputCode: [],
    cellIndex: 0,
  },
  reducers: {
    setInputCode: (state, action) => {
      state.inputCode.splice(state.cellIndex - 1, 1, action.payload);
    },
    setCellIndex: (state, action) => {
      state.cellIndex += action.payload;
    },
    setDigitNumber: (state, action) => {
      state.digitNumber += action.payload;
    },
    setCurrentBinary: (state) => {
      state.currentBinary += state.digitNumber.toString(2);
    },
    setInputCodeManually: (state, { payload }) => {
      state.inputCode = payload;
    },
  },
  // extraReducers: (builder) => {
  //   // Add reducers for additional action types here, and handle loading state as needed
  //   builder.addCase(deleteInputCode.fulfilled, (state, action) => {
  //     if (state.cellIndex === state.inputCode.length) {
  //       state.cellIndex -= 1
  //       console.log(state.cellIndex)
  //     }
  //   })
  // },
});

// Action creators are generated for each case reducer function
export const {
  setInputCode,
  setCellIndex,
  setDigitNumber,
  setCurrentBinary,
  setInputCodeManually,
} = guesserSlice.actions;

export default guesserSlice.reducer;
