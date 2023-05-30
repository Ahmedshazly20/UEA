export interface ElectronicBillSettingModel{
    ActivityCode:string,
    address:AddressElectronicBill|null,
    CompanyTypeCode: string,
    ClientID: string,
    ClientSecret1: string,
    ClientSecret2: string,
    HoursDelayToUploadTransaction: number,
    DysAllowedToUploadEinvoice:number,
    DocumentTypeVersion: string,
    DllLibPath: string,
    TokenPin: string,
    TokenCertificate: string
    ID: number,
    CreatedBy: number,
    ModifiedBy: number,
    Name: string,
    CreationDate:Date,
    ModificationDate: Date,
    VerifyOnUpdate: boolean,
    rowState: number
  }
  export interface AddressElectronicBill{
    branchID: string,
    country: string,
    governate: string,
    regionCity: string,
    street: string,
    buildingNumber: string
  }
  export interface ElectronicBillSettingResponse{
    Errors: [],
    Result:ElectronicBillSettingModel|null
  }