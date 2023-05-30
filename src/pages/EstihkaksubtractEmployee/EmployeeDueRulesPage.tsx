import { FC, useEffect, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ErrorValidationBox,
  LoadingBox,
  ConfirmModelDialogBox,
  ToastBox,
  AddDueSubtractRule,
  DueSubtractRulesList,
} from "../../components";
import {
  ToastModel,
  ActionTypeEnum,
  RowState,
  ActionButtons,
  RequestAction,
  AccrualSubtractItemModel,
  ValidationError,
  AccrualSubtractRuleTypeEnum,
} from "../../models";
import {
  deleteAccrualubtractById,
  GetAccrualSubtractRuleById,
  GetAccrualSubtractRules,
} from "../../serviceBroker/EmployeeEstihkakSubtracApiServiceBroker";
export const EmployeeDueRulesPage: FC<{}> = () => {
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [accrualSubtractRules, setAccrualSubtractRules] = useState<
    AccrualSubtractItemModel[]
  >([]);
  const [accrualSubtractRule, setAccrualSubtractRule] =
    useState<AccrualSubtractItemModel>({
      Name_En: "",
      Name: "",
      ID: 0,
      CreatedBy: 0,
      ModifiedBy: 0,
      Errors: [],
      rowState: Number(RowState.Add),
      CreationDate: new Date(),
      ModificationDate: new Date(),
      Notes: "",
      Row_State: Number(RowState.Add),
      TypeRule_ID: Number(AccrualSubtractRuleTypeEnum.Accrual),
      VerifyOnUpdate: false,
    });
  const [toastModel, setToastModel] = useState<ToastModel>({
    show: false,
    body: t("processSuceess"),
    variant: "Success",
  });
  const [showToastModel, setShowToastModel] = useState(false);
  const [
    showDeleteAccrualSubtractRuleModel,
    setShowDeleteAccrualSubtractRuleModel,
  ] = useState(false);
  //#endregion
  //#region varaibles
  const deleteAccrualSubtractRuleActions: ActionButtons[] = [
    {
      text: t("connfirmDialog.yes"),
      onClick: () => {
        handleDeleteAccrualSubtractRule();
      },
    },
    {
      text: t("connfirmDialog.no"),
      onClick: () => {
        setAccrualSubtractRule({
          Name_En: "",
          Name: "",
          ID: 0,
          CreatedBy: 0,
          ModifiedBy: 0,
          Errors: [],
          rowState: Number(RowState.Add),
          CreationDate: new Date(),
          ModificationDate: new Date(),
          Notes: "",
          Row_State: Number(RowState.Add),
          TypeRule_ID: Number(AccrualSubtractRuleTypeEnum.Accrual),
          VerifyOnUpdate: false,
        });
        setShowDeleteAccrualSubtractRuleModel(false);
      },
    },
  ];
  //#endregion
  //#region useEffect
  const fillData = async () => {
    await getAllAccrualSubtractRules();
  };
  useEffect(() => {
    fillData();
  }, []);
  //#endregion
  //#region function
  const handleAccrualSubtractRuleAction = async (request: RequestAction) => {
    switch (request.action) {
      case ActionTypeEnum.AddSuccess:
        setLoading(true);
        setAccrualSubtractRule({
          Name_En: "",
          Name: "",
          ID: 0,
          CreatedBy: 0,
          ModifiedBy: 0,
          Errors: [],
          rowState: Number(RowState.Add),
          CreationDate: new Date(),
          ModificationDate: new Date(),
          Notes: "",
          Row_State: Number(RowState.Add),
          TypeRule_ID: Number(AccrualSubtractRuleTypeEnum.Accrual),
          VerifyOnUpdate: false,
        });
        await getAllAccrualSubtractRules();
        setShowToastModel(true);
        setLoading(false);
        break;
      case ActionTypeEnum.Clear:
        setLoading(true);
        setAccrualSubtractRule({
          Name_En: "",
          Name: "",
          ID: 0,
          CreatedBy: 0,
          ModifiedBy: 0,
          Errors: [],
          rowState: Number(RowState.Add),
          CreationDate: new Date(),
          ModificationDate: new Date(),
          Notes: "",
          Row_State: Number(RowState.Add),
          TypeRule_ID: Number(AccrualSubtractRuleTypeEnum.Accrual),
          VerifyOnUpdate: false,
        });
        await getAllAccrualSubtractRules();
        setLoading(false);
        break;

      case ActionTypeEnum.Update:
        window.scrollTo(0, 0);
        var AccrualSubtractRuleObject = await GetAccrualSubtractRuleById(
          request.id
        );
        // @ts-ignore
        AccrualSubtractRuleObject.rowState = Number(RowState.Update);
        setAccrualSubtractRule(AccrualSubtractRuleObject);
        break;
      case ActionTypeEnum.Delete:
        var accrualSubtractRuleObject = await GetAccrualSubtractRuleById(
          request.id
        );
        setAccrualSubtractRule(accrualSubtractRuleObject);
        setShowDeleteAccrualSubtractRuleModel(true);
        break;
      case ActionTypeEnum.Clear:
        setAccrualSubtractRule({
          Name_En: "",
          Name: "",
          ID: 0,
          CreatedBy: 0,
          ModifiedBy: 0,
          Errors: [],
          rowState: Number(RowState.Add),
          CreationDate: new Date(),
          ModificationDate: new Date(),
          Notes: "",
          Row_State: Number(RowState.Add),
          TypeRule_ID: Number(AccrualSubtractRuleTypeEnum.Accrual),
          VerifyOnUpdate: false,
        });
        break;
    }
  };
  const getAllAccrualSubtractRules = async () => {
    setLoading(true);
    const accrualSubtractRuleList = await GetAccrualSubtractRules(
      Number(AccrualSubtractRuleTypeEnum.Accrual)
    );
    setAccrualSubtractRules(accrualSubtractRuleList);
    setLoading(false);
  };
  const handleDeleteAccrualSubtractRule = async () => {
    setShowDeleteAccrualSubtractRuleModel(false);
    var deleteAccrualSubtractRuleResponse = await deleteAccrualubtractById(
      accrualSubtractRule !== null ? accrualSubtractRule.ID : 0
    );
    let toastObjectToastModel = toastModel;
    toastObjectToastModel.show = true;
    if (
      deleteAccrualSubtractRuleResponse.Result.Errors != null &&
      deleteAccrualSubtractRuleResponse.Result.Errors.length !== 0
    ) {
      toastModel.body = "process failed try again alter";
      toastModel.variant = "Danger";
    } else {
      getAllAccrualSubtractRules();
    }
    setToastModel(toastObjectToastModel);
    setShowToastModel(true);
  };
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      {<ErrorValidationBox errors={validationErrors} />}
      {showToastModel && (
        <ToastBox
          isShown={showToastModel}
          header={toastModel.Header}
          body={toastModel.body}
          variant={toastModel.variant}
          delayDuration={toastModel.delayDuration}
          onCloseEvent={() => {
            setShowToastModel(false);
          }}
        />
      )}
      <Card>
        <Card.Header>{t("addDueRule.Information")}</Card.Header>
        <Card.Body>
          <AddDueSubtractRule
            request={accrualSubtractRule}
            onActionEvent={(o: RequestAction) => {
              handleAccrualSubtractRuleAction(o);
            }}
          />
          {/* delete AccrualSubtractRule  */}
          <ConfirmModelDialogBox
            isModelVisible={showDeleteAccrualSubtractRuleModel}
            onCloseEvent={() => {
              setShowDeleteAccrualSubtractRuleModel(false);
            }}
            actions={deleteAccrualSubtractRuleActions}
          >
            <div className="alert alert-warning">Are you sure?</div>
          </ConfirmModelDialogBox>
          {/* AccrualSubtractRule list */}
          {accrualSubtractRules && (
            //&& accrualSubtractRules.length !== 0
            <DueSubtractRulesList
              request={accrualSubtractRules}
              onActionEvent={(o: RequestAction) => {
                handleAccrualSubtractRuleAction(o);
              }}
              onCompleteEvent={getAllAccrualSubtractRules}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
  //#endregion
};
