import { FC } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ActionTypeEnum } from "../../models/enums/enumList";
import { AccrualSubtractItemModel } from "../../models";
import { isArabicCurrentLanguage } from "../../utils";
import { Space, Table } from "antd";
export const DueSubtractRulesList: FC<{
  request: AccrualSubtractItemModel[];
  onActionEvent?: any | null;
  onCompleteEvent?: any | null;
}> = ({
  request,
  onActionEvent,
  onCompleteEvent,
}) => {
  //#region varaible
  const isArabic: boolean = isArabicCurrentLanguage();
  //#endregion
  //#region state
  const { t } = useTranslation();
  const columns = [
    {
      title: t("ArabicName"),
      dataIndex: 'Name',
      key: 'Name',
  
    //  onFilter: (value: string, record:any) => record.Name.indexOf(value) === 0,
      // sorter: (a:any, b:any) => a.Name.length - b.Name.length,
      // sortDirections: ['descend'],
    },
    {
      title: t("EnglishName"),
      dataIndex: 'Name_En',
      key: 'Name_En',
      //onFilter: (value: string, record:any) => record.Name_En.indexOf(value) === 0,
      // sorter: (a:any, b:any) => a.Name_En.length - b.Name_En.length,
      // sortDirections: ['descend'],
    },
    {
      title: t("Notes"),
      dataIndex: 'Notes',
      key: 'Notes',
      //onFilter: (value: string, record:any) => record.Notes.indexOf(value) === 0,
    },
    {
      title:t("actions"),
      key:"action",
      render:((_:any, record:any) => (
        <>
        <Button
                        size="sm"
                        type="button"
                        variant="primary"
                        className="mx-2 btn-xs"
                        onClick={() => {
                          onActionEvent({
                            id: record.ID,
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
                            id: record.ID,
                            action: ActionTypeEnum.Delete,
                          });
                        }}
                      >
                        {t("user.Delete")}
                      </Button>
                      </>       
      ))
    },
  ];
  //#endregion
  //#region html
  return (
    <>
      {

      //request != null &&
      //&& request.length !== 0 &&
       (
        // <table className="table table-hoverd table-bordered">
        //   <thead>
        //     <tr>
        //       <th className="width-50">#</th>
        //       <th>{t("ArabicName")}</th>
        //       <th>{t("EnglishName")}</th>
        //       <th>{t("Notes")}</th>
        //       <th></th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {request.map((row, index) => {
        //       return (
        //         <tr key={`user-${index}`}>
        //           <td>{index + 1}</td>
        //           <td>{row.Name}</td>
        //           <td>{row.Name_En}</td>
        //           <td>{row.Notes}</td>

                
        //           <td>
                    
        //               <Button
        //                 size="sm"
        //                 type="button"
        //                 variant="primary"
        //                 className="mx-2"
        //                 onClick={() => {
        //                   onActionEvent({
        //                     id: row.ID,
        //                     action: ActionTypeEnum.Update,
        //                   });
        //                 }}
        //               >
        //                 {t("user.Modify")}
        //               </Button>
                   
        //               <Button
        //                 size="sm"
        //                 type="button"
        //                 variant="danger"
        //                 onClick={() => {
        //                   //onSelect({ id: row.ID, type: "update" });
        //                   onActionEvent({
        //                     id: row.ID,
        //                     action: ActionTypeEnum.Delete,
        //                   });
        //                 }}
        //               >
        //                 {t("user.Delete")}
        //               </Button>
                    
        //           </td>
        //         </tr>
        //       );
        //     })}
        //   </tbody>
        // </table>
      
        <Table dataSource={request} columns={columns} />
      )}
    </>
  );
  //#endregion
};
