import {FC} from "react";
import {ReportVatSearchParams} from "../../../models";
import {ReportPage, ReportVatSearchPanel} from "../../../components";
import {SearchReportVat} from "../../../serviceBroker/transationReportApiServiceBroker";


export const ReportVatPage:FC=()=> {
    const initialState :ReportVatSearchParams={};
    return(
        <ReportPage InitialState={initialState} SearchApi={SearchReportVat} searchHeader="Search Report Vat" searchPanel={ReportVatSearchPanel}/>
    )
}