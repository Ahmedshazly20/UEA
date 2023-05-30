import React, {FC} from 'react';
import {ReportTreasurySearchPanel,ReportPage} from "../../../components";
import {TreasuryReportSearchParams} from "../../../models";
import {getUserId} from "../../../utils";
import {SearchReportOutMoney} from "../../../serviceBroker/treasuryReportApiServiceBroker";

export const ReportOutMoneyPage :FC=()=>{
    const initialState :TreasuryReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportOutMoney}
                    searchHeader="Report Out Money"
                    searchPanel={ReportTreasurySearchPanel} />
    );
}