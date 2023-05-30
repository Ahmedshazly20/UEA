import { uniqueId } from "lodash";
import { FC, ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";
import { ActionButtons } from "../../models";
import { isArabicCurrentLanguage } from "../../utils";

export const ConfirmModelDialogBox: FC<{
  isModelVisible: boolean;
  title?: string;
  onCloseEvent?: any;
  actions?: ActionButtons[] | null;
  children?: ReactNode | undefined;
}> = ({ isModelVisible, title, onCloseEvent, actions, children }) => {
  //#region state
  //#endregion
  //#region varaible
  const isArabic: boolean = isArabicCurrentLanguage();
  const direction: string = isArabic ? "rtl" : "ltr";
  const isHiddenEnabled: boolean =
    onCloseEvent !== null && onCloseEvent !== undefined ? true : false;
  //#endregion
  //#region function
  //#endregion
  return (
    <>
      <Modal
        show={isModelVisible}
        onHide={() => {
          isHiddenEnabled && onCloseEvent();
        }}
      >
        <Modal.Header dir={direction}>
          {title && <Modal.Title>{title}</Modal.Title>}
        </Modal.Header>
        <Modal.Body dir={direction}>{children}</Modal.Body>
        <Modal.Footer dir={direction}>
          {
            // @ts-ignore
            actions !== null &&
              actions !== undefined &&
              actions.length > 0 &&
              actions.map((row, index) => {
                return (
                  <Button
                    id={`button_action_` + index}
                    key={index}
                    size="sm"
                    variant={
                      row.variant === null
                        ? "primary"
                        : `primary ${row.variant}`
                    }
                    onClick={() => {
                      row.onClick();
                    }}
                  >
                    {row.text}
                  </Button>
                );
              })
          }
        </Modal.Footer>
      </Modal>
    </>
  );
};
