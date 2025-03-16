import ExpenseForm from "./ExpenseForm";
import ExpenseItems from "./ExpenseItems";
import { Row, Col, Container, Collapse } from "react-bootstrap";
import TotalExpense from "./TotalExpense";
import TotalIncome from "./TotalIncome";
import Balance from "./Balance";
import DownloadExpenses from "./DownloadExpenses";
import { useSelector } from "react-redux";
const Expenses = () => {
  const premium = useSelector((state) => state.expenses.premium);
  const hasSubscribed = Boolean(premium);
  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={"auto"}>
          <TotalExpense />
        </Col>
        <Col md={"auto"}>
          <TotalIncome />
        </Col>
        <Col md={"auto"}>
          <Balance />
        </Col>
        <Col>
          {
            <Collapse in={hasSubscribed}>
              <div>
                <DownloadExpenses />
              </div>
            </Collapse>
          }
        </Col>
      </Row>
      <Row>
        <Col className="py-5" lg={5}>
          <ExpenseForm />
        </Col>
        <Col className="pt-lg-5 pb-4" lg={7}>
          <ExpenseItems />
        </Col>
      </Row>
    </Container>
  );
};

export default Expenses;
