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
  const [enteredDate, inputDateChangeHandler, resetInputDateState] = useInput();
  const [enteredCategory, inputCategoryChangeHandler] = useInput("Salary");
  const [addIncomeHandler] = useHttp();
  const endPointUrl = `https://expense-tracker-fb-31dbe-default-rtdb.firebaseio.com/income${userEmail}.json`;
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      totalIncome: enteredIncome,
      description: "Income",
      category: enteredCategory,
      date: enteredDate,
    };
    console.log(data);
    const onSuccess = () => {
      dispatch(addIncome(+enteredIncome));
      resetIncomeState();
      resetInputDateState();
    };
    const onError = () => {
      alert("There was an error!");
    };

    addIncomeHandler(endPointUrl, "POST", data, onSuccess, onError);
  };

  return (
    <Form onSubmit={onSubmitHandler} className='shadow rounded p-4'>
      <Form.Group className='mb-2 mb-lg-0' controlId='formGridIncome'>
        <Form.Label className='fw-bold fs-6'>Total Income</Form.Label>
        <Form.Control
          type='number'
          min={0}
          required
          value={enteredIncome}
          onChange={incomeInputChangeHandler}
        />
      </Form.Group>
      <Form.Group className='mb-2 mb-lg-0' controlId='formGridCategory'>
        <Form.Label className='fw-bold fs-6'>Category</Form.Label>
        <Form.Select
          onChange={inputCategoryChangeHandler}
          value={enteredCategory}
          aria-label='Default select example'
        >
          <option value='Salary'>Salary</option>
          <option value='Others'>Others</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className='mb-2 mb-lg-0' controlId='formDate'>
        <Form.Label className='fw-bold fs-6'>Date</Form.Label>
        <Form.Control
          type='date'
          required
          value={enteredDate}
          onChange={inputDateChangeHandler}
        />
      </Form.Group>
      <Button type='submit' variant='dark mt-4'>
        Add Income
      </Button>
    </Form>
  );
};

export default Income;
