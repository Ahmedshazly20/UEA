import { FC } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {ActionTypeEnum, EmployeeResponse, SearchItemResponseModel} from "../../models";
import { isArabicCurrentLanguage } from "../../utils";
export const EmployeeList: FC<{
  request: EmployeeResponse[];
  isModifyAble?: boolean | null;
  isDeleteAble?: boolean | null;
  isPermissionAble?: boolean | null;
  onActionEvent?: any | null;
  onCompleteEvent?: any | null;
}> = ({
  request,
  isModifyAble = true,
  isDeleteAble = true,
  isPermissionAble = false,
  onActionEvent,
  onCompleteEvent,
}) => {
  //#region varaible
  const isArabic: boolean = isArabicCurrentLanguage();
  //#endregion
  //#region state
  const { t } = useTranslation();
  //#endregion
  //#region html
  return (
    <>
      {request != null && request.length !== 0 && (
        <table className="table table-xs table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th className="width-50">#</th>
              <th>{t("user.name")}</th>
              <th>{t("Employee.job")}</th>
              <th>{t("Employee.Address")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {request.map((row, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{index + 1}</td>
                  <td>{row.Name}</td>
                  <td>{isArabic ? row.Job : row.Job}</td>
                  <td>{isArabic ? row.Address : row.Address}</td>
                
                  <td className="text-end">
                    
                    <Button
                      type="button"
                      variant="primary"
                      className="mx-2 btn-xs"
                      onClick={() => {
                        onActionEvent({
                          id: row.ID,
                          action: ActionTypeEnum.Update,
                        });
                      }}
                    >
                      {t("user.Modify")}
                    </Button>
                 
                    <Button
                    className="btn-xs"
                      type="button"
                      variant="danger"
                      onClick={() => {
                        //onSelect({ id: row.ID, type: "update" });
                        onActionEvent({
                          id: row.ID,
                          action: ActionTypeEnum.Delete,
                        });
                      }}
                    >
                      {t("user.Delete")}
                    </Button>
                  
                </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
  //#endregion
};
