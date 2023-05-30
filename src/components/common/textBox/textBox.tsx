import React, { FC } from "react";
import { getLabelName, isArabicCurrentLanguage } from "../../../utils";
import { Form } from "react-bootstrap";

type TextBoxType = "text" | "number" | "checkbox" | "textarea" | "password";
type ControlSize =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | undefined;
export const TextBox: FC<{
  labelName: string;
  inputName: string;
  inputValue:
    | string
    | ReadonlyArray<string>
    | number
    | boolean
    | undefined
    | null;
  errorText?: string | null;
  placeHolder?: string | undefined;
  isMandatory?: boolean | null;
  isReadOnly?: boolean | undefined;
  onChange?: any | undefined;
  onBlur?: any | undefined;
  type?: TextBoxType | null;
  controlSize?: ControlSize;
  labelSize?: ControlSize;
}> = ({
  labelName,
  inputName,
  inputValue,
  errorText,
  placeHolder,
  isMandatory = false,
  isReadOnly = false,
  type = "text",
  onChange,
  onBlur,
  controlSize = 4,
  labelSize = 2,
}) => {
  const cssPrefix: string = isArabicCurrentLanguage() ? "_ar" : "_en";
  const errorClassName =
    errorText !== null && errorText !== undefined
      ? `error${cssPrefix}`
      : isMandatory &&
        (inputValue === null || inputValue === undefined || inputValue === "")
      ? `error${cssPrefix}`
      : `success${cssPrefix}`;
  const inputClassName: string =
    type === "checkbox" ? "" : `form-control ${errorClassName}`;
  const isInputField: boolean =
    type === "checkbox" ||
    type === "number" ||
    type === "text" ||
    type === "password";
  const renderError = () => {
    if (errorText) {
      return (
        <Form.Control.Feedback className="d-block" type="invalid">
          {errorText}
        </Form.Control.Feedback>
      );
    }
    return null;
  };
  return (
    <>
      {/* <div className={formGroupClass}> */}
      {/* col-sm-2  */}
      <div
        className={`col-xxl-${labelSize} col-xl-${labelSize} col-lg-${labelSize} col-md-${labelSize} col-sm-12 col-12 pt-2`}
      >
        <label htmlFor={inputName}>
          {getLabelName(labelName)}
          {isMandatory && <span className="asterisk">*</span>}
        </label>
      </div>
      {/* <div className={isInputField ? "col-sm-10" : "col-sm-12"}> */}
      <div
        className={`col-xxl-${controlSize} col-xl-${controlSize} col-lg-${controlSize} col-md-${controlSize} col-sm-12 col-12`}
      >
        {isInputField && (
          <input
            // @ts-ignore
            type={type}
            id={inputName}
            key={inputName}
            name={inputName}
            className={inputClassName}
            placeholder={placeHolder}
            readOnly={isReadOnly}
            // @ts-ignore
            value={type !== "checkbox" && inputValue}
            checked={type === "checkbox" && Boolean(inputValue)}
            // @ts-ignore
            onChange={onChange}
            // @ts-ignore
            onBlur={onBlur}
          />
        )}

        {!isInputField && (
          <textarea
            id={inputName}
            key={inputName}
            name={inputName}
            className={inputClassName}
            rows={3}
            placeholder={placeHolder}
            readOnly={isReadOnly}
            // @ts-ignore
            value={inputValue}
            // @ts-ignore
            onChange={onChange}
            // @ts-ignore
            onBlur={onBlur}
          />
        )}
        {renderError()}
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
};
