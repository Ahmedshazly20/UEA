import React, { FC, useState } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MenuItem, MenuList } from "../..";
import { SystemConfiguration } from "../../../configuration/config";
import { MenuModel } from "../../../models/menu/menu";
import { logoutUser } from "../../../slice/userAuthincateSlice";
import {
  CookieSet,
  getUserName,
  isArabicCurrentLanguage,
  isUserAuthenticated,
  SecureLocalStorageGet,
} from "../../../utils";
import logo from "../../../assets/images/logo-sidebar.svg";
import logomini from "../../../assets/images/logo-mini.svg";

export const LayoutHeader: FC<any> = () => {
  //#region variables
  const isArabic: boolean = isArabicCurrentLanguage();
  let menuItems: MenuModel[] = JSON.parse(
    // @ts-ignorey
    SecureLocalStorageGet(SystemConfiguration.keys.menu || "")
  ) as MenuModel[];
  //#endregion
  //#region state
  const [isOpen, setIsOpne] = useState(false);
  const { t } = useTranslation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  //console.log("menuItems", menuItems);
  //#endregion
  return (
    <>
      {isUserAuthenticated() && (
        <>
          <div className="main-sidebar">
            {/* <Navbar.Brand href="/">{t("Alyuser.Application")}</Navbar.Brand> */}
            <nav className="sidebar sidebar-offcanvas">
              <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
                <a className="navbar-brand brand-logo" href="index.html">
                  <img src={logo} alt="logo" />
                </a>
                <a className="navbar-brand brand-logo-mini" href="index.html">
                  <img src={logomini} alt="logo" />
                </a>
              </div>
              <ul className="nav">
                {isUserAuthenticated() &&
                  menuItems !== null &&
                  menuItems !== undefined &&
                  menuItems.length !== 0 &&
                  isOpen === false &&
                  menuItems.length !== 0 && (
                    <MenuList request={menuItems} isArabic={isArabic} />
                  )}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
};
