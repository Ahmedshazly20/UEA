import { date } from "yup";
import AlYusrAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import { ResponseBase } from "../models/base/responseBase";
import { CurrencyResponse,CurrencyDeleteResponse, LookupItem, CurrenciesShourtCutModel }
 from "../models/currency/currencyResponse";
export const deleteCurrency = async (id: number): Promise<CurrencyDeleteResponse> => {
    let apiResponse: CurrencyDeleteResponse = {
      Errors: [],
      Result: {
        Result: false,
        Errors: [],
      },
      Status: 0,
    };
    try {
      let url: string = `DeleteCurrency?id=${id}`;
      console.log(id);
      apiResponse = await AlYusrAxiosApiInstance.post(url);
      console.log("DeleteCurrency", apiResponse);
      return apiResponse;
    } catch (err) {
      alert(err);
    }
    return apiResponse;
  };
  export const getCurrency = async (): Promise<CurrencyResponse[]> => {
    try {
      let url: string = `GetCurrencyList`;
      const result: ResponseBase<CurrencyResponse[]> =
        await AlYusrAxiosApiInstance.get(url);
      // @ts-ignore
      return result !== null && result !== undefined ? result.Result : [];
    } catch (err) {
      alert(err);
    }
    return [];
  };
  export const addCurrency = async (
    request: CurrencyResponse
  ): Promise<CurrencyResponse> => {
    let apiResponse: CurrencyResponse = {

        ArabicName: "",
        EnglishName: "",
        ShortCutArab: "",
        ShorCutEng: "",
        IsDefault: false,
        Value: 0,
        Note: "",
        ArabicShourtCut: "",
        EnglishShourtCust: "",
        CountryName: "",
        ID: 0,
        CreatedBy: 0,
        ModifiedBy:0,
        Name: "",
        CreationDate: new Date(),
        VerifyOnUpdate: false,
        rowState: 0,
    };
    try {
      let url: string = `SaveCurrency`;
      apiResponse = await AlYusrAxiosApiInstance.post(url, { ...request });
      console.log("SaveCurrency", apiResponse);
      return apiResponse;
    } catch (err) {
      alert(err);
    }
    return apiResponse;
  };

  export const GetCurrenciesShourtCutList = async (): Promise<LookupItem[]> => {
    try {
      let url: string = `GetCurrenciesShourtCut`;
      const result: ResponseBase<CurrenciesShourtCutModel[]> =
        await AlYusrAxiosApiInstance.get(url);
      // @ts-ignore
      let response:LookupItem[]=[]
      result.Result?.forEach((item) => {
        response.push({
        name:item.ArabicName,
        nameAr:item.EnglishName,
        value:item.EnglishName
       });
     });
     console.log('GetCurrenciesShourtCutList',response);
     
      return response
    } catch (err) {
      alert(err);
    }
    return [];
  };