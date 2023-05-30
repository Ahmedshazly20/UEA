export interface LoyaltySettingModel{
    Value: number,
    Points: number,
    IsActive: boolean,
    DaysExpire: number,
    ValueOfPoint: number,
    TermsCondations: string,
    ID: number,
    CreatedBy: number,
    ModifiedBy: number,
    Name: string,
    CreationDate:Date,
    ModificationDate: Date,
    VerifyOnUpdate: boolean,
    rowState: number
  }
  export interface LoyaltySettingResponse{
    Errors: [],
    Result:LoyaltySettingModel|null
  }