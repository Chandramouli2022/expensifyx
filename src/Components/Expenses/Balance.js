import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
const Balance = () => {
  const totalIncome = useSelector((state) => state.expenses.totalIncome);
  const totalExpenses = useSelector((state) => state.expenses.totalExpenses);
  const balance = totalIncome - totalExpenses;
  const symbol = balance >= 0 ? "$" : "-$";

  return (
    <Card className="border-0  shadow mt-3 mt-md-0 bg-light">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="text-secondary text-opacity-50">Balance</h5>
            <h5 className="text-warning">{`${symbol}${Math.abs(balance)}`}</h5>
          </div>
          <h5 className="text-muted">
            <i className="bi text-muted bi-currency-dollar"></i>
          </h5>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Balance;
