import React, {FC} from 'react';
import {CustomerComplexReportSearchParams} from "../../../models";
import {getUserId} from "../../../utils";
import {ReportCustomersComplexSearchPanel, ReportPage} from "../../../components";
import {SearchReportCustomerPayments} from "../../../serviceBroker/customersReportApiServiceBroker";

export const ReportsCustomersPayments :FC=()=>{
    const initialState :CustomerComplexReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportCustomerPayments}
                    searchHeader="Reports Customers Payments"
                    searchPanel={ReportCustomersComplexSearchPanel} />
    );
    
    
    
}