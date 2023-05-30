import { FC } from "react";
import { Button } from "react-bootstrap";
import { getLabelName } from "../../../utils";
export const PageActionButtons: FC<{
  onAddNewRecordAction?: any | null;
  onSaveAction?: any | null;
  onModifyAction?: any | null;
  onDeleteAction?: any | null;
  onPrintAction?: any | null;
  onCloseAction?: any | null;
}> = ({
  onAddNewRecordAction,
  onSaveAction,
  onModifyAction,
  onDeleteAction,
  onPrintAction,
  onCloseAction,
}) => {
  //#region variables
  const isAddNewRecordActionVisible: boolean = false;
  const isSaveActionVisible: boolean = false;
  const isModifyActionVisible: boolean = false;
  const isDeleteActionVisible: boolean = false;
  //#endregion
  //#region variables
  const onDefaultCloseAcction = () => {};
  //#endregion
  return (
    <>
      {window.location.pathname.toLowerCase()}
      <br />
      {isAddNewRecordActionVisible && onAddNewRecordAction !== null && (
        <Button onClick={() => onAddNewRecordAction}>
          {getLabelName("Add")}
        </Button>
      )}
      {isSaveActionVisible && onSaveAction !== null && (
        <Button onClick={() => onSaveAction}>{getLabelName("Save")}</Button>
      )}
      {isModifyActionVisible && onModifyAction !== null && (
        <Button onClick={() => onModifyAction}>{getLabelName("Modify")}</Button>
      )}
      {isDeleteActionVisible && onDeleteAction !== null && (
        <Button onClick={() => onDeleteAction}>{getLabelName("Delete")}</Button>
      )}
      {onPrintAction !== null && (
        <Button onClick={() => onPrintAction}>{getLabelName("Print")}</Button>
      )}
      <Button
        onClick={() =>
          onCloseAction !== null ? onCloseAction : onDefaultCloseAcction
        }
      >
        {getLabelName("Close")}
      </Button>
    </>
  );
};
