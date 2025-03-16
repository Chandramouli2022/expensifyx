import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
const TotalIncome = () => {
  const totalIncome = useSelector((state) => state.expenses.totalIncome);
  return (
    <Card className="border-0 bg-light shadow mt-3 mt-md-0">
      <Card.Body>
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="text-secondary text-opacity-50">Total Income</h5>
              <h5 className="text-warning">{`$${totalIncome}`}</h5>
            </div>
            <h5 className="text-muted">
              <i className="bi text-muted bi-currency-dollar"></i>
            </h5>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TotalIncome;
