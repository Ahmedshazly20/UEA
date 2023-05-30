import React, {FC} from 'react';
import {SuppliersComplexReportSearchParams} from "../../../models";
import {getUserId} from "../../../utils";
import {ReportPage,ReportSuppliersComplexSearchPanel} from "../../../components";
import {SearchReportAllSuppliersTransaction} from "../../../serviceBroker/suppliersReportApiServiceBroker";

export const ReportAllSuppliersTransactions :FC=()=>{
    const initialState :SuppliersComplexReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportAllSuppliersTransaction}
                    searchHeader="Report All Suppliers Transactions"
                    searchPanel={ReportSuppliersComplexSearchPanel} />
    );
    
    
}