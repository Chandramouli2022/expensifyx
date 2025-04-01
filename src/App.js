import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./Pages/Auth";
import Welcome from "./Pages/Welcome";
import ProfileUpdate from "./Pages/ProfileUpdate";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  clearExpenses,
  setTotalExpenses,
  displaySpinner,
  addIncome,
  clearIncome,
} from "./store/expensesSlice";
import axios from "axios";
import { useEffect } from "react";
import Mainnav from "./Pages/Mainnav";

const App = () => {
  var isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(typeof isAuthenticated);
  const email = useSelector((state) => state.auth.email);
  const userEmail = isAuthenticated ? email.replace(/[.]/g, "") : undefined;
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const containerStyle = {
    backgroundColor: theme === "dark" ? "#333333" : "#fcdbc9",
    color: theme === "dark" ? "#fff" : "#ff5a00",
    minHeight: "100vh",
  };
  const incomeUrl = `https://expense-tracker-fb-31dbe-default-rtdb.firebaseio.com/income${userEmail}.json`;
  const expensesUrl = `https://expense-tracker-fb-31dbe-default-rtdb.firebaseio.com/expenses${userEmail}.json`;
  const urls = [incomeUrl, expensesUrl];

  useEffect(() => {
    async function getExpenses() {
      try {
        dispatch(displaySpinner(true));
        const requests = urls.map((url) => axios.get(url));
        const responses = await Promise.all(requests);
        const { data: expensesData } = responses[1];
        const { data: incomeData } = responses[0];
        console.log(responses[0]);
        for (const key in expensesData) {
          const obj = { id: key, ...expensesData[key] };
          dispatch(addExpense({ expenseItem: obj }));
        }
        console.log("Income Data:", incomeData);
        dispatch(setTotalExpenses());
        for (const key in incomeData) {
          const { totalIncome } = { ...incomeData[key] };
          const obj = { id: key, money: totalIncome, ...incomeData[key] };
          const validIncome = Number(totalIncome) || 0; // Ensures a valid number
          dispatch(addIncome(validIncome));
          dispatch(addExpense({ expenseItem: obj }));
        }
      } catch (error) {
        alert("There was an error");
      } finally {
        dispatch(displaySpinner(false));
      }
    }
    getExpenses();

    return () => {
      dispatch(clearExpenses());
      dispatch(clearIncome());
    };
    // eslint-disable-next-line
  }, [userEmail]);

  return (
    <div style={containerStyle}>
      {isAuthenticated && <Mainnav />}
      <Switch>
        <Route path='/' exact>
          <Redirect to='/auth' />
        </Route>
        <Route path='/auth'>
          {isAuthenticated && <Redirect to='/Welcome' />}
          <Auth />
        </Route>
        {isAuthenticated && (
          <Route Route path='/welcome'>
            <Welcome />
          </Route>
        )}
        {isAuthenticated && (
          <Route path='/profileupdate'>
            <ProfileUpdate />
          </Route>
        )}

        {isAuthenticated ? (
          <Redirect from='*' to='/welcome' />
        ) : (
          <Redirect from='*' to='/' />
        )}
      </Switch>
    </div>
  );
};

export default App;
