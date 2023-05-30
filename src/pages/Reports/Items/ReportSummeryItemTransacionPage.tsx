import React, {FC} from 'react';
import {getUserId} from "../../../utils";
import {ReportItemsSearchPanel, ReportPage} from "../../../components";
import {ItemReportSearchParams} from "../../../models";
import {
    SearchReportSummeryItemTransacion
} from "../../../serviceBroker/itemsReportApiServiceBroker";


export const ReportSummeryItemTransactionPage:FC=()=>{
    const initialState :ItemReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportSummeryItemTransacion}
                    searchHeader="Report Summery Item Transaction"
                    searchPanel={ReportItemsSearchPanel} />
    );
};