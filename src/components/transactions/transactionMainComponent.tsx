import { FC, useEffect, useRef, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ConfirmModelDialogBox,
  DeleteTransaction,
  ErrorValidationBox,
  LoadingBox,
  RegisterTransaction,
  ToastBox,
  TransactionList,
} from "../../components";
import {
  ActionTypeEnum,
  ComponentActionTypeEnum,
  DailyTransactionTypeEnum,
  RequestAction,
  RowState,
  ToastModel,
  TransactionDetailResponseModel,
  ValidationError,
} from "../../models";
import {
  deleteTransaction,
  getTransactionDetail,
  getTrnsactionFullInfoById,
} from "../../serviceBroker/transactionApiServiceBroker";
import { generateGuid, getLabelName, scrollToTop } from "../../utils";
import {transactionDetailInitialValue} from "./businessLogic/transactionBl";

export const TransactionMainComponent: FC<{
  transactionType: DailyTransactionTypeEnum;
}> = ({ transactionType }) => {
  //#region state
  const { t } = useTranslation();
  const validationMessageRef =
    useRef() as React.MutableRefObject<HTMLInputElement>;
  const [loading, setLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [componentActionType, setComponentActionType] =
    useState<ComponentActionTypeEnum>(ComponentActionTypeEnum.None);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [object, setObject] = useState<TransactionDetailResponseModel | null>(
    null
  );
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [toastModel, setToastModel] = useState<ToastModel>({
    show: false,
    variant: "Primary",
    body: t("processSuceess"),
  });
  //#endregion
  //#region function
  const handleAction = async (request: RequestAction) => {
    // setObject(null);
    switch (request.action) {
      case ActionTypeEnum.AddSuccess:
      case ActionTypeEnum.DeleteSuccess:
      case ActionTypeEnum.SaveSuccess:
      case ActionTypeEnum.Success:
        scrollToTop(validationMessageRef);
        setObject({...transactionDetailInitialValue,isReInitializeTransactionValues:true});
        setToastModel({ ...toastModel, show: true });
        setIsRefresh(true);
        setComponentActionType(ComponentActionTypeEnum.Clear);
        setValidationErrors([]);
        break;
      case ActionTypeEnum.Update:
        setLoading(true);
        const obj = await getTrnsactionFullInfoById(request.id!);
        if (obj !== null) {
          obj.rowState = RowState.Update;
          obj.TransactionDetaillist.forEach((row) => {
            row.rowState = RowState.Update;
            row.rowKey = generateGuid();
          });
          setObject(obj);
        }
        setLoading(false);
        break;
      case ActionTypeEnum.Delete:
        setLoading(true);
        const deleteTransactionsResponse = await deleteTransaction(
          request.request
        );
        if (
          deleteTransactionsResponse.Errors !== null &&
          deleteTransactionsResponse.Errors !== undefined &&
          deleteTransactionsResponse.Errors.length !== 0
        ) {
          setValidationErrors(deleteTransactionsResponse.Errors);
          scrollToTop(validationMessageRef);
        } else {
          setIsRefresh(true);
        }
        setLoading(false);
        break;
      case ActionTypeEnum.Add:
        setObject(null);
        break;
      case ActionTypeEnum.ModifyStart:
        setLoading(true);
        scrollToTop(validationMessageRef);
        const record = await getTransactionDetail(request.id!);
        setObject(record);
        setComponentActionType(ComponentActionTypeEnum.Edit);
        setLoading(false);
        break;
      case ActionTypeEnum.DeleteStart:
        setObject(request.request);
        break;
      case ActionTypeEnum.DeleteFailed:
        setValidationErrors(request.request);
        scrollToTop(validationMessageRef);
        break;
      case ActionTypeEnum.DeleteReset:
        setValidationErrors([]);
        setObject(null);
        break;
      case ActionTypeEnum.RaiseError:
        setValidationErrors(request.request);
        scrollToTop(validationMessageRef);
        break;
      case ActionTypeEnum.ClearError:
        setValidationErrors([]);
        break;
      case ActionTypeEnum.Clear:
        scrollToTop(validationMessageRef);
        setObject(null);
        setComponentActionType(ComponentActionTypeEnum.Clear);
        setValidationErrors([]);
        break;
      case ActionTypeEnum.RaiseError:
        scrollToTop(validationMessageRef);
        setValidationErrors(request.request);
        break;
      case ActionTypeEnum.AddPartialCustomerStart:
        break;
    }
  };
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      <div ref={validationMessageRef} />
      {<ErrorValidationBox errors={validationErrors} />}
      {toastModel.show && (
        <ToastBox
          isShown={toastModel.show}
          header={toastModel.Header}
          body={toastModel.body}
          variant={toastModel.variant}
          delayDuration={toastModel.delayDuration}
          onCloseEvent={() => {
            setToastModel({ ...toastModel, show: false });
          }}
        />
      )}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            {getLabelName(DailyTransactionTypeEnum[transactionType])}
          </Accordion.Header>
          <Accordion.Body>
            <RegisterTransaction
              transactionType={transactionType}
              request={object}
              setActionType={setComponentActionType}
              actionType={componentActionType}
              onActionEvent={(o: RequestAction) => {
                handleAction(o);
              }}
            />
            <ConfirmModelDialogBox
              isModelVisible={showDeleteModel}
              onCloseEvent={() => {
                setShowDeleteModel(false);
              }}
            >
              <DeleteTransaction
                onActionEvent={handleAction}
                //@ts-ignore
                request={object}
              />
            </ConfirmModelDialogBox>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header></Accordion.Header>
          <Accordion.Body className="TUEFO-header">
            <TransactionList
              transactionType={transactionType}
              onActionEvent={(o: RequestAction) => {
                handleAction(o);
              }}
              setIsRefresh={setIsRefresh}
              isRefresh={isRefresh}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
  //#endregion
};
