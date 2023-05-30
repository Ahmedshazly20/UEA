import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ConfirmModelDialogBox } from "../../components/box/confirmDialogBox";
import { LoadingBox } from "../../components/box/loadingBox";
import { ErrorValidationBox } from "../../components";
import { ModelDialogBox } from "../../components/box/modelDialogBox";
import { ToastBox } from "../../components/box/toastBox";
import { AddCurrency } from "../../components/currency/addCurrency";
import { CurrencyList } from "../../components/currency/currencyList";
import { RequestAction } from "../../models";
import { ToastModel } from "../../models/common/toastModel";
import { ActionButtons } from "../../models/dialog/dialogModel";
import { ActionTypeEnum } from "../../models/enums/enumList";
import {
  EmployeeEstihkakSubtracResponse,
  EmployeeEstihkakSubtraccDeleteResponse,
} from "../../models/Estihkaksubtract/EmployeeEstihkakRule";
import { ValidationError } from "../../models/validation/error";
import {
  deleteEstihkaksubtract,
  getEmployeeEstihkak,
  getEmployeeEstihkakExpense,
} from "../../serviceBroker/EmployeeEstihkakSubtracApiServiceBroker";
import { EmployeeEstihkakSubtractRuleList } from "../../components/EstihkaksubtractRule/EmployeeEstihkakSubtractRuleList";
import { AddEstihkaksubtractExpenseRule } from "../../components/EstihkaksubtractRule/addEstihkaksubtractExpenseRule";
export const EstihkaksubtractExpenseRulePage: FC<{}> = () => {
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [EmployeeEstihkakSubtracRuleList, setEmployeeEstihkakSubtracRuleList] = useState<EmployeeEstihkakSubtracResponse[]>([]);
  const [EmployeeEstihkakSubtrac, setEmployeeEstihkakSubtrac] = useState<EmployeeEstihkakSubtracResponse | undefined>(undefined);
  const [toastModel, setToastModel] = useState<ToastModel>({
    show: false,
    variant: "Primary",
  });
  'EstihkakSubtracRule'
  const [showAddEstihkakRuleModel, setShowAddEstihkakRuleModel] = useState(false);
  const [showModifyEstihkakRuleModel, setShowModifyEstihkakRuleModel] = useState(false);
  const [showDeleteEstihkakRuleModel, setShowDeleteEstihkakRuleModel] = useState(false);
  const [showToastModel, setShowToastModel] = useState(false);

  //#endregion
  //#region varaibles
  const deleteCurrencyActions: ActionButtons[] = [
    {
      text: t("connfirmDialog.yes"),
      onClick: () => {
        handleDeleteCurrency();
      },
    },
    {
      text: t("connfirmDialog.no"),
      onClick: () => {
        setEmployeeEstihkakSubtrac(undefined);
        setShowDeleteEstihkakRuleModel(false);
      },
    },
  ];

  //#endregion
  //#region useEffect
  useEffect(() => {
    const fillData = async () => {
     // console.log(currencies);
      await getAllEmployeeEstihkakRule();
    };
    fillData();
  }, []);
  //#endregion
  //#region function
  const handleCurrencyAction = async (request: RequestAction) => 
  {
    
    let filteredCurrency = await EmployeeEstihkakSubtracRuleList.find((x) => x.ID == request.id);
    console.log('request.action',request.action)
    switch (request.action) {
      case ActionTypeEnum.Update:
        // @ts-ignore
        request.request.rowState = 2;
        setEmployeeEstihkakSubtrac(request.request);    

        console.log("request.request",request.request);
     
        break;
      case ActionTypeEnum.Delete:
        setEmployeeEstihkakSubtrac(filteredCurrency);
        setShowDeleteEstihkakRuleModel(true);
        break;
    }
  };
  const getAllEmployeeEstihkakRule = async () => {
    setLoading(true);
    const EmployeeEstihkakRuleList = await getEmployeeEstihkakExpense();
   setEmployeeEstihkakSubtracRuleList(EmployeeEstihkakRuleList);
    setLoading(false);
  };
  const handleAddEstihkakRuleComplete = async (status: boolean) => {

    setShowAddEstihkakRuleModel(false);
    switch (status) {
      case true:
        setLoading(true);
        await getAllEmployeeEstihkakRule();
        let toastObjectToastModel = toastModel;
        toastObjectToastModel.show = true;
        toastObjectToastModel.body = "process completed successfully";
        setLoading(false);
        setToastModel(toastObjectToastModel);
        break;
      case false:
        setLoading(true);
        await getAllEmployeeEstihkakRule();
        let toastObjectToastModelerr = toastModel;
        toastObjectToastModelerr.show = true;
        toastObjectToastModelerr.body = "An Error Occured";
        setLoading(false);
        setToastModel(toastObjectToastModelerr);
        break;
      default:
        break;
    }
  };
  const handleAddComplete = async (request: EmployeeEstihkakSubtracResponse, status: boolean) => {
   
    switch (status) {
      case true:
        setLoading(true);
        await getAllEmployeeEstihkakRule();
        let toastObjectToastModel = toastModel;
        toastObjectToastModel.show = true;
        toastObjectToastModel.body = "process completed successfully";
        setLoading(false);
        setToastModel(toastObjectToastModel);
        break;
      case false:
        setLoading(true);
        await getAllEmployeeEstihkakRule();
        let toastObjectToastModelerr = toastModel;
        toastObjectToastModelerr.show = true;
        toastObjectToastModelerr.body = "An Error Occured";
        setLoading(false);
        setToastModel(toastObjectToastModelerr);
        break;
      default:
        break;
    }
  };
  const handleModifyCurrencyComplete = async (status: boolean) => {
    setShowModifyEstihkakRuleModel(false);
    switch (status) {
      case true:
        setLoading(true);
        await getAllEmployeeEstihkakRule();
        let toastObjectToastModel = toastModel;
        toastObjectToastModel.show = true;
        toastObjectToastModel.body = "process completed successfully";
        setLoading(false);
        setToastModel(toastObjectToastModel);
        break;
      case false:
        setLoading(true);
        await getAllEmployeeEstihkakRule();
        let toastObjectToastModelerr = toastModel;
        toastObjectToastModelerr.show = true;
        toastObjectToastModelerr.body = "An Error Occured";
        setLoading(false);
        setToastModel(toastObjectToastModelerr);
        break;
      default:
        break;
    }
  };
  const handleDeleteCurrency = async () => {
    setShowDeleteEstihkakRuleModel(false);
    var deleteStoreResponse = await deleteEstihkaksubtract(
        EmployeeEstihkakSubtrac !== undefined ? EmployeeEstihkakSubtrac.ID : 0
      
    );
    let toastObjectToastModel = toastModel;
    toastObjectToastModel.show = true;
    if (
      deleteStoreResponse.Result.Errors != null &&
      deleteStoreResponse.Result.Errors.length !== 0
    ) {
      toastObjectToastModel.body = "process failed try again alter";
      toastObjectToastModel.variant = "Danger";
    } else {
      toastObjectToastModel.body = "process completed successfully";
      toastObjectToastModel.variant = "Success";
      getAllEmployeeEstihkakRule();
    }
    setToastModel(toastObjectToastModel);
  };
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      {<ErrorValidationBox errors={validationErrors} />}
      {toastModel.show && (
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

      {/* delete store  */}
      <ConfirmModelDialogBox
        isModelVisible={showDeleteEstihkakRuleModel}
        onCloseEvent={() => {
          setShowDeleteEstihkakRuleModel(false);
        }}
        actions={deleteCurrencyActions}
      >
        <>Are you sure?</>
      </ConfirmModelDialogBox>
      {/* add store  */}
      <ModelDialogBox
        isModelVisible={showAddEstihkakRuleModel}
        isCloseButtonVisible={false}
        //onCloseEvent={() => {setShowAddUserModel(false);}}
        title= {t("اضافة مستقطع جديد جديده")}
      >
             
      </ModelDialogBox>
      <AddEstihkaksubtractExpenseRule  
        onActionEvent={(o: RequestAction) => 
          {
          setShowAddEstihkakRuleModel(false);
          handleAddComplete(o.request,true)
        }} request={EmployeeEstihkakSubtrac}
        />   
      {/* modify store  */}
      <ModelDialogBox
        isModelVisible={showModifyEstihkakRuleModel}
        isCloseButtonVisible={false}
      >
       
{/*    
        <AddCurrency   onActionEvent={(o: RequestAction) => {
            setShowModifyCurrencyModel(false);
            handleModifyComplete(o.request,true)
          }} request={currency} /> */}
        
      </ModelDialogBox>
      
      {/* store list */}
      
      { EmployeeEstihkakSubtracRuleList.length !== 0 && (
        <EmployeeEstihkakSubtractRuleList
          request={EmployeeEstihkakSubtracRuleList}
          onActionEvent={(o: RequestAction) => {handleCurrencyAction(o);}}
        />
      )}


    </>
  );

  //#endregion
};
