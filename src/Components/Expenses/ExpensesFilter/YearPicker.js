import DatePicker from "react-datepicker";
import { ToggleButton } from "react-bootstrap";
import { forwardRef } from "react";
const YearPicker = ({ selectedDate, handleDateChange }) => {
  const Toggle = forwardRef(({ onClick, value }, ref) => {
    return (
      <ToggleButton
        type="checkbox"
        variant="outline-primary"
        className="w-100 rounded-0 rounded-end"
        ref={ref}
        onClick={onClick}
        checked={value !== ""}
      >
        {value ? value : "Yearly"}
      </ToggleButton>
    );
  });

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="yyyy"
      showYearPicker
      customInput={<Toggle />}
    />
  );
};

export default YearPicker;
