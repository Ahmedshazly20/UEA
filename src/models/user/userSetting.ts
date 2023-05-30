import {ValidationError} from "../validation/error";

export interface UserSettingModel{
    
        User_ID: number|undefined,
        Lang:number,
        ShowAlert: boolean,
        DaysAlertBeforeExpire: number,
        PreventStoreOutOfItemLessZero: boolean,
        PeriodAllowToEdit: number,
        EnableManualInvoiceCode: boolean,
        RigesterBillOnPayment: boolean,
        ShowScaleBarcode: boolean,
        CheckMaxDebitOfCustomer: boolean,
        AlertOfCustomerDidintPaySince: number,
        AlowRepeateFactoItemUnit: boolean,
        AllowSaleLessThanCost: boolean,
        ShowMinimumPriceItem: boolean,
        ShowBarcode: boolean,
        AddItemInNewLineInBill: boolean,
        ShowItemModifiers: boolean,
        PrintBarcodeAfterPurches: boolean,
        PrintItemPrescriptionAfterSale: boolean,
        AllowItemPriceSaleLessThanCost: boolean,
        RequestDueDateOnDelayPayment: boolean,
        ShowProfitOfBill: boolean,
        MaxDiscountPercentage: number,
        SelectionEmployeeIsRequierd: boolean,
        ID: number,
        CreatedBy: number,
        ModifiedBy: number,
        Name: string,
        CreationDate: Date,
        ModificationDate:Date,
        VerifyOnUpdate: boolean,
        isArabic:boolean,
        isEnglish:boolean,
        rowState: number
    
}
export interface UserSettingResponse{
   Errors: [],
   Result:UserSettingModel|null
}
export interface UserTransactionsSettingRequest{
       // userId:number,
        transactionTypeId:number[]
}
export interface UserTransactionsSettingResponse{
       // RemarksVisableSetting:          RemarksVisibleSetting[];
        TransactionType_ID:             number;
        User_ID:                        number;
        ShowCinfirm:                    boolean;
        ShowNotefy:                     boolean;
        ShowDone:                       boolean;
        EnableButonAdd:                 boolean;
        EnableShangPrice:               boolean;
        EnableDiscount:                 boolean;
        ShowPaymentType:                boolean;
        ShowCalcType:                   boolean;
        ShowRefrence:                   boolean;
        PeriodAllowForReturn:           number;
        ShowTransPortCost:              boolean;
        DefaultCalcTypeID:              number;
        ShowPrice:                      boolean;
        ShowCostCenter:                 boolean;
        ShowEmployeeResponsibile:       boolean;
        ShowCurrency:                   boolean;
        DeafultNote:                    string;
        DefaultPaymentTypeID:           number;
        DirectPrintBillAfterSave:       boolean;
        PrinterName:                    string;
        NumberOfCopy:                   number;
        ShowCustomerCar:                boolean;
        ShowSaveAndPrintButton:         boolean;
        ShowPrintStickerButton:         boolean;
        ShowButtonPrintPrepairingOrder: boolean;
        PrinterPrepairingSalesInvoice:  string;
        RemarksVisable:                 string;
        EnablePrint:                    boolean;
        ID:                             number;
        Name:                           null;
        VerifyOnUpdate:                 boolean;
        rowState:                       number;
}
export interface RemarksVisibleSetting {
        ArabicName:       string;
        EnglishName:      string;
        Type:             number;
        ValueEntity:      number;
        Code:             null;
        IsIgnoreValue:    boolean;
        ID:               number;
        CreatedBy:        null;
        ModifiedBy:       null;
        Name:             null;
        CreationDate:     Date;
        ModificationDate: null;
        VerifyOnUpdate:   boolean;
        rowState:         number;
}
