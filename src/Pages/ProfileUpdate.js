import { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  Collapse,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import useHttp from "../hooks/useHttp";
import useInput from "../hooks/useInput";
import Notification from "../Components/UI/Notification";
import { useDispatch } from "react-redux";
import { showNotification } from "../store/authSlice";
const ProfileUpdate = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const apiKey = useSelector((state) => state.auth.apiKey);
  const idToken = useSelector((state) => state.auth.idToken);
  const [show, setShow] = useState(true);
  const [enteredName, nameChangeHandler, resetNameState] = useInput();
  const [enteredPhotoUrl, photoUrlChangeHandler, resetPhotoUrlState] =
    useInput();
  const [httpRequest] = useHttp();
  const notification = useSelector((state) => state.auth.notification);

  const onUpdateProfile = (event) => {
    event.preventDefault();
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`;
    const userProfileInfo = {
      displayName: enteredName,
      photoUrl: enteredPhotoUrl,
      returnSecureToken: true,
      idToken: idToken,
    };
    const onSuccess = () => {
      dispatch(
        showNotification({
          message: "Profile updated successfully!",
          variant: "primary",
        })
      );
    };
    const onError = () => {
      dispatch(
        showNotification({ message: "There was an error!", variant: "danger" })
      );
    };
    httpRequest(url, "POST", userProfileInfo, onSuccess, onError);
  };

  const onVerifyEmailHandler = () => {
    if (!idToken) {
      alert("User is not authenticated. Please log in again.");
      return;
    }

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`;
    const data = {
      requestType: "VERIFY_EMAIL",
      idToken: idToken, // Make sure idToken is valid
    };

    const onSuccess = () => {
      alert("Verification email sent successfully! Check your inbox.");
    };

    const onError = (errorResponse) => {
      console.error("Error:", errorResponse);
      alert("There was an error! " + (errorResponse?.error?.message || ""));
    };

    httpRequest(url, "POST", data, onSuccess, onError);
  };

  useEffect(() => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`;
    const onSuccess = (data) => {
      const { users } = data;
      users.forEach((user) => {
        const name = user.displayName ?? "";
        resetNameState(name);
        const photoUrl = user.photoUrl ?? "";
        resetPhotoUrlState(photoUrl);
      });
    };
    const onError = (errorResponse) => {
      console.log(errorResponse.error.message);
      alert("There was an error!");
    };
    httpRequest(url, "POST", { idToken: idToken }, onSuccess, onError);
    setOpen(true);
    // eslint-disable-next-line
  }, []);

  return (
    <Container className='py-3'>
      {show && (
        <Alert
          style={{ maxWidth: "25rem" }}
          variant='danger'
          onClose={() => setShow(false)}
          dismissible
          className='mt-3 mx-auto border-0'
        >
          Your email is not verified yet!{" "}
          <Button size='sm' variant='danger' onClick={onVerifyEmailHandler}>
            Verify it
          </Button>
        </Alert>
      )}
      <Collapse in={open}>
        <Card
          style={{ maxWidth: "35rem" }}
          className='mx-auto text-dark shadow border-0 mt-5'
        >
          <Form className='px-3 py-4' onSubmit={onUpdateProfile}>
            <div className='text-center pb-3'>
              <h4 className='fw-bold text-success'>Personal Details</h4>
            </div>
            <Form.Group className='' controlId='formGridEmail'>
              <Form.Label className='fw-bold fs-6'>
                {" "}
                <i className='bi bi-person-lines-fill fs-5 pe-2 text-warning' />{" "}
                Full Name
              </Form.Label>
              <Form.Control
                type='text'
                required
                value={enteredName}
                onChange={nameChangeHandler}
              />
            </Form.Group>
            <Form.Group className='mt-3' controlId='formGridPassword'>
              <Form.Label className='fw-bold fs-6'>
                <i className='bi bi-globe fs-5 pe-2 text-warning' />
                Profile Photo URL
              </Form.Label>
              <Form.Control
                type='text'
                required
                value={enteredPhotoUrl}
                onChange={photoUrlChangeHandler}
              />
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-4 w-100'>
              Update
            </Button>
          </Form>
        </Card>
      </Collapse>
      {notification.message && (
        <Notification
          errorMessage={notification.message}
          variant={notification.variant}
        />
      )}
    </Container>
  );
};

export default ProfileUpdate;
