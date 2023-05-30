
export interface SearchruleExpenseMoneyRequest {
  pageNumber: number;
  pageSize: number;
  accountId?: number;
  userId?: number;
  parentId?: number;
  accountName?: string;
  accountCode?: string;
}


export interface ruleExpenseMoneySearch
  {
    Code: string,
    AccountType_ID: number,
    Orders: number,
    ArabicName: string,
    EnglishName: string,
    Parent_ID:number ,
    AllParent: string,
    RegisterInTrans: boolean,
    Active: boolean,
    Notes: string,
    BeginBalance: number,
    Total_Money: number,
    Money_Pay: number,
    Balance: number,
    ShowToUser: boolean,
    DateCreate:  Date,
    BalanceInCurrency: number,
    Account_UniqueID: string,
    TotalDebit: number,
    TotalCredit: number,
    NatureType: number,
    IsParent: boolean,
    IsShowInCostCenter: boolean,
    AccountTypeId: number,
    BranchID: number,
    ID: number,
    CreatedBy: number,
    ModifiedBy: number,
    Name: string,
    CreationDate: Date ,
    ModificationDate: Date,
    VerifyOnUpdate: boolean,
    rowState: number
  }






export interface LookupErrorModel {
  ValueError?: string | null;
}
export interface DeleteLookupModel {
  Result: boolean;
}

export interface SelectItem {
  label: string;
  value: string;
}

export interface LookupItem {
  value: string|null;
  name: string;
  nameAr: string;
  children?: LookupItem[] | null;
}

export interface ruleExpenseMoneyApiResponseModel {
  Code: number,
  AccountType_ID: number,
  Orders: number,
  ArabicName: string,
  EnglishName: string,
  Parent_ID: number,
  AllParent: string,
  RegisterInTrans: boolean,
  Active: boolean,
  Notes: string,
  BeginBalance: number,
  Total_Money: number,
  Money_Pay: number,
  Balance: number,
  ShowToUser: boolean,
  DateCreate: Date,
  BalanceInCurrency: string,
  Account_UniqueID:string,
  TotalDebit: number,
  TotalCredit: number,
  NatureType: number,
  IsParent: boolean,
  IsShowInCostCenter: boolean,
  AccountTypeId: number,
  BranchID: number,
  ID: number,
  CreatedBy: number,
  ModifiedBy: number,
  Name: string,
  CreationDate: Date,
  ModificationDate: Date,
  VerifyOnUpdate: boolean,
  rowState: number
}
