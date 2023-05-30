import {
    SearchReportCashier
} from "../../../serviceBroker/transationReportApiServiceBroker";
import React, {FC, useState} from "react";
import {TransactionReportSearchParams} from "../../../models";
import { ReportPage, TransactionReportSearchPanel} from "../../../components";


export const ReportCashier:FC=()=>{
    const initialState :TransactionReportSearchParams={lang:1};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportCashier}
                    searchHeader="Search Report Cashier"
                    searchPanel={TransactionReportSearchPanel} />
    );
   
};