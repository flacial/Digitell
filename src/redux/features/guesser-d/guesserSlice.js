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

// const INITIAL_CELL_COUNT = 0;
const RandomNumber = Math.floor(Math.random() * 20);
const isInt = RandomNumber === 0 ? 1 : RandomNumber;

export const guesserSlice = createSlice({
  name: "guesserD",
  initialState: {
    currentBinary: isInt.toString(2),
    digitNumber: isInt,
    inputCode: [],
    cellIndex: 0,
    cellCount: (isInt + 1).toString(2).length,
  },
  reducers: {
    setInputCode: (state, action) => {
      state.inputCode.splice(state.cellIndex - 1, 1, action.payload);
    },
    setCellIndex: (state, action) => {
      state.cellIndex += action.payload;
    },
    setDigitNumber: (state, { payload }) => {
      const randomUnique = (range, count) => {
        let nums = new Set();
        while (nums.size < count) {
          nums.add(Math.floor(Math.random() * (range - 1 + 1) + 1));
        }
        return [...nums];
      };

      // A function that takes in a number argument called x
      // Generate a random array of numbers from 1 to 100
      // Return one number from the array that isn't equal to x

      // const process = (x) => {
      //   const arr = [];
      //   for (var i = 1; i <= 5; i++) {
      //     arr.push(i);
      //   }
      //   let rand = Math.floor(Math.random() * arr.length);
      //   while (arr[rand] === x) {
      //     rand = Math.floor(Math.random() * arr.length);
      //   }
      //   return arr[rand];
      // };

      // console.log(process(5));

      state.digitNumber = randomUnique(20, 1)[0];
    },
    setCurrentBinary: (state) => {
      state.currentBinary = state.digitNumber.toString(2);
    },
    setInputCodeManually: (state, { payload }) => {
      state.inputCode = payload;
    },
    setCellCount: (state, { payload }) => {
      state.cellCount = (state.digitNumber + 1).toString(2).length;
    },
    clearCellIndex: (state) => {
      state.cellIndex = 0;
    },
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
  clearCellIndex,
} = guesserSlice.actions;

export default guesserSlice.reducer;
