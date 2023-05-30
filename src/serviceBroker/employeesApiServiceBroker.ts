import AlYusrAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import {
  EmployeeResponse,
  ResponseBase,
  SaveEmployeeRequest,
  EmployeeDeleteResponse,
  EstehekakModel,
  EstehekakModelResponse,

} from "../models";

export const getAllEmployees = async (): Promise<ResponseBase<EmployeeResponse[]>
> => {
  let url: string = `GetAllEmployees`;
  return await AlYusrAxiosApiInstance.get(url);
};

export const saveEmployee = async (
  request: EmployeeResponse
): Promise<ResponseBase<EmployeeResponse>> => {
  let response: ResponseBase<EmployeeResponse> = {};
  const url: string = `SaveEmployee`;
  const postResult: ResponseBase<EmployeeResponse> =
    await AlYusrAxiosApiInstance.post(url, request);
  console.log("postResult", postResult);
  response.Errors = postResult.Errors;
  if (postResult.Result) {
    console.log("xxxxxxxx");
  }
  return response;
};

export const deleteEmployee = async (
  id: number
): Promise<EmployeeDeleteResponse> => {
  let apiResponse: EmployeeDeleteResponse = {
    Errors: [],
    Result: {
      Result: false,
      Errors: [],
    },
    Status: 0,
  };
  try {
    let url: string = `DeleteEmployee?id=${id}`;
    apiResponse = await AlYusrAxiosApiInstance.post(url);
    console.log("DeleteEmployee", apiResponse);
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
export const saveEmployeeEstihkakSubtract = async (
  request: EstehekakModel
): Promise<ResponseBase<EstehekakModelResponse>> => {
  const url: string = `/SaveEmployeeEstihkakSubtract`;
  const postResult: ResponseBase<EstehekakModelResponse> =
    await AlYusrAxiosApiInstance.post(url, request);
  return postResult;
};

export const getEmployeeInformation = async (Id:any): Promise<EmployeeResponse> => {
  try {
    let url: string = `GetEmployeeById?employeeId=${Id}`;
    const result: ResponseBase<EmployeeResponse> =
      await AlYusrAxiosApiInstance.get(url);
      console.log("result",result);
    // @ts-ignore
    return result !== null && result !== undefined ? result.Result : null;
  } catch (err) {
    throw(err)
  }
};
export const getEstihkakSubtractById = async (id:any): Promise<ResponseBase<EstehekakModel>
> => {
  let url: string = `GetEstihkakSubtractById?Id=${id}`;
  return await AlYusrAxiosApiInstance.get(url);
};
export const searchEstihkakSubtract = async (empId:number|null,ruleId:number|null,typeId:number,pageSize:number,pageNumber:number): Promise<ResponseBase<EstehekakModel[]>
> => {
  let url: string = `SearchEstihkakSubtract?searchItem.typeId=${typeId}&searchItem.pageNumber=${pageNumber}&searchItem.pageSize=${pageSize}`;
  url =
  empId!== null? `${url}&searchItem.employeeId=${empId}`
    : url;
    if(empId== null){
  url =
  ruleId!== null? `${url}&searchItem.esthkSubtRuleId=${ruleId}`
      : url;}
      else{
        url =
        ruleId!== null? `${url}&searchItem.esthkSubtRuleId=${ruleId}`: url;
      }
  return await AlYusrAxiosApiInstance.get(url);
};
export const deleteEmployeeEstihkakSubtract = async (
  id: number
): Promise<EmployeeDeleteResponse> => {
  let apiResponse: EmployeeDeleteResponse = {
    Errors: [],
    Result: {
      Result: false,
      Errors: [],
    },
    Status: 0,
  };
  try {
    let url: string = `DeleteEmployeeEstihkakSubtract?id=${id}`;
    apiResponse = await AlYusrAxiosApiInstance.post(url);
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};