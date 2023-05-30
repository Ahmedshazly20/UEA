import { FC, ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LayoutHeader } from "../../header/layoutHeader";
import { LayoutFooter } from "../../footer/layoutFooter";
import useCulture from "../../../../hooks/useCulture";
import {
  CookieGet,
  getUserName,
  isArabicCurrentLanguage,
  isUserAuthenticated,
  SecureLocalStorageGet,
} from "../../../../utils";
import Cookies from "js-cookie";
import { SystemConfiguration } from "../../../../configuration/config";
import { MenuItemName, MenuModel } from "../../../../models";
import { LangSwitcherReactI18 } from "../../../languageSwitcher/react-i18/langSwitcher";
import face1 from "../../../../assets/images/faces/face1.jpg";
import { Button } from "react-bootstrap";
import { logoutUser } from "../../../../slice/userAuthincateSlice";

export const DefaultLayout: FC<{ children?: ReactNode | undefined }> = ({
  children,
}) => {
  //#region state
  const { changeCulture } = useCulture("");
  //#endregion
  //#region variables
  //@ts-ignore
  const uiLanguage: string =
    SystemConfiguration.keys.culture !== null &&
    SystemConfiguration.keys.culture !== undefined
      ? SystemConfiguration.keys.culture
      : "";
  //@ts-ignore
  const language: string = Cookies.get(uiLanguage)
    ? CookieGet(uiLanguage)
    : SystemConfiguration.keys.defaultUiLanguage;
  //#endregion
  //#region use-Effect
  useEffect(() => {
    //@ts-ignore
    changeCulture(language);
  }, [language]);
  //#endregion
  //#region private functions
  const getPageName = (): string => {
    let pageName: string = "";
    const menuItems: MenuItemName[] = JSON.parse(
      // @ts-ignorey
      SecureLocalStorageGet(SystemConfiguration.keys.menuItemName || "")
    ) as MenuItemName[];
    if (
      menuItems !== null &&
      menuItems !== undefined &&
      menuItems.length !== 0
    ) {
      const page = menuItems.filter(
        (p) => p.url === window.location.pathname.toLowerCase()
      )[0];
      pageName =
        page !== null && page !== undefined
          ? isArabicCurrentLanguage()
            ? page.nameAr
            : page.name
          : "";
    }
    return pageName;
  };
  const { t } = useTranslation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)
useEffect(() => {
  document.body.classList.toggle('sidebar-close', isOpen);
},[isOpen])
  //#endregion
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        {<LayoutHeader />}
        <div className="main-panel">
          {isUserAuthenticated() && (
            <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 d-flex flex-row">
              <div className="navbar-menu-wrapper d-flex align-items-stretch">
                <button
                  className="navbar-toggler navbar-toggler-right align-self-center"
                  type="button"
                  data-toggle="minimize"
                  onClick={()=> setIsOpen(!isOpen)}
                >
                  <span className="mdi mdi-menu"></span>
                </button>
                <ul className="navbar-nav navbar-nav-right">
                  <li className="nav-item nav-profile dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="profileDropdown"
                      href="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="nav-profile-img">
                        <img src={face1} alt="image" />
                        <span className="availability-status online"></span>
                      </div>
                      <div className="nav-profile-text">
                        <p className="mb-1 text-black">{getUserName()}</p>
                      </div>
                    </a>
                    <div
                      className="dropdown-menu navbar-dropdown"
                      aria-labelledby="profileDropdown"
                    >
                      {/* {isUserAuthenticated() && ( */}
                      <>
                        <Button
                          variant=""
                          className="dropdown-item"
                          onClick={async () => {
                            dispatch(
                              // @ts-ignore
                              logoutUser()
                            );
                            navigate(
                              "/logoutRedirect?iOZQilU=LyKiRiQEPDibKuuGECyJ"
                            );
                          }}
                        >
                          <i className="mdi mdi-logout me-2 text-primary"></i>
                          {t("logout.button")}
                        </Button>
                      </>
                      {/* )} */}
                    </div>
                  </li>
                  <li>
                    <LangSwitcherReactI18 />
                  </li>
                </ul>
                {/*<button
                  className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                  type="button"
                  data-toggle="offcanvas"
                >
                  <span className="mdi mdi-menu"></span>
                </button>
                 <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
              </div>
            </nav>
          )}
          <div className="content-wrapper">
            {/* {<label>{getPageName()}</label>} */}
            {children}
          </div>
          {<LayoutFooter />}
        </div>
      </div>
    </div>
  );
};
