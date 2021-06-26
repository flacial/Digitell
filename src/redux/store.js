import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice";
import logger from 'redux-logger'

export default configureStore({
  reducer: {
    theme: themeReducer,
  },
  middleware: [logger],
});
