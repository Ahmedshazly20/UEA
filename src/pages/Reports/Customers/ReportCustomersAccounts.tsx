import React, {FC} from 'react';
import {ReportCustomersComplexSearchPanel, ReportPage} from "../../../components";
import {CustomerComplexReportSearchParams} from "../../../models";
import {SearchReportCustomersAccount} from "../../../serviceBroker/customersReportApiServiceBroker";
import {getUserId} from "../../../utils";

export const ReportsCustomersAccounts :FC=()=>{
    const initialState :CustomerComplexReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportCustomersAccount}
                    searchHeader="Reports Customers Accounts"
                    searchPanel={ReportCustomersComplexSearchPanel} />
    );
}