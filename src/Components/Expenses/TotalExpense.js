import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
const TotalExpense = () => {
  const totalExpenses = useSelector((state) => state.expenses.totalExpenses);
  return (
    <Card className="border-0 bg-light shadow mt-3 mt-md-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="text-secondary text-opacity-50">Total Expense</h5>
            <h5 className="text-warning">{`$${totalExpenses}`}</h5>
          </div>
          <h5 className="text-black text-opacity-50">
            <i className="bi bi-currency-dollar text-opacity-50"></i>
          </h5>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TotalExpense;
