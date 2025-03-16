import React, { useState } from "react";
import { Col, Button, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import EditExpense from "./EditExpense";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense } from "../../store/expensesSlice";
import useHttp from "../../hooks/useHttp";
const ExpenseList = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [deleteExpenseHandler] = useHttp();
  const date = new Date(props.date);
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.auth.email);
  const userEmail = email.replace(/[.]/g, "");
  const endPointUrl = `https://expense-tracker-fb-31dbe-default-rtdb.firebaseio.com/expenses${userEmail}/${props.id}.json`;

  const onDeleteExpenseHandler = () => {
    const onSuccess = () => {
      dispatch(deleteExpense({ id: props.id }));
    };
    const onError = () => {
      alert("There was an error!");
    };
    deleteExpenseHandler(endPointUrl, "DELETE", null, onSuccess, onError);
  };

  return (
    <>
      <Row className="p-3 align-items-center border-bottom border">
        <Col xs="6" md={6}>
          <div className="d-flex align-items-center">
            <div className="px-4 d-flex flex-column bg-light shadow rounded-2">
              <span className="text-success fw-bold">{month}</span>
              <span className="text-danger fw-bold">{day}</span>
              <span className="text-secondary fw-bold">{year}</span>
            </div>
            <div className="ps-3">
              <span className="fw-bold text-secondary">
                {props.description}
              </span>
              <p className="fw-bold text-warning mx-auto">{props.category} </p>
            </div>
          </div>
        </Col>

        <Col md="2" xs={6} className="d-flex">
          <span className="fw-bold ms-auto ms-md-0 fs-6 text-danger">{`$${props.money}`}</span>   
        </Col>
        <Col className="d-flex" md="4" xs={"12"}>
          <div className="ms-auto pt-3 pt-md-0">
            <Button
              onClick={handleShow}
              variant="outline-dark"
              className="me-2 fw-bold rounded-pill px-3"
            >
              Edit
            </Button>
            <Button
              onClick={onDeleteExpenseHandler}
              variant="outline-danger"
              className="rounded-pill"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </div>
        </Col>
      </Row>
      {<EditExpense item={props} show={show} handleClose={handleClose} />}
    </>
  );
};

export default ExpenseList;
