import AlYusrAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import { ResponseBase } from "../models/base/responseBase";
import _ from "lodash";
import { CompanySetting } from "../models/company/companySetting";
import { ElectronicBillSettingModel, ElectronicBillSettingResponse, LoyaltySettingModel } from "../models";
export const getCompanySetting = async (): Promise<CompanySetting | null> => {
  try {
    let url: string = `GetCompanySettings`;
    const result: ResponseBase<CompanySetting> =
      await AlYusrAxiosApiInstance.get(url);
    // @ts-ignore
    return result !== null && result !== undefined ? result.Result : null;
  } catch (err) {
    alert(err);
  }
  return null;
};
export const SaveCompanySetting = async (
  request: CompanySetting
): Promise<ResponseBase<CompanySetting> | null> => {
  try {
    let url: string = `SaveCompanySetting`;
    const result: ResponseBase<CompanySetting> =
      await AlYusrAxiosApiInstance.post(url, request);
    // @ts-ignore
    return result;
  } catch (err) {
    alert(err);
  }
  return null;
};
export const getActiveVouchersSettings = async (): Promise<LoyaltySettingModel | null> => {
  try {
    let url: string = `GetActiveVouchersSettings`;
    const result: ResponseBase<LoyaltySettingModel> =
      await AlYusrAxiosApiInstance.get(url);
    // @ts-ignore
    return result !== null && result !== undefined ? result.Result : null;
  } catch (err) {
    alert(err);
  }
  return null;
};
export const saveVoucherSettings = async (
  request: LoyaltySettingModel
): Promise<ResponseBase<LoyaltySettingModel> | null> => {
  try {
    let url: string = `SaveVoucherSettings`;
    const result: ResponseBase<CompanySetting> =
      await AlYusrAxiosApiInstance.post(url, request);
    // @ts-ignore
    return result;
  } catch (err) {
    alert(err);
  }
  return null;
};
export const getEgypteInvoiceSettings = async (): Promise<ElectronicBillSettingModel | null> => {
  try {
    let url: string = `GetEgypteInvoiceSettings?companyId=2`;
    const result: ResponseBase<ElectronicBillSettingResponse> =
      await AlYusrAxiosApiInstance.get(url);
    // @ts-ignore
    return result !== null && result !== undefined ? result.Result : null;
  } catch (err) {
    alert(err);
  }
  return null;
};
export const saveEgypteInvoiceSettings = async (
  request: ElectronicBillSettingModel
): Promise<ResponseBase<ElectronicBillSettingModel> | null> => {
  try {
    let url: string = `SaveEgypteInvoiceSettings`;
    const result: ResponseBase<ElectronicBillSettingResponse> =
      await AlYusrAxiosApiInstance.post(url, request);
    // @ts-ignore
    return result;
  } catch (err) {
    alert(err);
  }
  return null;
};