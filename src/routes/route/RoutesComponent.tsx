import { FC } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { IRouteBase } from "../../models/routes/iRouteBase";
import { PrivilegeModel } from "../../models/user/useePermissionResponse";
import { SecureLocalStorageGet } from "../../utils";
import { DefaultRouteItems } from "../routeData/defaultRoutes";
import _ from "lodash";
import { SystemConfiguration } from "../../configuration/config";
type ContainerProps = {
  children: React.ReactNode; // 👈️ type children
};

const Container = (props: ContainerProps) => {
  return <>{props.children}</>;
};

export const RoutesComponent: FC<{}> = () => {
  const privilegesList: PrivilegeModel[] = JSON.parse(
    // @ts-ignore
    SecureLocalStorageGet(SystemConfiguration.keys.privileges || "")
  ) as PrivilegeModel[];
  const allowedPages: number[] = [
    10000, 10001, 10002, 10003, 10004, 10005, 10006,
  ];
  let approvedRouteItems: IRouteBase[] = DefaultRouteItems.filter((p) =>
    allowedPages.some((y) => y === p.id)
  );
  if (
    privilegesList !== null &&
    privilegesList !== undefined &&
    privilegesList.length !== 0
  ) {
  }
  approvedRouteItems.push(
    ..._.filter(DefaultRouteItems, (x) =>
      _.some(privilegesList, (y) => x.id === y.id)
    )
  );
  approvedRouteItems =
    approvedRouteItems !== null &&
    approvedRouteItems !== undefined &&
    approvedRouteItems.length !== 0
      ? approvedRouteItems
      : [];
  return (
    <>
      <Routes>
        {approvedRouteItems.map((item) => (
          <Route
            key={item.key}
            element={<Container>{item.content} </Container>}
            path={item.path}
          />
        ))}
        <Route path="*" element={<Navigate replace to="/404" />} />
        {/* <Route
          path="/404"
          element={
            <MasterLayout>
              <div>Page Not Found</div>
            </MasterLayout>
          }
        />
        <Route path="*" element={<Navigate replace to="/404" />} /> */}
      </Routes>
    </>
  );
};
