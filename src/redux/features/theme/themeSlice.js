import { createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native";

// Get the default color scheme of the devices (dark, light, or null)
const colorScheme = Appearance.getColorScheme();

export const themeSlice = createSlice({
  name: "themeMode",
  initialState: {
    themeMode: colorScheme === "dark" ? "dark" : "light",
  },
  reducers: {
    setThemeMode: (state) => {
        state.themeMode = state.themeMode === "light" ? "dark" : "light";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setThemeMode } = themeSlice.actions;

export default themeSlice.reducer;
