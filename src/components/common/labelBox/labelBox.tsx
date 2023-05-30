import { FC } from "react";
type ControlSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
export const LabelBox: FC<{
  labelName: string;
  inputValue:
    | string
    | ReadonlyArray<string>
    | number
    | boolean
    | undefined
    | null;
  controlSize?: ControlSize;
  labelSize?: ControlSize;
}> = ({ labelName, inputValue, controlSize = 4, labelSize = 2 }) => {
  return (
    <>
      <div
        className={`col-xxl-${labelSize} col-xl-${labelSize} col-lg-${labelSize} col-md-${labelSize} col-sm-12 col-12 pt-2 pt-1`}
      >
        <label>{labelName}</label>
      </div>
      <div
        className={`col-xxl-${controlSize} col-xl-${controlSize} col-lg-${controlSize} col-md-${controlSize} col-sm-12 col-12 read-only-wrap`}
      >
        <label>{inputValue}</label>
      </div>
    </>
  );
};
