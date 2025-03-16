import DatePicker from "react-datepicker";
import { ToggleButton } from "react-bootstrap";
import { forwardRef } from "react";
const DayPicker = ({ selectedDate, handleDateChange }) => {
  const Toggle = forwardRef(({ onClick, value }, ref) => {
    return (
      <ToggleButton
        type="checkbox"
        variant="outline-primary"
        className="w-100 rounded-0 rounded-start border-end-0"
        ref={ref}
        onClick={onClick}
        checked={value !== ""}
      >
        {value ? value : "Daily"}
      </ToggleButton>
    );
  });

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="dd MMM yy"
      customInput={<Toggle />}
    />
  );
};

export default DayPicker;
