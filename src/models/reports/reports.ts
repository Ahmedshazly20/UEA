import {MouseEventHandler} from "react";

export interface SearchPanelProps<T>{
    searchHeader: string;
    setLoading: Function;
    searchParams: T;
    setSearchParams: Function;
    handelSearch: MouseEventHandler<HTMLButtonElement>;
    wihDateRange?:boolean|true;
}
export interface ItemReportSearchParams {
    itemId?: number;
    lang: number;
    branchId?: number;
    balanceIsNotZero?: boolean;
    fromDate?: Date;
    toDate?: Date;
    itemCode?: string;
    itemName?: string;
    itemBalanceCriteria?: string;
    itemBarcode?: string;
    storeId?: number;
    categoryId?: number;
    userId: number;
    reportID?: number;
    unit_ID?: number;
}

export interface CustomersSimpleReportSearchParams {
    customerId?:number;
    lang:number;
    customerCode?:string;
    customerName?:string;
    fromDate?: Date;
    toDate?: Date;
    customerBalanceCriteria?:string;
    customerPhone?:string;
    cityId?:number;
    userId?:number;
    customerType?:number;
}
export interface CustomerComplexReportSearchParams{
    lang:number;
    offline?:boolean;
    fromDate?: Date;
    toDate?: Date;
    userId?:number;
    cityId?:number;
    accountId?:number;
    acTransactionType?:number;
    acTypeDetail?:number;
    branchId?:number;
    employeeId?:number;
    costCenterId?:number;
    currencyId?:number;
    valueOfCurrency?:number;
    customerType?:number;
    addWhere?:string;
}
export interface SuppliersSimpleReportSearchParams {
    customerId?:number;
    lang:number;
    customerCode?:string;
    customerName?:string;
    fromDate?: Date;
    toDate?: Date;
    customerBalanceCriteria?:string;
    customerPhone?:string;
    cityId?:number;
    userId?:number;
    customerType?:number;
}
export interface SuppliersComplexReportSearchParams{
    lang:number;
    offline?:boolean;
    fromDate?: Date;
    toDate?: Date;
    userId?:number;
    cityId?:number;
    accountId?:number;
    acTransactionType?:number;
    acTypeDetail?:number;
    branchId?:number;
    employeeId?:number;
    costCenterId?:number;
    currencyId?:number;
    valueOfCurrency?:number;
    customerType?:number;
    addWhere?:string;
}

export interface TransactionReportSearchParams{
    storeId?:number;
    stationId?:number;
    categoryId?:number;
    transactionType?:number;
    isAllSalesTransaction?:boolean;
    lang:number;
    code?:string;
    itemId?:number;
    itemCode?:string;
    itemName?:string;
    custmerId?:number;
    cityId?:number;
    isSummeryReport?:boolean;
    isConsignItem?:boolean;
    costCenterID?:number;
    employeeId?:number;
    userId?:number;
    paymentTypeId?:number;
    currencyId?:number;
    fromDate?: Date;
    toDate?: Date;
    branchId?:number;
    valueOfCurrency?:number;
    comparePriceToZero?:number;
    dayWeekOfSales?:string;
    balanceIsNotZero?:boolean;
    item_Serial?:string;
    invoiceType?:number;
    car_Ids?:string;
    calcTypeId?:number;
    reportDesignView?:number;
    
}
export interface ReportVatSearchParams{
    fromDate?: Date;
    toDate?: Date; 
}
export interface TreasuryReportSearchParams{
    lang:number;
    offline?:boolean;
    fromDate?: Date;
    toDate?: Date;
    userId?:number;
    cityId?:number;
    accountId?:number;
    acTransactionType?:number;
    acTypeDetail?:number;
    branchId?:number;
    employeeId?:number;
    costCenterId?:number;
    currencyId?:number;
    valueOfCurrency?:number;
    customerType?:number;
    addWhere?:string;
}