import AlYusrAxiosApiInstance, {AxiosSearchParams} from "../axios/alYusrAxiosApiInstance";

import { ResponseBase} from "../models";
import {SearchruleExpenseMoneyRequest,ruleExpenseMoneySearch, ruleExpenseMoneyApiResponseModel} from "../models/ruleExpenseMoney/ruleExpenseMoney";


export const SearchRuleExpenseMoneyAccounts = async (request?: SearchruleExpenseMoneyRequest): Promise<ResponseBase<SearchruleExpenseMoneyRequest[]>> =>
{ 
    // if (request)
    return await AlYusrAxiosApiInstance.get('SearchRuleExpenseMoneyAccounts', {params: AxiosSearchParams(request,'searchItem')});
    //return await AlYusrAxiosApiInstance.get('SearchRuleExpenseMoneyAccounts');

    console.log("request",request)

};

export const SaveRuleExpenseMoney = async (request: ruleExpenseMoneySearch): Promise<ResponseBase<ruleExpenseMoneySearch>> => {
    const url: string = `SaveRuleExpenseMoney`;
    return await AlYusrAxiosApiInstance.post(url, request)
}

export const SaveRuleReceiveMoney = async (request: ruleExpenseMoneySearch): Promise<ResponseBase<ruleExpenseMoneySearch>> => {
    const url: string = `SaveRuleReceiveMoney`;
    return await AlYusrAxiosApiInstance.post(url, request)
}

export const SelectAcTransaction = async (id: number): Promise<ResponseBase<ruleExpenseMoneyApiResponseModel>> => {
    const url: string = `GetAccountInfoById?accountId=${id}`;
    return await AlYusrAxiosApiInstance.get(url);
}
export const SearchRuleReceiveMoneyAccounts = async (request?: SearchruleExpenseMoneyRequest): Promise<ResponseBase<SearchruleExpenseMoneyRequest[]>> =>
{ 
    // if (request)
    return await AlYusrAxiosApiInstance.get('SearchRuleReceiveMoneyAccounts', {params: AxiosSearchParams(request,'searchItem')});
    //return await AlYusrAxiosApiInstance.get('SearchRuleExpenseMoneyAccounts');

};