import {
    SearchReturnPurchaseTransactionsReport
} from "../../../serviceBroker/transationReportApiServiceBroker";
import React, {FC} from "react";
import {TransactionReportSearchParams} from "../../../models";
import {ReportPage, TransactionReportSearchPanel} from "../../../components";



export const ReturnPurchaseTransactionsReport:FC=()=>{
    const initialState :TransactionReportSearchParams={lang:1};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReturnPurchaseTransactionsReport}
                    searchHeader="Search Report Employee Sales"
                    searchPanel={TransactionReportSearchPanel} />
    );
};