import _ from "lodash";
import { Accordion, Card } from "react-bootstrap";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ErrorValidationBox,
  ConfirmModelDialogBox,
  LoadingBox,
  ModelDialogBox,
  ToastBox,
  AddEstektaa,
  EstektaaList,
} from "../../components";
import {
  AccrualSubtractRuleTypeEnum,
  ActionButtons,
  ActionTypeEnum,
  EstehekakModel,
  RequestAction,
  RowState,
  ToastModel,
  ValidationError,
} from "../../models";
import {
  deleteEmployeeEstihkakSubtract,
  getEstihkakSubtractById,
  searchEstihkakSubtract,
} from "../../serviceBroker/employeesApiServiceBroker";
import { getLabelName, getUserId } from "../../utils";
export const EstektaaPage: FC<{}> = () => {
  //#region variables
  const deleteActions: ActionButtons[] = [
    {
      text: getLabelName("yes"),
      onClick: () => {
        handleAction({
          id: object?.ID || 0,
          request: object,
          action: ActionTypeEnum.DeleteOperationStart,
        });
      },
    },
    {
      text: getLabelName("No"),
      onClick: () => {
        setObject({
          ID: 0,
          CreatedBy: 0,
          ModifiedBy: 0,
          Errors: [],
          rowState: Number(RowState.Add),
          CreationDate: new Date(),
          ModificationDate: new Date(),
          Notes: "",
          VerifyOnUpdate: false,
          Date: new Date(),
          Emp_ID: 0,
          EmployeeNameAr: "",
          EmployeeNameEn: "",
          EsthkakSubtractRuleAr: "",
          EsthkakSubtractRuleEn: "",
          EsthkSubtRule_ID: 0,
          Value: 0,
          User_ID: getUserId(),
        });
        setShowDeleteModel(false);
      },
    },
  ];
  //#endregion
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [objects, setObjects] = useState<EstehekakModel[]>([]);
  const [object, setObject] = useState<EstehekakModel>({
    ID: 0,
    CreatedBy: 0,
    ModifiedBy: 0,
    Errors: [],
    rowState: Number(RowState.Add),
    CreationDate: new Date(),
    ModificationDate: new Date(),
    Notes: "",
    VerifyOnUpdate: false,
    Date: new Date(),
    Emp_ID: 0,
    EmployeeNameAr: "",
    EmployeeNameEn: "",
    EsthkakSubtractRuleAr: "",
    EsthkakSubtractRuleEn: "",
    EsthkSubtRule_ID: 0,
    Value: 0,
    User_ID: getUserId(),
  });
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [totalRows, setTotalRows] = useState(0);

  const [showAddModel, setShowAddModel] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [toastModel, setToastModel] = useState<ToastModel>({
    show: false,
    variant: "Primary",
    body: t("processSuceess"),
  });
  const [showToastModel, setShowToastModel] = useState(false);

  //#endregion
  //#region useEffect
  const fillData = async () => {
    await getAllObjects(
      null,
      null,
      Number(AccrualSubtractRuleTypeEnum.Subtract),
      pageSize,
      pageNumber
    );
  };
  useEffect(() => {
    fillData();
  }, []);
  //#endregion
  //#region function
  const getAllObjects = async (
    searchEmp: string | null,
    searchRule: string | null,
    typeId: number,
    pageSize: number,
    pageNumber: number
  ) => {
    setLoading(true);
    let emp = searchEmp != null ? parseInt(searchEmp) : null;
    let rule = searchRule != null ? parseInt(searchRule) : null;
    console.log("getAllObjects");
    const result = await searchEstihkakSubtract(
      emp,
      rule,
      typeId,
      pageSize,
      pageNumber
    );
    setObjects(result?.Result || []);
    setTotalRows(result?.TotalRecoredCount || 0);

    setLoading(false);
  };
  // console.log("result",result?.Result)
  const handleAction = async (request: RequestAction) => {
    switch (request.action) {
      case ActionTypeEnum.AddSuccess:
        setLoading(true);
        setObject({
          ID: 0,
          CreatedBy: 0,
          ModifiedBy: 0,
          Errors: [],
          rowState: Number(RowState.Add),
          CreationDate: new Date(),
          ModificationDate: new Date(),
          Notes: "",
          VerifyOnUpdate: false,
          Date: new Date(),
          Emp_ID: 0,
          EmployeeNameAr: "",
          EmployeeNameEn: "",
          EsthkakSubtractRuleAr: "",
          EsthkakSubtractRuleEn: "",
          EsthkSubtRule_ID: 0,
          Value: 0,
          User_ID: getUserId(),
        });
        await getAllObjects(
          null,
          null,
          Number(AccrualSubtractRuleTypeEnum.Subtract),
          pageSize,
          pageNumber
        );
        setShowToastModel(true);
        setLoading(false);
        break;
      case ActionTypeEnum.Clear:
        setLoading(true);
        setObject({
          ID: 0,
          CreatedBy: 0,
          ModifiedBy: 0,
          Errors: [],
          rowState: Number(RowState.Add),
          CreationDate: new Date(),
          ModificationDate: new Date(),
          Notes: "",
          VerifyOnUpdate: false,
          Date: new Date(),
          Emp_ID: 0,
          EmployeeNameAr: "",
          EmployeeNameEn: "",
          EsthkakSubtractRuleAr: "",
          EsthkakSubtractRuleEn: "",
          EsthkSubtRule_ID: 0,
          Value: 0,
          User_ID: getUserId(),
        });
        await getAllObjects(
          null,
          null,
          Number(AccrualSubtractRuleTypeEnum.Subtract),
          pageSize,
          pageNumber
        );
        setLoading(false);
        break;

      case ActionTypeEnum.Add:
        setObject({
          ID: 0,
          CreatedBy: 0,
          ModifiedBy: 0,
          Errors: [],
          rowState: Number(RowState.Add),
          CreationDate: new Date(),
          ModificationDate: new Date(),
          Notes: "",
          VerifyOnUpdate: false,
          Date: new Date(),
          Emp_ID: 0,
          EmployeeNameAr: "",
          EmployeeNameEn: "",
          EsthkakSubtractRuleAr: "",
          EsthkakSubtractRuleEn: "",
          EsthkSubtRule_ID: 0,
          Value: 0,
          User_ID: getUserId(),
        });
        setShowAddModel(true);
        break;

      case ActionTypeEnum.Update:
        window.scrollTo(0, 0);

        var item = await getEstihkakSubtractById(request.id);
        //@ts-ignore
        item.Result.rowState = Number(RowState.Update);
        setObject(item.Result!);
        setShowAddModel(true);
        break;
      case ActionTypeEnum.Delete:
        setObject(request.request);
        setShowDeleteModel(true);
        break;
      case ActionTypeEnum.DeleteOperationStart:
        setLoading(true);
        setShowDeleteModel(false);
        var result = await deleteEmployeeEstihkakSubtract(request.id!);
        setLoading(false);
        //alert(JSON.stringify(result));
        //@ts-ignore
        await getAllObjects(
          null,
          null,
          Number(AccrualSubtractRuleTypeEnum.Subtract),
          pageSize,
          pageNumber
        );

        if (result.Result.Result === true) {
          handleAction({ id: 0, action: ActionTypeEnum.Success });
        } else {
          handleAction({ id: 0, action: ActionTypeEnum.Failed });
        }
        break;
      case ActionTypeEnum.AddSuccess:
      case ActionTypeEnum.DeleteSuccess:
      case ActionTypeEnum.Success:
        setToastModel({ ...toastModel, show: true });
        setIsRefresh(true);
        setShowToastModel(true);
        break;
      case ActionTypeEnum.Failed:
        setToastModel({
          ...toastModel,
          body: "failed",
          variant: "danger",
          show: true,
        });
        setIsRefresh(true);
        setShowToastModel(true);

        break;
    }
  };
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
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

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{t("addEstektaa")}</Accordion.Header>
          <Accordion.Body>
            <Card>
              {/* <Card.Header></Card.Header> */}
              <Card.Body>
                <AddEstektaa
                  request={object}
                  onActionEvent={(o: RequestAction) => {
                    handleAction(o);
                    setShowAddModel(false);
                  }}
                />
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{t("Subtracts")}</Accordion.Header>
          <Accordion.Body>
            <Card className="card-custom">
              {/* <Card.Header></Card.Header> */}
              <Card.Body>
                {/* delete AccrualSubtractRule  */}
                <ConfirmModelDialogBox
                  isModelVisible={showDeleteModel}
                  onCloseEvent={() => {
                    setShowDeleteModel(false);
                  }}
                  actions={deleteActions}
                >
                  <div className="alert alert-warning">Are you sure?</div>
                </ConfirmModelDialogBox>

                {/* Estehkak list */}
                {objects && (
                  //&& objects.length !== 0
                  <EstektaaList
                    getDueList={(
                      searchEmp: string | null,
                      searchRule: string | null,
                      typeId: number,
                      pageSize: number,
                      pageNumber: number
                    ) => {
                      getAllObjects(
                        searchEmp,
                        searchRule,
                        typeId,
                        pageSize,
                        pageNumber
                      );
                    }}
                    onActionEvent={(o: RequestAction) => {
                      handleAction(o);
                    }}
                    setIsRefresh={setIsRefresh}
                    isRefresh={isRefresh}
                    request={objects}
                    totalRows={totalRows}
                  />
                )}
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
  //#endregion
};
