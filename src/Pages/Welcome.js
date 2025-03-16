import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import Expenses from "../Components/Expenses/Expenses";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { activatePremium } from "../store/expensesSlice";

const Welcome = () => {
  const [show, setShow] = useState(true);
  const premium = useSelector((state) => state.expenses.premium);
  const totalExpenses = useSelector((state) => state.expenses.totalExpenses);
  const dispatch = useDispatch();
  const activatePremiumHandler = () => {
    dispatch(activatePremium());
    setShow(false);
  };

  const showPremiumButton = totalExpenses > 10000 && !premium;

  return (
    <>
      <Container fluid>
        {showPremiumButton && (
          <Alert
            className="mx-auto mt-2 border-0"
            style={{ maxWidth: "62rem" }}
            dismissible
            onClose={() => setShow(false)}
            show={show}
          >
            <Row className="">
              <Col lg={9}>
                <p className="fw-bold">
                  Your expenses have gone beyond $10000, we suggest you to go
                  for Premium.
                </p>
              </Col>
              <Col lg={3} className="">
                <Button onClick={activatePremiumHandler} size="sm" variant="success">
                  Activate Premium
                </Button>
              </Col>
            </Row>
          </Alert>
        )}
        <Expenses />
      </Container>
    </>
  );
};

export default Welcome;
