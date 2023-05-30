import AlYusrAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import cache from "memory-cache";
import {
  AccountModel,
  calcTypeApiResponseModel,
  CategoryResponseModel,
  CustomerResponse,
  DeleteLookupModel,
  LookupApiResponseModel,
  LookupItem,
  LookupModel,
  LookupTypeEnum,
  ResponseBase,
  SearchItemApiResponseModel,
  UnitModel,
} from "../models";
import { UserResponse } from "../models/user/authenticateUserResponse";
import {
  getLabelName,
  getUserId,
  LocalStorageGet,
  LocalStorageSet,
  SecureLocalStorageGet,
  SecureLocalStorageSet,
} from "../utils";
import { CoastCenterModel } from "../models/AcTransaction/AcTransaction";
import secureLocalStorage from "react-secure-storage";

//#region properties
const defaultCahceMs: number = 6000 * 60 * 24; //(6000 ms *60 mins *24 hrs *365 days)
//#endregion
//#region get
export const getLookupByType = async (
  type: LookupTypeEnum,
  isCached: boolean = true,
  addEmptySelect: boolean = false
): Promise<LookupItem[]> => {
  let url: string = "";
  let result: LookupItem[] = [];
  try {
    switch (type) {
      case LookupTypeEnum.AllAccounts:
        result = await getAllAccounts();
        break;
      case LookupTypeEnum.CustomerAccounts:
        result = await getAllCustomerAccounts();
        break;
      case LookupTypeEnum.SupplierAccounts:
        result = await getSuppliersAccounts();
        break;
      case LookupTypeEnum.AllTreasuryInAccount:
        result = await getAllTreasuryInAccount();
        break;
      case LookupTypeEnum.AllTreasuryOutAccount:
        result = await getAllTreasuryOutAccount();
        break;
      case LookupTypeEnum.CostCenters:
        result = await getAllCostCenters();
        break;
      case LookupTypeEnum.AllCategrories:
        result = isCached
          ? await getLocalStorageCachedData(type, addEmptySelect)
          : await getCategoriesLookupList();
        break;
      case LookupTypeEnum.Customers:
        result = isCached
          ? await getLocalStorageCachedData(type, addEmptySelect)
          : await getCustomers();
        break;
      case LookupTypeEnum.Items:
        result = isCached
          ? await getLocalStorageCachedData(type, addEmptySelect)
          : await getItems();
        break;
      case LookupTypeEnum.CalcType:
        result = isCached
          ? await getLocalStorageCachedData(type, false)
          : await getCalcTypes();
        break;
      case LookupTypeEnum.DaysOfWeek:
        result = await getDaysOfWeek(isCached);
        break;
      default:
        url = `GetLookupsByTypeId?lookupTypeId=${Number(
          type
        )}&userId=${getUserId()}&lang=1`;
        result = isCached
          ? await getLocalStorageCachedData(type, addEmptySelect)
          : await getLookupData(url);
        break;
    }
  } catch (err) {
    alert(err);
  }
  if (addEmptySelect) {
    //Add Empty Select
    result = [
      {
        nameAr: getLabelName("Select"),
        name: "Select",
        value: null,
        otherValue: {
          categoryId: -99,
        },
      },
      ...result,
    ];
  }
  return result;
};
export const resetLookup = (type: LookupTypeEnum) => {
  const url: string = `GetLookupsByTypeId?lookupTypeId=${Number(
    type
  )}&userId=${getUserId()}&lang=1`;
  cache.del(url);
};
//#endregion
//#region post
export const saveLookup = async (
  request: LookupModel
): Promise<ResponseBase<LookupModel> | null> => {
  try {
    let url: string = `SaveLookup`;
    const result: ResponseBase<LookupModel> = await AlYusrAxiosApiInstance.post(
      url,
      request
    );
    // @ts-ignore
    return result;
  } catch (err) {
    alert(err);
  }
  return null;
};
export const deleteLookup = async (
  id: number
): Promise<ResponseBase<DeleteLookupModel>> => {
  let apiResponse: ResponseBase<DeleteLookupModel> = {};
  try {
    let url: string = `DeleteLookup?id=${id}`;
    apiResponse = await AlYusrAxiosApiInstance.post(url);
    // @ts-ignore\
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
//#endregion
//#region private
const getLocalStorageCachedData = async (
  type: LookupTypeEnum,
  addEmptySelect: boolean = false
): Promise<LookupItem[]> => {
  let response: LookupItem[] = [];
  const cacheKey: string =
    Object.keys(LookupTypeEnum)[Object.values(LookupTypeEnum).indexOf(type)];
  const data = SecureLocalStorageGet(cacheKey);
  if (data != null) {
    response = JSON.parse(data as string) as LookupItem[];
  } else {
    response = await getLookupByType(type, false, false);
    if (response != null && response.length != 0) {
      SecureLocalStorageSet(cacheKey, JSON.stringify(response));
    }
  }
  return response;
};
const getCachedData = async (
  key: string,
  type: LookupTypeEnum,
  addEmptySelect: boolean = false,
  defaultCahceMilliseconds: number = defaultCahceMs
): Promise<LookupItem[]> => {
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    return cachedResponse;
  } else {
    const data = await getLookupByType(type, false, addEmptySelect);
    cache.put(key, data, defaultCahceMilliseconds);
    return data;
  }
};
const getLookupData = async (url: string): Promise<LookupItem[]> => {
  const defaultResult: ResponseBase<LookupApiResponseModel[]> =
    await AlYusrAxiosApiInstance.get(url);
  if (defaultResult && defaultResult.Result) {
    return mapLookUp(defaultResult.Result);
  }
  return [];
};
const mapLookUp = (request: LookupApiResponseModel[]): LookupItem[] => {
  let response: LookupItem[] = [];
  if (request !== null && request !== undefined && request.length !== 0) {
    request.forEach((row) => {
      response.push({
        name: row.EnglishName,
        nameAr: row.ArabicName,
        value: row.ID.toString(),
      });
    });
  }
  return response;
};
const getCalcTypes = async (): Promise<LookupItem[]> => {
  let response: LookupItem[] = [];
  let url: string = `GetAllCalacType`;
  const fetchResult: ResponseBase<calcTypeApiResponseModel[]> =
    await AlYusrAxiosApiInstance.get(url);
  if (
    fetchResult !== null &&
    fetchResult !== undefined &&
    fetchResult.Result !== null &&
    fetchResult.Result !== undefined &&
    fetchResult.Result.length !== 0
  ) {
    fetchResult.Result.forEach((row) => {
      response.push({
        value: row.ID.toString(),
        name: row.EnglishName,
        nameAr: row.Name,
        otherValue: {
          priceType: row.Pricetype,
          percentage: row.Percentage,
          fixedValue: row.DefaultFixedValue,
        },
      });
    });
  }
  console.log('CalcType',JSON.stringify(response))
  return response;
};
const getItems = async (): Promise<LookupItem[]> => {
  let response: LookupItem[] = [];
  let url: string = `SearchItems?searchItem.lang=1`;
  const fetchResult: ResponseBase<SearchItemApiResponseModel[]> =
    await AlYusrAxiosApiInstance.get(url);
  if (
    fetchResult !== null &&
    fetchResult !== undefined &&
    fetchResult.Result !== null &&
    fetchResult.Result !== undefined &&
    fetchResult.Result.length !== 0
  ) {
    fetchResult.Result.forEach((row) => {
      response.push({
        value: row.ItemUnit_ID.toString(),
        name: row.ItemName_En,
        nameAr: row.ItemName,
        otherValue: {
          categoryId: row.Cat_ID,
          sellPrice: row.PriceSale,
          additionalPrice: row.AddationalPrice,
          wholeSalePrice: row.WholeSalePrice,
          costPrice: row.PriceCost,
          purchasePrice: row.LastPriceBuy,
          balance: row.UnitBalance,
          factor: row.Factor,
          itemUnitId: row.ItemUnit_ID,
          unitId: row.Unit_ID,
          code: row.Code,
          tax: row.Tax,
          taxPercentage:row.TaxPercentge
        },
      });
    });
  }
  return response;
};
const getDaysOfWeek = async (isCashed: boolean): Promise<LookupItem[]> => {
  const url = `GetLookupsByTypeId?lookupTypeId=${Number(
    LookupTypeEnum.DaysOfWeek
  )}&userId=${getUserId()}&lang=1`;
  if (isCashed) {
    const cachedResponse = cache.get(url);
    if (cachedResponse) {
      return cachedResponse;
    } else {
      const defaultResult: ResponseBase<LookupApiResponseModel[]> =
        await AlYusrAxiosApiInstance.get(url);
      let data: LookupItem[] = [];
      if (defaultResult && defaultResult.Result) {
        if (defaultResult.Result.length !== 0) {
          defaultResult.Result.forEach((row) => {
            data.push({
              name: row.EnglishName,
              nameAr: row.ArabicName,
              value: row.EnglishName.toString(),
            });
          });
        }
      }
      cache.put(url, data, 24 * 1000 * 60 * 60);
      return data;
    }
  } else {
    const defaultResult: ResponseBase<LookupApiResponseModel[]> =
      await AlYusrAxiosApiInstance.get(url);
    let data: LookupItem[] = [];
    if (defaultResult && defaultResult.Result) {
      if (defaultResult.Result.length !== 0) {
        defaultResult.Result.forEach((row) => {
          data.push({
            name: row.EnglishName,
            nameAr: row.ArabicName,
            value: row.ID.toString(),
          });
        });
      }
    }
    return data;
  }
};
const getCustomers = async (): Promise<LookupItem[]> => {
  let response: LookupItem[] = [];
  let url: string = `GetAllCustomers`;
  const customers: ResponseBase<CustomerResponse[]> =
    await AlYusrAxiosApiInstance.get(url);
  if (
    customers !== null &&
    customers !== undefined &&
    customers.Result !== null &&
    customers.Result !== undefined &&
    customers.Result.length !== 0
  ) {
    customers.Result.forEach((row) => {
      response.push({
        value: row.ID.toString(),
        name: row.Name_En,
        nameAr: row.Name,
        otherValue: {
          accountId: row.Account_ID,
        },
      });
    });
  }
  return response;
};
const getAllCustomerAccounts = async (): Promise<LookupItem[]> => {
  let customerAccountsResult: ResponseBase<AccountModel[]> = {};
  let response: LookupItem[] = [];
  const url: string = `GetAllCustomerAccounts`;
  customerAccountsResult = await AlYusrAxiosApiInstance.get(url);
  if (
    customerAccountsResult !== null &&
    customerAccountsResult.Result !== null &&
    customerAccountsResult.Result !== undefined &&
    customerAccountsResult.Result.length !== 0
  ) {
    customerAccountsResult.Result.forEach((row, index) => {
      response.push({
        nameAr: row.ArabicName,
        name: row.EnglishName,
        value: row.ID.toString(),
      });
    });
  }
  return response;
};
const getSuppliersAccounts = async (): Promise<LookupItem[]> => {
  let categoryResult: ResponseBase<AccountModel[]> = {};
  let response: LookupItem[] = [];
  const url: string = `GetAllAccounts`;
  categoryResult = await AlYusrAxiosApiInstance.get(url);
  if (
    categoryResult !== null &&
    categoryResult.Result !== null &&
    categoryResult.Result !== undefined &&
    categoryResult.Result.length !== 0
  ) {
    categoryResult.Result.forEach((row, index) => {
      response.push({
        nameAr: row.Name,
        name: row.EnglishName,
        value: row.ID.toString(),
      });
    });
  }
  return response;
};
const getAllTreasuryInAccount = async (): Promise<LookupItem[]> => {
  let categoryResult: ResponseBase<AccountModel[]> = {};
  let response: LookupItem[] = [];
  const url: string = `GetAllTreasuryInAccount`;
  categoryResult = await AlYusrAxiosApiInstance.get(url);
  if (
    categoryResult !== null &&
    categoryResult.Result !== null &&
    categoryResult.Result !== undefined &&
    categoryResult.Result.length !== 0
  ) {
    categoryResult.Result.forEach((row, index) => {
      response.push({
        nameAr: row.Name,
        name: row.EnglishName,
        value: row.ID.toString(),
      });
    });
  }
  return response;
};
const getAllTreasuryOutAccount = async (): Promise<LookupItem[]> => {
  let categoryResult: ResponseBase<AccountModel[]> = {};
  let response: LookupItem[] = [];
  const url: string = `GetAllTreasuryOutAccount`;
  categoryResult = await AlYusrAxiosApiInstance.get(url);
  if (
    categoryResult !== null &&
    categoryResult.Result !== null &&
    categoryResult.Result !== undefined &&
    categoryResult.Result.length !== 0
  ) {
    categoryResult.Result.forEach((row, index) => {
      response.push({
        nameAr: row.ArabicName,
        name: row.EnglishName,
        value: row.ID.toString(),
      });
    });
  }
  return response;
};
const getAllCostCenters = async (): Promise<LookupItem[]> => {
  let categoryResult: ResponseBase<CoastCenterModel[]> = {};
  let response: LookupItem[] = [];
  const url: string = `GetAllCostCenters`;
  categoryResult = await AlYusrAxiosApiInstance.get(url);
  if (
    categoryResult !== null &&
    categoryResult.Result !== null &&
    categoryResult.Result !== undefined &&
    categoryResult.Result.length !== 0
  ) {
    categoryResult.Result.forEach((row, index) => {
      response.push({
        nameAr: row.ArabicName,
        name: row.EnglishName,
        value: row.ID.toString(),
      });
    });
  }
  return response;
};
const getUnitsLookupList = async (): Promise<LookupItem[]> => {
  let result: ResponseBase<UnitModel[]> = {};
  let response: LookupItem[] = [];
  const url: string = `GetUnitList`;
  result = await AlYusrAxiosApiInstance.get(url);
  if (
    result !== null &&
    result.Result !== null &&
    result.Result !== undefined &&
    result.Result.length !== 0
  ) {
    result.Result.forEach((row, index) => {
      response.push({
        nameAr: row.Name,
        name: row.Name_En,
        value: row.ID.toString(),
      });
    });
  }
  return response;
};
const getAllCities = async (): Promise<LookupItem[]> => {
  let categoryResult: ResponseBase<UserResponse[]> = {};
  let response: LookupItem[] = [];
  response.push({
    nameAr: getLabelName("Select"),
    name: "Select",
    value: null,
  });
  const url: string = `GetAllCities?lang=1&userId=30`;
  categoryResult = await AlYusrAxiosApiInstance.get(url);
  console.log("categoryResult", categoryResult);

  console.log("categoryResult.Result", categoryResult.Result);

  if (
    categoryResult !== null &&
    categoryResult.Result !== null &&
    categoryResult.Result !== undefined &&
    categoryResult.Result.length !== 0
  ) {
    categoryResult.Result.forEach((row, index) => {
      response.push({
        nameAr: row.Name,
        name: row.Name_En,
        value: row.ID.toString(),
      });
    });
  }
  return response;
};
const getCategoriesLookupList = async (): Promise<LookupItem[]> => {
  let categoryResult: ResponseBase<CategoryResponseModel[]> = {};
  let response: LookupItem[] = [];
  const url: string = `GetCategoryList?lang=1`;
  categoryResult = await AlYusrAxiosApiInstance.get(url);
  if (
    categoryResult !== null &&
    categoryResult.Result !== null &&
    categoryResult.Result !== undefined &&
    categoryResult.Result.length !== 0
  ) {
    categoryResult.Result.forEach((row, index) => {
      response.push({
        nameAr: row.Name,
        name: row.Name_En,
        value: row.ID.toString(),
      });
    });
  }
  return response;
};
const getAllAccounts = async (): Promise<LookupItem[]> => {
  let categoryResult: ResponseBase<AccountModel[]> = {};
  let response: LookupItem[] = [];
  response.push({
    nameAr: getLabelName("Select"),
    name: "Select",
    value: null,
  });
  const url: string = `GetAllAccounts`;
  categoryResult = await AlYusrAxiosApiInstance.get(url);
  if (
    categoryResult !== null &&
    categoryResult.Result !== null &&
    categoryResult.Result !== undefined &&
    categoryResult.Result.length !== 0
  ) {
    categoryResult.Result.forEach((row, index) => {
      response.push({
        nameAr: row.Name,
        name: row.EnglishName,
        value: row.ID.toString(),
      });
    });
  }
  return response;
};
//#endregion
