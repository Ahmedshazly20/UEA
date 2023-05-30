import {SearchReportEmployeeSales} from "../../../serviceBroker/transationReportApiServiceBroker";
import React, {FC} from "react";
import {TransactionReportSearchParams} from "../../../models";
import {ReportPage, TransactionReportSearchPanel} from "../../../components";


export const ReportEmployeeSales:FC=()=>{
    const initialState :TransactionReportSearchParams={lang:1};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportEmployeeSales}
                    searchHeader="Search Report Employee Sales"
                    searchPanel={TransactionReportSearchPanel} />
    );
};