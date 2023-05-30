import _ from "lodash";
import { FC, useEffect, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ConfirmModelDialogBox,
  LoadingBox,
  ModelDialogBox,
  AddSupplier,
  SupplierList,
  ToastBox,
} from "../../components";
import {
  ActionButtons,
  ActionTypeEnum,
  CustomerResponse,
  RequestAction,
  SearchCustomerRequestModel,
  SearchCustomerResponseModel,
  SearchCustomersTypeEnum,
  ToastModel,
  RowState,
  SupplierCustomerType,
  ValidationError,
} from "../../models";
import {
  deleteSupplier,
  getCustomerById,
  searchSuppliers,
} from "../../serviceBroker/supplierApiServiceBroker";
import { getLabelName, getUserId } from "../../utils";

export const SupplierPage: FC<{}> = () => {
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  const [object, setObject] = useState<CustomerResponse>({
    Code: 0,
    IDNumber: "",
    City_ID: 0,
    Address: "",
    Mobile: "",
    Phone: "",
    Mail: "",
    Notes: "",
    Cust_Type: Number(SupplierCustomerType.Supplier),
    Beg_AC_Bal: 0,
    AreaLand: "",
    User_ID: 0,
    Account_ID: 0,
    ISCustomerAndSupplier: false,
    PaymentTypeID: 0,
    Currency_ID: 0,
    ValueCurrency: 0,
    BalanceOfPoint: 0,
    IsDefault: false,
    MaxDebit: 0,
    Customer_UniqueID: 0,
    Name_En: "",
    TaxNumber: "",
    IsCopyToServer: true,
    Device_ID: 0,
    IsSponsor: false,
    Sponsor_Id: 0,
    IsActive: true,
    ProfitPercentage: 0,
    CustomerType: 0,

    address: {
      CountryCode: "",
      FlatNumber: "",
      Governate: "",
      CreatedBy: 0,
      CreationDate: new Date(),
      ModificationDate: new Date(),
      CustomerId: 0,
      Address_GUID: "",
      ID: 0,
      ModifiedBy: 0,
      Name: "",
      RegionCity: "",
      Remarks: "",
      Row_State: 1,
      Street: "",
      VerifyOnUpdate: false,
      buildingNumber: "",
      rowState: 1,
    },
    IsCreateAccountOnSaveNewOne: false,
    IsSkipSaveAccount: false,
    ID: 0,
    CreatedBy: 0,
    ModifiedBy: 0,
    Name: "",
    ModificationDate: new Date(),
    VerifyOnUpdate: false,
    rowState: 1,
  });
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showToastModel, setShowToastModel] = useState(false);
  const [objects, setObjects] = useState<SearchCustomerResponseModel[]>([]);
  const [searchSupplierRequest, setSearchSupplierRequest] =
    useState<SearchCustomerRequestModel>({
      pageNumber: 1,
      pageSize: 50,
      searchType: SearchCustomersTypeEnum.CustomerName,
    });
  const [toastModel, setToastModel] = useState<ToastModel>({
    show: false,
    variant: "Primary",
    body: t("processSuceess"),
  });
  //#endregion
  //#region varaibles
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
          Code: 0,
          IDNumber: "",
          City_ID: 0,
          Address: "",
          Mobile: "",
          Phone: "",
          Mail: "",
          Notes: "",
          Cust_Type: Number(SupplierCustomerType.Supplier),
          Beg_AC_Bal: 0,
          AreaLand: "",
          User_ID: 0,
          Account_ID: 0,
          ISCustomerAndSupplier: false,
          PaymentTypeID: 0,
          Currency_ID: 0,
          ValueCurrency: 0,
          BalanceOfPoint: 0,
          IsDefault: false,
          MaxDebit: 0,
          Customer_UniqueID: 0,
          Name_En: "",
          TaxNumber: "",
          IsCopyToServer: true,
          Device_ID: 0,
          IsSponsor: false,
          Sponsor_Id: 0,
          IsActive: true,
          ProfitPercentage: 0,
          CustomerType: 0,

          address: {
            CountryCode: "",
            FlatNumber: "",
            Governate: "",
            CreatedBy: 0,
            CreationDate: new Date(),
            ModificationDate: new Date(),
            CustomerId: 0,
            Address_GUID: "",
            ID: 0,
            ModifiedBy: 0,
            Name: "",
            RegionCity: "",
            Remarks: "",
            Row_State: 1,
            Street: "",
            VerifyOnUpdate: false,
            buildingNumber: "",
            rowState: 1,
          },
          IsCreateAccountOnSaveNewOne: false,
          IsSkipSaveAccount: false,
          ID: 0,
          CreatedBy: 0,
          ModifiedBy: 0,
          Name: "",
          ModificationDate: new Date(),
          VerifyOnUpdate: false,
          rowState: 1,
        });
        setShowDeleteModel(false);
      },
    },
  ];
  //#endregion
  //#region useEffect
  const fillData = async () => {
    await getAllObjects(searchSupplierRequest);
  };
  useEffect(() => {
    fillData();
  }, []);
  //#endregion
  //#region function
  const getAllObjects = async (searchModel: SearchCustomerRequestModel) => {
    setLoading(true);
    console.log("searchModel",searchModel)
    const result = await searchSuppliers(searchModel);
    setObjects(result?.Result || []);
    setTotalRows(result?.TotalRecoredCount || 0);
    setLoading(false);
  };
  const handleAction = async (request: RequestAction) => {
    switch (request.action) {
      case ActionTypeEnum.AddSuccess:
        setObject({
          Code: 0,
          IDNumber: "",
          City_ID: 0,
          Address: "",
          Mobile: "",
          Phone: "",
          Mail: "",
          Notes: "",
          Cust_Type: Number(SupplierCustomerType.Supplier),
          Beg_AC_Bal: 0,
          AreaLand: "",
          User_ID: 0,
          Account_ID: 0,
          ISCustomerAndSupplier: false,
          PaymentTypeID: 0,
          Currency_ID: 0,
          ValueCurrency: 0,
          BalanceOfPoint: 0,
          IsDefault: false,
          MaxDebit: 0,
          Customer_UniqueID: 0,
          Name_En: "",
          TaxNumber: "",
          IsCopyToServer: true,
          Device_ID: 0,
          IsSponsor: false,
          Sponsor_Id: 0,
          IsActive: true,
          ProfitPercentage: 0,
          CustomerType: 0,

          address: {
            CountryCode: "",
            FlatNumber: "",
            Governate: "",
            CreatedBy: 0,
            CreationDate: new Date(),
            ModificationDate: new Date(),
            CustomerId: 0,
            Address_GUID: "",
            ID: 0,
            ModifiedBy: 0,
            Name: "",
            RegionCity: "",
            Remarks: "",
            Row_State: 1,
            Street: "",
            VerifyOnUpdate: false,
            buildingNumber: "",
            rowState: 1,
          },
          IsCreateAccountOnSaveNewOne: false,
          IsSkipSaveAccount: false,
          ID: 0,
          CreatedBy: 0,
          ModifiedBy: 0,
          Name: "",
          ModificationDate: new Date(),
          VerifyOnUpdate: false,
          rowState: 1,
        });
        await getAllObjects(searchSupplierRequest);
        setShowToastModel(true);
        break;
      case ActionTypeEnum.Clear:
        setLoading(true);
        setObject({
          Code: 0,
          IDNumber: "",
          City_ID: 0,
          Address: "",
          Mobile: "",
          Phone: "",
          Mail: "",
          Notes: "",
          Cust_Type: Number(SupplierCustomerType.Supplier),
          Beg_AC_Bal: 0,
          AreaLand: "",
          User_ID: 0,
          Account_ID: 0,
          ISCustomerAndSupplier: false,
          PaymentTypeID: 0,
          Currency_ID: 0,
          ValueCurrency: 0,
          BalanceOfPoint: 0,
          IsDefault: false,
          MaxDebit: 0,
          Customer_UniqueID: 0,
          Name_En: "",
          TaxNumber: "",
          IsCopyToServer: true,
          Device_ID: 0,
          IsSponsor: false,
          Sponsor_Id: 0,
          IsActive: true,
          ProfitPercentage: 0,
          CustomerType: 0,

          address: {
            CountryCode: "",
            FlatNumber: "",
            Governate: "",
            CreatedBy: 0,
            CreationDate: new Date(),
            ModificationDate: new Date(),
            CustomerId: 0,
            Address_GUID: "",
            ID: 0,
            ModifiedBy: 0,
            Name: "",
            RegionCity: "",
            Remarks: "",
            Row_State: 1,
            Street: "",
            VerifyOnUpdate: false,
            buildingNumber: "",
            rowState: 1,
          },
          IsCreateAccountOnSaveNewOne: false,
          IsSkipSaveAccount: false,
          ID: 0,
          CreatedBy: 0,
          ModifiedBy: 0,
          Name: "",
          ModificationDate: new Date(),
          VerifyOnUpdate: false,
          rowState: 1,
        });
        await getAllObjects(searchSupplierRequest);
        setLoading(false);
        break;
      case ActionTypeEnum.Update:
        window.scrollTo(0, 0);

        var item = await getCustomerById(request.id!);
        //@ts-ignore
        item.rowState = Number(RowState.Update);
        item.Cust_Type = Number(SupplierCustomerType.Supplier);
        if (item.address != null)
          item.address.rowState = Number(RowState.Update);
        setObject(item);
        break;
      case ActionTypeEnum.Delete:
        setObject(request.request);
        setShowDeleteModel(true);
        break;
      case ActionTypeEnum.DeleteOperationStart:
        setLoading(true);
        setShowDeleteModel(false);
        var result = await deleteSupplier(request.id!);
        setLoading(false);
        //alert(JSON.stringify(result));
        //@ts-ignore
        await getAllObjects(searchSupplierRequest);

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
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-home"></i>
          </span>{" "}
          Supplier
        </h3>
      </div>
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
          <Accordion.Header>{t("AddSupplier")}</Accordion.Header>
          <Accordion.Body>
            <Card>
              {/* <Card.Header></Card.Header> */}
              <Card.Body>
                <AddSupplier
                  request={object}
                  onActionEvent={(o: RequestAction) => {
                    handleAction(o);
                  }}
                />
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{t("Suppliers")}</Accordion.Header>
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
      {objects
      // && objects.length !== 0
       && (

      <SupplierList
        getSupplierList={(searchModel:SearchCustomerRequestModel)=>{
        getAllObjects(searchModel)
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
