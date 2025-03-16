import DatePicker from "react-datepicker";
import { ToggleButton } from "react-bootstrap";
import { forwardRef } from "react";
const MonthPicker = ({ selectedDate, handleDateChange }) => {
  const Toggle = forwardRef(({ onClick, value }, ref) => {
    return (
      <ToggleButton
        type="checkbox"
        variant="outline-primary"
        className="w-100 rounded-0"
        ref={ref}
        onClick={onClick}
        checked={value !== ""}
      >
        {value ? value : "Monthly"}
      </ToggleButton>
    );
  });

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="MMM yyyy"
      showMonthYearPicker
      customInput={<Toggle />}
    />
  );
};

export default MonthPicker;
