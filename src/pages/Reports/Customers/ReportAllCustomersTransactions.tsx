import React, {FC} from 'react';
import {CustomerComplexReportSearchParams} from "../../../models";
import {
    ReportCustomersComplexSearchPanel,
    ReportPage
} from "../../../components";
import {SearchAllSalesAndReturnTransactionsReport} from "../../../serviceBroker/transationReportApiServiceBroker";
import {getUserId} from "../../../utils";

export const ReportAllCustomersTransactions :FC=()=>{
    const initialState :CustomerComplexReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchAllSalesAndReturnTransactionsReport}
                    searchHeader="Report All Customers Transactions"
                    searchPanel={ReportCustomersComplexSearchPanel} />
    );
}