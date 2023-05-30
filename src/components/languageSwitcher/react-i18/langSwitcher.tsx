import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";
import { CookieGet, CookieSet } from "../../../utils";
import { SystemConfiguration } from "../../../configuration/config";

const languageLocalStorageName = SystemConfiguration.keys.culture;
const defaultUiLanguage = SystemConfiguration.keys.defaultUiLanguage;
const getDefaultlanguage = (): string => {
  // @ts-ignore
  //const localeValueFomStorage = LocalStorageGet(languageLocalStorageName);
  const localeValueFomStorage = CookieGet(languageLocalStorageName);
  if (
    localeValueFomStorage === null ||
    localeValueFomStorage === undefined ||
    localeValueFomStorage === ""
  ) {
    // @ts-ignore
    //LocalStorageSet(languageLocalStorageName, defaultUiLanguage);
    CookieSet(languageLocalStorageName, defaultUiLanguage);
    // @ts-ignore
    return defaultUiLanguage;
  }
  return localeValueFomStorage;
};
const LangSwitcherReactI18: FC<{}> = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(getDefaultlanguage);
  const handleLanguageSelect = (e: any) => {
    console.log("test_1", e.target.value);
    i18n.changeLanguage(e.target.value);
    setLanguage(e.target.value);
    CookieSet(languageLocalStorageName || "", e.target.value);
  };
  return (
    <>
      <div className="language-switch">
        {language !== "ar-AE" && (
          <button
            className="btn btn-gradient-primary btn-ar"
            type="button"
            value="ar-AE"
            onClick={handleLanguageSelect}
          >
            العربية
          </button>
        )}
        {language === "ar-AE" && (
          <button
            className="btn btn-gradient-primary btn-en"
            type="button"
            value="en-US"
            onClick={handleLanguageSelect}
          >
            English
          </button>
        )}
        {/* <select
          value={language}
          onChange={handleLanguageSelect}
          // defaultValue={language}
          className="form-select form-select-sm"
        >
          <option value="ar-AE">Ar</option>
          <option value="en-US">EN</option>
        </select>  */}
      </div>
    </>
  );
};

export { LangSwitcherReactI18, getDefaultlanguage };
