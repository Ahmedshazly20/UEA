import { AuthenticateUserRequest } from "../models/user/authenticateUserRequest";
import {
  AuthenticateUserResponse,
} from "../models/user/authenticateUserResponse";
import AlYusrAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import {
  UserDeleteResponse,
  UserRegisterationResponse,
} from "../models/user/userRegisterationResponse";
import { ResponseBase } from "../models/base/responseBase";
import _ from "lodash";
import {
  Premission,
  PrivilegeModel,
  UserPremission,
} from "../models/user/useePermissionResponse";
import { MenuModel } from "../models/menu/menu";
import {
  DailyTransactionTypeEnum, LookupItem, LookupTypeEnum,
  POSUserSettingModel,
  POSUserSettingResponse,
  UserSettingModel,
  UserSettingResponse,
  UserTransactionSettingModel,
  UserTransactionSettingResponse, UserTransactionsSettingRequest, UserTransactionsSettingResponse,
} from "../models";
import {getUserId, SecureLocalStorageGet, SecureLocalStorageSet} from "../utils";
import {Result} from "antd";
export const AuthenticateUser = async (
  request: AuthenticateUserRequest
): Promise<AuthenticateUserResponse> => {
  let apiResponse: AuthenticateUserResponse = {
    isAuthenticated: false,
    isLoading: false,
  };
  try {
    let url: string = `ValidateLogin?userName=${request.userName}&password=${request.password}`;
    //var result: any = await AlYusrAxiosApiInstance.get(url);
    apiResponse = await AlYusrAxiosApiInstance.get(url);
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
export const deleteUser = async (id: number): Promise<UserDeleteResponse> => {
  let apiResponse: UserDeleteResponse = {
    Errors: [],
    Result: {
      Result: false,
      Errors: [],
    },
    Status: 0,
  };
  try {
    let url: string = `DeleteUser?id=${id}`;
    apiResponse = await AlYusrAxiosApiInstance.post(url);
    console.log("DeleteUser", apiResponse);
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
export const registerUser = async (
  request: UserRegisterationResponse
): Promise<UserRegisterationResponse> => {
  let apiResponse: UserRegisterationResponse = {
    User_Name: "",
    Name_EN: "",
    Name: "",
    Password: "",
    IsAdmin: false,
    JWT: undefined,
    ID: 0,
    CreatedBy: 0,
    ModifiedBy: 0,
    Errors: [],
    rowState: 0,
  };
  try {
    let url: string = `SaveUser`;
    apiResponse = await AlYusrAxiosApiInstance.post(url, { ...request });
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
export const SaveUserPremissions = async (
  request: Premission[]
): Promise<Premission[]> => {
  let apiResponse: Premission[] = [];
  try {
    let url: string = `SaveUserPermissions`;
    apiResponse = await AlYusrAxiosApiInstance.post(url, request);
    console.log("SaveUserPremissions", apiResponse);
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
export const saveUserSettings = async (
  request: UserSettingModel
): Promise<UserSettingResponse> => {
  let apiResponse: UserSettingResponse = { Errors: [], Result: null };
  try {
    let url: string = `SaveUserSettings`;
    apiResponse = await AlYusrAxiosApiInstance.post(url, request);
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
export const getUsers = async (): Promise<UserRegisterationResponse[]> => {
  try {
    let url: string = `GetUsersList`;
    const result: ResponseBase<UserRegisterationResponse[]> =
      await AlYusrAxiosApiInstance.get(url);
    // @ts-ignore
    return result !== null && result !== undefined ? result.Result : [];
  } catch (err) {
    alert(err);
  }
  return [];
};
export const getUserInformation = async (
  id: number
): Promise<UserRegisterationResponse | null> => {
  try {
    //let url: string = `GetUsersList`;
    //const result: ResponseBase<UserRegisterationResponse[]> =await AlYusrAxiosApiInstance.get(url);
    //  // @ts-ignore
    //  var responseObject =
    //  result !== null &&
    //  result !== undefined &&
    //  result.Result != null &&
    //  result.Result?.length !== 0
    //    ? _.find(result.Result, (o) => {
    //        return o.ID === id;
    //      })
    //    : null;
    // return responseObject !== null && responseObject !== undefined
    //   ? responseObject
    //   : null;

    let url: string = `GetUserById?userId=${id}`;
    const result: ResponseBase<UserRegisterationResponse> =
      await AlYusrAxiosApiInstance.get(url);
    return result !== null &&
      result !== undefined &&
      result.Result !== null &&
      result.Result !== undefined
      ? result.Result
      : null;
  } catch (err) {
    alert(err);
  }
  return null;
};
export const getUserPremission = async (
  id: number,
  isArabic: boolean
): Promise<Premission[]> => {
  try {
    let url: string = `GetUserPermission?userID=${id}&lang=${isArabic ? 1 : 2}`;
    const result: ResponseBase<UserPremission> =
      await AlYusrAxiosApiInstance.get(url);
    // @ts-ignore
    return result !== null && result !== undefined ? result.Result : [];
  } catch (err) {
    alert(err);
  }
  return [];
};
export const getUserSetting = async (
  id: number
): Promise<UserSettingModel | null> => {
  try {
    let url: string = `GetUserSettings?userID=${id}`;
    const result: ResponseBase<UserSettingResponse> =
      await AlYusrAxiosApiInstance.get(url);
    // @ts-ignore
    return result !== null && result !== undefined ? result.Result : [];
  } catch (err) {
    return null;
  }
};
export const getUserPriviles = async (
  id: number
): Promise<PrivilegeModel[]> => {
  const data = await getUserPremission(id, true);
  if (data !== null && data !== undefined && data.length !== 0) {
    return data.map((rawData) => ({
      id: rawData.IDForm,
      url: rawData.WebUrl.toLowerCase(),
      save: rawData.EnableSave,
      delete: rawData.EnableDelete,
      update: rawData.EnableUpdate,
      search: rawData.EnableSearch,
      view:
        rawData.EnableSave ||
        rawData.EnableDelete ||
        rawData.EnableUpdate ||
        rawData.EnableSearch
          ? true
          : false,
    }));
  }
  return [];
};

export const getUserMenu = async (userId: number): Promise<MenuModel[]> => {
  try {
    let url: string = `LoadMenuByUserId?userId=${userId}`;
    const result: ResponseBase<MenuModel[]> = await AlYusrAxiosApiInstance.get(
      url
    );
    // @ts-ignore
    let response: MenuModel[] = [];
    if (result !== null && result !== undefined) {
      result.Result?.map((row) => {
        response.push(mapMenuItem(row));
      });
    }
    return response;
    // return result !== null && result !== undefined ? result.Result : [];
  } catch (err) {
    alert(err);
  }
  return [];
};

const mapMenuItem = (request: MenuModel): MenuModel => {
  let item: MenuModel = {
    ID: request.ID,
    ArabicName: request.ArabicName,
    Name: request.Name,
    WebUrl: request.WebUrl,
    ChildBusinessObject: [],
  };
  if (
    request.ChildBusinessObject !== null &&
    request.ChildBusinessObject.length !== 0
  ) {
    request.ChildBusinessObject.map((row) => {
      item.ChildBusinessObject.push(mapMenuItem(row));
    });
  }
  return item;
};
export const saveTransactionSettings = async (
  request: UserTransactionSettingModel
): Promise<UserTransactionSettingResponse> => {
  let apiResponse: UserTransactionSettingResponse = {
    Errors: [],
    Result: null,
  };
  try {
    let url: string = `SaveTransactionSettings`;
    apiResponse = await AlYusrAxiosApiInstance.post(url, request);
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
export const getTransactionSettings = async (
  id: number,
  transactionTypeId: number
): Promise<UserTransactionSettingModel | null> => {
  try {
    let url: string = `GetTransactionSettings?userID=${id}&transactionTypeId=${transactionTypeId}`;
    const result: ResponseBase<UserTransactionSettingResponse> =
      await AlYusrAxiosApiInstance.get(url);
    // @ts-ignore
    return result !== null && result !== undefined ? result.Result : [];
  } catch (err) {
    return null;
  }
};
export const savePointOfSaleSettings = async (
  request: POSUserSettingModel
): Promise<POSUserSettingResponse> => {
  let apiResponse: POSUserSettingResponse = { Errors: [], Result: null };
  try {
    let url: string = `UserSettings/SaveUserPosSettings`;
    apiResponse = await AlYusrAxiosApiInstance.post(url, request);
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
export const getPointOfSaleSetting = async (
  id: number
): Promise<POSUserSettingModel | null> => {
  try {
    let url: string = `UserSettings/GetUserPosSettings?userID=${id}`;
    const result: ResponseBase<POSUserSettingResponse> =
      await AlYusrAxiosApiInstance.post(url);
    // @ts-ignore
    return result !== null && result !== undefined ? result.Result : [];
  } catch (err) {
    return null;
  }
};

export const getUserTransactionsSettings=async (transactionTypeId:number[],isCached:boolean,cacheKey:string):Promise<UserTransactionsSettingResponse[] >=> {
  let apiResponse: ResponseBase<UserTransactionsSettingResponse[]> = {};
  try {
    if (isCached) {
      const cachedResponse = getLocalStorageCachedData<UserTransactionsSettingResponse[]>(cacheKey);
      if (cachedResponse !== null && cachedResponse !== undefined && cachedResponse.length !== 0) {
        apiResponse.Result = cachedResponse;
      }
    }
    let url: string = `User/GetUserTransactionsSettings?userID=${getUserId()}`;
    transactionTypeId.forEach((row) => {
      url = `${url}&transactionTypeIds=${row}`
    });
    apiResponse =
        await AlYusrAxiosApiInstance.get(url);
    if (apiResponse !== null && apiResponse !== undefined && apiResponse.Result !== null && apiResponse.Result !== undefined && apiResponse.Result.length !== 0) {
      SecureLocalStorageSet(cacheKey, JSON.stringify(apiResponse.Result));
      return apiResponse.Result;
    }
  } catch (err) {
    return [];
  }
  return []
}
//#region private
function  getLocalStorageCachedData<T> (
    cacheKey: string,
): T|null {
  let response:T;
  const data = SecureLocalStorageGet(cacheKey);
  if (data != null) {
    response = JSON.parse(data as string) as T;
    return  response
  }
  else {
    return null;
  }
  return null;
}
//#endregion
