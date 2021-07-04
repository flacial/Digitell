import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice";
import scoreReducer from "./features/score/scoreSlice"
import logger from 'redux-logger'
import guesserReducer from './features/guesser-d/guesserSlice'

export default configureStore({
  reducer: {
    theme: themeReducer,
    score: scoreReducer,
    guesser: guesserReducer
  },
  middleware: [...getDefaultMiddleware(), logger],
});
