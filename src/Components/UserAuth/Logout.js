import { Button } from "react-bootstrap";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { clearDate } from "../../store/expensesFilterSlice";
import { clearFilter, deactivatePremium } from "../../store/expensesSlice";
import { removeTheme } from "../../store/themeSlice";
const Logout = () => {
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(logout());
    dispatch(clearDate());
    dispatch(clearFilter());
    dispatch(removeTheme());
    dispatch(deactivatePremium());
  };

  return (
    <Button onClick={onLogoutHandler} className="inline" variant="dark">
      Logout
    </Button>
  );
};

export default Logout;
