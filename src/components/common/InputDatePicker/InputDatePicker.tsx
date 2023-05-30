import React, { FC } from "react";
import { getMonth, getYear } from "date-fns";
import DatePicker, {
  ReactDatePickerCustomHeaderProps,
  ReactDatePickerProps,
} from "react-datepicker";
import _ from "lodash";
import { Col, Form, Row } from "react-bootstrap";
import { useField, useFormikContext } from "formik";
import { getLabelName } from "../../../utils";
import "./customDatePickerWidth.css";
const InputHeader: FC<ReactDatePickerCustomHeaderProps> = (props) => {
  const {
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  } = props;

  const years: number[] = _.range(1920, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div
      style={{
        margin: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        {"<"}
      </button>
      <select
        value={getYear(date)}
        onChange={({ target: { value } }) => changeYear(parseInt(value))}
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={months[getMonth(date)]}
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
      >
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        {">"}
      </button>
    </div>
  );
};
type CustomDatePickerPropsWithForm = Omit<
  ReactDatePickerProps,
  "onChange" | "name"
> & {
  onChange?(
    date: Date | null,
    event: React.SyntheticEvent<any> | undefined
  ): void;
  InputLabel?: string;
  name: string;
  controlSize?: ControlSize;
  labelSize?: ControlSize;
};
export const InputDatePickerInForm: FC<CustomDatePickerPropsWithForm> = (
  props
) => {
  const {
    name,
    InputLabel,
    showTimeSelect,
    controlSize = 4,
    labelSize = 2,
  } = props;
  const { setFieldValue } = useFormikContext();
  const [field, { error }] = useField(name);
  const renderError = () => {
    if (error) {
      return (
        <Form.Control.Feedback className="d-block" type="invalid">
          {error}
        </Form.Control.Feedback>
      );
    }
    return null;
  };
  const isInvalidClassName = error ? "form-control is-invalid" : "form-control";
  return (
    <>
      <div
        className={`col-xxl-${labelSize} col-xl-${labelSize} col-lg-${labelSize} col-md-${labelSize} col-sm-12 col-12 pt-2`}
      >
        <label>{getLabelName(InputLabel as string)}</label>
      </div>
      <div
        className={`col-xxl-${controlSize} col-xl-${controlSize} col-lg-${controlSize} col-md-${controlSize} col-sm-12 col-12 customDatePickerWidth`}
      >
        <DatePicker
          className={isInvalidClassName}
          renderCustomHeader={(
            headerProps: ReactDatePickerCustomHeaderProps
          ) => <InputHeader {...headerProps} />}
          selected={(field.value && new Date(field.value)) || null}
          dateFormat={showTimeSelect ? "MMMM d, yyyy h:mm aa" : "dd/MM/yyyy"}
          {...props}
          onChange={(val) => {
            setFieldValue(field.name, val);
          }}
        />
        {renderError()}
      </div>
    </>
  );
};

type ControlSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
type CustomDatePickerProps = ReactDatePickerProps & {
  selectedDate?: Date;
  InputLabel: string;
  controlSize?: ControlSize;
  labelSize?: ControlSize;
};

export const InputDatePicker: FC<CustomDatePickerProps> = (props) => {
  const {
    selectedDate,
    InputLabel,
    showTimeSelect,
    controlSize = 4,
    labelSize = 2,
  } = props;
  return (
    <>
      <div
        className={`col-xxl-${labelSize} col-xl-${labelSize} col-lg-${labelSize} col-md-${labelSize} col-sm-12 col-12 pt-2`}
      >
        <label>{getLabelName(InputLabel)}</label>
      </div>
      <div
        className={`col-xxl-${controlSize} col-xl-${controlSize} col-lg-${controlSize} col-md-${controlSize} col-sm-12 col-12 customDatePickerWidth`}
      >
        <DatePicker
          wrapperClassName="customDatePickerWidth"
          renderCustomHeader={(
            headerProps: ReactDatePickerCustomHeaderProps
          ) => <InputHeader {...headerProps} />}
          selected={selectedDate}
          dateFormat={showTimeSelect ? "MMMM d, yyyy h:mm aa" : "dd/MM/yyyy"}
          {...props}
        />
      </div>
    </>
  );
};
