import { createSlice } from "@reduxjs/toolkit";

const inititalUiState = {
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: inititalUiState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = uiSlice.actions;
export default uiSlice.reducer;
