import React, {FC} from 'react';
import {ReportItemsSearchPanel, ReportPage} from "../../../components";
import {getUserId} from "../../../utils";
import {ItemReportSearchParams} from "../../../models";
import {SearchReportItemData} from "../../../serviceBroker/itemsReportApiServiceBroker";


export const ReportItemDataPage: FC = () => {
    const initialState :ItemReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportItemData}
                    searchHeader="Report Item Data Page"
                    searchPanel={ReportItemsSearchPanel} />
    );
};