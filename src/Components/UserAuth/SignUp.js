import { Form, Button, FloatingLabel } from "react-bootstrap";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../store/authSlice";
import useInput from "../../hooks/useInput";
import useHttp from "../../hooks/useHttp";
const SignUp = () => {
  const apiKey = useSelector((state) => state.auth.apiKey);
  const dispatch = useDispatch();
  const [enteredEmail, emailChangeHandler, resetEmailState] = useInput()
  const [enteredPassword, passwordChangeHandler, resetPasswordState] = useInput()
  const [enteredConfirmPassword, confirmPasswordChangeHandler, resetConfirmPasswordState] = useInput()
  const [signupUserHandler, show] =useHttp()
  const endPointUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const userInfo = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    }
    if (enteredPassword !== enteredConfirmPassword) {
      dispatch(showNotification({ message: "Passwords don't match", variant: "danger" }));
      return;
    }
    const onSuccess = () => {
      const message = "Welcome, you can now login with your credentials";
      resetEmailState()
      resetPasswordState()
      resetConfirmPasswordState()
      dispatch(showNotification({ message: message, variant: "info" }));
    }

    const onError = (errorResponse) => {
          const {message: errorMessage} = errorResponse.error;
          dispatch(showNotification({ message: errorMessage, variant: "danger" }));
    }
  signupUserHandler(endPointUrl, "POST", userInfo, onSuccess, onError)

  };

  return (
    <Form onSubmit={onSubmitHandler} className="text-dark my-3">
      <FloatingLabel controlId="floatingEmail" label="Email">
        <Form.Control
          className="border-0 border-bottom  rounded-0 "
          type="email"
          placeholder="Email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        className="mt-3 border-0"
        controlId="floatingPassword"
        label="Password"
      >
        <Form.Control
          className="border-0 border-bottom rounded-0 "
          type="password"
          placeholder="Password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        className="mt-3 border-0 "
        controlId="floatingConfirmPassword"
        label="Confirm Password"
      >
        <Form.Control
          className="border-0 border-bottom rounded-0 "
          type="password"
          placeholder="Password"
          value={enteredConfirmPassword}
          onChange={confirmPasswordChangeHandler}
          required
        />
      </FloatingLabel>
      <Button className="w-100 my-4" variant="warning" type="submit">
        {show ? <LoadingSpinner /> : "Sign Up"}
      </Button>
    </Form>
  );
};

export default SignUp;
