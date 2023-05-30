import { FC } from "react";
import { Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ActionTypeEnum } from "../../models/enums/enumList";
import { StoreResponse } from "../../models/store/storeDto";
import { getLabelName, isArabicCurrentLanguage } from "../../utils";
export const StoresList: FC<{
  request: StoreResponse[];
  onActionEvent?: any | null;
  onCompleteEvent?: any | null;
}> = ({ request, onActionEvent, onCompleteEvent }) => {
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
        <Table className="table-bordered" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="width-50">#</th>
              <th>{getLabelName("Name")}</th>
              <th>{getLabelName("Address")}</th>
              <th>{getLabelName("Phone")}</th>
              <th colSpan={2}>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {request.map((row, index) => {
              return (
                <tr key={`store-${index}`}>
                  <td>{index + 1}</td>
                  
                  <td>
                    <label>{isArabic ? row.Name : row.Name_En}</label>
                  </td>
                  <td>
                    <label>{row.Address}</label>
                  </td>
                  <td>
                    <label>{row.Phone}</label>
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="outline-primary"
                      onClick={() => {
                        onActionEvent({
                          id: row.ID,
                          action: ActionTypeEnum.Update,
                        });
                      }}
                    >
                      {t("user.Modify")}
                    </Button>
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="outline-primary"
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
        </Table>
      )}
    </>
  );
  //#endregion
};
