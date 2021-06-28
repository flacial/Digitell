import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice";
import scoreReducer from "./features/score/scoreSlice"
import logger from 'redux-logger'

export default configureStore({
  reducer: {
    theme: themeReducer,
    score: scoreReducer
  },
  middleware: [logger],
});
