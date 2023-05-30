import AlYusrAxiosApiInstance, {AxiosSearchParams} from "../axios/alYusrAxiosApiInstance";
import {GeneralPrintResponse, ItemReportSearchParams, ResponseBase} from "../models";

export const SearchReportItemData = async (request: ItemReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('ItemsReport/ReportItemsData', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReportFolowItemBalance = async (request: ItemReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('ItemsReport/ReportFolowItemBalance', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReportSummeryItemTransacion = async (request: ItemReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('ItemsReport/ReportSummeryItemTransacion', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReportSummeryItemTransactionQuntityWithValue = async (request: ItemReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('ItemsReport/ReportSummeryItemTransactionQuntityWithValue', {params: AxiosSearchParams(request,'searchParmeter')});
};


export const SearchReportSummeryItemTransactionQuntity = async (request: ItemReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('ItemsReport/ReportSummeryItemTransactionQuntity', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReportItemsDiffrentinCost = async (request: ItemReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('ItemsReport/ReportItemsDiffrentinCost', {params: AxiosSearchParams(request,'searchParmeter')});
};