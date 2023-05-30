import React, {FC} from 'react';
import {ReportTreasurySearchPanel,ReportPage} from "../../../components";
import {TreasuryReportSearchParams} from "../../../models";
import {getUserId} from "../../../utils";
import {SearchReportInAndOutMoney} from "../../../serviceBroker/treasuryReportApiServiceBroker";

export const ReportInAndOutMoneyPage :FC=()=>{
    const initialState :TreasuryReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportInAndOutMoney}
                    searchHeader="Report In And Out Money"
                    searchPanel={ReportTreasurySearchPanel} />
    );
}