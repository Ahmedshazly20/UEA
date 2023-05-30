import { ValidationError } from "../validation/error";

export interface AcTransaction {
  ID: number;
  FromAccount_ID: number;
  ToAccount_ID: number;
  CostCenter_ID: number;
  Currency_ID: number;
  ValueCurrency: number;
  Station_ID: number;
  Code: string;
  Note: string;
  Value: number;
  Date: Date;
  AcTransactionType: number;
  CreatedBy: number;
  ModifiedBy: number;
  CreationDate: Date;
  ModificationDate: Date;
  rowState: number;
}
export interface AcTransactionSearch {
  Code: string;
  Value: number;
  Date: Date;
  CostCenterNameAr: string;
  CostCenterNameEn: string;
  CreateDate: Date;
  CurrencyNameAr: string;
  CurrencyNameEn: string;
  ValueCurrency: number;
  UserCreateNameAr: string;
  UserCreateNameEn: string;
  MoneyPayWritten: string;
  Note: string;
  SetOtherCurrencyWithZeroValue: boolean;
  TransactionDueDate_ID: number;
  FileAttachment: null;
  InstallmentPlanDetail_ID: number;
  ProfitPercentage: number;
  Project_Id: null;
  PaymentOrder: null;
  Employee_Id: number;
  Account_ID: number;
  TransactionType: number;
  User_ID: number;
  ID: number;
  CreatedBy: null;
  ModifiedBy: null;
  Name: null;
  CreationDate: Date;
  ModificationDate: null;
  VerifyOnUpdate: boolean;
}
export interface SearchAcTransactionRequest {
  pageNumber: number;
  pageSize: number;
  accountId?: number;
  userId?: number;
  fromDate?: Date;
  toDate?: Date;
  acTransactionType: number;
}

export interface AcTransactionDeleteResponse {
  Errors: ValidationError[];
  Result: {
    Result: boolean;
    Errors: ValidationError[];
  };
  Status: number;
}
export interface AcTransactionPrintResponse {
  PrinterName: any;
  NumberOfCopy: number;
  HtmlValue: any;
  BillFilePdf: string;
}
//to be remove when implementation  of Accounts
export interface AccountModel {
  Name: string;
  ArabicName: string;
  EnglishName: string;
  AccountType_ID: number;
  Parent_ID: number;
  Balance: number;
  Code: string;
  Active: boolean;
  ID: number;
  CreatedBy: number;
  ModifiedBy: number;
  rowState: number;
}

export interface CurrencyModel {
  ArabicName: string;
  EnglishName: string;
  ShortCutArab: string;
  ShorCutEng: string;
  IsDefault: boolean;
  Value: number;
  Note: string;
  ArabicShourtCut: any;
  EnglishShourtCust: any;
  CountryName: any;
  ID: number;
  CreatedBy: any;
  ModifiedBy: any;
  Name: any;
  CreationDate: string;
  ModificationDate: string;
  VerifyOnUpdate: boolean;
  rowState: number;
}

export interface CoastCenterModel {
  ArabicName: string;
  EnglishName: string;
  ShortCutArab: string;
  ShorCutEng: string;
  IsDefault: boolean;
  Value: number;
  Note: string;
  ArabicShourtCut: any;
  EnglishShourtCust: any;
  CountryName: any;
  ID: number;
  CreatedBy: any;
  ModifiedBy: any;
  Name: any;
  CreationDate: string;
  ModificationDate: string;
  VerifyOnUpdate: boolean;
  rowState: number;
}
