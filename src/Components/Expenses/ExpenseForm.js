import { Form, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addExpense } from "../../store/expensesSlice";
import Income from "./Income";
import { setTotalExpenses } from "../../store/expensesSlice";
import useHttp from "../../hooks/useHttp";
import useInput from "../../hooks/useInput";

const ExpenseForm = () => {
  const [onAddExpenseHandler] = useHttp();
  const [open, setOpen] = useState("expense");
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const userEmail = email.replace(/[.]/g, "");
  const [enteredMoney, inputMoneyChangeHandler, resetInputMoneyState] =
    useInput();
  const [
    enteredDescription,
    inputDescriptionChangeHandler,
    resetInputDescriptionState,
  ] = useInput();
  const [enteredCategory, inputCategoryChangeHandler] = useInput("Food");
  const [enteredDate, inputDateChangeHandler, resetInputDateState] = useInput();

  const endPointUrl = `https://expense-tracker-fb-31dbe-default-rtdb.firebaseio.com/expenses${userEmail}.json`;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(typeof enteredMoney);
    const expenseItem = {
      money: enteredMoney,
      description: enteredDescription,
      category: enteredCategory,
      date: enteredDate,
    };

    const onSuccess = (data) => {
      let expenseObj = { id: data.name, ...expenseItem };
      dispatch(addExpense({ expenseItem: expenseObj }));
      dispatch(setTotalExpenses());
      resetInputMoneyState();
      resetInputDescriptionState();
      resetInputDateState();
    };
    const onError = (errorResponse) => {
      const { message: errorMessage } = errorResponse.error;
      alert(errorMessage);
    };
    onAddExpenseHandler(endPointUrl, "POST", expenseItem, onSuccess, onError);
  };

  const inputSelector = (type) => {
    setOpen(type);
  };
  return (
    <>
      <div className="text-center mb-3">
        <ButtonGroup className="w-100">
          <ToggleButton
            checked={open === "expense"}
            onClick={() => inputSelector("expense")}
            variant="outline-primary"
            type="checkbox"
          >
            Expense
          </ToggleButton>
          <ToggleButton
            onClick={() => inputSelector("income")}
            checked={open === "income"}
            variant="outline-primary"
            type="checkbox"
          >
            Income
          </ToggleButton>
        </ButtonGroup>
      </div>
      {open === "expense" && (
        <Form onSubmit={onSubmitHandler} className="shadow rounded p-4">
          <Form.Group className="mb-2 mb-lg-0" controlId="formGridMoney">
            <Form.Label className="fw-bold fs-6">Money Spent</Form.Label>
            <Form.Control
              type="number"
              min={0}
              required
              value={enteredMoney}
              onChange={inputMoneyChangeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-2 mb-lg-0" controlId="formGridDescription">
            <Form.Label className="fw-bold fs-6">
              Expense Description
            </Form.Label>
            <Form.Control
              type="text"
              required
              value={enteredDescription}
              onChange={inputDescriptionChangeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-2 mb-lg-0" controlId="formGridCategory">
            <Form.Label className="fw-bold fs-6">Category</Form.Label>
            <Form.Select
              onChange={inputCategoryChangeHandler}
              value={enteredCategory}
              aria-label="Default select example"
            >
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Salary">Salary</option>
              <option value="Health">Health</option>
              <option value="Personal Care">Personal Care</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2 mb-lg-0" controlId="formDate">
            <Form.Label className="fw-bold fs-6">Date</Form.Label>
            <Form.Control
              type="date"
              required
              value={enteredDate}
              onChange={inputDateChangeHandler}
            />
          </Form.Group>

          <Button type="submit" variant="dark" className="mt-4">
            Add Expense
          </Button>
        </Form>
      )}
      {open === "income" && <Income />}
    </>
  );
};

export default ExpenseForm;
