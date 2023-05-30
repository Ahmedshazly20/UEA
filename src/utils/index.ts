export {
  CookieSet,
  CookieEncryptedSet,
  CookieGet,
  CookieEncryptedGet,
} from "./cookies/cookiesManager";

export {
  getLanguageCode,
  getLanguageKey,
  GetLanguagesTitle,
  isArabicCurrentLanguage,
} from "./localization/localizationManager";

export {
  getLabelName,
  generateGuid,
  formatDate,
  scrollToTop,
  getLookUpItemValue,
} from "./common/commonManager";

export {
  isUserAuthenticated,
  getUserId,
  getUserName,
  getPagePrivileges,
  getUserStationId,
  getUser,
  getUserToken,
} from "./secure/secureManager";

export {
  LocalStorageSet,
  LocalStorageGet,
  LocalStorageRemove,
  SecureLocalStorageSet,
  SecureLocalStorageGet,
  SecureLocalStorageRemove,
  SecureLocalStorageClear,
} from "./localStorage/localStorageManager";

export {
  // SetAppConfiguration,
  GetAppConfig,
} from "./configuration/configurationManager";
