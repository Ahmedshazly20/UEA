import React, {FC} from 'react';
import {getUserId} from "../../../utils";
import {
    ReportItemsSearchPanel,
    ReportPage
} from "../../../components";
import {ItemReportSearchParams} from "../../../models";
import {SearchReportFolowItemBalance} from "../../../serviceBroker/itemsReportApiServiceBroker";


export const ReportFollowItemBalancePage:FC=()=>{
    const initialState :ItemReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportFolowItemBalance}
                    searchHeader="Report Flow Item Balance Page"
                    searchPanel={ReportItemsSearchPanel} />
    );
};

