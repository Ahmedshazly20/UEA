import {
    CustomerComplexReportSearchParams,
    CustomersSimpleReportSearchParams,
    GeneralPrintResponse,
    ResponseBase
} from "../models";
import AlYusrAxiosApiInstance, {AxiosSearchParams} from "../axios/alYusrAxiosApiInstance";


export const SearchReportCustomersData = async (request: CustomersSimpleReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('CustomerReport/ReportCustomersData', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReportCustomerPayments = async (request: CustomerComplexReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('CustomerReport/ReportCustomerPayments', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReportCustomersAccount = async (request: CustomerComplexReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('CustomerReport/ReportCustomersAccount', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReportAllCustomersTransaction = async (request: CustomerComplexReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('CustomerReport/ReportAllCustomersTransaction', {params: AxiosSearchParams(request,'searchParmeter')});
};