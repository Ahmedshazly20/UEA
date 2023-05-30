import AlYusrAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import cache from "memory-cache";
import {
  RuleReceiveMoneyAccountsModel,
  RuleReceiveMoneyAccountsApiResponseModel  ,LookupItem

} from "../models/ruleReceiveMoneyAccounts/ruleReceiveMoneyAccounts";

import {
  ResponseBase

} from "../models";
import { UserResponse } from "../models/user/authenticateUserResponse";
import { getLabelName, getUserId } from "../utils";
import { CoastCenterModel } from "../models/AcTransaction/AcTransaction";
import { LookupTypeEnum } from "../models/enums/enumList";
import { ruleExpenseMoneySearch } from "../models/ruleExpenseMoney/ruleExpenseMoney";
//#region get
export const getLookupByType = async (
  type: LookupTypeEnum,
  isCached: boolean = true,
  addEmptySelect: boolean = false
): Promise<LookupItem[]> => {
  let url: string = "";
  let result: LookupItem[] = [];

  try {
    switch (type) {
      case LookupTypeEnum.ruleExpenseMoney:
        result = await getAllruleExpenseMoney();
        break;
      case LookupTypeEnum.ruleReceiveMony:
        result = await getAllReceiveMoneyAccounts();
        break;
      
    }
  } catch (err) {
    alert(err);
  }
  if (addEmptySelect) {
    //Add Empty Select
    result = [
      {
        nameAr: getLabelName("Select"),
        name: "Select",
        value: null,
      },
      ...result,
    ];
  }
  return result;
};
export const resetLookup = (type: LookupTypeEnum) => {
  const url: string = `GetLookupsByTypeId?lookupTypeId=${Number(
    type
  )}&userId=${getUserId()}&lang=1`;
  cache.del(url);
};
//#endregion
//#region post
export const aveRuleReceiveMoney = async (
  request: RuleReceiveMoneyAccountsModel
): Promise<ResponseBase<RuleReceiveMoneyAccountsModel> | null> => {
  try {
    let url: string = `SaveRuleReceiveMoney`;
    const result: ResponseBase<RuleReceiveMoneyAccountsModel> = await AlYusrAxiosApiInstance.post(
      url,
      request
    );
    // @ts-ignore
    return result;
  } catch (err) {
    alert(err);
  }
  return null;
};

//#endregion
//#region private
const getAllReceiveMoneyAccounts = async (): Promise<LookupItem[]> => {
  let customerAccountsResult: ResponseBase<RuleReceiveMoneyAccountsModel[]> = {};
  let response: LookupItem[] = [];
  const url: string = `GetAllCustomerAccounts`;
  customerAccountsResult = await AlYusrAxiosApiInstance.get(url);
  if (
    customerAccountsResult !== null &&
    customerAccountsResult.Result !== null &&
    customerAccountsResult.Result !== undefined &&
    customerAccountsResult.Result.length !== 0
  ) {
    customerAccountsResult.Result.forEach((row, index) => {
      response.push({
        nameAr: row.ArabicName,
        name: row.EnglishName,
        value: row.ID.toString(),
      });
    });
  }
  return response;
};


const getAllruleExpenseMoney = async (): Promise<LookupItem[]> => {
  let customerAccountsResult: ResponseBase<ruleExpenseMoneySearch[]> = {};
  let response: LookupItem[] = [];
  const url: string = `GetAllCustomerAccounts`;
  customerAccountsResult = await AlYusrAxiosApiInstance.get(url);
  if (
    customerAccountsResult !== null &&
    customerAccountsResult.Result !== null &&
    customerAccountsResult.Result !== undefined &&
    customerAccountsResult.Result.length !== 0
  ) {
    customerAccountsResult.Result.forEach((row, index) => {
      response.push({
        nameAr: row.ArabicName,
        name: row.EnglishName,
        value: row.ID.toString(),
      });
    });
  }
  return response;
};



//#endregion
