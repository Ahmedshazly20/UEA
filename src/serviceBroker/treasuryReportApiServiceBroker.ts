import {GeneralPrintResponse, ResponseBase, TreasuryReportSearchParams} from "../models";
import AlYusrAxiosApiInstance, {AxiosSearchParams} from "../axios/alYusrAxiosApiInstance";


export const SearchReportInMoney = async (request:TreasuryReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('TreasuryReport/ReportInMoney', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReportOutMoney = async (request:TreasuryReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('/TreasuryReport/ReportOutMoney', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReportInAndOutMoney = async (request:TreasuryReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('TreasuryReport/ReportInAndOutMoney', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReportAllInAndOutMoney = async (request:TreasuryReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('TreasuryReport/ReportAllInAndOutMoney', {params: AxiosSearchParams(request,'searchParmeter')});
};