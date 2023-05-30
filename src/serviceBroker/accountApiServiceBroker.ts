import AlYusrAxiosApiInstance from "../axios/alYusrAxiosApiInstance";
import { ResponseBase } from "../models";

export const GetCurrentAccountBalance = async (
  accountId: number,
  currencyId?:number|null
): Promise<number> => {
  try {
    if (accountId != 0) {
      let url: string = `GetCurrenctAccountBalance?accountId=${accountId}`;
      url=currencyId!==null &&currencyId!==undefined&&currencyId!==0?`${url}&scurrencyid=${currencyId}`:url;
      const result: ResponseBase<number> = await AlYusrAxiosApiInstance.get(
        url
      );
      // @ts-ignore
      return result !== null && result !== undefined ? result.Result : 0;
    }
  } catch (err) {
    alert(err);
  }
  return 0;
};
