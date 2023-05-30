import React, {FC} from 'react';
import {ReportTreasurySearchPanel,ReportPage} from "../../../components";
import {TreasuryReportSearchParams} from "../../../models";
import {getUserId} from "../../../utils";
import {SearchReportAllInAndOutMoney} from "../../../serviceBroker/treasuryReportApiServiceBroker";

export const ReportAllInAndOutMoneyPage :FC=()=>{
    const initialState :TreasuryReportSearchParams={lang:1,userId: getUserId()};
    return(
        <ReportPage InitialState={initialState}
                    SearchApi={SearchReportAllInAndOutMoney}
                    searchHeader="Report All In And Out Money"
                    searchPanel={ReportTreasurySearchPanel} />
    );
}