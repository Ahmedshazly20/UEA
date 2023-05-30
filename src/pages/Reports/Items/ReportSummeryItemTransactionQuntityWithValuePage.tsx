import React, {FC} from 'react';
import {getUserId} from "../../../utils";
import {ReportItemsSearchPanel, ReportPage} from "../../../components";
import {ItemReportSearchParams} from "../../../models";
import {
    SearchReportSummeryItemTransactionQuntityWithValue
} from "../../../serviceBroker/itemsReportApiServiceBroker";

export const ReportSummeryItemTransactionQuantityWithValuePage:FC=()=>{
    const initialState :ItemReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportSummeryItemTransactionQuntityWithValue}
                    searchHeader="Report Summery Item Transaction Quantity With Value"
                    searchPanel={ReportItemsSearchPanel} />
    );
};