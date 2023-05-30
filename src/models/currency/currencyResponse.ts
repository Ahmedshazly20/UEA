import { ActionTypeEnum } from "../enums/enumList";
import { ValidationError } from "../validation/error";

export interface CurrencyDeleteResponse {
  Errors: ValidationError[];
  Result: {
    Result: boolean;
    Errors: ValidationError[];
  };
  Status: number;
}
export interface CurrencyResponse {
    ArabicName: string;
    EnglishName: string;
    ShortCutArab: string;
    ShorCutEng?: string;
    IsDefault: boolean;
    Value: number;
    Note: string;
    ArabicShourtCut: string;
    EnglishShourtCust: string;
    CountryName?: string;
    ID: number;
    CreatedBy?: number;
    ModifiedBy?: number;
    Name?: string;
    CreationDate?: Date;
    VerifyOnUpdate?: boolean;
    rowState?: number;
  Errors?: ValidationError[];
}
export interface LookupItem {
  value: string;
  name: string;
  nameAr: string;
  children?: LookupItem[] | null;
}

export interface CurrenciesShourtCutModel {
  EnglishName: string;
  ArabicName: string;
  ArabicShourtCut: string,
  EnglishShourtCust: string,
  CountryName: string,
  ID: number;
  CreatedBy: number;
  ModifiedBy: number;
  Errors: ValidationError[];
  rowState: number;
}
