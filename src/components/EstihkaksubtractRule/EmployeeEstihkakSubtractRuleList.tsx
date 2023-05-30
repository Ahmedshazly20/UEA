import {FC, useMemo, useState, useTransition} from "react";
import { CurrencyResponse } from "../../models/currency/currencyResponse";
import {getLabelName, isArabicCurrentLanguage} from "../../utils";
import {TableColumn} from "react-data-table-component";
import { ActionTypeEnum } from "../../models/enums/enumList";
import { useTranslation } from "react-i18next";
import {Button} from "react-bootstrap";
import {LoadingBox} from "../box/loadingBox";
import {TableComponent} from "../common/dataTable/tableComponent";
import {TextBox} from "../common/textBox/textBox";
import { EmployeeEstihkakSubtracResponse } from "../../models/Estihkaksubtract/EmployeeEstihkakRule";
export const EmployeeEstihkakSubtractRuleList: FC<{
    request: EmployeeEstihkakSubtracResponse[];
    onActionEvent?: any | null;
}> = ({
          request,
          onActionEvent,
       
      }) => {
    const isArabic = isArabicCurrentLanguage();  
    const defaultPageSize: number = 50;
    const { t } = useTranslation();
    const columns: TableColumn<EmployeeEstihkakSubtracResponse>[] = useMemo(
        () => [
            {
                name: "#",
                selector: (row, index) => Number(index || 0) + 1,
                sortable: true,
                width: "100px",
            },
           
            {
                name: getLabelName("Name"),
                selector: (row) => (isArabic ? row.Name : row.Name_En),
                sortable: true,
                wrap: true,
                allowOverflow: true,
            },
           
            {
                name: getLabelName("Notes"),
                selector: (row) => row.Notes,
                sortable: true,
                allowOverflow: true,
            },
            
            {
                // eslint-disable-next-line react/button-has-type
                cell: (row: any) => (
                    <Button
                        onClick={() => 
                       {
                            onActionEvent({
                                id: row.ID,
                                request: row,
                                action: ActionTypeEnum.Update,
                            });
                        }
                    }
                    >
                       
                       
                        {getLabelName("Modify")}
                        
                    </Button>
                ),
            },
            {
                // eslint-disable-next-line react/button-has-type
                cell: (row: any) => (
                    <Button
                        onClick={() => {
                            onActionEvent({
                                id: row.ID,
                                request: row,
                                action: ActionTypeEnum.Delete,
                            });
                        }}
                    >
                        {getLabelName("Delete")}
                    </Button>
                ),
            },
        ],
        []
    );
    const[searchValue,setSearchValue]=useState("");
    const data = 
    {
       
            nodes: request.filter(
            (item) =>
            item.Name.toLowerCase().includes(searchValue.toLowerCase()) 
           
            ),
           
    };
    console.log("fddfdffd",data);
    return(
        <>
            <TextBox
                labelName={"Search"}
                inputName={"filterTextBox"}
                inputValue={searchValue}
                onChange={(e: any) => {
                    setSearchValue(e.target.value);
                }}
            />
            <TableComponent
                columns={columns}
                data={data.nodes}
                totalRows={data.nodes.length}
                currentPage={1}
                pageSize={ defaultPageSize}
                paginationType="client"
            />
        </>
    )
}