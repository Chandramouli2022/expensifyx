import { Form, Button, FloatingLabel } from "react-bootstrap";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/authSlice";
import { showNotification } from "../../store/authSlice";
import useInput from "../../hooks/useInput";
import useHttp from "../../hooks/useHttp";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const apiKey = useSelector((state) => state.auth.apiKey);
  const [enteredEmail, emailChangeHandler, resetEmailState] = useInput();
  const [enteredPassword, passwordChangeHandler, resetPasswordState] =
    useInput();
  const [loginUserHandler, show] = useHttp();
  const endPointUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const userInfo = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };
    const onSuccess = (data) => {
      dispatch(login({ idToken: data.idToken, email: data.email }));
      resetEmailState();
      resetPasswordState();
      history.replace("/welcome");
    };
    const onError = (errorResponse) => {
      const { message: errorMessage } = errorResponse.error;
      dispatch(showNotification({ message: errorMessage, variant: "danger" }));
    };

    loginUserHandler(endPointUrl, "POST", userInfo, onSuccess, onError);
  };

  return (
    <Form onSubmit={onSubmitHandler} className='text-dark my-4'>
      <FloatingLabel
        controlId='floatingEmail'
        className='text-dark'
        label='Email'
      >
        <Form.Control
          className='border-0 border-bottom rounded-0'
          type='email'
          placeholder='Email'
          onChange={emailChangeHandler}
          value={enteredEmail}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        className='mt-3 border-0'
        controlId='floatingPassword'
        label='Password'
      >
        <Form.Control
          className='border-0 border-bottom rounded-0'
          type='password'
          placeholder='Password'
          value={enteredPassword}
          onChange={passwordChangeHandler}
          required
        />
      </FloatingLabel>
      <Button
        className='w-100 mt-4 mt-lg-5'
        variant='success'
        type='submit'
        style={{ backgroundColor: "#ff5a00", border: "none" }}
      >
        {show ? <LoadingSpinner /> : "Login"}
      </Button>
    </Form>
  );
};

export default Login;
