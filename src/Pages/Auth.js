import React, { useState } from "react";
import { Container, Row, Col, ToggleButton } from "react-bootstrap";
import Login from "../Components/UserAuth/Login";
import SignUp from "../Components/UserAuth/SignUp";
import ForgotPassword from "../Components/UserAuth/ForgotPassword";
import Notification from "../Components/UI/Notification";
import { useSelector } from "react-redux";
const Auth = () => {
  const [active, setActive] = useState("login");
  const notification = useSelector((state) => state.auth.notification);
  const onSelect = (type) => {
    setActive(type);
  };
  return (
    <Container className='min-vh-100 d-flex align-items-center justify-content-center'>
      <div className='w-100'>
        <div className='text-center'>
          <h2 className='text-warning fst-italic mb-2'>ExpensifyX</h2>{" "}
          <p className='fs-6 mb-4'>
            Empower Your Financial Journey with Effortless ExpensifyX!
          </p>
        </div>
        {notification.message && (
          <Notification
            errorMessage={notification.message}
            variant={notification.variant}
          />
        )}
        <Row className='justify-content-center mx-auto'>
          <Col lg={"auto"} className='px-0 shadow'>
            <div className='d-flex flex-lg-column justify-content-evenly h-100'>
              <ToggleButton
                variant='outline-success'
                className='w-100 h-100 border-0 rounded-0 d-flex align-items-center justify-content-center fw-bold'
                style={{ backgroundColor: "#ff5a00" }}
                onClick={() => onSelect("login")}
                type='checkbox'
                checked={active === "login"}
              >
                <div className='my-lg-3' >
                  <i className='bi fs-3 bi-person-check-fill'></i>
                  <p className='mb-0'>Login</p>
                </div>
              </ToggleButton>

              <ToggleButton
                variant='outline-warning'
                className='w-100 h-100 border-0 d-flex align-items-center justify-content-center rounded-0 fw-bold'
                onClick={() => onSelect("signup")}
                type='checkbox'
                checked={active === "signup"}
              >
                <div className=''>
                  <i className='bi fs-3 bi-check-circle-fill'></i>
                  <p className='mb-0'>Sign Up</p>
                </div>
              </ToggleButton>

              <ToggleButton
                onClick={() => onSelect("forgotpassword")}
                variant='outline-primary'
                className='w-100 h-100 border-0 rounded-0 fw-bold d-flex align-items-center justify-content-center'
                type='checkbox'
                checked={active === "forgotpassword"}
              >
                <div className=''>
                  <i className='bi fs-3 p-0 bi-key-fill'></i>
                  <p className='pt-0 m-0'>Forgot Password</p>
                </div>
              </ToggleButton>
            </div>
          </Col>
          <Col lg={5} className='p-3 mt-4 mt-lg-0 shadow ms-lg-4'>
            {active === "login" && <Login />}
            {active === "signup" && <SignUp />}
            {active === "forgotpassword" && <ForgotPassword />}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Auth;
