import React, {FC} from 'react';
import {SuppliersComplexReportSearchParams} from "../../../models";
import {getUserId} from "../../../utils";
import {SearchReportSuppliersAccount} from "../../../serviceBroker/suppliersReportApiServiceBroker";
import {ReportPage, ReportSuppliersComplexSearchPanel} from "../../../components";

export const ReportSuppliersAccount :FC=()=>{
    const initialState :SuppliersComplexReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportSuppliersAccount}
                    searchHeader="Suppliers Accounts"
                    searchPanel={ReportSuppliersComplexSearchPanel} />
    );
}