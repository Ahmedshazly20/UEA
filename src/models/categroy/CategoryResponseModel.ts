export interface CategoryResponseModel {
  Notes?: string;
  Parent_ID: number;
  IsParent: boolean;
  AllParent: any;
  IsDefault: boolean;
  ShowInPOS: boolean;
  Name_En: string;
  Default_Discount_Percentage: number;
  Code: string;
  IsIgnoreServiceMoneyAdd: boolean;
  DisplySequence: number;
  CategorySetting: any;
  ID: number;
  CreatedBy?: number;
  ModifiedBy?: number;
  Name: string;
  CreationDate: string;
  ModificationDate: any;
  VerifyOnUpdate: boolean;
  rowState: number;
  Errors:[];
}
