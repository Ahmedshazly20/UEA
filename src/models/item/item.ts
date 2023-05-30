import { SearchItemsTypeEnum } from "..";
//#region search item
export interface SearchItemRequestModel {
  searchType: SearchItemsTypeEnum;
  searchGuid?: string | null;
  pageNumber?: number | null;
  pageSize?: number | null;
  categoryId?: number | null;
  searchValue?: string | null;
  smallestUnit?: boolean | null;
}

export interface SearchItemResponseModel {
  id: number;
  code: string;
  nameAr: string;
  nameEN: string;
  priceSale: number;
  currentBalance: number;
  priceCost: number;
}
export interface SearchItemApiResponseModel {
  ID: number;
  ItemUnit_ID: number;
  Code: string;
  ItemName: string;
  ItemName_En: string;
  PriceSale: number;
  AddationalPrice: number;
  WholeSalePrice:number;
  PriceCost: number;
  LastPriceBuy:number;
  Current_Balance: number;
  Cat_ID: number;
  UnitBalance: number;
  Factor: number;
  Unit_ID: number;
  Tax: number;
  TaxPercentge: number;
}
//#endregion
//#region save item
export interface ItemModel {
  Code: string;
  Name_En: string;
  Notes: string;
  Cat_ID: number;
  StagnantPeriod: number;
  UserID: number;
  TaxValue: number;
  ShowInPOS: boolean;
  GatherItem: boolean;
  OpenItem: boolean;
  WithoutBalance: boolean;
  HasModifiers: boolean;
  HasImage: boolean;
  IsProduction: boolean;
  HasSerial: boolean;
  IsUnisSeparateInBalance: boolean;
  IsItemVanishConsign: boolean;
  ItemsInstores: ItemInstoreModel[];
  DateExpiry: string;
  DeleteOldSaveItemUnitGather: boolean;
  IsUpdateItemPriceInOtherStores: boolean;
  UpdateGatherItemCost: boolean;
  IsDifferentFactor: boolean;
  Item_Supplier_ID: number;
  Is_Filter_Service: boolean;
  Is_Oil_Service: boolean;
  DisplySequence: number;
  ID: number;
  CreatedBy: number;
  ModifiedBy: number;
  Name: string;
  CreationDate: string;
  ModificationDate: string;
  VerifyOnUpdate: boolean;
  rowState: number;
  errorText?: string | null;
}
export interface ItemInstoreModel {
  ID: number;
  Item_ID: number;
  Name: string;
  Store_ID: number;
  LimitOrder: number;
  DefaultExpiryDays: number;
  Status: boolean;
  Item_unit: ItemUnitModel[];
  UseExpiryDate: boolean;
  rowState: number;
}
export interface ItemUnitModel {
  ID: number;
  Name: string;
  ItemInstore_ID: number;
  Unit_ID: number;
  Price: number;
  PriceSale: number;
  PriceSaleWithTax: number;
  PriceSaleInOtherCurency: number;
  OtherCurrencyValue: number;
  QutyBegBal: number;
  Factor: number;
  UnitBalance: number;
  PriceQutyBegBal: number;
  PriceQutyBegBalWithTax: number;
  PriceInOtherCurency: number;
  LastPriceBuy: number;
  MinimumPrice: number;
  MaximumPrice: number;
  AddationalPrice: number;
  AddationalPriceWithTax: number;
  WholeSalePrice: number;
  WholeSalePriceWithTax: number;
  PriceCost: number;
  Balance: number;
  Tax: number;
  PriceLastBuy: number;
  ProfitPercentage: number;
  Transporttion_Cost: number;
  IsSmallestUnit: boolean;
  IsDefault: boolean;
  IsMultiUnit: boolean;
  HasItemUnitBarcode: boolean;
  UsedInTransaction: boolean;
  Barcode: string;
  ScaleBarcode: string;
  ItemType: string;
  EinvoiceItemCode: string;
  rowState: number;
  clientId?: string | null;
  name?: string | null;
  nameAr?: string | null;

  rowKey: string;
}
//#endregion
//#region delete item
export interface deleteItemResponseModel {
  Result: boolean;
}
//#endregion
