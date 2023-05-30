import { date } from 'yup';
import { ActionTypeEnum } from "../enums/enumList";
import { ValidationError } from "../validation/error";

export interface EmployeeEstihkakSubtraccDeleteResponse {
  Errors: ValidationError[];
  Result: {
    Result: boolean;
    Errors: ValidationError[];
  };
  Status: number;
}
export interface EmployeeEstihkakSubtracResponse {

  Notes: string,
  TypeRule_ID: number,
  Name_En: string,
  Row_State: number,
  ID: number,
  CreatedBy: number,
  ModifiedBy:string ,
  Name: string,
  CreationDate: Date,
  ModificationDate:Date,
  VerifyOnUpdate: boolean,
  rowState: number
  Errors?: ValidationError[];
}
export interface LookupItem {
  value: string;
  name: string;
  nameAr: string;
  children?: LookupItem[] | null;
}
 export interface AccrualSubtractItemModel {
  Notes: string,
  TypeRule_ID: number,
  Name_En: string,
  Row_State: number,
  ID: number,
  CreatedBy: number,
  ModifiedBy:number ,
  Name: string,
  CreationDate: Date,
  ModificationDate:Date,
  VerifyOnUpdate: boolean,
  rowState: number,
  Errors?: ValidationError[]
}
export interface AccrualSubtractItemResponse{
  Result:AccrualSubtractItemModel,
  Errors?: ValidationError[],
  Status:number

}
export interface AccrualSubtractRuleDeleteResponse {
  Errors: ValidationError[];
  Result: {
    Result: boolean;
    Errors: ValidationError[];
  };
  Status: number;
}

