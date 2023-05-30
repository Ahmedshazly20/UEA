import {SearchAllSalesAndReturnTransactionsReport} from "../../../serviceBroker/transationReportApiServiceBroker";
import React, {FC} from "react";
import {TransactionReportSearchParams} from "../../../models";
import {TransactionReportSearchPanel, ReportPage} from "../../../components";

export const AllSalesAndReturnTransactionsReport:FC=()=>{
    const initialState :TransactionReportSearchParams={lang:1};
    return(       
            <ReportPage InitialState={initialState} 
                        SearchApi={SearchAllSalesAndReturnTransactionsReport} 
                        searchHeader="All Sales And Return Transactions Report" 
                        searchPanel={TransactionReportSearchPanel} />
    );
};