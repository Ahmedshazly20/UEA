import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PrivilegeModel } from "../../models";
import { getPagePrivileges, isUserAuthenticated } from "../../utils";
export const AuthenticatedRoute: FC<{ children: any }> = ({ children }) => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!isUserAuthenticated()) {
      navigate("/");
    } else {
      const pageName = window.location.pathname.toLowerCase();
      switch (pageName) {
        case "/dashboard":
          break;
        default:
          const pagePrivilege: PrivilegeModel = getPagePrivileges();
          if (pagePrivilege.view === false) {
            navigate("/403");
          }
          break;
      }
    }
  }, []);
  return children;
};
