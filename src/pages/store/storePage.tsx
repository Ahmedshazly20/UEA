import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ConfirmModelDialogBox } from "../../components/box/confirmDialogBox";
import { LoadingBox } from "../../components/box/loadingBox";
import { ErrorValidationBox } from "../../components";
import { ModelDialogBox } from "../../components/box/modelDialogBox";
import { ToastBox } from "../../components/box/toastBox";
import { AddStore } from "../../components/store/addStore";
import { StoresList } from "../../components/store/storeList";
import { RequestAction } from "../../models";
import { ToastModel } from "../../models/common/toastModel";
import { ActionButtons } from "../../models/dialog/dialogModel";
import { ActionTypeEnum } from "../../models/enums/enumList";
import {
  StoreResponse,
  StoreDeleteResponse,
} from "../../models/store/storeDto";
import { ValidationError } from "../../models/validation/error";
import {
  deleteStore,
  getStores,
} from "../../serviceBroker/storeApiServiceBroker";
export const StoresPage: FC<{}> = () => {
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [stores, setStores] = useState<StoreResponse[]>([]);
  const [store, setStore] = useState<StoreResponse | undefined>(undefined);
  const [toastModel, setToastModel] = useState<ToastModel>({
    show: true,
    body: t("processSuceess"),
    variant: "Primary",
  });
  const [showAddStoreModel, setShowAddStoreModel] = useState(false);
  const [showModifyStoreModel, setShowModifyStoreModel] = useState(false);
  const [showDeleteStoreModel, setShowDeleteStoreModel] = useState(false);
  const [showToastModel, setShowToastModel] = useState(false);

  //#endregion
  //#region varaibles
  const deleteStoreActions: ActionButtons[] = [
    {
      text: t("connfirmDialog.yes"),
      onClick: () => {
        handleDeleteStore();
      },
    },
    {
      text: t("connfirmDialog.no"),
      onClick: () => {
        setStore(undefined);
        setShowDeleteStoreModel(false);
      },
    },
  ];
  //#endregion
  //#region useEffect
  useEffect(() => {
    const fillData = async () => {
      await getAllStores();
    };
    fillData();
  }, []);
  //#endregion
  //#region function
  const handleStoreAction = async (request: RequestAction) => {
    let filteredStore = await stores.find((x) => x.ID == request.id);
    console.log("filteredStore", filteredStore);
    switch (request.action) {
      case ActionTypeEnum.Update:
        // @ts-ignore
        filteredStore.rowState = 2;
        setStore(filteredStore);
        setShowModifyStoreModel(true);
        break;
      case ActionTypeEnum.Delete:
        setStore(filteredStore);
        setShowDeleteStoreModel(true);
        break;
    }
  };
  const getAllStores = async () => {
    setLoading(true);
    const storeList = await getStores();
    setStores(storeList);
    setLoading(false);
  };
  const handleAddStoreComplete = async (status: boolean) => {
    setShowAddStoreModel(false);
    switch (status) {
      case true:
        setLoading(true);
        await getAllStores();
        // let toastObjectToastModel = toastModel;
        // toastObjectToastModel.show = true;
        // toastObjectToastModel.body = "process completed successfully";
        setLoading(false);
        //setToastModel(toastObjectToastModel);
        setToastModel({
          ...toastModel,
          variant: "primary",
          body: t("processSuceess"),
          show: true,
        });
        setShowToastModel(true)
        break;
      case false:
        setLoading(true);
        await getAllStores();
        // let toastObjectToastModelerr = toastModel;
        // toastObjectToastModelerr.show = true;
        // toastObjectToastModelerr.body = "An Error Occured";
        setLoading(false);
        //setToastModel(toastObjectToastModelerr);
        setToastModel({
          ...toastModel,
          variant: "danger",
          body: t("processFailed"),
          show: true,
        });
        setShowToastModel(true)
        break;
      default:
        break;
    }
  };
  const handleModifyStoreComplete = async (status: boolean) => {
    setShowModifyStoreModel(false);
    switch (status) {
      case true:
        setLoading(true);
        await getAllStores();
        //let toastObjectToastModel = toastModel;
        //toastObjectToastModel.show = true;
        //toastObjectToastModel.body = "process completed successfully";
        
        //setToastModel(toastObjectToastModel);
        setToastModel({
          ...toastModel,
          variant: "primary",
          body: t("processSuceess"),
          show: true,
        });
        setShowToastModel(true)
        setLoading(false);

        break;
      case false:
        setLoading(true);
        await getAllStores();
        // let toastObjectToastModelerr = toastModel;
        // toastObjectToastModelerr.show = true;
        // toastObjectToastModelerr.body = "An Error Occured";
       
        setToastModel({
          ...toastModel,
          variant: "danger",
          body: t("processFailed"),
          show: true,
        });
        setShowToastModel(true)
        setLoading(false);
        //setToastModel(toastObjectToastModelerr);
        break;
      default:
        break;
    }
  };
  const handleDeleteStore = async () => {
    setShowDeleteStoreModel(false);
    var deleteStoreResponse = await deleteStore(
      store !== undefined ? store.ID : 0
    );
    let toastObjectToastModel = toastModel;
    toastObjectToastModel.show = true;
    if (
      deleteStoreResponse.Result.Errors != null &&
      deleteStoreResponse.Result.Errors.length !== 0
    ) {
      setToastModel({
        ...toastModel,
        variant: "danger",
        body: t("processFailed"),
        show: true,
      });
      setShowToastModel(true)
    } else {
      // toastObjectToastModel.body = "process completed successfully";
      // toastObjectToastModel.variant = "Success";
      getAllStores();
      setToastModel({
        ...toastModel,
        variant: "primary",
        body: t("processSuceess"),
        show: true,
      });
      setShowToastModel(true)
    }
   // setToastModel(toastObjectToastModel);
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
        isModelVisible={showDeleteStoreModel}
        onCloseEvent={() => {
          setShowDeleteStoreModel(false);
        }}
        actions={deleteStoreActions}
      >
        <>Are you sure?</>
      </ConfirmModelDialogBox>
      {/* add store  */}
      <ModelDialogBox
        isModelVisible={showAddStoreModel}
        isCloseButtonVisible={false}
        title={t("AddStore")}
        //onCloseEvent={() => {setShowAddUserModel(false);}}
      >
        <AddStore onComplete={handleAddStoreComplete} />
      </ModelDialogBox>
      {/* modify store  */}
      <ModelDialogBox
        isModelVisible={showModifyStoreModel}
        isCloseButtonVisible={false}
        title={t("ModifyStore")}
      >
        <AddStore onComplete={handleModifyStoreComplete} request={store} />
      </ModelDialogBox>
      <Button
        style={{ marginBottom: "10px" }}
        variant="outline-primary"
        onClick={() => {
          setShowAddStoreModel(true);
        }}
      >
        {t("user.Add")}
      </Button>
      {/* store list */}
      {stores && stores.length !== 0 && (
        <StoresList
          request={stores}
          onActionEvent={(o: RequestAction) => {
            handleStoreAction(o);
          }}
          onCompleteEvent={getAllStores}
        />
      )}
    </>
  );

  //#endregion
};
