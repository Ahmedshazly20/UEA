import { ValidationError } from "../validation/error";

export interface CategorySettingModel {
  Category_ID: number;
  BackBolor: number;
  FontSize: number;
  HeightButton: number;
  WidthButton: number;
  PrinterName: any;
  ImagePath: string;
  ID: number;
}
export interface CategoryDeleteResponse {
  Errors: ValidationError[];
  Result: {
    Result: boolean;
    Errors: ValidationError[];
  };
  Status: number;
}
export interface CategoryModel {
  Name: string;
  Name_En: string;
  ShowInPOS: boolean;
  CategorySetting?: CategorySettingModel;
  ID: number;
  CreatedBy: number;
  ModifiedBy: number;
  rowState: number;
}
export interface UpdateCategoryTaxRequest{
 
    categoryIdsList: number[],
    TaxPercentage: number,
    ModifiedBy: number,
    ModifcationDate:Date
  
}