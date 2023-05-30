import Cookies from "js-cookie";
import { isArabicCurrentLanguage, SecureLocalStorageGet } from "..";
import { SystemConfiguration } from "../../configuration/config";
import { PrivilegeModel, UserResponse } from "../../models";

export const isUserAuthenticated = (): boolean => {
  //return Cookies.get(SystemConfiguration.keys.token || "") ? true : false;
  return SecureLocalStorageGet(SystemConfiguration.keys.token) ? true : false;
};
export const getUserId = (): number => {
  const result: UserResponse = JSON.parse(
    // @ts-ignore
    SecureLocalStorageGet(SystemConfiguration.keys.user || "")
  ) as UserResponse;
  return result !== null && result !== undefined ? result.UserID : 0;
};
export const getUserStationId = (): number => {
  const result: UserResponse = JSON.parse(
    // @ts-ignore
    SecureLocalStorageGet(SystemConfiguration.keys.user || "")
  ) as UserResponse;
  return result !== null &&
    result !== undefined &&
    result.PosUserSetting !== null &&
    result.PosUserSetting !== undefined
    ? result.PosUserSetting.Station_ID
    : 0;
};
export const getUserName = (): string => {
  const result: UserResponse = JSON.parse(
    // @ts-ignore
    SecureLocalStorageGet(SystemConfiguration.keys.user || "")
  ) as UserResponse;
  return result !== null && result !== undefined
    ? isArabicCurrentLanguage()
      ? result.Name
      : result.Name_En
    : ".";
};
export const getUser = (): UserResponse | null => {
  const result: UserResponse = JSON.parse(
    // @ts-ignore
    SecureLocalStorageGet(SystemConfiguration.keys.user)
  ) as UserResponse;
  return result !== null && result !== undefined ? result : null;
};
export const getPagePrivileges = (): PrivilegeModel => {
  const pageName = window.location.pathname.toLowerCase();
  const pagePrivilege: PrivilegeModel = JSON.parse(
    // @ts-ignore
    SecureLocalStorageGet(SystemConfiguration.keys.privileges || "")
  ).filter((p: any) => p.url === pageName)[0];
  return (
    pagePrivilege || {
      id: 0,
      view: false,
      save: false,
      update: false,
      delete: false,
      search: false,
      url: "........",
    }
  );
};
export const getUserToken = (): string | null => {
  const token = SecureLocalStorageGet(SystemConfiguration.keys.token);
  return token !== null ? token.toString() : null;
};
