import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { reduxBatch } from "@manaflair/redux-batch";
import userAuthenticate from "../slice/userAuthincateSlice";
import theme from "../slice/themeSlice";
import languageState from "../slice/languageSlice";
import { UserResponse } from "../models/user/authenticateUserResponse";
import { CookieGet, getUser, isUserAuthenticated } from "../utils";
import Cookies from "js-cookie";
import { SystemConfiguration } from "../configuration/config";

const reducer = {
  user: userAuthenticate,
  lang: languageState,
  theme: theme,
};

const authenticatedTokenStorageKey: string = SystemConfiguration.keys.token;
// @ts-ignore
const cultureKey: string = SystemConfiguration.keys.culture;
const userObject = getUser();
const preloadedState = {
  user: {
    userAccount: userObject ?? null,
    userToken: Cookies.get(authenticatedTokenStorageKey)
      ? CookieGet(authenticatedTokenStorageKey)
      : null,
    isLoading: false,
    isAuthenticated: isUserAuthenticated(), // Cookies.get(authenticatedTokenStorageKey) ? true : false,
    Errors: [],
  },
  lang: {
    language: "ar-AE",
    // language: Cookies.get(languageStorageKey)
    //   ? CookieGet(languageStorageKey)
    //   : "ar-AE",
  },
  theme: {
    isRtl: Cookies.get(cultureKey)
      ? CookieGet(cultureKey) === "ar-AE"
        ? true
        : false
      : false,
  },
};

//
// const store1: Store<ArticleState, ArticleAction> & {
//     dispatch: DispatchType
// } = createStore(reducer, applyMiddleware(thunk))

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
  enhancers: [reduxBatch],
});

export default store;
