import {
    SearchPurchaseTransactionsReport
} from "../../../serviceBroker/transationReportApiServiceBroker";
import React, {FC} from "react";
import {TransactionReportSearchParams} from "../../../models";
import { ReportPage, TransactionReportSearchPanel} from "../../../components";


export const PurchaseTransactionsReport:FC=()=>{
    const initialState :TransactionReportSearchParams={lang:1};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchPurchaseTransactionsReport}
                    searchHeader="Search Purchase Transactions Report"
                    searchPanel={TransactionReportSearchPanel} />
    );
};