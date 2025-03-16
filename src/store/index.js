import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expenseReducer from "./expensesSlice";
import themeReducer from "./themeSlice";
import uiReducer from "./uiSlice";
import filterReducer from "./expensesFilterSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    theme: themeReducer,
    ui: uiReducer,
    expenseFilter: filterReducer
  },
});

export default store;
