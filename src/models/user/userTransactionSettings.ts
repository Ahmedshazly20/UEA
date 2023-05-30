export interface UserTransactionSettingModel{
        TransactionType_ID: number,
        User_ID: number|undefined,
        DefaultCalcTypeID: number,
        DefaultPaymentTypeID:number,
        PeriodAllowForReturn: number,
        ShowCinfirm: boolean,
        ShowNotefy: boolean,
        ShowDone: boolean,
        EnableButonAdd: boolean,
        EnableShangePrice: boolean,
        EnableDiscount: boolean,
        ShowPaymentType: boolean,
        ShowCalcType: boolean,
        ShowRefrence: boolean,
        ShowPrice: boolean,
        ShowEmployeeResponsibile: boolean,
        ShowCurrency: boolean,
        DirectPrintBillAfterSave: boolean,
        NumberOfCopy: number,
        ShowButtonPrintPrepairingOrder:boolean
        DeafultNote: string,
        ShowCustomerCar: boolean,
        RemarksVisable: string,
        ID: number,
        CreatedBy: number,
        ModifiedBy: number,
        Name: string,
        CreationDate: Date,
        ModificationDate: Date,
        VerifyOnUpdate: boolean,
        rowState:number
      }
      export interface UserTransactionSettingResponse{
        Errors: [],
        Result:UserTransactionSettingModel|null
     }