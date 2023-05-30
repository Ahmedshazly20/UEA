import { FC, ReactNode } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { isArabicCurrentLanguage } from "../../utils";
type ModelSize = "sm" | "lg" | "xl" | undefined;
export const ModelDialogBox: FC<{
  isModelVisible: boolean;
  isCloseButtonVisible?: boolean;
  isEscapeCloseEnabled?: boolean;
  title?: string;
  size?: ModelSize | undefined;
  fullScreen?: boolean | undefined;
  onCloseEvent?: any;
  children?: ReactNode | undefined;
}> = ({
  isModelVisible = false,
  isCloseButtonVisible = false,
  isEscapeCloseEnabled = false,
  title,
  size = undefined,
  fullScreen = false,
  onCloseEvent,
  children,
}) => {
  //#region state
  const { t } = useTranslation();
  //#endregion
  //#region varaible
  const isHiddenEnabled: boolean =
    onCloseEvent !== null && onCloseEvent !== undefined ? true : false;
  const isArabic: boolean = isArabicCurrentLanguage();
  const direction: string = isArabic ? "rtl" : "ltr";
  //#endregion
  return (
    <>
      <Modal
        show={isModelVisible}
        onHide={() => {
          isEscapeCloseEnabled && onCloseEvent();
        }}
        centered
        size={size}
        // @ts-ignore
        fullscreen={fullScreen}
      >
        {/*<Modal.Header
          dir={direction}
          closeButton={isCloseButtonVisible}
        ></Modal.Header>
         {title && <Modal.Title>{title}</Modal.Title>}
        <Modal.Body dir={direction}></Modal.Body> 
        {isCloseButtonVisible && (
          <Modal.Footer dir={direction}>
            <Button variant="primary" onClick={() => onCloseEvent()}>
              {t("CloseButton")}
            </Button>
          </Modal.Footer>
        )} */}
        <Modal.Header dir={direction} closeButton={isCloseButtonVisible}>
          {title && <Modal.Title>{title}</Modal.Title>}
        </Modal.Header>
        <Modal.Body dir={direction}>{children}</Modal.Body>
        {isCloseButtonVisible && (
          <Modal.Footer dir={direction}>
            <Button variant="danger" onClick={() => onCloseEvent()}>
              {t("CloseButton")}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};
