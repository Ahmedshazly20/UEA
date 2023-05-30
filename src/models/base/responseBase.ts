import { ValidationError } from "../validation/error";

export interface ResponseBase<T> {
  Result?: T;
  status?: number;
  Errors?: ValidationError[];
  token?: string;
  //recordCount?: number;
  TotalRecoredCount?: number;
}

export interface GeneralPrintResponse {
  PrinterName: any
  NumberOfCopy: number
  HtmlValue: any
  BillFilePdf: string
}