import {Dispatch, FC, SetStateAction, useEffect, useRef, useState,} from "react";
import {Accordion, Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import {
  AddCustomer,
  InputDatePicker,
  LabelBox,
  LoadingBox,
  ModelDialogBox,
  SelectBox,
  TableComponent,
  TextBox,
} from "..";
import {
  ActionTypeEnum,
  ComponentActionTypeEnum,
  CustomerComponentDisplayMode,
  CustomerResponse,
  DailyTransactionTypeEnum,
  KeyValueState,
  LookupItem,
  LookupTypeEnum,
  RequestAction,
  TransactionDetailResponseModel,
  TransactionItemResponseModel,
  TransactionTotalValuesModel,
  UserTransactionsSettingResponse,
  ValidationError,
} from "../../models";
import {getLabelName, isArabicCurrentLanguage} from "../../utils";
import {saveTransaction} from "../../serviceBroker/transactionApiServiceBroker";
import {
  AddItem,
  customerInitialValue,
  getCustomerAccountBalance,
  getItemSalesPrice,
  getLookUp,
  getLookUpItemValue,
  initializeTransactionValuesAndUserTransactionsConfiguration,
  handleTransactionTotalValues,
  transactionDetailInitialValue,
  transactionItemInitialValues,
  updateStateDynamically,
  userTransactionsSettingInitialValues,
  validateAddItem,
  validateSubmitRequest
} from "./businessLogic/transactionBl";
import {getTransactionDetailcolumnsMainGroup} from "./uiHelper/dataTableColumns";
import {TableColumn} from "react-data-table-component";
import {orderBy} from "lodash";

type CallbackFunction = () => void;

export const RegisterTransaction: FC<{
  transactionType: DailyTransactionTypeEnum;
  request?: TransactionDetailResponseModel | null;
  setActionType: Dispatch<SetStateAction<ComponentActionTypeEnum>>;
  actionType: ComponentActionTypeEnum;
  onActionEvent: (o: RequestAction) => void;
}> = ({
  transactionType,
  request,
  setActionType,
  actionType,
  onActionEvent = () => {},
}) => {
  //#region variables
  const isArabic = isArabicCurrentLanguage();
  //#endregion
  //#region state
  const { t } = useTranslation();
  const [showAddCustomerModel, setShowAddCustomerModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerList, setCustomerList] = useState<LookupItem[]>([]);
  const [paymentTypeList, setPaymentTypeList] = useState<LookupItem[]>([]);
  const [currencyList, setCurrencyList] = useState<LookupItem[]>([]);
  const [storeEmployeeList, setStoreEmployeeList] = useState<LookupItem[]>([]);
  const [calcTypeList, setCalcTypeList] = useState<LookupItem[]>([]);
  const [categoryList, setCategoryList] = useState<LookupItem[]>([]);
  const [itemList, setItemList] = useState<LookupItem[]>([]);
  const [itemsPerCategoryList, setItemPerCategoryList] = useState<LookupItem[]>(
    []
  );
  const[userTransactionSettingList,setUserTransactionSettingList]=useState<UserTransactionsSettingResponse[]>([]);
  const[userTransactionSetting,setUserTransactionSetting]=useState<UserTransactionsSettingResponse>(userTransactionsSettingInitialValues);
  const [initialValues, setInitialValues] =
    useState<TransactionDetailResponseModel>(
      request ?? transactionDetailInitialValue
    );
  const [data, setData] = useState<TransactionDetailResponseModel>(
    request || initialValues
  );
  const [transactionItemObject, setTransactionItemObject] =
    useState<TransactionItemResponseModel>(transactionItemInitialValues);
  const [customerObject, setCustomerObject] =
    useState<CustomerResponse>(customerInitialValue);
  const columns: TableColumn<TransactionItemResponseModel>[] =
    //useMemo(() =>
    [...getTransactionDetailcolumnsMainGroup(isArabic, setData, data)];
  //   ,[isArabic]
  // );
  //#endregion
  //#region ref
  const itemCategorySelectBoxMultiselectRef = useRef<any>();
  const itemSelectBoxMultiselectRef = useRef<any>();
  const customerSelectBoxMultiselectRef = useRef<any>();
  const calcTypeSelectBoxMultiselectRef = useRef<any>();
  const paymentTypeSelectBoxMultiselectRef = useRef<any>();
  const currencySelectBoxMultiselectRef = useRef<any>();
  const storeEmployeeSelectBoxMultiselectRef = useRef<any>();
  const transactionSettingStatusButtonRef= useRef<any>();
  //#endregion
  //#region function
  const fillBasicData = async () => {
    //customers
    const customerLookupList = await getLookUp([setCustomerList], LookupTypeEnum.Customers);
    //CategoryType
    await getLookUp([setCategoryList], LookupTypeEnum.CategoryType, true, true);
    //Items
    await getLookUp(
        [setItemList, setItemPerCategoryList],
        LookupTypeEnum.Items,
        true,
        true
    );
    //PaymentType -->getLookUpWithStateUpdateForResultOfSingleRow
    const paymentTypeLookupList = await getLookUp([setPaymentTypeList], LookupTypeEnum.PaymentType, true, true);
    //Currency -->getLookUpWithStateUpdateForResultOfSingleRow
    const currencyLookupList = await getLookUp([setCurrencyList], LookupTypeEnum.Currency, true, true);
    //store Employees -->getLookUpWithStateUpdateForResultOfSingleRow
    const employeeLookupList = await getLookUp([setStoreEmployeeList], LookupTypeEnum.Employee, true, true);
    //CalcType -->getLookUpWithStateUpdateForResultOfSingleRow
    const calcTypeLookupList = await getLookUp([setCalcTypeList], LookupTypeEnum.CalcType, true, true);

    await initializeTransactionValuesAndUserTransactionsConfiguration(setUserTransactionSettingList, setUserTransactionSetting, setData, data,
        [
          {key: "customers", value: customerLookupList},
          {key: "payments", value: paymentTypeLookupList},
          {key: "currencies", value: currencyLookupList},
          {key: "employees", value: employeeLookupList},
          {key: "calcTypes", value: calcTypeLookupList},
        ]
        , transactionType, true,"Tf1Si3LlCp");
  };
  const handleAddItem = async (
    request: TransactionItemResponseModel,
    transactionType: DailyTransactionTypeEnum
  ) => {
    request.Transaction_Type = Number(transactionType);
    request = await AddItem(request, itemList);
    const errorList: ValidationError[] = await validateAddItem(request, t);
    if (errorList !== null && errorList.length !== 0) {
      onActionEvent({
        action: ActionTypeEnum.RaiseError,
        request: errorList,
      });
      return;
    } else {
      onActionEvent({
        action: ActionTypeEnum.ClearError,
      });
      //transactionType;
    }
  const transactionValues:TransactionTotalValuesModel=  handleTransactionTotalValues([...data.TransactionDetaillist, request]);

    setData({
      ...data,
      TotalMony:transactionValues.totalMoney,
      TotalNet:transactionValues.totalNet,
      TotalTax:transactionValues.totalTax,
      Discount:transactionValues.totalDiscount,
      TransactionDetaillist: [...data.TransactionDetaillist, request],
    });
    itemCategorySelectBoxMultiselectRef.current.clearValue();
    itemSelectBoxMultiselectRef.current.clearValue();
    setTransactionItemObject(transactionItemInitialValues);
  };
  const handleSubmit = async (request: TransactionDetailResponseModel) => {
    request.transactionType = transactionType;
    const errorList: ValidationError[] = await validateSubmitRequest(
      request,
      t
    );
    if (errorList !== null && errorList.length !== 0) {
      onActionEvent({
        id: 0,
        action: ActionTypeEnum.RaiseError,
        request: errorList,
      });
      return;
    }
    setLoading(true);
    const result = await saveTransaction(request);
    if (
      result.Errors !== null &&
      result.Errors !== undefined &&
      result.Errors.length !== 0
    ) {
      onActionEvent({
        id: 0,
        action: ActionTypeEnum.RaiseError,
        request:  result.Errors,
      });
    } else {
      onActionEvent({
        action: ActionTypeEnum.AddSuccess,
      });
    }
    setLoading(false);
  };
  const handleClearControls = async () => {
    currencySelectBoxMultiselectRef.current.clearValue();
    storeEmployeeSelectBoxMultiselectRef.current.clearValue();
    paymentTypeSelectBoxMultiselectRef.current.clearValue();
    calcTypeSelectBoxMultiselectRef.current.clearValue();
    customerSelectBoxMultiselectRef.current.clearValue();
    itemCategorySelectBoxMultiselectRef.current.clearValue();
    itemSelectBoxMultiselectRef.current.clearValue();
    setData({ ...initialValues });
    setTransactionItemObject({ ...transactionItemInitialValues });
  };
  const updateTransactionItemObjectState =async  (key?: string|null, value?: any|null, keyValues?: KeyValueState[]|null) => {
     await updateStateDynamically(
        setTransactionItemObject,
        transactionItemObject,
        key,
        value,keyValues
    );
  };
  //#endregion
  //#region formik
  const formik = useFormik({
    initialValues: initialValues,
    //enableReinitialize: true,
    onReset: async (values, { setSubmitting, resetForm }) => {
      // await handleClearControls();
      onActionEvent({
        id: 0,
        action: ActionTypeEnum.Clear,
      });
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await handleSubmit(data);
    },
  });
  //#endregion
  //#region useEffect
  useEffect(() => {
    const fillData = async () => {
      //throw new Error("Api did not respond!")
      setLoading(true);
// await getUserTransactionsConfiguration(setUserTransactionSettingList, setUserTransactionSetting,setData,data, transactionType, "Tf1Si3LlCp");
     //await transactionSettingStatusButtonRef.current.click()
      await fillBasicData();
      setLoading(false);
    };
    fillData();
  }, []);
  useEffect(() => {
    if (actionType !== ComponentActionTypeEnum.None) {
      const fillData = async () => {
        setActionType(ComponentActionTypeEnum.None);
        switch (actionType) {
          case ComponentActionTypeEnum.Clear:
            await handleClearControls();
            break;
          case ComponentActionTypeEnum.Add:
            break;
          case ComponentActionTypeEnum.Edit:
            await handleClearControls();
            setData(request || initialValues);
            break;
          default:
            break;
        }
      };
      fillData();
    }
  }, [actionType]);
  useEffect(()=>{
    const fillData = async () => {
      const orderedCustomerList= orderBy(customerList.filter(p=>p.isAdded===true), ['value'], ['desc']);
      if(orderedCustomerList!==null && orderedCustomerList!==undefined && orderedCustomerList.length!==0){
        await updateStateDynamically(setData,data,"Customer_ID",Number(orderedCustomerList[0].value));
       // await updateStateDynamically(setData,data,"Customer_ID",149);
      }
    }
    fillData().then(r =>{});
  },[customerList]);
  useEffect(()=>{
    if(request?.isReInitializeTransactionValues){
      const fillData = async () => {
        console.log('p_x_9',request.TransactionDetaillist.length)
        setLoading(true);
        await initializeTransactionValuesAndUserTransactionsConfiguration(setUserTransactionSettingList, setUserTransactionSetting, setData, request,
            [
              {key: "customers", value: customerList},
              {key: "payments", value: paymentTypeList},
              {key: "currencies", value: currencyList},
              {key: "employees", value: storeEmployeeList},
              {key: "calcTypes", value: calcTypeList},
            ]
            , transactionType, false,"Tf1Si3LlCp");
        setLoading(false);
      };
      fillData()
    }
  },[request?.isReInitializeTransactionValues])
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      <form onSubmit={formik.handleSubmit}>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              {t("transaction.data.header")}
            </Accordion.Header>
            <Accordion.Body>
              <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
                <TextBox
                    labelName={getLabelName("Code")}
                    isReadOnly={true}
                    inputName={"Name"}
                    errorText={formik.errors.Code}
                    inputValue={formik.values.Code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    controlSize={2}
                    labelSize={1}
                />
                <SelectBox
                    id="customersSelectBox"
                    labelName={getLabelName("Customer")}
                    isSingleSelect={true}
                    selectedValues={
                      data.Customer_ID !== null && data.Customer_ID !== undefined
                          ? [data.Customer_ID.toString()]
                          : []
                    }
                    source={customerList}
                    multiselectRef={customerSelectBoxMultiselectRef}
                    controlClassName="btn-input"
                    onStatusChange={async (e: LookupItem) => {
                      const balance: number = await getCustomerAccountBalance(
                          Number(e.value),
                          data.Currency_ID!==null &&data.Currency_ID!==undefined?data.Currency_ID:null,
                          customerList
                      );
                      //setCustomerBalance(balance);
                      updateStateDynamically(
                          setData,
                          data,
                          null,null,[
                              {key:"Customer_ID",value: getLookUpItemValue(e) },
                            {key:"customerBalance",value: balance }
                          ]
                      );
                    }}
                    errorText={formik.errors.Customer_ID}
                    controlSize={3}
                    labelSize={1}
                />
                <Button
                    variant=""
                    size="sm"
                    className="btn-gradient-primary"
                    onClick={() => {
                      setShowAddCustomerModel(true);
                    }}
                >
                  <i className="mdi mdi-plus"></i>
                </Button>
                <ModelDialogBox
                    isModelVisible={showAddCustomerModel}
                    isCloseButtonVisible={true}
                    isEscapeCloseEnabled={true}
                    title={getLabelName("Customers")}
                    size="lg"
                    onCloseEvent={() => {
                      setShowAddCustomerModel(false);
                    }}
                >
                  <AddCustomer
                      request={customerObject}
                     displayMode={CustomerComponentDisplayMode.registerTransactionMode}
                      onActionEvent={async function (o: RequestAction): Promise<void> {
                        if (o.request !== null && o.request !== undefined) {
                          setCustomerList([
                            ...customerList,
                            {
                              value: o.request.ID,
                              name: o.request.Name_En,
                              nameAr: o.request.Name,
                              otherValue: {
                                accountId: o.request.Account_ID,
                              },
                              isAdded:true
                            },
                          ]);
                          //await updateStateDynamically(setData, data, "Customer_ID", o.request.ID)
                          setShowAddCustomerModel(false);
                        }
                      }}
                  />
                </ModelDialogBox>
                <LabelBox
                    labelName={getLabelName("Customer Balance")}
                    inputValue={data.customerBalance}
                    controlSize={3}
                    labelSize={1}
                />
                {calcTypeList.length > 1 && (
                    <SelectBox
                        id="calcTypesSelectBox"
                        labelName={getLabelName("Calc Type")}
                        isSingleSelect={true}
                        selectedValues={
                          data.invoiceType !== null && data.invoiceType !== undefined
                              ? [data.invoiceType.toString()]
                              : []
                        }
                        source={calcTypeList}
                        multiselectRef={calcTypeSelectBoxMultiselectRef}
                        onStatusChange={(e: LookupItem) => {
                          ///const val=getLookUpItemValue(e)
                          updateStateDynamically(
                              setData,
                              data,
                              "invoiceType",
                              getLookUpItemValue(e)
                          );
                        }}
                        errorText={formik.errors.invoiceType}
                        controlSize={3}
                        labelSize={1}
                    />
                )}
                {userTransactionSetting.ShowPaymentType && <SelectBox
                    id="paymentTypesSelectBox"
                    labelName={getLabelName("Payment Type")}
                    isSingleSelect={true}
                    selectedValues={
                      data.PaymentType_ID !== null && data.PaymentType_ID !== undefined
                          ? [data.PaymentType_ID.toString()]
                          : []
                    }
                    source={paymentTypeList}
                    multiselectRef={paymentTypeSelectBoxMultiselectRef}
                    onStatusChange={(e: LookupItem) => {
                      updateStateDynamically(
                          setData,
                          data,
                          "PaymentType_ID",
                          getLookUpItemValue(e)
                      );
                    }}
                    errorText={formik.errors.PaymentType_ID}
                    controlSize={3}
                    labelSize={1}
                />
                }
                {currencyList.length > 1 && (
                    <SelectBox
                        id="currencySelectBox"
                        labelName={getLabelName("Currency")}
                        isSingleSelect={true}
                        selectedValues={
                          data.Currency_ID !== null && data.Currency_ID !== undefined
                              ? [data.Currency_ID.toString()]
                              : []
                        }
                        source={currencyList}
                        multiselectRef={currencySelectBoxMultiselectRef}
                        onStatusChange={async (e: LookupItem) => {
                          const balance: number = await getCustomerAccountBalance(
                              data.Customer_ID !== null && data.Customer_ID !== undefined ? data.Customer_ID : null,
                              Number(e.value),
                              customerList
                          );
                          await updateStateDynamically(
                              setData,
                              data,
                              null, null, [
                                {key: "Currency_ID", value: getLookUpItemValue(e)},
                                {key: "customerBalance", value: balance}
                              ]
                          );
                        }}
                        errorText={formik.errors.Currency_ID}
                        controlSize={3}
                        labelSize={1}
                    />
                )}

                {storeEmployeeList.length > 1 && (
                    <SelectBox
                        id="storeEmployeesSelectBox"
                        labelName={getLabelName("Employee")}
                        isSingleSelect={true}
                        selectedValues={
                          data.Emp_ID !== null && data.Emp_ID !== undefined
                              ? [data.Emp_ID.toString()]
                              : []
                        }
                        source={storeEmployeeList}
                        multiselectRef={storeEmployeeSelectBoxMultiselectRef}
                        onStatusChange={(e: LookupItem) => {
                          updateStateDynamically(
                              setData,
                              data,
                              "Emp_ID",
                              getLookUpItemValue(e)
                          );
                        }}
                        errorText={formik.errors.Emp_ID}
                        controlSize={3}
                        labelSize={1}
                    />
                )}
                <TextBox
                    labelName={getLabelName("Discount")}
                    isReadOnly={!userTransactionSetting.EnableDiscount }
                    type="number"
                    inputName={"Discount"}
                    errorText={formik.errors.Discount}
                    inputValue={formik.values.Discount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    controlSize={1}
                    labelSize={1}
                />
                <LabelBox
                    labelName={getLabelName("Discount %")}
                    inputValue={undefined}
                    controlSize={1}
                    labelSize={1}
                />
                <InputDatePicker
                    selectedDate={new Date(data.Date.toString())}
                    className="form-control"
                    InputLabel={"Date"}
                    // selectsStart
                    onChange={(date: Date) => {
                      setData({
                        ...data,
                        Date: date,
                      });
                    }}
                    controlSize={3}
                    labelSize={1}
                />
                <LabelBox
                    labelName={getLabelName("Total")}
                    inputValue={data.TotalMony}
                    controlSize={3}
                    labelSize={1}
                />
                <LabelBox
                    labelName={getLabelName("Tax_Value")}
                    inputValue={data.TotalTax}
                    controlSize={3}
                    labelSize={1}
                />
                <LabelBox
                    labelName={getLabelName("Net Bill")}
                    inputValue={data.TotalNet}
                    controlSize={3}
                    labelSize={1}
                />

                <TextBox
                    labelName={getLabelName("Notes")}
                    type="textarea"
                    inputName={"Note"}
                    inputValue={formik.values.Note}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeHolder="Type Here"
                />
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              {/*<div className="section-title my-3">*/}
             <span>
            {"".concat(
                getLabelName("Add Items To"),
                getLabelName(DailyTransactionTypeEnum[transactionType])
            )}
          </span>
              {/*</div>*/}
            </Accordion.Header>
            <Accordion.Body>
              <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
                <SelectBox
                    id="categorySelectBox"
                    labelName={getLabelName("Category")}
                    isSingleSelect={true}
                    controlSize={2}
                    labelSize={1}
                    selectedValues={
                      transactionItemObject.Categ_ID !== null &&
                      transactionItemObject.Categ_ID !== undefined
                          ? [transactionItemObject.Categ_ID.toString()]
                          : []
                    }
                    source={categoryList}
                    multiselectRef={itemCategorySelectBoxMultiselectRef}
                    onStatusChange={(e: LookupItem) => {
                      updateStateDynamically(
                          setData,
                          data,
                          "Categ_ID",
                          getLookUpItemValue(e)
                      );
                      if (
                          e !== null &&
                          e !== undefined &&
                          e.value !== null &&
                          e.value != ""
                      ) {
                        setItemPerCategoryList(
                            itemList.filter(
                                //@ts-ignore
                                (p) =>
                                    p.value !== null &&
                                    p.otherValue.categoryId === Number(e.value)
                            )
                        );
                      } else {
                        setItemPerCategoryList(itemList);
                      }
                    }}
                />

                <SelectBox
                    id="itemsSelectBox"
                    labelName={getLabelName("Item")}
                    isSingleSelect={true}
                    selectedValues={
                      transactionItemObject.ItemInstore_ID !== null &&
                      transactionItemObject.ItemInstore_ID !== undefined
                          ? [transactionItemObject.ItemInstore_ID.toString()]
                          : []
                    }
                    source={itemsPerCategoryList}
                    multiselectRef={itemSelectBoxMultiselectRef}
                    onStatusChange={ async (e: LookupItem) => {
                      await updateTransactionItemObjectState(null, null, [{
                        key: "ItemInstore_ID",
                        value: e !== null && e !== undefined ? Number(e.value) : null
                      }, {
                        key: "Unit_Price",
                        value: e !== null && e !== undefined
                            ? getItemSalesPrice(
                                Number(e.value),
                                transactionType,
                                //transactionCalcType,
                                itemList,
                                calcTypeList,
                                userTransactionSetting,
                                data
                            )
                            : 0
                      }]);
                    }}
                />
                <LabelBox
                    labelName={getLabelName("Balance")}
                    inputValue={transactionItemObject.UnitBalance}
                    controlSize={2}
                    labelSize={1}
                />
                <TextBox
                    labelName={getLabelName("Quantity")}
                    inputName={"Quantity"}
                    controlSize={2}
                    labelSize={1}
                    type="number"
                    inputValue={transactionItemObject.Quantity}
                    onChange={(e: any) =>
                        updateTransactionItemObjectState("Quantity", e.target.value)
                    }
                />
                <TextBox
                    labelName={getLabelName("Price")}
                    isReadOnly={!userTransactionSetting.EnableShangPrice}
                    inputName={"Unit_Price"}
                    controlSize={2}
                    labelSize={1}
                    type="number"
                    inputValue={transactionItemObject.Unit_Price}
                    onChange={(e: any) =>
                        updateTransactionItemObjectState(
                            "Unit_Price",
                            Number(e.target.value)
                        )
                    }
                />
                <TextBox
                    labelName={getLabelName("Discount")}
                    isReadOnly={!userTransactionSetting.EnableDiscount }
                    inputName={"ItemDiscount"}
                    type="number"
                    controlSize={2}
                    labelSize={1}
                    inputValue={transactionItemObject.ItemDiscount}
                    onChange={(e: any) =>
                        updateTransactionItemObjectState(
                            "ItemDiscount",
                            e.target.value != null ? Number(e.target.value) : 0
                        )
                    }
                />
                <TextBox
                    labelName={getLabelName("Discount %")}
                    isReadOnly={!userTransactionSetting.EnableDiscount }
                    inputName={"ItemDiscountRatio"}
                    type="number"
                    controlSize={2}
                    labelSize={1}
                    inputValue={transactionItemObject.ItemDiscountRatio}
                    onChange={(e: any) =>
                        updateTransactionItemObjectState(
                            "ItemDiscountRatio",
                            e.target.value != null ? Number(e.target.value) : 0
                        )
                    }
                />
              </div>
              <div className="row mt-3">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-end">
                  <Button
                      variant=""
                      className="btn-gradient-info me-2"
                      size="sm"
                      onClick={async () => {
                        await handleAddItem(transactionItemObject, transactionType);
                      }}
                  >
                    {getLabelName("Add")}
                  </Button>
                </div>
              </div>
              {data.TransactionDetaillist.length > 0 && (
                  <>
                    <div className="item-unit-list">
                      <div className="section-title">
                        <span>{getLabelName("Items")}</span>
                      </div>
                      <TableComponent
                          columns={columns}
                          data={data.TransactionDetaillist}
                          totalRows={1000}
                          currentPage={1}
                          pageSize={10000}
                          paginationType="none"
                      />
                    </div>
                    <div className="w-100 mt-3 d-flex justify-content-end">
                      <Button
                          type="submit"
                          className="btn btn-sm btn-gradient-primary me-2"
                          variant=""
                      >
                        {getLabelName("Save")}
                      </Button>
                      <Button
                          variant="danger"
                          type="button"
                          className="btn btn-sm"
                          onClick={formik.handleReset}
                      >
                        {getLabelName("New")}
                      </Button>
                    </div>
                  </>
              )}

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>




        <Button style={{ display: "none" }}
            ref={transactionSettingStatusButtonRef} onClick={ async () => {
              console.log('p_xxxx')
        // await getUserTransactionsConfiguration(setUserTransactionSettingList, setUserTransactionSetting,setData,data, transactionType, "Tf1Si3LlCp");
          //  setUserTransactionSetting({...userTransactionSetting,EnableShangPrice:true})
        }}/>
      </form>
    </>
  );
  //#endregion
};
