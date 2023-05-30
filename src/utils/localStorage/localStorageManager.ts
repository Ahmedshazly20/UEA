import secureLocalStorage from "react-secure-storage";
import { SystemConfiguration } from "../../configuration/config";
const LocalStorageSet = (name: string, value: string) => {
  localStorage.setItem(name, value);
};

const SecureLocalStorageSet = (name: string, value: string) => {
  secureLocalStorage.setItem(name, value);
};

const LocalStorageGet = (name: string): string | null => {
  return localStorage.getItem(name);
};

const SecureLocalStorageGet = (
  name: string
): string | object | number | boolean | null => {
  return secureLocalStorage.getItem(name);
};

const LocalStorageRemove = (name: string) => {
  localStorage.removeItem(name);
};

const SecureLocalStorageRemove = (name: string) => {
  secureLocalStorage.removeItem(name);
  //secureLocalStorage.clear();
};
const SecureLocalStorageClear = () => {
  // secureLocalStorage.removeItem(SystemConfiguration.keys.user);
  // secureLocalStorage.removeItem(SystemConfiguration.keys.token);
  // secureLocalStorage.removeItem(SystemConfiguration.keys.dictionary);
  // secureLocalStorage.removeItem(SystemConfiguration.keys.privileges);
  // secureLocalStorage.removeItem(SystemConfiguration.keys.menu);
  // secureLocalStorage.removeItem(SystemConfiguration.keys.menuItemName);
  // secureLocalStorage.removeItem(SystemConfiguration.keys.appConfig);
  //
  secureLocalStorage.clear();
  secureLocalStorage.setItem(SystemConfiguration.keys.homePageReloaded, "0");
};
export {
  LocalStorageSet,
  LocalStorageGet,
  LocalStorageRemove,
  SecureLocalStorageSet,
  SecureLocalStorageGet,
  SecureLocalStorageRemove,
  SecureLocalStorageClear,
};
