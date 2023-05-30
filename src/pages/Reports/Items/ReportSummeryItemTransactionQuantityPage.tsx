import React, {FC} from 'react';
import {getUserId} from "../../../utils";
import {ReportItemsSearchPanel, ReportPage} from "../../../components";
import {ItemReportSearchParams} from "../../../models";
import {
    SearchReportSummeryItemTransactionQuntity
} from "../../../serviceBroker/itemsReportApiServiceBroker";

export const ReportSummeryItemTransactionQuantityPage:FC=()=>{
    const initialState :ItemReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportSummeryItemTransactionQuntity}
                    searchHeader="Report Summery Item Transaction Quantity"
                    searchPanel={ReportItemsSearchPanel} />
    );
};