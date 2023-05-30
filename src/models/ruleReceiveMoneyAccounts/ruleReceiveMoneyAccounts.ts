
export interface RuleReceiveMoneyAccountsModel 
{
    
        Code: string,
        AccountType_ID: number,
        Orders: number,
        ArabicName: string,
        EnglishName: string,
        Parent_ID: number,
        AllParent: string,
        RegisterInTrans: true,
        Active: true,
        Notes: string,
        BeginBalance: number,
        Total_Money: number,
        Money_Pay: number,
        Balance: number,
        ShowToUser: true,
        DateCreate: string,
        BalanceInCurrency: number,
        Account_UniqueID: string,
        TotalDebit: number,
        TotalCredit: number,
        NatureType: number,
        IsParent: true,
        IsShowInCostCenter: true,
        AccountTypeId: number,
        BranchID: number,
        ID: number,
        CreatedBy: number,
        ModifiedBy: number,
        Name: string,
        CreationDate: string,
        ModificationDate: string,
        VerifyOnUpdate: true,
        rowState: number
      
  }  

  export interface LookupItem {
    value: string | null;
    name: string;
    nameAr: string;
    // otherValue?: string | null;
    // otherValue1?: string | null;
    // otherValue2?: string | null;
    otherValue?: object | null;
    children?: LookupItem[] | null;
  }
  export interface RuleReceiveMoneyAccountsApiResponseModel 
  {
      Code: string,
      AccountType_ID: number,
      Orders: number,
      ArabicName: string,
      EnglishName: string,
      Parent_ID: number,
      AllParent: null,
      RegisterInTrans: false,
      Active: true,
      Notes: null,
      BeginBalance: number,
      Total_Money: number,
      Money_Pay: number,
      Balance: number,
      ShowToUser: true,
      DateCreate: string,
      BalanceInCurrency: null,
      Account_UniqueID:string,
      TotalDebit: null,
      TotalCredit: null,
      NatureType: 2,
      IsParent: true,
      IsShowInCostCenter: false,
      AccountTypeId: null,
      BranchID: number,
      ID: number,
      CreatedBy: number,
      ModifiedBy: null,
      Name: null,
      CreationDate: string,
      ModificationDate: null,
      VerifyOnUpdate: false,
      rowState: number
  }
  