import _ from "lodash";
import { FC } from "react";
import { KeyValueModel } from "../../../models";
import { getLabelName } from "../../../utils";
type ControlSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
type BoxType = "radio" | "checkbox";
export const RadioCheckBox: FC<{
  labelName: string;
  items: KeyValueModel[];
  selectedValues?: string[] | null;
  errorText?: string | null;
  isMandatory?: boolean | null;
  controlSize?: ControlSize;
  labelSize?: ControlSize;
  onChange?: any | undefined;
  onBlur?: any | undefined;
  type?: BoxType | null;
}> = ({
  labelName,
  items,
  selectedValues,
  controlSize = 4,
  labelSize = 2,
  errorText,
  isMandatory,
  onChange = () => {},
  onBlur = () => {},
  type = "radio",
}) => {
  return (
    <>
      <div
        className={`col-xxl-${labelSize} col-xl-${labelSize} col-lg-${labelSize} col-md-${labelSize} col-sm-12 col-12 pt-2 pt-1`}
      >
        <label>
          {getLabelName(labelName)}
          {isMandatory && <span className="asterisk">*</span>}
        </label>
      </div>
      <div
        className={`col-xxl-${controlSize} col-xl-${controlSize} col-lg-${controlSize} col-md-${controlSize} col-sm-12 col-12 read-only-wrap`}
      >
        {items.map((row) => {
          return (
            <>
              <input
                // @ts-ignore
                type={type}
                // @ts-ignore
                name={row.name}
                value={row.value}
                // @ts-ignore
                checked={
                  selectedValues !== null &&
                  _.filter(selectedValues, (record) => {
                    return record === row.value;
                  }).map((x) => x).length === 0
                    ? false
                    : true
                }
                // @ts-ignore
                onChange={onChange}
                // @ts-ignore
                onBlur={onBlur}
              />
              <label>{row.text}</label>
            </>
          );
        })}
      </div>
    </>
  );
};
