import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = {
  day: null,
  month: null,
  year: null,
};

const filterSlice = createSlice({
  name: "filterExpenses",
  initialState: initialFilterState,
  reducers: {
    selectDay: (state, action) => {
      state.day = action.payload.day;
      state.month = null;
      state.year = null;
    },
    selectMonth: (state, action) => {
      state.month = action.payload.month;
      state.day = null;
      state.year = null;
    },
    selectYear: (state, action) => {
      state.year = action.payload.year;
      state.month = null;
      state.day = null;
    },
    clearDate: (state) => {
      state.day = null;
      state.month = null;
      state.year = null;
    },
  },
});

export const { selectDay, selectMonth, selectYear, clearDate } =
  filterSlice.actions;
export default filterSlice.reducer;
