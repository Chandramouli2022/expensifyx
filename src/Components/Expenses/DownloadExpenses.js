import { Button, Card } from "react-bootstrap";
import { useRef } from "react";
import { useSelector } from "react-redux";

const DownloadExpenses = () => {
  const downloadLinkRef = useRef(null);
  const expenses = useSelector((state) => state.expenses.expenses);

  const convertToCSV = () => {
    const cols = ["Date", "Category", "Description", "Amount"];
    const rows = expenses.map((expense) =>
      [expense.date, expense.category, expense.description, expense.money].join(
        ","
      )
    );
    return [cols.join(","), ...rows].join("\n");
  };

  const downloadHandler = () => {
    const csvData = convertToCSV();
    const blob = new Blob([csvData]);
    const url = URL.createObjectURL(blob);
    downloadLinkRef.current.href = url;
  };

  return (
    <Card className="mt-3 mt-lg-0 border-0 shadow bg-primary bg-opacity-75 bg-gradient ">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="text-dark text-opacity-50">DownLoad Expenses</h5>
            <Button
              onClick={downloadHandler}
              download={"expenses.csv"}
              as="a"
              variant="dark"
              ref={downloadLinkRef}
              className=""
            >
              <i className="bi bi-download"></i>
            </Button>
          </div>
          <i className=" text-secondary fs-3 bi bi-file-earmark">.csv</i>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DownloadExpenses;
