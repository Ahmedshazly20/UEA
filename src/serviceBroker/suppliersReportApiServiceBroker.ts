import {
    SuppliersComplexReportSearchParams,
    SuppliersSimpleReportSearchParams,
    GeneralPrintResponse,
    ResponseBase
} from "../models";
import AlYusrAxiosApiInstance, {AxiosSearchParams} from "../axios/alYusrAxiosApiInstance";


export const SearchReportSuppliersData = async (request: SuppliersSimpleReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('SupplierReport/ReportSuppliersData', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReportSuppliersPayments = async (request: SuppliersComplexReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('SupplierReport/ReportSuppliersPayments', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReportSuppliersAccount = async (request: SuppliersComplexReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('CustomerReport/ReportSuppliersAccount', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReportAllSuppliersTransaction = async (request: SuppliersComplexReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('CustomerReport/ReportAllSuppliersTransaction', {params: AxiosSearchParams(request,'searchParmeter')});
};