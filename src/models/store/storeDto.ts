import { ActionTypeEnum } from "../enums/enumList";
import { ValidationError } from "../validation/error";

export interface StoreDeleteResponse {
  Errors: ValidationError[];
  Result: {
    Result: boolean;
    Errors: ValidationError[];
  };
  Status: number;
}
export interface StoreResponse {
  Branch_ID: number;
  Address: string;
  Name_En: string;
  PrinterName?: string;
  Phone: string;
  IsDefault: boolean;
  Code: string;
  ID: number;
  CreatedBy: number;
  ModifiedBy?: number;
  Name: string;
  CreationDate?: Date;
  ModificationDate?: Date;
  VerifyOnUpdate?: boolean;
  rowState?: number;
  Errors?: ValidationError[];
}
