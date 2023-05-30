import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { SystemConfiguration } from "../../configuration/config";

const CookieSet = (
  name: string,
  value: string,
  expiryMinutes: number = Number(SystemConfiguration.cookie.expiryMinutes) ||
    240
) => {
  Cookies.set(name, value, {
    expires: new Date(new Date().getTime() + expiryMinutes * 60 * 1000),
  });
};
const CookieEncryptedSet = (
  name: string,
  value: string,
  expiryMinutes: number = Number(SystemConfiguration.cookie.expiryMinutes) ||
    240,
  encryptKey: string = SystemConfiguration.cookie.encryptKey.toString()
) => {
  Cookies.set(name, CryptoJS.AES.encrypt(value, encryptKey).toString(), {
    expires: new Date(new Date().getTime() + expiryMinutes * 60 * 1000),
  });
};
const CookieGet = (name: string): string | undefined => {
  return Cookies.get(name);
};
const CookieEncryptedGet = (
  name: string,
  encryptKey: string = SystemConfiguration.cookie.encryptKey.toString()
): string | undefined => {
  const cookieValue: string | undefined = Cookies.get(name);
  return cookieValue !== undefined && cookieValue !== null
    ? CryptoJS.AES.decrypt(cookieValue.toString(), encryptKey).toString(
        CryptoJS.enc.Utf8
      )
    : undefined;
};
const ClearCookie = (name: string, domainName?: string | null) => {
  const domain = domainName != null ? `domain=${domainName};` : "";
  document.cookie =
    name + `=; Path=/; ${domain} Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};
const ClearAllCookies = () => {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};
export {
  CookieSet,
  CookieEncryptedSet,
  CookieGet,
  CookieEncryptedGet,
  ClearAllCookies,
  ClearCookie,
};
