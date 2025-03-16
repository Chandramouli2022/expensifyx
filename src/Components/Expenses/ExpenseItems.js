import { ListGroup, Card } from "react-bootstrap";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useSelector } from "react-redux";
import ExpenseList from "./ExpenseList";
import ExpensesFilter from "./ExpensesFilter/ExpensesFilter";
const ExpenseItems = () => {
  const allExpenses = useSelector((state) => state.expenses.expenses);
  const filteredExpenses = allExpenses.filter((expense) => expense.filtered);
  let content;
  if (filteredExpenses.length === 0) {
    content = (
      <div className="text-center pt-5">
        <h4>No Expenses Found!</h4>
      </div>
    );
  }
  const isLoading = useSelector((state) => state.expenses.expenseLoading);

  return (
    <>
      <ExpensesFilter />
      {isLoading ? (
        <div className="text-center mt-5">
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          {content ? (
            content
          ) : (
            <Card className="overflow-hidden border-0 shadow-lg">
              <ListGroup variant="flush">
                {filteredExpenses.map((item) => (
                  <ExpenseList
                    key={item.id}
                    money={item.money}
                    description={item.description}
                    category={item.category}
                    date={item.date}
                    id={item.id}
                  />
                ))}
              </ListGroup>
            </Card>
          )}
        </div>
      )}
    </>
  );
};

export default ExpenseItems;
