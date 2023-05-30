import {
    SearchSalesTransactionsReport
} from "../../../serviceBroker/transationReportApiServiceBroker";
import React, {FC} from "react";
import {TransactionReportSearchParams} from "../../../models";
import {ReportPage, TransactionReportSearchPanel} from "../../../components";


export const SalesTransactionsReport:FC=()=>{
    const initialState :TransactionReportSearchParams={lang:1};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchSalesTransactionsReport}
                    searchHeader="Search Sales Transactions Report"
                    searchPanel={TransactionReportSearchPanel} />
    );
};