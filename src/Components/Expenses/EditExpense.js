import { Modal, Button, Form } from "react-bootstrap";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addExpense } from "../../store/expensesSlice";
import { setTotalExpenses } from "../../store/expensesSlice";
import useHttp from "../../hooks/useHttp";
const EditExpense = (props) => {
  const moneyRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const dateRef = useRef();
  const [onEditExpenseHandler] = useHttp()
  const { item } = props;

  const date = new Date(item.date);
  const email = useSelector((state) => state.auth.email);
  const userEmail = email.replace(/[.]/g, "");
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const dispatch = useDispatch();
  
  const endPointUrl =  `https://expense-tracker-fb-31dbe-default-rtdb.firebaseio.com/expenses${userEmail}/${item.id}.json`
  
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const expenseItem = {
      money: moneyRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      date: dateRef.current.value,
    };

    const onSuccess = (data) => {
      const expenseObj = { id: item.id, ...data };
      dispatch(addExpense({ expenseItem: expenseObj }));
      dispatch(setTotalExpenses());
      props.handleClose();
    }
    const onError = (errorResponse) => {
          const {message : errorMessage} = errorResponse.error
          alert(errorMessage)
    }

   onEditExpenseHandler(endPointUrl, "PUT", expenseItem, onSuccess, onError)
    
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Body>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-2 mb-lg-0" controlId="formGridMoney">
            <Form.Label className="fw-bold fs-6 text-dark">
              Money Spent
            </Form.Label>
            <Form.Control
              ref={moneyRef}
              defaultValue={item.money}
              type="number"
              min={0}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2 mb-lg-0" controlId="formGridDescription">
            <Form.Label className="fw-bold fs-6 text-dark">
              Expense Description
            </Form.Label>
            <Form.Control
              ref={descriptionRef}
              defaultValue={item.description}
              type="text"
              required
            />
          </Form.Group>

          <Form.Group className="mb-2 mb-lg-0" controlId="formGridCategory">
            <Form.Label className="fw-bold fs-6 text-dark">Category</Form.Label>
            <Form.Select
              ref={categoryRef}
              defaultValue={item.category}
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
            <Form.Label className="fw-bold fs-6 text-dark">Date</Form.Label>
            <Form.Control
              defaultValue={formattedDate}
              ref={dateRef}
              type="date"
              name="date"
              required
            />
          </Form.Group>
          <Button className="mt-3" type="submit" variant="info">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditExpense;
