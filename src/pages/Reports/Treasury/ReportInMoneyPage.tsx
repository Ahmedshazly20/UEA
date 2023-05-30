import React, {FC} from 'react';
import {ReportTreasurySearchPanel,ReportPage} from "../../../components";
import {TreasuryReportSearchParams} from "../../../models";
import {getUserId} from "../../../utils";
import {SearchReportInMoney} from "../../../serviceBroker/treasuryReportApiServiceBroker";

export const ReportInMoneyPage :FC=()=>{
    const initialState :TreasuryReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportInMoney}
                    searchHeader="Report In Money"
                    searchPanel={ReportTreasurySearchPanel} />
    );
}