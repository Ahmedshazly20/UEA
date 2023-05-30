import {FC} from "react";
import { TransactionReportSearchParams} from "../../../models";
import {ReportPage, ReportProfitOfSaleSearchPanel} from "../../../components";
import {SearchReportProfitOfSales} from "../../../serviceBroker/transationReportApiServiceBroker";


export const ReportProfitOfSalePage:FC=()=> {
    const initialState :TransactionReportSearchParams={
        lang:1
    };
    return(
        <ReportPage InitialState={initialState} SearchApi={SearchReportProfitOfSales} searchHeader="Search Report Vat" searchPanel={ReportProfitOfSaleSearchPanel}/>
    )
}