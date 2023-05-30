import AlYusrAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import { ResponseBase,CustomerDeleteResponse, CustomerResponse, SearchCustomerRequestModel, SearchCustomerResponseModel, SearchCustomersTypeEnum, LookupItem, CustomerTypeResponseModel } from  "../models";
import { CountryResponseModel } from "../models/customer/customerDto";

export const deleteSupplier = async (id: number): Promise<CustomerDeleteResponse> => {
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
  export const getAllSuppliers = async (): Promise<CustomerResponse[]> => {
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
  export const addSupplier = async (
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
        Cust_Type: 2,
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
        TaxNumber:"",
        IsCopyToServer: true,
        Device_ID: 0,
        IsSponsor: false,
        Sponsor_Id: 0,
        IsActive: true,
        ProfitPercentage: 0,
        CustomerType: 0,
        address: {
          CountryCode:"",
          FlatNumber:"",
          Governate:"",
          CreatedBy:0,
          CreationDate:new Date(),
          ModificationDate:new Date(),
          CustomerId:0,
          Address_GUID:"",
          ID:0,
          ModifiedBy:0,
          Name:"",
          RegionCity:"",
        Remarks:"",
        Row_State:1,
        Street:"",
        VerifyOnUpdate:false,
        buildingNumber:"",
        rowState:1
        
            },
        
        IsCreateAccountOnSaveNewOne: false,
        IsSkipSaveAccount: false,
        ID: 0,
        CreatedBy: 0,
        ModifiedBy: 0,
        Name:"",
        ModificationDate: new Date(),
        VerifyOnUpdate: false,
        rowState:0
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
  export const searchSuppliers = async (
    request: SearchCustomerRequestModel
  ): Promise<ResponseBase<SearchCustomerResponseModel[]>> => {
    let respnse: ResponseBase<SearchCustomerResponseModel[]> = {};
    let url: string = `SearchCustomer?searchCustomer.lang=1`;
    url = `${url}&serachParmeter.pageSize=${request.pageSize || 10}`;
    url = `${url}&serachParmeter.custmertype=2`;
    url = `${url}&serachParmeter.pageNumber=${request.pageNumber || 1}`;
    // url =request.searchValue
    //     ? `${url}&serachParmeter.code	=${request.searchValue}`
    //     : url;
  
    url =request.searchValue
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
          
          City_ID:row.City_ID,
          Cust_Type:row.Cust_Type,
          CustomerType:row.CustomerType,
          Mail:row.Mail,
          MaxDebit:row.MaxDebit,
          Notes:row.Notes,
          address:row.address,
          Account_ID:row.Account_ID,
          TaxNumber:row.TaxNumber,
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
  export const getCustomerById = async (id: number): Promise<CustomerResponse> => {
      let url: string = `GetCustomerById?CustomerId=${id}`;
      const result: ResponseBase<CustomerResponse> =
        await AlYusrAxiosApiInstance.get(url);
      // @ts-ignore
      return result !== null && result !== undefined ? result.Result : {};
   
  };