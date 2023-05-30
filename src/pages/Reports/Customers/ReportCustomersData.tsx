import React, {FC} from 'react';
import { CustomersSimpleReportSearchParams} from "../../../models";
import {
    ReportCustomersSimpleSearchPanel,
    ReportPage
} from "../../../components";
import {
    SearchReportCustomersData
} from "../../../serviceBroker/customersReportApiServiceBroker";
import {getUserId} from "../../../utils";

export const ReportCustomersData :FC=()=>{
    const initialState :CustomersSimpleReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportCustomersData}
                    searchHeader="Reports Customers Data"
                    searchPanel={ReportCustomersSimpleSearchPanel} />
    );
    
   
}