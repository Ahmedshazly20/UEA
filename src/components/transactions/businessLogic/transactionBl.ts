import _ from "lodash";
import {Dispatch, SetStateAction, useRef, useState} from "react";
import {
  CustomerResponse,
  DailyTransactionTypeEnum, KeyValueState,
  LookupItem, LookupItemKeyValue,
  LookupTypeEnum,
  PriceTypeEnum,
  RowState,
  StateGenericRequestModel,
  SupplierCustomerType,
  TransactionDetailResponseModel,
  TransactionItemResponseModel, TransactionTotalValuesModel,
  UserTransactionsSettingResponse,
  ValidationError,
} from "../../../models";
import {GetCurrentAccountBalance} from "../../../serviceBroker/accountApiServiceBroker";
import {getLookupByType} from "../../../serviceBroker/lookupApiServiceBroker";
import {generateGuid, getUserId, getUserStationId} from "../../../utils";
import {getUserTransactionsSettings} from "../../../serviceBroker/userApiServiceBroker";
//#region variables
export const userTransactionsSettingInitialValues: UserTransactionsSettingResponse={
  DeafultNote: "",
  DefaultCalcTypeID: 0,
  DefaultPaymentTypeID: 0,
  DirectPrintBillAfterSave: false,
  EnableButonAdd: false,
  EnableDiscount: false,
  EnablePrint: false,
  EnableShangPrice: false,
  ID: 0,
  Name: null,
  NumberOfCopy: 0,
  PeriodAllowForReturn: 0,
  PrinterName: "",
  PrinterPrepairingSalesInvoice: "",
  RemarksVisable: "",
  ShowButtonPrintPrepairingOrder: false,
  ShowCalcType: false,
  ShowCinfirm: false,
  ShowCostCenter: false,
  ShowCurrency: false,
  ShowCustomerCar: false,
  ShowDone: false,
  ShowEmployeeResponsibile: false,
  ShowNotefy: false,
  ShowPaymentType: false,
  ShowPrice: false,
  ShowPrintStickerButton: false,
  ShowRefrence: false,
  ShowSaveAndPrintButton: false,
  ShowTransPortCost: false,
  TransactionType_ID: 0,
  User_ID: 0,
  VerifyOnUpdate: false,
  rowState: 0
}
export const transactionItemInitialValues: TransactionItemResponseModel = {
  Categ_ID: null,
  ItemInstore_ID: null,
  ItemUnit_ID: null,
  ItemDiscount: 0,
  ItemDiscountRatio: 0,
  rowKey: "",

  TransactionHeader_ID: 0,
  TransDetail_IDParent: 0,
  ItemName: "",
  ItemName_En: "",
  ItemCode: "",
  Item_Modifiers_Json: "",
  Modifiers: undefined,
  Quantity: 1,
  Unit_Price: 0,
  // get  Unit_PriceComputed(): number {
  //   return  this.Unit_Price*10
  // },
  PriceCost: 0,
  Factor: 0,
  Transaction_Type: 0,
  Tax: 0,
  MaxQty: 0,
  TaxPercentge: 0,
  Total: 0,
  TotalTax: 0,

  IsGatherItem: false,
  UseExpiryDate: false,
  WithoutBalance: false,
  IsFromGatherItem: false,
  NotesDetails: "",
  Unit: "",
  UnitName: "",
  IsPrinted: false,
  ExpiryDate: "",
  ID: 0,
  CreatedBy: 0,
  ModifiedBy: 0,
  rowState: Number(RowState.Add),
  UnitBalance: 0,
};
export const transactionDetailInitialValue: TransactionDetailResponseModel = {
  Code: "",
  transactionType: 0,
  invoiceType: null,
  PaymentType_ID: null,
  Currency_ID: null,
  Customer_ID: null,
  User_Update: 0,
  User_Create: getUserId(),
  Emp_ID: 0,
  Station_ID: getUserStationId(),
  Table_ID: 0,
  TempHeaderID: 0,
  Refrence: 0,
  IsPrinted: false,
  Date: new Date(),
  TotalMony: 0,
  Discount: 0,
  MoneyAdd: 0,
  CashMoney: 0,
  CardMoney: 0,
  DelayMoney: 0,
  OthersMoney: 0,
  Tobacco_Value: 0,
  TotalTax: 0,
  TotalNet:0,
  customerBalance:0,
  isReInitializeTransactionValues:false,
  TransactionDetaillist: [],

  ID: 0,
  CreatedBy: getUserId(),
  ModifiedBy: 0,
  rowState: Number(RowState.Add),
};
export const customerInitialValue: CustomerResponse = {
  Code: 0,
  IDNumber: "",
  City_ID: 0,
  Address: "",
  Mobile: "",
  Phone: "",
  Mail: "",
  Notes: "",
  Cust_Type: Number(SupplierCustomerType.Customer),
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
};
//#endregion
//#region user transactions settings
export const initializeTransactionValuesAndUserTransactionsConfiguration=async(
    setUserSettingStateList: Dispatch<SetStateAction<UserTransactionsSettingResponse[]>>,
    setUserSettingStata: Dispatch<SetStateAction<UserTransactionsSettingResponse>>,
    setTransactionDetail: Dispatch<SetStateAction<TransactionDetailResponseModel>>,
    transactionDetail: TransactionDetailResponseModel,
    lookupList:LookupItemKeyValue[],
    transactionType:number,
    isSetState:boolean,
    cacheKey:string,
)=> {
  const settingsList = await getUserTransactionsSettings([DailyTransactionTypeEnum.SalesInvoice, DailyTransactionTypeEnum.PurchasesInvoice, DailyTransactionTypeEnum.SalesReturn, DailyTransactionTypeEnum.PurchasesReturn], true, cacheKey);
  const currentTransactionSetting = settingsList.filter(p => p.TransactionType_ID === transactionType)[0]
  if(isSetState) {
    setUserSettingStateList(settingsList);
    setUserSettingStata(currentTransactionSetting);
  }

  const customerId: number | null =getLookupItemFirstDefaultValue("customers",lookupList);
  const paymentTypeId: number | null =getLookupItemFirstDefaultValue("payments",lookupList);
  const currencyId: number | null =getLookupItemFirstDefaultValue("currencies",lookupList);
  const employeeId: number | null =getLookupItemFirstDefaultValue("employees",lookupList);
  const calcTypeId: number | null =getLookupItemFirstDefaultValue("calcTypes",lookupList);

  const customersList:LookupItem[]|null=getLookupItemListFromDictionary("customers",lookupList)
  const balance=await  getCustomerAccountBalance(
      customerId !== null ? customerId : transactionDetail.Customer_ID!== null&&transactionDetail.Customer_ID!== undefined?transactionDetail.Customer_ID:0,
      currencyId !== null ? currencyId : transactionDetail.Currency_ID!== null&&transactionDetail.Currency_ID!== undefined?transactionDetail.Currency_ID:null,customersList||[])

  setTransactionDetail({
    ...transactionDetail,
    Customer_ID: customerId !== null ? customerId : transactionDetail.Customer_ID,
    Currency_ID: currencyId !== null ? currencyId : transactionDetail.Currency_ID,
    Emp_ID: employeeId !== null ? employeeId : transactionDetail.Emp_ID,
    PaymentType_ID: currentTransactionSetting.DefaultPaymentTypeID !== 0 ? currentTransactionSetting.DefaultPaymentTypeID : paymentTypeId !== null ? paymentTypeId : transactionDetail.PaymentType_ID,
    invoiceType: currentTransactionSetting.DefaultCalcTypeID!== 0 ?currentTransactionSetting.DefaultCalcTypeID:calcTypeId!==null?calcTypeId:transactionDetail.invoiceType ,
    customerBalance:balance,
    isReInitializeTransactionValues:false,
  });
  //setUserSettingStata({...currentTransactionSetting});
  // if (transactionSettingButtonRef.current) {
  //   transactionSettingButtonRef.current.click();
  // }
}
//#endregion
//#region lookup functions
export const getLookUp = async (
  state: Dispatch<SetStateAction<any>>[],
  lookup: LookupTypeEnum,
  isCached: boolean = true,
  addEmptySelect: boolean = false
): Promise<LookupItem[]> => {
  const lookupList = await getLookupByType(lookup, isCached, addEmptySelect);
  state.forEach((setStaterow) => {
    setStaterow(lookupList);
  });
  return  lookupList;
};
export const getLookUpWithStateUpdateForResultOfSingleRow = async (
  state: Dispatch<SetStateAction<any>>[],
  lookup: LookupTypeEnum,
  updateState: StateGenericRequestModel[],
  isCached: boolean = true,
  addEmptySelect: boolean = false
) : Promise<LookupItem[]>=> {
  const lookupList = await getLookupByType(lookup, isCached, addEmptySelect);
  state.forEach((setStaterow) => {
    setStaterow(lookupList);
  });
  if (
    lookupList.length === 1 &&
    updateState !== null &&
    updateState !== undefined &&
    updateState.length !== 0
  ) {
    const value: any = lookupList[0].value;
    updateState.forEach((setStaterow) => {
      if (
        setStaterow.filed !== null &&
        setStaterow.filed !== undefined &&
        setStaterow.filed !== ""
      ) {
        updateStateDynamically(
          setStaterow.state,
          setStaterow.value,
          setStaterow.filed,
          value
        );
      }
    });
  }
  return  lookupList;
};
export const getLookUpItemValue = (
  request?: LookupItem | null
): string | null => {
  return request != null &&
    request !== undefined &&
    request.value !== null &&
    request.value !== undefined
    ? request.value
    : null;
};
//#endregion
//#region calculation functions
export const handleChangeItemValues = (
  setState: Dispatch<SetStateAction<TransactionDetailResponseModel>>,
  stateValue: TransactionDetailResponseModel,
  request: TransactionItemResponseModel
) => {
  let obj = stateValue.TransactionDetaillist;
  obj = _.map(obj, (row) => {
    if (row.rowKey == request.rowKey) {
      //row = { ...request };
      request.Total = calculateItemPrice(request);
      return { ...request };
    } else {
      return row;
    }
  });
  const transactionValues:TransactionTotalValuesModel=  handleTransactionTotalValues(obj);

  setState({
    ...stateValue,
    TotalMony:transactionValues.totalMoney,
    TotalNet:transactionValues.totalNet,
    TotalTax:transactionValues.totalTax,
    Discount:transactionValues.totalDiscount,
    TransactionDetaillist: obj,
  });
};
export const handleChangeItemQuantity = (
  setState: Dispatch<SetStateAction<TransactionDetailResponseModel>>,
  stateValue: TransactionDetailResponseModel,
  rowkey: string,
  value: number | null
) => {
  let obj = stateValue.TransactionDetaillist;
  obj = _.map(obj, (row) => {
    if (row.rowKey == rowkey) {
      row.Quantity = value === null || value === undefined ? 0 : value;
      row.Total = calculateItemPrice(row);
      return { ...row };
    } else {
      return row;
    }
  });
  setState({
    ...stateValue,
    TransactionDetaillist: obj,
  });
};
export const calculateItemPrice = (
  request: TransactionItemResponseModel
): number => {
  let value: number = request.Quantity * request.Unit_Price;
  //@ts-ignore
  value = request.ItemDiscount !== 0 ? value - request.ItemDiscount : value;
  //@ts-ignore
  // value = request.ItemDiscount !== 0 ? value - request.ItemDiscount : value;
  value =
    request.ItemDiscountRatio !== 0
      ? //@ts-ignore
        value - value / request.ItemDiscountRatio
      : value;
  return value;
};
export const calculateItemDiscount = (
  request: TransactionItemResponseModel
): number => {
  let value: number = request.ItemDiscount || 0;
  let itemPrice: number = request.Quantity || 0 * request.Unit_Price || 0;
  value =
    request.ItemDiscountRatio !== 0
      ? itemPrice / (request.ItemDiscountRatio || 0) + value
      : value;
  return value;
};
export const getItemSalesPrice = (
  id: number,
  transactionType: DailyTransactionTypeEnum,
  // transactionCalcType:number,
  itemList: LookupItem[],
  calcTypeList: LookupItem[],
  userTransactionSetting:UserTransactionsSettingResponse,
  transactionItemObject:TransactionDetailResponseModel
): number => {
  // @ts-ignore
  const calcTypeRecord:LookupItem=transactionItemObject.invoiceType!==null && transactionItemObject.invoiceType!==undefined?calcTypeList.filter(p=>p.value===transactionItemObject.invoiceType.toString())[0]:calcTypeList.filter(p => p.value === userTransactionSetting.DefaultCalcTypeID.toString())[0]
  let price: number = 0;
  const item = itemList.filter(
      //@ts-ignore
      (p) => p.value === id.toString()
  )[0];
  try {
    let transactionCalcType: number = 0;
    if (transactionCalcType === Number(PriceTypeEnum.DefaultPrice) || Number(transactionCalcType === PriceTypeEnum.None)) {
      try {
        transactionCalcType = Number(calcTypeList.filter(p => p.value === userTransactionSetting.DefaultCalcTypeID.toString())[0].otherValue.priceType);
      } catch (e) {
        transactionCalcType = Number(PriceTypeEnum.DefaultPrice)
      }
    }
    switch (transactionCalcType) {
      case Number(PriceTypeEnum.PriceSale):
        switch (transactionType) {
          case DailyTransactionTypeEnum.SalesInvoice:
          case DailyTransactionTypeEnum.SalesReturn:
            price = item.otherValue.sellPrice
            break;
          case DailyTransactionTypeEnum.PurchasesInvoice:
          case DailyTransactionTypeEnum.PurchasesReturn:
            price = item.otherValue.purchasePrice;
            break;
        }
        break;
      case Number(PriceTypeEnum.PriceCost):
        price = item.otherValue.costPrice;
        break;
      case Number(PriceTypeEnum.PricePurchase):
        price = item.otherValue.purchasePrice;
        break;
      case Number(PriceTypeEnum.WholeSalePrice):
        price = item.otherValue.wholeSalePrice;
        break;
      case Number(PriceTypeEnum.AdditionalPrice):
        price = item.otherValue.additionalPrice
        break;
      case Number(PriceTypeEnum.DefaultPrice):
      default:
        price = item.otherValue.sellPrice
        break;
    }

    price = price === null || price === undefined ? 0 : price
    price = price + (price * (calcTypeRecord.otherValue.percentage / 100));
  }
  catch (e:any){
    alert('error occurred while getItemSalesPrice please contact support' + e)
    console.log('p_98',e)
    price = item.otherValue.sellPrice
  }
  //console.log('p_97',price)
  return price ===null|| price===undefined?0:price;
};
//#endregion
//#region validation functions
export const validateAddItem = async (
  request: TransactionItemResponseModel,
  t: any
): Promise<ValidationError[]> => {
  let errors: ValidationError[] = [];
  if (request.Categ_ID === null || request.Categ_ID === undefined) {
    errors.push({
      MessageAr: t("categoryId.missing"),
      MessageEn: t("categoryId.missing"),
    });
  }
  if (request.ItemInstore_ID === null || request.ItemInstore_ID === undefined || request.ItemInstore_ID===0) {
    errors.push({
      MessageAr: t("itemId.missing"),
      MessageEn: t("itemId.missing"),
    });
  }
  if (request.ItemUnit_ID === null || request.ItemUnit_ID === undefined) {
    errors.push({
      MessageAr: t("unitId.missing"),
      MessageEn: t("unitId.missing"),
    });
  }
  if (
    request.Quantity === null ||
    request.Quantity === undefined ||
    request.Quantity <= 0
  ) {
    errors.push({
      MessageAr: t("quantity.missing"),
      MessageEn: t("quantity.missing"),
    });
  }
  if (
    request.Unit_Price === null ||
    request.Unit_Price === undefined
    // ||request.Unit_Price <= 0
  ) {
    errors.push({
      MessageAr: t("price.missing"),
      MessageEn: t("price.missing"),
    });
  }
  return errors;
};
export const validateSubmitRequest = async (
  request: TransactionDetailResponseModel,
  t: any
): Promise<ValidationError[]> => {
  let errors: ValidationError[] = [];
  if (request.Customer_ID === null || request.Customer_ID === undefined) {
    errors.push({
      MessageAr: t("customerId.missing"),
      MessageEn: t("CustomerId.missing"),
    });
  }
  // if (request.invoiceType === null || request.invoiceType === undefined) {
  //   response = false;
  //   errors.push({
  //     MessageAr: t("invoiceType.missing"),
  //     MessageEn: t("invoiceType.missing"),
  //   });
  // }
  // if (request.PaymentType_ID === null || request.PaymentType_ID === undefined) {
  //   errors.push({
  //     MessageAr: t("PaymentType_ID.missing"),
  //     MessageEn: t("PaymentType_ID.missing"),
  //   });
  // }
  // if (request.Currency_ID === null || request.Currency_ID === undefined) {
  //   errors.push({
  //     MessageAr: t("currencyId.missing"),
  //     MessageEn: t("currencyId.missing"),
  //   });
  // }
  if (request.Date === null || request.Date === undefined) {
    errors.push({
      MessageAr: t("date.missing"),
      MessageEn: t("date.missing"),
    });
  }
  return errors;
};
//#endregion
//#region post functions
export const handleTransactionTotalValues=(request:TransactionItemResponseModel[]):TransactionTotalValuesModel=> {
  let response:TransactionTotalValuesModel={totalDiscount: 0, totalMoney: 0, totalNet: 0, totalTax: 0};
  let transportCost: number = 0;
  let moneyAdd: number = 0;
  let tobaccoValue: number = 0;
  let totalAdditionalCostValue: number = 0
  if (request !== null && request !== undefined && request.length !== 0) {
    request.filter(p => p.rowState !== RowState.Delete).forEach(row => {
      response.totalMoney = response.totalMoney + (row.Unit_Price * row.Quantity);
      response.totalTax = response.totalTax + (row.Tax * row.Quantity);
      response.totalDiscount = response.totalDiscount + (row.ItemDiscount);
    });
    response.totalNet = (response.totalMoney - response.totalDiscount + transportCost + moneyAdd + response.totalTax + tobaccoValue + totalAdditionalCostValue);
  }
  return response;
}
export const AddItem = async (
  request: TransactionItemResponseModel,
  itemList: LookupItem[]
): Promise<TransactionItemResponseModel> => {
  try {
    request.ItemInstore_ID=request.ItemInstore_ID===null||request.ItemInstore_ID===undefined?0:request.ItemInstore_ID;
    const item = itemList.filter(
      //@ts-ignore
      (p) => p.value === request.ItemInstore_ID.toString()
    )[0];
    if(item!==null && item!==undefined) {
      request.ItemName = item.nameAr;
      request.ItemName_En = item.name;
      request.ItemCode = item.otherValue.code;
      request.ItemUnit_ID =
          item.otherValue != null && item.otherValue.itemUnitId !== null
              ? Number(item.otherValue.itemUnitId)
              : null;
      request.Categ_ID =
          item.otherValue != null && item.otherValue.categoryId !== null
              ? Number(item.otherValue.categoryId)
              : null;
      request.UnitBalance =
          item.otherValue != null && item.otherValue.balance !== null
              ? Number(item.otherValue.balance)
              : null;
    request.Tax=calculateItemTax(request,item);
      request.CreatedBy = request.ID === 0 ? getUserId() : request.CreatedBy;
      request.ModifiedBy = request.ID !== 0 ? getUserId() : request.ModifiedBy;
      request.Factor = item.otherValue.factor;
      // request.Unit_Price = getItemSalesPrice(
      //   request.ItemInstore_ID || 0,
      //   request.Transaction_Type,
      //   itemList
      // );
      request.ItemDiscount = request.ItemDiscount || 0;
      request.ItemDiscountRatio = request.ItemDiscountRatio || 0;
      request.ItemDiscount = calculateItemDiscount(request);
      request.Total = calculateItemPrice(request);
    }
    request.rowKey = generateGuid();
  } catch (e) {
    console.log('p_100',e);
  }
  //@ts-ignore
  return request;
};
export const handleDeleteItem = async (
  setState: Dispatch<SetStateAction<TransactionDetailResponseModel>>,
  stateValue: TransactionDetailResponseModel,
  deleteItem: TransactionItemResponseModel
) => {
  const result = await deleteItemRow(
    deleteItem,
    stateValue.TransactionDetaillist
  );
  setState({
    ...stateValue,
    TransactionDetaillist: result,
  });
};
export const deleteItemRow = async (
  deleteItem: TransactionItemResponseModel,
  data: TransactionItemResponseModel[]
): Promise<TransactionItemResponseModel[]> => {
  if (deleteItem !== null && deleteItem !== undefined) {
    if (deleteItem.ID === 0) {
      data = _.filter(data, (row) => {
        return row.rowKey !== deleteItem.rowKey;
      });
    } else {
      data = _.map(data, (row) => {
        if (row.ID === deleteItem.ID) {
          return { ...row, rowState: Number(RowState.Delete) };
        } else {
          return row;
        }
      });
    }
  }
  return data;
};
//#endregion
//#region State functions
export const UpdateTransactionDetailDataBasedOnUserSetting=(request:TransactionDetailResponseModel,setting:UserTransactionsSettingResponse,  setState: Dispatch<SetStateAction<TransactionDetailResponseModel>>,)=> {
  let count: number = 0;
  if ((request.PaymentType_ID === null || request.PaymentType_ID === undefined) && (setting.ShowPaymentType === false && setting.DefaultPaymentTypeID !== null)) {
    request.PaymentType_ID = setting.DefaultPaymentTypeID;
    count++;
  }
  ;
  if ((request.invoiceType === null || request.invoiceType === undefined) && (setting.ShowCalcType === false && setting.DefaultCalcTypeID !== null)) {
    request.invoiceType = setting.DefaultCalcTypeID;
    count++;
  }
  ;
  if (count > 0) {
    setState(request)
  }
}
export const updateStateDynamically = async (
  setState: Dispatch<SetStateAction<any>>,
  stateValue: any,
  key?: string|null,
  value?: any|null,
  keyValues?: KeyValueState[]|null,
) => {
  if (value !== null && value !== undefined&& key !== null && key !== undefined) {
    setState({
      ...stateValue,
      [key]: value,
    });
  }
  if(keyValues!==null &&keyValues!==undefined && keyValues.length!==0){
    //console.log('p_93',JSON.stringify(stateValue))
    keyValues.forEach((row)=>{
      stateValue={...stateValue,[row.key]:row.value}
    });
    setState({...stateValue})
  }
};
export const updateStateDynamicallyFromLookupList=async (
    list:LookupItem[],
    setState: Dispatch<SetStateAction<any>>,
    stateValue: any,
    key?: string|null
)=> {
  if (list !== null && list !== undefined && list.length != 0) {
    await  updateStateDynamically(setState,stateValue,key,list[0].value,null);
  }
}
//#endregion
//#region customer functions
export const getCustomerAccountBalance = async (
  customerId: number | null,
  currencyId: number | null,
  customers: LookupItem[]
): Promise<number> => {
  try {
     const accountId:number|null = customers.filter(
          (p) => p.value == customerId
      )[0].otherValue.accountId;
    return  await GetCurrentAccountBalance(accountId || 0, currencyId);
  } catch (err) {
   // console.log('p_x_3',err);
  }
  return 0;
};
//#endregion
//#region private
const getLookupItemListFromDictionary=(key:string, lookupList: LookupItemKeyValue[]|null):LookupItem[]|null=>{
  const list: LookupItemKeyValue | null = lookupList !== null && lookupList !== undefined && lookupList.length !== 0 ? lookupList.filter(p => p.key.toLowerCase().trim() === key)[0] : null;
  const value: LookupItem[] | null = list !== null && list !== undefined && list.value !== null && list.value !== undefined && list.value.length !== 0 ?list.value : null;
  return value;
}
const getLookupItemFirstDefaultValue=(key:string, lookupList: LookupItemKeyValue[]|null):number|null=>{
  const list: LookupItemKeyValue | null = lookupList !== null && lookupList !== undefined && lookupList.length !== 0 ? lookupList.filter(p => p.key.toLowerCase().trim() === key)[0] : null;
  const value: number | null = list !== null && list !== undefined && list.value !== null && list.value !== undefined && list.value.length !== 0 ? Number(list.value.filter(p=>p.value!==null)[0].value) : null;
  return value;
}
const calculateItemTax=( request: TransactionItemResponseModel,
                         item: LookupItem):number=> {
  let taxValue: number = 0;
   try {
    taxValue = item.otherValue != null && item.otherValue.taxPercentage !== 0
        ? Number(item.otherValue.taxPercentage * (request.Unit_Price - (request.ItemDiscount / request.Quantity)) / 100) : 0;
  } catch (e: any) {
    alert(e)
    taxValue = 0;
  }
  return taxValue;
}
//#endregion
