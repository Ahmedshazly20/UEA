import { FC, useMemo, useState } from "react";
import { CurrencyResponse } from "../../models/currency/currencyResponse";
import { getLabelName, isArabicCurrentLanguage } from "../../utils";
import { TableColumn } from "react-data-table-component";
import { ActionTypeEnum } from "../../models/enums/enumList";
import { Button } from "react-bootstrap";
import { LoadingBox } from "../box/loadingBox";
import { TableComponent } from "../common/dataTable/tableComponent";
import { TextBox } from "../common/textBox/textBox";
export const CurrencyList: FC<{
  request: CurrencyResponse[];
  onActionEvent?: any | null;
}> = ({ request, onActionEvent }) => {
  const isArabic = isArabicCurrentLanguage();
  const defaultPageSize: number = 50;
  const columns: TableColumn<CurrencyResponse>[] = useMemo(
    () => [
      {
        name: "#",
        selector: (row, index) => Number(index || 0) + 1,
        sortable: true,
        width: "100px",
      },

      {
        name: getLabelName("Name"),
        selector: (row) => (isArabic ? row.ArabicName : row.EnglishName),
        sortable: true,
        wrap: true,
        allowOverflow: true,
      },
      {
        name: getLabelName("ShortCut"),
        selector: (row) =>
          isArabic ? row.ArabicShourtCut : row.EnglishShourtCust,
        sortable: true,
        width: "80px",
        wrap: true,
      },
      {
        name: getLabelName("Value"),
        selector: (row) => row.Value,
        sortable: true,
        allowOverflow: true,
      },

      {
        // eslint-disable-next-line react/button-has-type
        cell: (row: any) => (
          <Button
            onClick={() => {
              onActionEvent({
                id: row.ID,
                request: row,
                action: ActionTypeEnum.Update,
              });
            }}
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
  const [searchValue, setSearchValue] = useState("");
  const data = {
    nodes: request.filter(
      (item) =>
        item.ArabicName.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.EnglishName.toLowerCase().includes(searchValue.toLowerCase())
    ),
  };
  return (
    <>
      <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
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
          pageSize={defaultPageSize}
          paginationType="client"
        />
      </div>
    </>
  );
};
