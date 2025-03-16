import { Form, Button } from "react-bootstrap";
import { addIncome } from "../../store/expensesSlice";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import useHttp from "../../hooks/useHttp";
const Income = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const userEmail = email.replace(/[.]/g, "");
  const [enteredIncome, incomeInputChangeHandler, resetIncomeState] =
    useInput();
  const [addIncomeHandler] = useHttp();
  const endPointUrl = `https://expense-tracker-fb-31dbe-default-rtdb.firebaseio.com/expenses${userEmail}.json`;
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      totalIncome: enteredIncome,
    };
    const onSuccess = () => {
      dispatch(addIncome(+enteredIncome));
      resetIncomeState();
    };
    const onError = () => {
      alert("There was an error!");
    };

    addIncomeHandler(endPointUrl, "POST", data, onSuccess, onError);
  };

  return (
    <Form onSubmit={onSubmitHandler} className="shadow rounded p-4">
      <Form.Group className="mb-2 mb-lg-0" controlId="formGridIncome">
        <Form.Label className="fw-bold fs-6">Total Income</Form.Label>
        <Form.Control
          type="number"
          min={0}
          required
          value={enteredIncome}
          onChange={incomeInputChangeHandler}
        />
      </Form.Group>
      <Button type="submit" variant="dark mt-4">
        Add Income
      </Button>
    </Form>
  );
};

export default Income;
