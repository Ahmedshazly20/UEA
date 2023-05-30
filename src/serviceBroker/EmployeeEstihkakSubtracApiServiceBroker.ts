import { date } from "yup";
import AlYusrAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import { ResponseBase } from "../models/base/responseBase";
import { EmployeeEstihkakSubtracResponse,EmployeeEstihkakSubtraccDeleteResponse, LookupItem, AccrualSubtractItemResponse, AccrualSubtractItemModel, AccrualSubtractRuleDeleteResponse }
 from "../models/Estihkaksubtract/EmployeeEstihkakRule";
export const deleteEstihkaksubtract = async (id: number): Promise<EmployeeEstihkakSubtraccDeleteResponse> => 
{
    let apiResponse: EmployeeEstihkakSubtraccDeleteResponse = {
      Errors: [],
      Result: {
        Result: false,
        Errors: [],
      },
      Status: 0,
    };
    try {
      let url: string = `DeleteEstihkakSubtractRule?id=${id}`;
      console.log(id);
      apiResponse = await AlYusrAxiosApiInstance.post(url);
      
      return apiResponse;
    } catch (err) {
      alert(err);
    }
    return apiResponse;
  };
  export const getEmployeeEstihkak = async (): Promise<EmployeeEstihkakSubtracResponse[]> => {
    try {
      let url: string = `GetAllEsthkakSubtractByRuleTypeId?RuleTypeId=1`;
      const result: ResponseBase<EmployeeEstihkakSubtracResponse[]> =
        await AlYusrAxiosApiInstance.get(url);
      // @ts-ignore
      return result !== null && result !== undefined ? result.Result : [];
    } catch (err) {
      alert(err);
    }
    return [];
  };
  export const getEmployeeEstihkakExpense = async (): Promise<EmployeeEstihkakSubtracResponse[]> => {
    try {
      let url: string = `GetAllEsthkakSubtractByRuleTypeId?RuleTypeId=2`;
      const result: ResponseBase<EmployeeEstihkakSubtracResponse[]> =
        await AlYusrAxiosApiInstance.get(url);
      // @ts-ignore
      return result !== null && result !== undefined ? result.Result : [];
    } catch (err) {
      alert(err);
    }
    return [];
  };
  export const SaveEstihkakSubtractRule = async (
    request: EmployeeEstihkakSubtracResponse
  ): Promise<EmployeeEstihkakSubtracResponse> => {
    let apiResponse: EmployeeEstihkakSubtracResponse = {
      Notes: "",
      TypeRule_ID: 0,
      Name_En: "",
      Row_State: 0,
      ID: 0,
      CreatedBy: 0,
      ModifiedBy:"" ,
      Name: "",
      CreationDate:new Date(),
      ModificationDate:new Date(),
      VerifyOnUpdate: false,
      rowState: 1
    };
    try {
      let url: string = `SaveEstihkakSubtractRule`;
      console.log("apiResponse", request);
      apiResponse = await AlYusrAxiosApiInstance.post(url, { ...request });
      console.log("SaveEstihkakSubtractRule", apiResponse);
      return apiResponse;
    } catch (err) {
      alert(err);
    }
    return apiResponse;
  };
  export const SaveAccrualSubtractRule = async (
    request: AccrualSubtractItemModel
  ): Promise<AccrualSubtractItemModel> => {
    let apiResponse: AccrualSubtractItemModel ={
      ID: 0,
      CreatedBy: 0,
      ModifiedBy: 0,
      Errors: [],
      rowState: 0,
      CreationDate:new Date(),
      ModificationDate:new Date(),
      Name:"",
      Name_En:"",
      Notes:"",
      Row_State:0,
      TypeRule_ID:1,
      VerifyOnUpdate:false
    }
    try {
      let url: string = `SaveEstihkakSubtractRule`;
      console.log("apiResponse", request);
      apiResponse = await AlYusrAxiosApiInstance.post(url, { ...request });
      console.log("SaveEstihkakSubtractRule", apiResponse);
      return apiResponse;
    } catch (err) {
      alert(err);
            }
            return apiResponse;

  };

  export const GetAccrualSubtractRules = async (RuleTypeId:any): Promise<AccrualSubtractItemModel[]> => {
    try {
      let url: string = `GetAllEsthkakSubtractByRuleTypeId?RuleTypeId=${RuleTypeId}`;
      const result: ResponseBase<AccrualSubtractItemModel[]> =
        await AlYusrAxiosApiInstance.get(url);
      // @ts-ignore
      return result !== null && result !== undefined ? result.Result : [];
    } catch (err) {
      alert(err);
    }
    return [];
  };
  export const GetAccrualSubtractRuleById = async (Id:any): Promise<AccrualSubtractItemModel> => {
    try {
      let url: string = `GetEstihkakSubtractRuleById?Id=${Id}`;
      const result: ResponseBase<AccrualSubtractItemModel> =
        await AlYusrAxiosApiInstance.get(url);
      // @ts-ignore
      return result !== null && result !== undefined ? result.Result : null;
    } catch (err) {
      throw(err)
    }
  };
  export const deleteAccrualubtractById = async (id: number): Promise<AccrualSubtractRuleDeleteResponse> => 
{
    let apiResponse: AccrualSubtractRuleDeleteResponse= {
      Errors: [],
      Result: {
        Result: false,
        Errors: [],
      },
      Status: 0,
    };;
    try {
      let url: string = `DeleteEstihkakSubtractRule?id=${id}`;
      console.log(id);
      apiResponse = await AlYusrAxiosApiInstance.post(url);
      
    } catch (err) {
      alert(err);
    }
    return apiResponse;
  };
