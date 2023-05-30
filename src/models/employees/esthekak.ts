import { ValidationError } from "../validation/error"

export interface EstehekakModel{
    User_ID: number|undefined,
    Emp_ID:number,
    Date:Date,
    Value:number,
    EmployeeNameAr:string,
    EmployeeNameEn:string,
    EsthkakSubtractRuleAr:string,
    EsthkakSubtractRuleEn:string,
    EsthkSubtRule_ID: number,
    Notes:string,
    CreatedBy: number,
    ModifiedBy: number,
    CreationDate: Date,
    ModificationDate:Date,
    VerifyOnUpdate: boolean,
    rowState: number,
    ID:number,
    Errors?: ValidationError[]
}

export interface EstehekakModelResponse{
Errors: [],
Result:EstehekakModel|null
}