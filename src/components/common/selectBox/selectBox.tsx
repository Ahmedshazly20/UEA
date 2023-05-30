import { FC, MutableRefObject } from "react";
import { LookupItem, SelectItem } from "../../../models";
import Select from "react-select";
import { getLabelName, isArabicCurrentLanguage } from "../../../utils";

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
export const SelectBox: FC<{
  labelName: string;
  source: LookupItem[];
  excludedSource?: LookupItem[] | null;
  selectedValues?: string[] | null;
  isSingleSelect?: boolean;
  isMandatory?: boolean | null;
  errorText?: string | null;
  onStatusChange: any;
  multiselectRef?: MutableRefObject<any>;
  controlSize?: ControlSize;
  labelSize?: ControlSize;
  controlClassName?: string | null;
  id?: string | undefined;
}> = ({
  labelName,
  source,
  excludedSource,
  selectedValues,
  isSingleSelect = false,
  isMandatory = false,
  errorText,
  onStatusChange,
  multiselectRef,
  controlSize = 4,
  labelSize = 2,
  controlClassName,
  id,
}) => {
  //#region variables
  const isArabic = isArabicCurrentLanguage();
  let selectedRows: SelectItem[] = [];
  //#endregion
  const data: SelectItem[] = [];
  if (
    source !== null &&
    source !== undefined &&
    source.length !== 0 &&
    excludedSource !== null &&
    excludedSource !== undefined &&
    excludedSource.length !== 0
  ) {
    source
      .filter((o1) => !excludedSource.some((o2) => o1.value === o2.value))
      .map((row) => {
        data.push({
          label: isArabic ? row.nameAr : row.name,
          value: row.value ?? "",
        });
      });
  } else {
    source.map((row) => {
      data.push({
        label: isArabic ? row.nameAr : row.name,
        value: row.value ?? "",
      });
    });
  }
  selectedRows =
    data.length !== 0 && selectedValues !== null && selectedValues?.length !== 0
      ? data.filter((p) => {
          return selectedValues?.some((y) => {
            return p.value == y;
          });
        })
      : [];
  return (
    <>
      <div
        className={`col-xxl-${labelSize} col-xl-${labelSize} col-lg-${labelSize} col-md-${labelSize} col-sm-12 col-12 pt-2`}
      >
        <label>
          {getLabelName(labelName)}
          {isMandatory && <span className="asterisk">*</span>}
        </label>
      </div>
      <div
        className={`col-xxl-${controlSize} col-xl-${controlSize} col-lg-${controlSize} col-md-${controlSize} col-sm-12 col-12 ${controlClassName}`}
      >
        <Select
          id={id || `selectBox_${Math.random()}`}
          value={
            selectedRows !== null && selectedRows.length !== 0
              ? selectedRows
              : undefined
          }
          options={data}
          closeMenuOnSelect={isSingleSelect}
          ref={multiselectRef}
          isSearchable={true}
          onChange={onStatusChange}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        {errorText ? <>{errorText}</> : null}
      </div>
    </>
  );
};
