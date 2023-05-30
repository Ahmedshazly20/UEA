import AlYusrAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import { ResponseBase } from "../models/base/responseBase";
import { StoreDeleteResponse, StoreResponse } from "../models/store/storeDto";

export const deleteStore = async (id: number): Promise<StoreDeleteResponse> => {
    let apiResponse: StoreDeleteResponse = {
      Errors: [],
      Result: {
        Result: false,
        Errors: [],
      },
      Status: 0,
    };
    try {
      let url: string = `DeleteStore?id=${id}`;
      apiResponse = await AlYusrAxiosApiInstance.post(url);
      console.log("DeleteStore", apiResponse);
      return apiResponse;
    } catch (err) {
      alert(err);
    }
    return apiResponse;
  };
  export const getStores = async (): Promise<StoreResponse[]> => {
    try {
      let url: string = `GetStoreList`;
      const result: ResponseBase<StoreResponse[]> =
        await AlYusrAxiosApiInstance.get(url);
      // @ts-ignore
      return result !== null && result !== undefined ? result.Result : [];
    } catch (err) {
      alert(err);
    }
    return [];
  };
  export const addStore = async (
    request: StoreResponse
  ): Promise<StoreResponse> => {
    let apiResponse: StoreResponse = {
      Address: "",
      Name_En: "",
      Name: "",
      ID: 0,
      CreatedBy: 0,
      ModifiedBy: 0,
      Errors: [],
      rowState: 0,
      Branch_ID:0,
      Code:"",
      CreationDate:new Date(),
      IsDefault:false,
      Phone:"",
      PrinterName:"",
      VerifyOnUpdate:false
    };
    try {
      let url: string = `SaveStore`;
      apiResponse = await AlYusrAxiosApiInstance.post(url, { ...request });
      console.log("SaveStore", apiResponse);
      return apiResponse;
    } catch (err) {
      alert(err);
    }
    return apiResponse;
  };