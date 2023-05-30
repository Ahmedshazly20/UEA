import { createSlice } from "@reduxjs/toolkit";
import { AuthenticateUserResponse } from "../models/user/authenticateUserResponse";
import { LayoutEnum } from "../models/enums/enumList";
import { AuthenticateUserRequest } from "../models/user/authenticateUserRequest";
import { ClearCookie, CookieSet } from "../utils/cookies/cookiesManager";
import {
  AuthenticateUser,
  getUserMenu,
  getUserPriviles,
} from "../serviceBroker/userApiServiceBroker";
import { getAllDictionaries } from "../serviceBroker/dictionaryModelApiServiceBroker";
import { SecureLocalStorageClear, SecureLocalStorageSet } from "../utils";
import { SystemConfiguration } from "../configuration/config";
import { MenuItemName, MenuModel } from "../models";
import secureLocalStorage from "react-secure-storage";
const initialState: AuthenticateUserResponse = {
  Result: null,
  userToken: null,
  isLoading: false,
  isAuthenticated: false,
  Errors: [],
};

const slice = createSlice({
  name: "UserAuthenticate",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      // alert('state ' +JSON.stringify(state));
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    setAuthenticateSuccess: (state, action) => {
      const { response, token, remember } = action.payload;
      generateUserDefaultLayoutStorage(response).then((r) => {
        console.log(r);
      });
      if (remember === true) {
        SecureLocalStorageSet(SystemConfiguration.keys.token, token);
        SecureLocalStorageSet(
          SystemConfiguration.keys.user,
          JSON.stringify(response)
        );
      }
      return {
        ...state,
        Result: response, //action.payload,
        userToken: token,
        isLoading: false,
        isAuthenticated: true,
        Errors: [],
      };
    },
    setIntegrationAuthenticateSuccess: (state, action) => {
      const { token } = action.payload;
      // @ts-ignore
      //LocalStorageSet(process.env.REACT_APP_authenticatedTokenStorageKey, token);
      CookieSet(SystemConfiguration.keys.token, token);
      return {
        ...state,
        Result: null, //action.payload,
        userToken: token,
        isLoading: false,
        isAuthenticated: true,
        errors: [],
      };
    },
    setAuthenticateFailed: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        Errors: action.payload,
      };
    },
    setAuthenticationReset: (state, action) => {
      SecureLocalStorageClear();
      return {
        ...state,
        Result: null,
        isLoading: false,
        isAuthenticated: false,
        userToken: null,
        redirectUrl: "/",
        Rrrors: [],
      };
    },
  },
});

export default slice.reducer;
const {
  setLoading,
  setAuthenticateSuccess,
  setAuthenticateFailed,
  setAuthenticationReset,
  setIntegrationAuthenticateSuccess,
} = slice.actions;

const generateUserDefaultLayoutStorage = async (
  user: AuthenticateUserResponse
): Promise<string | undefined> => {
  let defaultLayout: number = LayoutEnum.DefaultLayout;
  if (user !== null && user !== undefined) {
    const result = CookieSet(
      process.env.REACT_APP_localStorageEncryptKey || "-",
      defaultLayout.toString()
    );
    return result === null || result === undefined ? "" : result;
  }
};
export const authenticateUser = (obj: AuthenticateUserRequest) => {
  return async (dispatch: any, getState: any) => {
    try {
      dispatch(setLoading(true));
      const params = { ...obj };
      let apiResponse: AuthenticateUserResponse = await AuthenticateUser(
        params
      );
      // console.log("authincate " + JSON.stringify(apiResponse));
      if (
        apiResponse != null &&
        apiResponse.Result !== null &&
        apiResponse.Result !== undefined
      ) {
        const dictionariesList = await getAllDictionaries();
        const priviles = await getUserPriviles(apiResponse.Result.UserID);
        const menu = await getUserMenu(apiResponse.Result.UserID);
        SecureLocalStorageSet(
          SystemConfiguration.keys.dictionary || "",
          JSON.stringify(dictionariesList)
        );
        SecureLocalStorageSet(
          SystemConfiguration.keys.privileges || "",
          JSON.stringify(priviles)
        );
        SecureLocalStorageSet(
          SystemConfiguration.keys.menu || "",
          JSON.stringify(menu)
        );
        SecureLocalStorageSet(SystemConfiguration.keys.homePageReloaded, "0");
        if (menu !== null && menu !== undefined && menu.length !== 0) {
          let menuName: MenuItemName[] = generateMenuItemName(menu);
          SecureLocalStorageSet(
            SystemConfiguration.keys.menuItemName || "",
            JSON.stringify(menuName)
          );
        }
        dispatch(
          setAuthenticateSuccess({
            response: apiResponse.Result,
            remember: obj.remember,
            token: apiResponse.Result.Token,
          })
        );
      } else {
        console.log("apiResponse.Errors " + JSON.stringify(apiResponse.Errors));
        dispatch(setAuthenticateFailed(apiResponse.Errors));
      }
    } catch (err: any) {
      dispatch(
        setAuthenticateFailed([
          {
            message: err.message,
          },
        ])
      );
    } finally {
      // dispatch(setLoading(false));
    }
  };
};
export const resetAuthenticateUser =
  () => async (dispatch: any, getstate: any) => {
    dispatch(setAuthenticationReset(null));
  };
export const authenticateIntegrationUser =
  (token: string) => async (dispatch: any, getstate: any) => {
    dispatch(setIntegrationAuthenticateSuccess({ token: token }));
  };
export const logoutUser = () => {
  return async (dispatch: any, getstate: any) => {
    dispatch(setAuthenticationReset(null));
  };
};
//#region private functions
const generateMenuItemName = (request: MenuModel[]): MenuItemName[] => {
  let result: MenuItemName[] = [];
  request.forEach((row) => {
    if (row.WebUrl !== null && row.WebUrl !== undefined && row.WebUrl !== "") {
      result.push({
        name: row.Name,
        nameAr: row.ArabicName,
        url: row.WebUrl.toLowerCase(),
      });
    }
    if (
      row.ChildBusinessObject !== null &&
      row.ChildBusinessObject !== undefined &&
      row.ChildBusinessObject.length !== 0
    ) {
      row.ChildBusinessObject.forEach((subRow) => {
        const arr: MenuItemName[] = generateMenuItemName([subRow]);
        result = result.concat(arr);
      });
    }
  });
  return result;
};
//#endregion
