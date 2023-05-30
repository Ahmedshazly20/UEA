import AlYusrAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import {
  DeleteTransactionModelRequest,
  ResponseBase,
  SearchDailyTransactionTypeEnum,
  SearchTransactionRequestModel,
  TransactionDetailResponseModel,
  TransactionResponseModel,
  TransactionServerResponseModel,
  validateTransactionModeEnum,
} from "../models";
import { getUserId } from "../utils";
//#region get
export const validateTransaction = async (
  transactionId: number,
  creationDate: Date,
  totalTax: number,
  mode: validateTransactionModeEnum
): Promise<ResponseBase<boolean>> => {
  let response: ResponseBase<boolean> = {};
  let url: string = "";
  switch (mode) {
    case validateTransactionModeEnum.Modify:
      url = `ValidateEditTransaction?transactionId=${transactionId}&&userId=${getUserId()}&transactionCreatedDate=${creationDate}&totalTax=${totalTax}`;
      break;
    case validateTransactionModeEnum.Delete:
      url = `ValidateDeleteTransaction?transactionId=${transactionId}&&userId=${getUserId()}`;
      break;
    case validateTransactionModeEnum.Return:
      url = `ValidateReturnTransaction?transactionId=${transactionId}&&userId=${getUserId()}`;
      break;
  }
  response = await AlYusrAxiosApiInstance.get(url);
  return response;
};
export const searchTransactions = async (
  request: SearchTransactionRequestModel
): Promise<ResponseBase<TransactionResponseModel[]>> => {
  let respnse: ResponseBase<TransactionResponseModel[]> = {};
  let url: string = `SearchTransaction?searchparm.pageNumber=${
    request.pageNumber
  } &&searchparm.pageSize=${
    request.pageSize
  }&&searchparm.transactionType=${Number(request.transactionType)}`;
  url =
    request.customerId !== null && request.customerId !== undefined
      ? `${url}&searchparm.customerId=${request.customerId}`
      : url;
  // url =
  //   request.cityId !== null && request.cityId !== undefined
  //     ? `${url}&searchparm.customerId=${request.cityId}`
  //     : url;
  if (
    request.searchValue !== null &&
    request.searchValue !== undefined &&
    request.searchValue !== ""
  ) {
    switch (request.searchType) {
      case SearchDailyTransactionTypeEnum.id:
        url = `${url}&searchparm.iD=${request.searchValue}`;
        break;
      case SearchDailyTransactionTypeEnum.code:
        url = `${url}&searchparm.code=${request.searchValue}`;
        break;
      case SearchDailyTransactionTypeEnum.itemName:
        url = `${url}&searchparm.code=${request.searchValue}`;
        break;
    }
  }
  const fetchResult: ResponseBase<TransactionServerResponseModel[]> =
    await AlYusrAxiosApiInstance.get(url);
  respnse.Errors = fetchResult.Errors;
  respnse.TotalRecoredCount = fetchResult.TotalRecoredCount;
  if (
    fetchResult.Result !== null &&
    fetchResult.Result !== undefined &&
    fetchResult.Result.length !== 0
  ) {
    respnse.Result = [];
    fetchResult.Result.forEach((row) => {
      respnse.Result?.push({
        id: row.ID,
        code: row.Code,
        customerNameAr: row.CustomerNameAr,
        customerNameEn: row.CustomerNameEn,
        employeeNameAr: row.EmployeeNameAr,
        employeeNameEn: row.EmployeeNameEn,
        paymenTypeNameAr: row.PaymenTypeNameAr,
        paymenTypeNameEn: row.PaymenTypeNameEn,
        currencyNameAr: row.CurrencyNameAr,
        currencyNameEn: row.CurrencyNameEn,
        creationDate: row.CreateDate,
        discount: row.Discount,
        netMoney: row.NetMoney,
        transactionType: row.TransactionType,
        totalTax: row.TotalTax,
      });
    });
  }
  return respnse;
};
export const getTransactionDetail = async (
  id: number
): Promise<TransactionDetailResponseModel | null> => {
  let response: ResponseBase<TransactionDetailResponseModel> = {};
  let url: string = `GetTrnsactionByID?id=${id}`;
  response = await AlYusrAxiosApiInstance.get(url);
  return response !== null &&
    response !== undefined &&
    response.Result !== null &&
    response.Result !== undefined
    ? response.Result
    : null;
};
export const getTrnsactionFullInfoById = async (
  id: number
): Promise<TransactionDetailResponseModel | null> => {
  let response: ResponseBase<TransactionDetailResponseModel> = {};
  let url: string = `GetTrnsactionFullInfoById?transactionHeaderID=${id}`;
  response = await AlYusrAxiosApiInstance.get(url);
  return response !== null &&
    response !== undefined &&
    response.Result !== null &&
    response.Result !== undefined
    ? response.Result
    : null;
};
//#endregion
//#region post
export const deleteTransaction = async (
  request: DeleteTransactionModelRequest
): Promise<ResponseBase<boolean>> => {
  let response: ResponseBase<boolean> = {};
  let url: string = `DeleteTransaction`;
  try {
    response = await AlYusrAxiosApiInstance.post(url, request);
  } catch (err) {
    alert(err);
  }
  return response;
};
export const saveTransaction = async (
  request: TransactionDetailResponseModel
): Promise<ResponseBase<TransactionDetailResponseModel>> => {
  let response: ResponseBase<TransactionDetailResponseModel> = {};
  let url: string = `Transactions/SaveTransactions`;
  try {
    response = await AlYusrAxiosApiInstance.post(url, request);
  } catch (err) {
    alert(err);
  }
  return response;
};
//#endregion
