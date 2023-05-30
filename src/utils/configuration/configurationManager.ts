import { SecureLocalStorageGet, SecureLocalStorageSet } from "..";
import { SystemConfiguration } from "../../configuration/config";
import { AppConfiguration } from "../../models";
export const GetAppConfig = (): AppConfiguration => {
  let result: AppConfiguration = {
    alyusrApiEndpoint: "",
  };
  try {
    result = JSON.parse(
      // @ts-ignorey
      SecureLocalStorageGet(SystemConfiguration.keys.appConfig || "")
    ) as AppConfiguration;
  } catch (err: any) {}
  return result;
};
// export const SetAppConfiguration = (): AppConfiguration => {
//   let result: AppConfiguration = {
//     alyusrApiEndpoint: "",
//   };
//   fetch("config/appConfig.json", {
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   })
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (myJson) {
//       SecureLocalStorageSet(
//         SystemConfiguration.keys.appConfig || "",
//         JSON.stringify(myJson)
//       );
//       setData(myJson);
//     });
// };
