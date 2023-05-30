import { SystemConfiguration } from "../../configuration/config";
import { DictionaryModel } from "../../models/dictionary/dictionary";
import { isArabicCurrentLanguage } from "../localization/localizationManager";
import {
  SecureLocalStorageGet,
  SecureLocalStorageSet,
} from "../localStorage/localStorageManager";
import { v4 as uuidv4 } from "uuid";
import { saveNotExistTranslation } from "../../serviceBroker/dictionaryModelApiServiceBroker";
import dateFormat from "dateformat";
import { LookupItem } from "../../models";
export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
export const generateGuid = (): string => {
  return uuidv4();
};
export const getLabelName = (value: string): string => {
  try {
    let dictionariesList: DictionaryModel[] = JSON.parse(
      // @ts-ignore
      SecureLocalStorageGet(SystemConfiguration.keys.dictionary)
    ); //.filter((p: any) => p.Name === value)[0];
    const record = dictionariesList.filter((p: any) => p.Name === value)[0];
    if (record !== null && record !== undefined) {
      return isArabicCurrentLanguage() ? record.NameAr : record.NameEn;
    } else {
      // saveNotExistTranslation(value, 3).then((result) => {
      //   if (result !== null) {
      //     dictionariesList.push(result);
      //     SecureLocalStorageSet(
      //       SystemConfiguration.keys.dictionary,
      //       JSON.stringify(dictionariesList)
      //     );
      //   }
      // });
    }
    // return data !== null && data !== undefined
    //   ? isArabicCurrentLanguage()
    //     ? data.NameAr
    //     : data.NameEn
    //   : value;
  } catch {}
  return value;
};
export const formatDate = (
  value: string | Date | null | undefined,
  formatter?: string | null
): string => {
  formatter =
    formatter === null || formatter === undefined || formatter === ""
      ? "dd/mm/yyyy"
      : formatter;
  return value === null || value === undefined || value === ""
    ? ""
    : dateFormat(value, formatter);
};
export const scrollToTop = (ref: React.MutableRefObject<HTMLInputElement>) => {
  ref.current?.scrollIntoView({
    behavior: "auto",
    block: "start",
    inline: "start",
  });
  window.scrollTo(0, 0);
};
export const getLookUpItemValue = (
  request?: LookupItem | null
): string | null => {
  return request != null &&
    request !== undefined &&
    request.value !== null &&
    request.value !== undefined
    ? request.value
    : null;
};
