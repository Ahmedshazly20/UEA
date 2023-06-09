﻿import Cookies from "js-cookie";
import { SystemConfiguration } from "../../configuration/config";
import { LanguageList } from "../../resources/index";
import { CookieGet } from "../cookies/cookiesManager";
export const getLanguageCode = (key: string): string => {
  return LanguageList.filter(
    (p) => p.key.toLowerCase() === key.toLowerCase()
  )[0].code;
};
export const getLanguageKey = (code: string): string => {
  return LanguageList.filter(
    (p) => p.code.toLowerCase() === code.toLowerCase()
  )[0].key;
};
export const GetLanguagesTitle = (key: string): any => {
  return LanguageList.filter((p) => p.key === key.toLowerCase())[0];
};
export const isArabicCurrentLanguage = (): boolean => {
  // @ts-ignore
  return CookieGet(SystemConfiguration.keys.culture || "") === "ar-AE"
    ? true
    : false;
};
