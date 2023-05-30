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
  CurrencyResponse,
  CurrencyDeleteResponse,
} from "../../models/currency/currencyResponse";
import { ValidationError } from "../../models/validation/error";
import {
  deleteCurrency,
  getCurrency,
} from "../../serviceBroker/currencyApiServiceBroker";
export const CurrencyPage: FC<{}> = () => {
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [currencies, setcurrencies] = useState<CurrencyResponse[]>([]);
  const [currency, setCurrency] = useState<CurrencyResponse | undefined>(
    undefined
  );
  const [toastModel, setToastModel] = useState<ToastModel>({
    show: false,
    variant: "Primary",
  });
  const [showAddCurrencyModel, setShowAddCurrencyModel] = useState(false);
  const [showModifyCurrencyModel, setShowModifyCurrencyModel] = useState(false);
  const [showDeleteCurrencyModel, setShowDeleteCurrencyModel] = useState(false);
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
        setCurrency(undefined);
        setShowDeleteCurrencyModel(false);
      },
    },
  ];
  const handleModifyComplete = async (
    request: CurrencyResponse,
    status: boolean
  ) => {
    setShowModifyCurrencyModel(false);
    switch (status) {
      case true:
        setLoading(true);
        await getAllcurrencies();
        setLoading(false);
        setShowToastModel(true);
        break;
      default:
        break;
    }
  };
  //#endregion
  //#region useEffect
  useEffect(() => {
    const fillData = async () => {
      // console.log(currencies);
      await getAllcurrencies();
    };
    fillData();
  }, []);
  //#endregion
  //#region function
  const handleCurrencyAction = async (request: RequestAction) => {
    let filteredCurrency = await currencies.find((x) => x.ID == request.id);
    switch (request.action) {
      case ActionTypeEnum.Update:
        // @ts-ignore
        filteredCurrency.rowState = 2;
        setCurrency(filteredCurrency);
        setShowModifyCurrencyModel(true);
        break;
      case ActionTypeEnum.Delete:
        setCurrency(filteredCurrency);
        setShowDeleteCurrencyModel(true);
        break;
    }
  };
  const getAllcurrencies = async () => {
    setLoading(true);
    const CurrencyList = await getCurrency();
    setcurrencies(CurrencyList);
    setLoading(false);
  };
  const handleAddCurrencyComplete = async (status: boolean) => {
    setShowAddCurrencyModel(false);
    switch (status) {
      case true:
        setLoading(true);
        await getAllcurrencies();
        let toastObjectToastModel = toastModel;
        toastObjectToastModel.show = true;
        toastObjectToastModel.body = "process completed successfully";
        setLoading(false);
        setToastModel(toastObjectToastModel);
        break;
      case false:
        setLoading(true);
        await getAllcurrencies();
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
  const handleAddComplete = async (
    request: CurrencyResponse,
    status: boolean
  ) => {
    switch (status) {
      case true:
        setLoading(true);
        await getAllcurrencies();
        let toastObjectToastModel = toastModel;
        toastObjectToastModel.show = true;
        toastObjectToastModel.body = "process completed successfully";
        setLoading(false);
        setToastModel(toastObjectToastModel);
        break;
      case false:
        setLoading(true);
        await getAllcurrencies();
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
    setShowModifyCurrencyModel(false);
    switch (status) {
      case true:
        setLoading(true);
        await getAllcurrencies();
        let toastObjectToastModel = toastModel;
        toastObjectToastModel.show = true;
        toastObjectToastModel.body = "process completed successfully";
        setLoading(false);
        setToastModel(toastObjectToastModel);
        break;
      case false:
        setLoading(true);
        await getAllcurrencies();
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
    setShowDeleteCurrencyModel(false);
    var deleteStoreResponse = await deleteCurrency(
      currency !== undefined ? currency.ID : 0
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
      getAllcurrencies();
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
        isModelVisible={showDeleteCurrencyModel}
        onCloseEvent={() => {
          setShowDeleteCurrencyModel(false);
        }}
        actions={deleteCurrencyActions}
      >
        <>Are you sure?</>
      </ConfirmModelDialogBox>
      {/* add store  */}
      <ModelDialogBox
        isModelVisible={showAddCurrencyModel}
        isCloseButtonVisible={false}
        size="lg"
        //onCloseEvent={() => {setShowAddUserModel(false);}}
        title={t("اضافة عمله جديده")}
      >
        <AddCurrency
          onActionEvent={(o: RequestAction) => {
            setShowAddCurrencyModel(false);
            handleAddComplete(o.request, true);
          }}
        />
      </ModelDialogBox>
      {/* modify store  */}
      <ModelDialogBox
        isModelVisible={showModifyCurrencyModel}
        isCloseButtonVisible={false}
      >
        <AddCurrency
          onActionEvent={(o: RequestAction) => {
            setShowModifyCurrencyModel(false);
            handleModifyComplete(o.request, true);
          }}
          request={currency}
        />
      </ModelDialogBox>
      <Button
        style={{ marginBottom: "10px" }}
        variant="outline-primary"
        onClick={() => {
          setShowAddCurrencyModel(true);
        }}
      >
        {t("user.Add")}
      </Button>
      {/* store list */}

      {currencies.length !== 0 && (
        <CurrencyList
          request={currencies}
          onActionEvent={(o: RequestAction) => {
            handleCurrencyAction(o);
          }}
        />
      )}
    </>
  );

  //#endregion
};
