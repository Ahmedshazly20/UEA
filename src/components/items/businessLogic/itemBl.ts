import React, { Dispatch, SetStateAction } from "react";
import _ from "lodash";
import {
  ActionTypeEnum,
  ItemInstoreModel,
  ItemModel,
  ItemUnitModel, LookupItem, LookupTypeEnum, RequestAction, ResponseBase,
  RowState, TreeViewModel, ValidationError,
} from "../../../models";
import {generateGuid} from "../../../utils";
import {saveItem} from "../../../serviceBroker/itemApiServiceBroker";
import {DataNode} from "rc-tree/lib/interface";
import {getCateoryTree} from "../../../serviceBroker/categoryApiServiceBroker";
import {getLookupByType} from "../../../serviceBroker/lookupApiServiceBroker";
//#region functions
//#region tree
export const onTreeNodeSelected = (e: DataNode[], setSelectedCategoryState: Dispatch<SetStateAction<number>>) => { setSelectedCategoryState(Number(e[0].key));
};
//#endregion
//#region item unit
export  const handleAddItemUnitRow=(
    setState: Dispatch<SetStateAction<ItemUnitModel[]>>,
    stateValue: ItemUnitModel[],
)=>{
  setState([...stateValue, setItemUnitInitialValues()]);
};
export  const handleDeleteItemUnitRow=(
    setState: Dispatch<SetStateAction<ItemUnitModel[]>>,
    stateValue: ItemUnitModel[],
    rowKey:string,
)=> {
  let obj = _.remove(stateValue, (row) => {
    return row.rowKey !== rowKey;
  });
  setState([...obj]);
};
export const generateItemStore = (): ItemInstoreModel[] => {
  let result: ItemInstoreModel[] = [
    {
      ID: 0,
      Item_ID: 0,
      Name: "",
      Store_ID: 1,
      LimitOrder: 0,
      DefaultExpiryDays: 0,
      Status: true,
      UseExpiryDate: false,
      Item_unit: [],
      rowState: Number(RowState.Add),
    },
  ];
  return result;
};
export const handleChangeItemUnitValues = (
  setState: Dispatch<SetStateAction<ItemUnitModel[]>>,
  stateValue: ItemUnitModel[],
  rowKey:string,
  key:string,
  value:any
) => {
  let obj:ItemUnitModel[] =
    stateValue !== null &&
    stateValue !== undefined &&
    stateValue.length !== 0
      ? stateValue
      : [];
  if (obj !== null && obj !== undefined && obj.length!==0) {
    //@ts-ignore
    obj = _.map(obj, (row) => {
      if (row.rowKey === rowKey) {
        return  {...row, [key]: value};
      } else {
        return row;
      }
    });
    setState(obj);
  }
};
//#endregion
//#region validation
export const handleValidation = (values: ItemModel,selectedCategory:number ,t:any): ValidationError[] => {
  let errorMessages: ValidationError[] = [];
  const itemUnits = values.ItemsInstores[0].Item_unit;

  if(values.Name===null ||values.Name===undefined  ||values.Name===""){
    errorMessages.push({
      MessageAr: t("nameAr.missing"),
      MessageEn: t("nameAr.missing"),
    });
  }
  if(values.Name_En===null ||values.Name_En===undefined||values.Name_En===""){
    errorMessages.push({
      MessageAr: t("nameEn.missing"),
      MessageEn: t("nameEn.missing"),
    });
  }

  if (selectedCategory <= 0) {
    errorMessages.push({
      MessageAr: t("categoryId.missing"),
      MessageEn: t("categoryId.missing"),
    });
  }
  if(itemUnits===null ||itemUnits===undefined || itemUnits.length===0){
    errorMessages.push({
      MessageAr: t("no units added to item"),
      MessageEn: t("no units added to item"),
    });
  }
  else if(itemUnits[0].Unit_ID===null || itemUnits[0].Unit_ID===undefined || itemUnits[0].Unit_ID===0){

    errorMessages.push({
      MessageAr: t("no units added to item"),
      MessageEn: t("no units added to item"),
    });

  }
  if(errorMessages===null ||errorMessages ===undefined ||errorMessages.length===0) {
    const activeUnitsCount = itemUnits.filter(
        (p: ItemUnitModel) => p.rowState !== Number(RowState.Delete)
    ).length;

    const smallestActiveUnitCount = -itemUnits.filter(
        (p: ItemUnitModel) => p.rowState !== 3 && p.IsSmallestUnit === true
    ).length;
    if (activeUnitsCount === 0) {
      errorMessages.push({
        MessageAr: t("no units added to item"),
        MessageEn: t("no units added to item"),
      });
    }
    if (activeUnitsCount > 1 && smallestActiveUnitCount === 0) {
      errorMessages.push({
        MessageAr: t("no smallest unit selected"),
        MessageEn: t("no smallest unit selected"),
      });
    }
    if (smallestActiveUnitCount > 1) {
      errorMessages.push({
        MessageAr: t("only one  smalles unit allowed"),
        MessageEn: t("only one  smalles unit allowed"),
      });
    }
  }
  return errorMessages;
};
//#endregion
//#region actions
export const handleItemReset=(
    setItemState: Dispatch<SetStateAction<ItemModel>>,
    setSelectedCategoryState: Dispatch<SetStateAction<number>>,
    setItemUnitState: Dispatch<SetStateAction<ItemUnitModel[]>>,
    setValidationErrorState: Dispatch<SetStateAction<ValidationError[]>>,
)=>{
  setItemState(setItemInitialValues);
  setSelectedCategoryState(0);
  setItemUnitState([]);
  setValidationErrorState([]);
}
export const handleSubmit = async (requestObj: ItemModel,
                                   itemUnitList:ItemUnitModel[],
                                   selectedCategory:number,
                                   onActionEvent: (o: RequestAction) => void,
                                   t:any,
                                   setItem: Dispatch<SetStateAction<ItemModel>>,
                                   setItemUnitList: Dispatch<SetStateAction<ItemUnitModel[]>>,
                                   setLoading: Dispatch<SetStateAction<boolean>>,
                                   setSelectedCategory: Dispatch<SetStateAction<number>>,
                                   setValidationErrors: Dispatch<SetStateAction<ValidationError[]>>
) :Promise<boolean>=> {
  let isSubmitted:boolean=false;
  try {
    setLoading(true);
    if (requestObj != null) {
      requestObj.Cat_ID = selectedCategory;
      requestObj.ItemsInstores[0].Item_unit=itemUnitList;
    }
    const errors = handleValidation(requestObj,selectedCategory,t);
    if (errors !== null && errors !== undefined && errors.length !== 0) {
      setValidationErrors(errors);
      setLoading(false);
      return false;
    }
    //@ts-ignore
    const res: ResponseBase<ItemModel> = await saveItem(requestObj);
    if (res != null && res.Errors != null && res.Errors.length !== 0) {
      setValidationErrors(res.Errors);
      setLoading(false);
    } else {
      setLoading(false);
      isSubmitted=true;
      handleItemReset(setItem,setSelectedCategory,setItemUnitList,setValidationErrors);
      onActionEvent({
        id: 0,
        action: ActionTypeEnum.Success,
        request: res?.Result,
      });
    }
  } catch (err: any) {
    setLoading(false);
    const errors: ValidationError[] = [{ MessageAr: err, MessageEn: err }];
    setValidationErrors(errors);
  }
  return isSubmitted;
};
//#endregion
//#region others
export const handleItemComponentLoad=async (
    setLoading: Dispatch<SetStateAction<boolean>>,
    setCategoryTreeData: Dispatch<SetStateAction<TreeViewModel[]>>,
    setUnitList: Dispatch<SetStateAction<LookupItem[]>>,
)=>{
  setLoading(true);
  const data: TreeViewModel[] = await getCateoryTree();
  const unitData: LookupItem[] = await getLookupByType(
      LookupTypeEnum.Units
  );
  setCategoryTreeData(data);
  setUnitList(unitData);
  setLoading(false);
}
export const handleRefreshItemComponent=async (
    setItem: Dispatch<SetStateAction<ItemModel>>,
    setSelectedCategory  : Dispatch<SetStateAction<number>>,
    setIsRefresh: Dispatch<SetStateAction<boolean>>,
    setValidationErrors: Dispatch<SetStateAction<ValidationError[]>>,
    request?: ItemModel | null)=>{
  //@ts-ignore
  setItem(request);
  setValidationErrors([]);
  setSelectedCategory(request !== null && request !== undefined && request.Cat_ID !== null && request.Cat_ID !== undefined ? request.Cat_ID : 0);
  //@ts-ignore
  setItemUnitList(request !== null && request !== undefined ? request.ItemsInstores[0].Item_unit : [setItemInitialValues]);
  if (request !== null && request !== undefined) {
    //@ts-ignore
    formik.setValues(request)
  }
  setIsRefresh(false);
  //  forceUpdate();
}
//#endregion
//#endregion
//#region variables
export const setItemUnitInitialValues=(): ItemUnitModel => {
  const rowKey=generateGuid();
  return {
    ID: 0,
    Name: "",
    ItemInstore_ID: 0,
    Unit_ID: 0,
    Price: 0,
    PriceSale: 0,
    PriceSaleWithTax: 0,
    PriceSaleInOtherCurency: 0,
    OtherCurrencyValue: 0,
    QutyBegBal: 0,
    Factor: 0,
    UnitBalance: 0,
    PriceQutyBegBal: 0,
    PriceQutyBegBalWithTax: 0,
    PriceInOtherCurency: 0,
    LastPriceBuy: 0,
    MinimumPrice: 0,
    MaximumPrice: 0,
    AddationalPrice: 0,
    AddationalPriceWithTax: 0,
    WholeSalePrice: 0,
    WholeSalePriceWithTax: 0,
    PriceCost: 0,
    Balance: 0,
    Tax: 0,
    PriceLastBuy: 0,
    ProfitPercentage: 0,
    Transporttion_Cost: 0,
    IsSmallestUnit: false,
    IsDefault: false,
    IsMultiUnit: false,
    HasItemUnitBarcode: false,
    UsedInTransaction: false,
    Barcode: "",
    ScaleBarcode: "",
    ItemType: "",
    EinvoiceItemCode: "",
    rowState: 0,
    rowKey: rowKey,
  };
}
export const setItemInitialValues: ItemModel = {
  Code: "",
  Name_En: "",
  Notes: "",
  Cat_ID: 0,
  StagnantPeriod: 0,
  UserID: 0,
  TaxValue: 0,
  ShowInPOS: false,
  GatherItem: false,
  OpenItem: false,
  WithoutBalance: false,
  HasModifiers: false,
  HasImage: false,
  IsProduction: false,
  HasSerial: false,
  IsUnisSeparateInBalance: false,
  IsItemVanishConsign: false,
  ItemsInstores: generateItemStore(),
  DateExpiry: "",
  DeleteOldSaveItemUnitGather: false,
  IsUpdateItemPriceInOtherStores: false,
  UpdateGatherItemCost: false,
  IsDifferentFactor: false,
  Item_Supplier_ID: 0,
  Is_Filter_Service: false,
  Is_Oil_Service: false,
  DisplySequence: 0,
  ID: 0,
  CreatedBy: 0,
  ModifiedBy: 0,
  Name: "",
  CreationDate: "",
  ModificationDate: "",
  VerifyOnUpdate: false,
  rowState: Number(RowState.Add),
};
//#endregion
