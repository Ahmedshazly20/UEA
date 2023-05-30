import { useEffect, useState } from "react";
import { SystemConfiguration } from "../configuration/config";
import { AppConfiguration } from "../models";
import { SecureLocalStorageGet, SecureLocalStorageSet } from "../utils";
export default function useFetchAppConfiguration() {
  const [data, setData] = useState<AppConfiguration>({
    alyusrApiEndpoint:
      SystemConfiguration.apiEndPoint.alyusrApiEndpoint?.toString() || "",
  });

  useEffect(() => {
    const obj = SecureLocalStorageGet(SystemConfiguration.keys.appConfig || "");
    if (obj == null) {
      fetch("config/appConfig.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          SecureLocalStorageSet(
            SystemConfiguration.keys.appConfig || "",
            JSON.stringify(myJson)
          );
          setData(myJson);
        });
    }
  }, []);

  return { data };
}
