import {GeneralPrintResponse, ReportVatSearchParams, ResponseBase, TransactionReportSearchParams} from "../models";
import AlYusrAxiosApiInstance, {AxiosSearchParams} from "../axios/alYusrAxiosApiInstance";


export const SearchSalesTransactionsReport = async (request: TransactionReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('Transactions/SalesTransactionsReport', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReturnSalesTransactionsReport = async (request: TransactionReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('Transactions/ReturnSalesTransactionsReport', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchAllSalesAndReturnTransactionsReport = async (request: TransactionReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('Transactions/AllSalesAndReturnTransactionsReport', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchPurchaseTransactionsReport = async (request: TransactionReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('Transactions/PurchaseTransactionsReport', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReturnPurchaseTransactionsReport = async (request: TransactionReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('Transactions/ReturnPurchaseTransactionsReport', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReportCashier = async (request: TransactionReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('Transactions/ReportCashier', {params: AxiosSearchParams(request,'searchParmeter')});
};

export const SearchReportEmployeeSales = async (request: TransactionReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('Transactions/ReportEmplyeeSales', {params: AxiosSearchParams(request,'searchParmeter')});
};


export const SearchReportProfitOfSales = async (request: TransactionReportSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('Transactions/ReportProfitOfSales', {params: AxiosSearchParams(request,'searchParm')});
};


export const SearchReportVat = async (request: ReportVatSearchParams): Promise<ResponseBase<GeneralPrintResponse>> => {
    return await AlYusrAxiosApiInstance.get('Transactions/ReportVat', {params: AxiosSearchParams(request,'searchCasherReport')});
};

