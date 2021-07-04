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

const INITIAL_CELL_COUNT = 0

export const guesserSlice = createSlice({
  name: "guesserD",
  initialState: {
    currentBinary: "0",
    digitNumber: INITIAL_CELL_COUNT,
    inputCode: [],
    cellIndex: 0,
    cellCount: (INITIAL_CELL_COUNT + 1).toString(2).length
  },
  reducers: {
    setInputCode: (state, action) => {
      state.inputCode.splice(state.cellIndex - 1, 1, action.payload);
    },
    setCellIndex: (state, action) => {
      state.cellIndex += action.payload;
    },
    setDigitNumber: (state, {payload}) => {
      state.digitNumber += payload
    },
    setCurrentBinary: (state) => {
      state.currentBinary = (state.digitNumber).toString(2);
    },
    setInputCodeManually: (state, { payload }) => {
      state.inputCode = payload;
    },
    setCellCount: (state, {payload}) => {
      state.cellCount = (state.digitNumber + 1).toString(2).length
    }, clearCellIndex: (state) => {
      state.cellIndex = 0
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setInputCode,
  setCellIndex,
  setDigitNumber,
  setCurrentBinary,
  setInputCodeManually,
  setCellCount,
  clearCellIndex
} = guesserSlice.actions;

export default guesserSlice.reducer;
