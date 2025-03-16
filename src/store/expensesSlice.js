import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = {
  expenses: [],
  premium: localStorage.getItem("premium") || false,
  expenseLoading: false,
  totalIncome: 0,
  totalExpenses: 0,
  filter: null,
  date: null,
};
const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialExpensesState,
  reducers: {
    addExpense: (state, action) => {
      const { expenseItem } = action.payload;
      const filterDate = new Date(state.date);
      const expenseDate = new Date(expenseItem.date);
      if (state.filter === "day") {
        expenseItem.filtered =
          expenseDate.getFullYear() === filterDate.getFullYear() &&
          expenseDate.getMonth() === filterDate.getMonth() &&
          expenseDate.getDate() === filterDate.getDate();
      } else if (state.filter === "month") {
        expenseItem.filtered =
          expenseDate.getFullYear() === filterDate.getFullYear() &&
          expenseDate.getMonth() === filterDate.getMonth();
      } else if (state.filter === "year") {
        expenseItem.filtered =
          expenseDate.getFullYear() === filterDate.getFullYear();
      } else {
        expenseItem.filtered = true;
      }

      const isPresent = state.expenses.some((ele) => ele.id === expenseItem.id);
      if (isPresent) {
        state.expenses = state.expenses.map((ele) => {
          if (ele.id === expenseItem.id) {
            return expenseItem;
          }
          return ele;
        });
      } else {
        state.expenses.push(expenseItem);
      }
    },
    deleteExpense: (state, action) => {
      const { id } = action.payload;
      const expenseItem = state.expenses.find((item) => item.id === id);
      state.totalExpenses = state.totalExpenses - expenseItem.money;
      state.expenses = state.expenses.filter((item) => item.id !== id);
    },
    activatePremium: (state) => {
      state.premium = true;
      localStorage.setItem("premium", state.premium);
    },
    deactivatePremium: (state) => {
      state.premium = false;
      localStorage.removeItem("premium");
    },
    clearExpenses: (state) => {
      state.expenses = [];
    },
    displaySpinner: (state, action) => {
      state.expenseLoading = action.payload;
    },
    addIncome: (state, action) => {
      state.totalIncome = state.totalIncome + action.payload;
    },
    clearIncome: (state)=>{
      state.totalIncome = 0;
    },
    setTotalExpenses: (state) => {
      state.totalExpenses = state.expenses.reduce((acc, currVal) => {
        return acc + +currVal.money;
      }, 0);
    },
    filterExpenses: (state, action) => {
      const { filter, date } = action.payload;
      state.date = date;
      const enteredDate = new Date(date);
      state.expenses.forEach((expense) => {
        const expenseDate = new Date(expense.date);
        state.filter = filter;
        if (filter === "month") {
          expense.filtered =
            expenseDate.getFullYear() === enteredDate.getFullYear() &&
            expenseDate.getMonth() === enteredDate.getMonth();
        } else if (filter === "day") {
          expense.filtered =
            expenseDate.getFullYear() === enteredDate.getFullYear() &&
            expenseDate.getMonth() === enteredDate.getMonth() &&
            expenseDate.getDate() === enteredDate.getDate();
        } else if (filter === "year") {
          expense.filtered =
            expenseDate.getFullYear() === enteredDate.getFullYear();
        } else {
          expense.filtered = true;
        }
      });
    },
    clearFilter: (state) => {
      state.filter = null;
    },
  },
});

export default expensesSlice.reducer;
export const {
  addExpense,
  deleteExpense,
  activatePremium,
  deactivatePremium,
  clearExpenses,
  displaySpinner,
  addIncome,
  clearIncome,
  setTotalExpenses,
  filterExpenses,
  clearFilter,
} = expensesSlice.actions;
