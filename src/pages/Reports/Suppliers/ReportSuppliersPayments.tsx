import React, {FC} from 'react';
import {SuppliersComplexReportSearchParams} from "../../../models";
import {getUserId} from "../../../utils";
import {SearchReportSuppliersPayments} from "../../../serviceBroker/suppliersReportApiServiceBroker";
import {ReportPage, ReportSuppliersComplexSearchPanel} from "../../../components";

export const ReportSuppliersPayments :FC=()=>{
    const initialState :SuppliersComplexReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportSuppliersPayments}
                    searchHeader="Suppliers Payments"
                    searchPanel={ReportSuppliersComplexSearchPanel} />
    ); 
}