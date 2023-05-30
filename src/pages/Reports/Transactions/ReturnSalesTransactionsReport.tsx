import React, {FC} from "react";
import {
    SearchReturnSalesTransactionsReport
} from "../../../serviceBroker/transationReportApiServiceBroker";
import {TransactionReportSearchParams} from "../../../models";
import {ReportPage, TransactionReportSearchPanel} from "../../../components";

export const ReturnSalesTransactionsReport:FC=()=>{
    const initialState :TransactionReportSearchParams={lang:1};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReturnSalesTransactionsReport}
                    searchHeader="Search Return Sales Transactions Report"
                    searchPanel={TransactionReportSearchPanel} />
    );
};