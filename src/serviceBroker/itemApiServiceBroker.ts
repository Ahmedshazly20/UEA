import AlYusrAxiosApiInstance, {
  AxiosSearchParams,
} from "../axios/alYusrAxiosApiInstance";
import {
  ItemModel,
  ResponseBase,
  SearchItemResponseModel,
  SearchItemRequestModel,
  SearchItemsTypeEnum,
  SearchItemApiResponseModel,
  deleteItemResponseModel,
  SearchAcTransactionRequest,
  GeneralPrintResponse,
  LookupItem,
  ItemReportSearchParams,
} from "../models";
import { getLabelName } from "../utils";

export const getItemsByCategoryId = async (
  categoryId: number | undefined
): Promise<LookupItem[]> => {
  let url: string = `SearchItems?searchItem.lang=1`;
  url =
    categoryId !== null && categoryId !== undefined
      ? `${url}&searchItem.categorey_ID=${categoryId}`
      : url;
  const fetchResult: ResponseBase<SearchItemApiResponseModel[]> =
    await AlYusrAxiosApiInstance.get(url);
  let response: LookupItem[] = [];
  response.push({
    nameAr: getLabelName("Select"),
    name: "Select",
    value: null,
  });
  if (
    fetchResult !== null &&
    fetchResult !== undefined &&
    fetchResult.Result !== null &&
    fetchResult.Result != undefined &&
    fetchResult.Result.length !== 0
  ) {
    fetchResult.Result.forEach((row) => {
      response.push({
        name: row.ItemName_En,
        nameAr: row.ItemName,
        value: row.ID.toString(),
      });
    });
  }
  return response;
};
export const searchItmes = async (
  request: SearchItemRequestModel
): Promise<ResponseBase<SearchItemResponseModel[]>> => {
  let respnse: ResponseBase<SearchItemResponseModel[]> = {};
  let url: string = `SearchItems?searchItem.lang=1`;
  url = `${url}&searchItem.pageSize=${request.pageSize || 10}`;
  url = `${url}&searchItem.pageNumber=${request.pageNumber || 1}`;
  url =
    request.categoryId !== null && request.categoryId !== undefined
      ? `${url}&searchItem.categorey_ID=${request.categoryId}`
      : url;

  url =
    request.smallestUnit !== null && request.smallestUnit !== undefined
      ? `${url}&searchItem.smallestUnit=${request.smallestUnit}`
      : url;

  url =
    request.searchType === SearchItemsTypeEnum.ItemBarCode &&
    request.searchValue
      ? `${url}&searchItem.barcode	=${request.searchValue}`
      : url;

  url =
    request.searchType === SearchItemsTypeEnum.ItemCode && request.searchValue
      ? `${url}&searchItem.itemCode	=${request.searchValue}`
      : url;

  url =
    request.searchType === SearchItemsTypeEnum.ItemName && request.searchValue
      ? `${url}&searchItem.itemName	=${request.searchValue}`
      : url;

  const fetchResult: ResponseBase<SearchItemApiResponseModel[]> =
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
        nameAr: row.ItemName,
        nameEN: row.ItemName_En,
        priceSale: row.PriceSale,
        priceCost: row.PriceCost,
        currentBalance: row.Current_Balance,
      });
    });
  }
  return respnse;
};
export const saveItem = async (
  request: ItemModel
): Promise<ResponseBase<SearchItemResponseModel>> => {
  let response: ResponseBase<SearchItemResponseModel> = {};
  const url: string = `SaveItemFull`;
  const postResult: ResponseBase<SearchItemResponseModel> =
    await AlYusrAxiosApiInstance.post(url, request);
  response.Errors = postResult.Errors;
  return response;
};
export const getItemFullDetailsById = async (
  itemId: number
): Promise<ResponseBase<ItemModel>> => {
  let response: ResponseBase<ItemModel> = {};
  const url: string = `GetItemFullDetailsById?itemId=${itemId}`;
  response = await AlYusrAxiosApiInstance.get(url);
  // if (
  //   response !== null &&
  //   response !== undefined &&
  //   response.Result !== null &&
  //   response.Result !== undefined &&
  //   response.Result.ItemsInstores !== null &&
  //   response.Result.ItemsInstores !== undefined &&
  //   response.Result.ItemsInstores.length !== 0
  // ) {
  //   response.Result.ItemsInstores[0].Item_unit.forEach((element) => {
  //     element.name = "";
  //     element.nameAr = "";
  //     return element;
  //   });
  // }
  return response;
};
export const deleteItem = async (
  id: number
): Promise<ResponseBase<deleteItemResponseModel>> => {
  let response: ResponseBase<deleteItemResponseModel> = {};
  const url: string = `DeleteItem?id=${id}`;
  response = await AlYusrAxiosApiInstance.post(url);
  return response;
};
// export const getItemsPerPagination = async (
//   lang: number = 1,
//   pageNumber: number = 1,
//   pageSize: number = 10
// ): Promise<ResponseBase<ItemModel[]>> => {
//   let respnse: ResponseBase<ItemModel[]> = {};
//   let url: string = `GetAllItems?lang=${lang}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
//   respnse = await AlYusrAxiosApiInstance.get(url);
//   return respnse;
// };
