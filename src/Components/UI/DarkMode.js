import { Form } from "react-bootstrap";
import { toggleTheme } from "../../store/themeSlice";
import { useSelector, useDispatch } from "react-redux";

const DarkMode = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const label =
    theme === "dark" ? (
      <i className="bi bi-moon-fill"></i>
    ) : (
      <i className="bi bi-sun-fill"></i>
    );
  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  const checked = theme === "dark" ? true : false;

  return (
    <div className="mt-2 pe-4 mb-3 mb-lg-0">
      <Form>
        <Form.Check
          onChange={toggleThemeHandler}
          type="switch"
          id="custom-switch"
          label={label}
          checked={checked}
        />
        
      </Form>
    </div>
  );
};

export default DarkMode;
