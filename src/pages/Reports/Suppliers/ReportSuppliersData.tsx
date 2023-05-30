import React, {FC} from 'react';
import {SuppliersSimpleReportSearchParams} from "../../../models";
import {getUserId} from "../../../utils";
import {ReportPage, ReportSuppliersSimpleSearchPanel} from "../../../components";
import {SearchReportSuppliersData} from "../../../serviceBroker/suppliersReportApiServiceBroker";

export const ReportSuppliersData :FC=()=>{
    const initialState :SuppliersSimpleReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportSuppliersData}
                    searchHeader="Reports Suppliers Data"
                    searchPanel={ReportSuppliersSimpleSearchPanel} />
    );
}