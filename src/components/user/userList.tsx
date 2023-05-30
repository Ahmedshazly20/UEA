import { FC } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ActionTypeEnum } from "../../models/enums/enumList";
import { UserRegisterationResponse } from "../../models/user/userRegisterationResponse";
import { isArabicCurrentLanguage } from "../../utils";
export const UsersList: FC<{
  request: UserRegisterationResponse[];
  isModifyAble?: boolean | null;
  isDeleteAble?: boolean | null;
  isPermissionAble?: boolean | null;
  onActionEvent?: any | null;
  onCompleteEvent?: any | null;
}> = ({
  request,
  isModifyAble = false,
  isDeleteAble = false,
  isPermissionAble = false,
  onActionEvent,
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
              <th>{t("user.userName")}</th>
              <th>{t("user.name")}</th>
              <th>{t("user.isAdmin")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {request.map((row, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{index + 1}</td>
                  <td>{row.User_Name}</td>
                  <td>{isArabic ? row.Name : row.Name_EN}</td>
                  <td>
                    <input type="checkbox" checked={row.IsAdmin}></input>
                  </td>
                  <td>
                    {isModifyAble && (
                      <Button
                        as="button"
                        variant=""
                        className="btn-gradient-primary"
                        onClick={() => {
                          onActionEvent({
                            id: row.ID,
                            action: ActionTypeEnum.Update,
                          });
                        }}
                      >
                        {t("user.Modify")}
                      </Button>
                    )}
                    {isDeleteAble && (
                      <Button
                        as="button"
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
                    )}
                    {isPermissionAble && (
                      <Button
                        as="button"
                        className="btn-gradient-primary"
                        onClick={() => {
                          //onSelect({ id: row.ID, type: "update" });
                          onActionEvent({
                            id: row.ID,
                            action: ActionTypeEnum.GrantPremissions,
                          });
                        }}
                      >
                        {t("user.Premissions")}
                      </Button>
                    )}
                    {isPermissionAble && (
                      <Button
                        as="button"
                        className="btn-gradient-primary"
                        onClick={() => {
                          onActionEvent({
                            id: row.ID,
                            action: ActionTypeEnum.UserSetting,
                          });
                        }}
                      >
                        {t("user.settings")}
                      </Button>
                    )}
                    {isPermissionAble && (
                      <Button
                        as="button"
                        className="btn-gradient-primary"
                        onClick={() => {
                          onActionEvent({
                            id: row.ID,
                            action: ActionTypeEnum.TransactionSetting,
                          });
                        }}
                      >
                        {t("user.transactionsettings")}
                      </Button>
                    )}
                    {isPermissionAble && (
                      <Button
                        as="button"
                        className="btn-gradient-primary"
                        onClick={() => {
                          onActionEvent({
                            id: row.ID,
                            action: ActionTypeEnum.POSSetting,
                          });
                        }}
                      >
                        {t("user.posSetting")}
                      </Button>
                    )}
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
