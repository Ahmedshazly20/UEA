import AlYusrAxiosApiInstance, {
  AxiosSearchParams,
} from "../axios/alYusrAxiosApiInstance";
import {
  ResponseBase,
  CustomerDeleteResponse,
  CustomerResponse,
  SearchCustomerRequestModel,
  SearchCustomerResponseModel,
  SearchCustomersTypeEnum,
  LookupItem,
  CustomerTypeResponseModel,
  ItemReportSearchParams,
  GeneralPrintResponse,
  CustomerComplexReportSearchParams,
  CustomersSimpleReportSearchParams,
} from "../models";
import { CountryResponseModel } from "../models/customer/customerDto";

export const deleteCustomer = async (
  id: number
): Promise<CustomerDeleteResponse> => {
  let apiResponse: CustomerDeleteResponse = {
    Errors: [],
    Result: {
      Result: false,
      Errors: [],
    },
    Status: 0,
  };
  try {
    let url: string = `DeleteCustomer?id=${id}`;
    apiResponse = await AlYusrAxiosApiInstance.post(url);
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
export const getAllCustomers = async (): Promise<CustomerResponse[]> => {
  try {
    let url: string = `GetAllCustomers`;
    const result: ResponseBase<CustomerResponse[]> =
      await AlYusrAxiosApiInstance.get(url);
    // @ts-ignore
    return result !== null && result !== undefined ? result.Result : [];
  } catch (err) {
    alert(err);
  }
  return [];
};
export const getAllCustomersForDropDown = async (): Promise<LookupItem[]> => {
  let customerResult: ResponseBase<CustomerResponse[]> = {};
  let response: LookupItem[] = [];
  const url: string = `GetAllCustomers`;
  customerResult = await AlYusrAxiosApiInstance.get(url);

  if (
    customerResult !== null &&
    customerResult.Result !== null &&
    customerResult.Result !== undefined &&
    customerResult.Result.length !== 0
  ) {
    customerResult.Result.forEach((row, index) => {
      response.push({
        nameAr: row.Name,
        name: row.Name_En,
        value: row.ID.toString(),
      });
    });
  }
  return response;
};
export const addCustomer = async (
  request: CustomerResponse
): Promise<CustomerResponse> => {
  let apiResponse: CustomerResponse = {
    Code: 0,
    IDNumber: "",
    City_ID: 0,
    Address: "",
    Mobile: "",
    Phone: "",
    Mail: "",
    Notes: "",
    Cust_Type: 0,
    Beg_AC_Bal: 0,
    AreaLand: "",
    User_ID: 0,
    Account_ID: 0,
    ISCustomerAndSupplier: false,
    PaymentTypeID: 0,
    Currency_ID: 0,
    ValueCurrency: 0,
    BalanceOfPoint: 0,
    IsDefault: false,
    MaxDebit: 0,
    Customer_UniqueID: 0,
    Name_En: "",
    TaxNumber: "",
    IsCopyToServer: true,
    Device_ID: 0,
    IsSponsor: false,
    Sponsor_Id: 0,
    IsActive: true,
    ProfitPercentage: 0,
    CustomerType: 0,
    address: {
      CountryCode: "",
      FlatNumber: "",
      Governate: "",
      CreatedBy: 0,
      CreationDate: new Date(),
      ModificationDate: new Date(),
      CustomerId: 0,
      Address_GUID: "",
      ID: 0,
      ModifiedBy: 0,
      Name: "",
      RegionCity: "",
      Remarks: "",
      Row_State: 1,
      Street: "",
      VerifyOnUpdate: false,
      buildingNumber: "",
      rowState: 1,
    },

    IsCreateAccountOnSaveNewOne: false,
    IsSkipSaveAccount: false,
    ID: 0,
    CreatedBy: 0,
    ModifiedBy: 0,
    Name: "",
    ModificationDate: new Date(),
    VerifyOnUpdate: false,
    rowState: 0,
  };
  try {
    let url: string = `SaveCustomer`;
    apiResponse = await AlYusrAxiosApiInstance.post(url, { ...request });
    return apiResponse;
  } catch (err) {
    alert(err);
  }
  return apiResponse;
};
export const searchCustomers = async (
  request: SearchCustomerRequestModel
): Promise<ResponseBase<SearchCustomerResponseModel[]>> => {
  let respnse: ResponseBase<SearchCustomerResponseModel[]> = {};
  let url: string = `SearchCustomer?searchCustomer.lang=1`;
  url = `${url}&serachParmeter.pageSize=${request.pageSize || 10}`;
  url = `${url}&serachParmeter.custmertype=1`;
  url = `${url}&serachParmeter.pageNumber=${request.pageNumber || 1}`;
  // url =request.searchValue
  //     ? `${url}&serachParmeter.code	=${request.searchValue}`
  //     : url;

  url = request.searchValue
    ? `${url}&serachParmeter.name	=${request.searchValue}`
    : url;

  const fetchResult: ResponseBase<SearchCustomerResponseModel[]> =
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
      // if(row.Cust_Type==2){
      respnse.Result?.push({
        ID: row.ID,

        City_ID: row.City_ID,
        Cust_Type: row.Cust_Type,
        CustomerType: row.CustomerType,
        Mail: row.Mail,
        MaxDebit: row.MaxDebit,
        Notes: row.Notes,
        address: row.address,
        Account_ID: row.Account_ID,
        TaxNumber: row.TaxNumber,
        Code: row.Code,
        Name: row.Name,
        Name_En: row.Name_En,
        Mobile: row.Mobile,
        Phone: row.Phone,
        IDNumber: row.IDNumber,
        BalanceOfPoint: row.BalanceOfPoint,
      });
      //}
    });
  }
  return respnse;
};
export const getCustomerInvoiceType = async (): Promise<LookupItem[]> => {
  try {
    let url: string = `GetCustomerInvoiceType`;
    const result: ResponseBase<CustomerTypeResponseModel[]> =
      await AlYusrAxiosApiInstance.get(url);
    // @ts-ignore
    let response: LookupItem[] = [];
    result.Result?.forEach((item) => {
      response.push({
        name: item.EnglishName,
        nameAr: item.ArabicName,
        value: item.Code,
      });
    });
    return response;
  } catch (err) {
    alert(err);
  }
  return [];
};

export const getAllCountryIsoCode = async (): Promise<LookupItem[]> => {
  try {
    let url: string = `GetAllCountryIsoCode`;
    const result: ResponseBase<CountryResponseModel[]> =
      await AlYusrAxiosApiInstance.get(url);
    // @ts-ignore
    let response: LookupItem[] = [];
    result.Result?.forEach((item) => {
      response.push({
        name: item.Desc_en,
        nameAr: item.Desc_ar,
        value: item.code,
      });
    });
    return response;
  } catch (err) {
    alert(err);
  }
  return [];
};
