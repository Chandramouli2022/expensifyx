import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
  theme: localStorage.getItem("theme") || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
    removeTheme: (state) =>{
      state.theme = "light";
      localStorage.removeItem("theme")
    }
  },
});

export const { toggleTheme, removeTheme } = themeSlice.actions;

export default themeSlice.reducer;
