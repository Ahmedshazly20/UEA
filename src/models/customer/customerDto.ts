import { SearchCustomersTypeEnum } from "../enums/enumList";
import { ValidationError } from "../validation/error";

export interface CustomerDeleteResponse {
  Errors: ValidationError[];
  Result: {
    Result: boolean;
    Errors: ValidationError[];
  };
  Status: number;
}
export interface CustomerResponse {
    Code: number,
    IDNumber: string,
    City_ID: number,
    Address: string,
    Mobile: string,
    Phone: string,
    Mail: string,
    Notes: string,
    Cust_Type: number,
    Beg_AC_Bal: number,
    AreaLand: string,
    User_ID: number,
    Account_ID: number,
    ISCustomerAndSupplier: boolean,
    PaymentTypeID: number,
    Currency_ID: number,
    ValueCurrency: number,
    BalanceOfPoint: number,
    IsDefault: boolean,
    MaxDebit:number,
    Customer_UniqueID: number,
    Name_En:string,
    TaxNumber: string,
    IsCopyToServer: boolean,
    Device_ID: number,
    IsSponsor: boolean,
    Sponsor_Id: number,
    IsActive: boolean,
    ProfitPercentage: number,
    CustomerType: number,
    address: AddressRequestModel,
    IsCreateAccountOnSaveNewOne: boolean,
    IsSkipSaveAccount: boolean,
    ID: number,
    CreatedBy: number,
    ModifiedBy: number,
    Name:string,
    ModificationDate: Date,
    VerifyOnUpdate: boolean,
    rowState: number
    // Errors: ValidationError[]
  }
export interface SearchCustomerResponseModel {
    ID: number;
    Code: string;
    Name: string;
    Account_ID: number,
    Name_En: string;
    Mobile: string,
    Phone: string,
    IDNumber: string,
    CustomerType: number,
    address: AddressRequestModel,
    TaxNumber: string,
    MaxDebit:number,
    Mail: string,
    Notes: string,
    Cust_Type: number,
    City_ID: number,
    BalanceOfPoint: number,
    //Errors: ValidationError[]

  }
  export interface SearchCustomerRequestModel {
    searchType: SearchCustomersTypeEnum;
    searchGuid?: string | null;
    pageNumber?: number | null;
    pageSize?: number | null;
    searchValue?: string | null;
  }
export interface CustomerTypeResponseModel{
      ArabicName: string,
      EnglishName: string,
      Code: string,
}
export interface CountryResponseModel{
      Desc_ar: string,
      Desc_en: string,
      code: string,
}
export interface AddressRequestModel{
  CustomerId: 0,
  CountryCode: string,
  Governate: string,
  RegionCity: string,
  Street: string,
  buildingNumber: string,
  FlatNumber: string,
  Address_GUID: string,
  Remarks: string,
  Row_State: number,
  ID: 0,
  CreatedBy: number,
  ModifiedBy: number,
  Name: string,
  CreationDate: Date,
  ModificationDate: Date,
  VerifyOnUpdate: boolean,
  rowState: number
}