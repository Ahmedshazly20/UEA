import React, {FC} from 'react';
import {getUserId} from "../../../utils";
import {ReportItemsSearchPanel, ReportPage} from "../../../components";
import {ItemReportSearchParams} from "../../../models";
import {
    SearchReportItemsDiffrentinCost
} from "../../../serviceBroker/itemsReportApiServiceBroker";

export const ReportItemsDifferenceInCostPage:FC=()=>{
    const initialState :ItemReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportItemsDiffrentinCost}
                    searchHeader="Report Items difference in Cost"
                    searchPanel={ReportItemsSearchPanel} />
    );
};