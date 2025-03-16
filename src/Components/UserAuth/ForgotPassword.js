
import { Form, Button, FloatingLabel } from "react-bootstrap";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "../../store/authSlice";
import useHttp from "../../hooks/useHttp";
import useInput from "../../hooks/useInput";
const ForgotPassword = () => {
  const [enteredEmail, emailChangeHandler, resetEmailState] = useInput();
  const [forgotPasswordHandler, show] = useHttp();
  const dispatch = useDispatch();
  const apiKey = useSelector((state) => state.auth.apiKey);
  const endPointUrl = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      requestType: "PASSWORD_RESET",
      email: enteredEmail,
    };
    const onSuccess = () => {
      const message = "A password reset link has been sent to your Email";
      resetEmailState()
      dispatch(showNotification({ message: message, variant: "info" }));
    };
    const onError = (errorResponse) => {
      const { message } = errorResponse.error;
      dispatch(showNotification({ message: message, variant: "danger" }));
    };

    forgotPasswordHandler(endPointUrl, "POST", data, onSuccess, onError);
  };
  return (
    <Form onSubmit={onSubmitHandler} className="py-4 text-dark">
      <div className="text-center pt-lg-4 pb-lg-4">
        <h6>Enter the email with which you have registered.</h6>
      </div>
      <FloatingLabel
        className="mt-4"
        controlId="floatingPassword"
        label="Email"
      >
        <Form.Control
          className="border-0 border-bottom rounded-0"
          type="email"
          placeholder="Email"
          required
          value={enteredEmail}
          onChange={emailChangeHandler}
        />
      </FloatingLabel>
      <div className="text-center mt-4 mt-lg-5">
        <Button type="submit" className="w-100" variant="primary">
          {show ? <LoadingSpinner /> : "Send Link"}
        </Button>
      </div>
    </Form>
  );
};

export default ForgotPassword;
