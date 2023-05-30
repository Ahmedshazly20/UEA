export interface LookupModel {
  Name: string;
  Type_ID: number;
  Code?: string | null;
  NameEn: string;
  Note?: string | null;
  IsDefault: boolean;
  Active: boolean;
  Value?: number | null;
  ID: number;
  CreatedBy: number;
  ModifiedBy: number;
  rowState: number;
}

export interface LookupErrorModel {
  ValueError?: string | null;
}
export interface DeleteLookupModel {
  Result: boolean;
}

export interface SelectItem {
  label: string;
  value: string;
}
export interface LookupItemKeyValue{
  key: string,
  value: LookupItem[]
}
export interface LookupItem {
  value: string | null;
  name: string;
  nameAr: string;
  isAdded?:boolean|null;
  otherValue?: any | null;
  children?: LookupItem[] | null;
}

export interface LookupApiResponseModel {
  ArabicName: string;
  EnglishName: string;
  Type: number;
  Value: number;
  Code?: any;
  IsIgnoreValue: boolean;
  ID: number;
  CreatedBy?: any;
  ModifiedBy?: any;
  Name: string;
  CreationDate: Date;
  ModificationDate?: any;
  VerifyOnUpdate: boolean;
  rowState: number;
}
