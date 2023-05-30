import axios from "axios";
import { ResponseBase } from "../models/base/responseBase";
import { GeneralResponse } from "../models/base/generalResponse";
import { ValidationError } from "../models/validation/error";
import { GetAppConfig, getUserToken } from "../utils";
// @ts-ignore
const AlYusrAxiosApiInstance = axios.create({
  // baseURL:
  //   process.env.REACT_APP_AlyusrApiEndpoint != null
  //     ? process.env.REACT_APP_AlyusrApiEndpoint.toString().trim()
  //     : "no-url",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
});
AlYusrAxiosApiInstance.interceptors.request.use(
  (config) => {
    config.baseURL = GetAppConfig().alyusrApiEndpoint;
    // @ts-ignore
    const token: string | null = getUserToken(); // CookieGet(process.env.REACT_APP_authenticatedTokenStorageKey);
    if (config.url?.includes("file/upload")) {
      // @ts-ignore
      config.headers["content-type"] = "multipart/form-data";
    } else {
      // @ts-ignore
      config.headers["content-type"] = "application/json";
      // @ts-ignore
      config.headers["Accept"] = "application/json";
    }
    if (config.method === "post") {
      // @ts-ignore
      config.headers["Access-Control-Allow-Origin"] = "*";
    }
    if (token) {
      // @ts-ignore
      config.headers["JWT"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log("request-axios-error", error);
    return Promise.reject(error);
  }
);
AlYusrAxiosApiInstance.interceptors.response.use(
  (response) => {
    // @ts-ignore
    return response.data;
  },
  (error) => {
    let result: ResponseBase<GeneralResponse> = { Result: undefined };
    if (error.response) {
      if (error.response.status === 401) {
        result = {
          token: "",
          Result: {},
          Errors: [
            {
              MessageEn: "authorization failed please try to login",
              MessageAr: "فشل فى تسجيل الدخول الرجاء اعادة المحاولة مرة اخرى",
            },
          ],
        };
      } else if (error.response.status === 400) {
        const errors: ValidationError[] = [];
        if (
          error.response !== null &&
          error.response.data !== null &&
          error.response.data.errors !== null &&
          error.response.data.errors !== undefined &&
          error.response.data.errors.length !== 0
        ) {
          error.response.data.errors.map((err: any) => {
            errors.push({
              MessageAr: err.errorMessage,
              MessageEn: err.errorMessage,
            });
          });
        } else {
        }
        result = {
          token: "",
          Result: {},
          Errors: errors,
        };
      } else if (error.message) {
        const message =
          error.errorMessage !== null && error.errorMessage !== undefined
            ? error.errorMessage
            : error.message;
        result = {
          Result: undefined,
          Errors: [{ MessageAr: message, MessageEn: message }],
        };
        return result;
      }
    } else {
      if (error.message) {
        const message =
          error.errorMessage !== null && error.errorMessage !== undefined
            ? error.errorMessage
            : error.message;
        result = {
          Result: {},
          token: "",
          Errors: [{ MessageAr: message, MessageEn: message }],
        };
        return result;
      } else if (error.request) {
        console.log("axios_6");
        result = {
          token: "",
          Result: {},
          Errors: [
            {
              MessageEn: "error occurred  try again later",
              MessageAr: "حدث خطأ حاول مرة أخرى في وقت لاحق",
            },
          ],
        };
        //return  error.request.data;
      }
    }
    return result;
  }
);
export function AxiosSearchParams<T>(
  arg: T,
  searchKey: string
): URLSearchParams {
  const params = new URLSearchParams();
  //@ts-ignore
  for (const [key, value] of Object.entries(arg)) {
    if (value !== null && value !== undefined) {
      params.append(`${searchKey}.${key}`, `${value}`);
    }
  }
  return params;
}
export default AlYusrAxiosApiInstance;
