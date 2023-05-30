export interface POSUserSettingModel{
     User_ID: number|undefined,
     Customer_ID:number,
     Currency_ID:number,
     Emp_ID:number,
     DefaultRatioDiscount: number,
     DefaultDiscountType: number,
     DefaultNoteType:number,
     WelcomeMessage:string,
     PrintInvoiceInA4:boolean,
     EnableCloseDay:boolean,
     PortName:string,
     AllowDeleteItems:boolean,
     AllowReturnWithoutBill:boolean,
     ShowItemForSecondScreenCustomerDisplay:boolean,
     Ask_MoneyBox_Station:boolean,
     EnableChangeCalcType:boolean,
     EnablePrintSaleReportAndPrintCloseDay:boolean,
     EnablePrintSavedTransaction:boolean,
     AllowClickNew:boolean,
     UseItemImageAsBackGround:boolean
     UseCustomerDisplay:boolean,
     CreatedBy: number,
     ModifiedBy: number,
     CreationDate: Date,
     ModificationDate:Date,
     VerifyOnUpdate: boolean,
     rowState: number,
     ID:number
  }
export interface POSUserSettingResponse{
Errors: [],
Result:POSUserSettingModel|null
}
