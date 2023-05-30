import { Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import {
  TransactionDetailResponseModel,
  TransactionItemResponseModel,
  TransactionResponseModel,
} from "../../../models";
import { formatDate, getLabelName } from "../../../utils";
import {
  //handleChangeItemQuantity,
  handleChangeItemValues,
  handleDeleteItem,
} from "../businessLogic/transactionBl";
export const getTransactionDetailcolumnsMainGroup = (
  isArabic: boolean,
  setState: Dispatch<SetStateAction<TransactionDetailResponseModel>>,
  stateValue: TransactionDetailResponseModel
): TableColumn<TransactionItemResponseModel>[] => {
  return [
    {
      name: "#",
      selector: (row, index) => Number(index || 0) + 1,
      width: "50px",
    },
    {
      name: (
        <label style={{ width: "fit-content" }}>
          {getLabelName("ItemCode")}
        </label>
      ),
      selector: (row) => row.ItemCode || "",
      sortable: true,
    },
    {
      name: (
        // <div style={{ width: "fit-content" }}>{getLabelName("ItemName")}</div>
        <label style={{ width: "fit-content" }}>
          {getLabelName("ItemName")}
        </label>
      ),
      selector: (row) => (isArabic ? row.ItemName : row.ItemName_En),
      sortable: true,
    },
    {
      name: getLabelName("Quantity"),
      cell: (row: TransactionItemResponseModel, index) => (
        <input
          type="number"
          className="form-control"
          key={`quantity_key_${index}`}
          value={row.Quantity}
          onChange={(e: any) => {
            const val = e.target.value === null ? 0 : Number(e.target.value);
            handleChangeItemValues(setState, stateValue, {
              ...row,
              Quantity: val,
            });
          }}
        />
      ),
      width: "100px",
    },
    {
      name: getLabelName("Price"),
      cell: (row: TransactionItemResponseModel, index) => (
        <input
          type="number"
          className="form-control"
          key={`price_key_${index}`}
          value={row.Unit_Price}
          onChange={(e: any) => {
            const val = e.target.value === null ? 0 : Number(e.target.value);
            handleChangeItemValues(setState, stateValue, {
              ...row,
              Unit_Price: val,
            });
          }}
        />
      ),
      width: "100px",
    },
    {
      name: getLabelName("Discount"),
      cell: (row: TransactionItemResponseModel, index) => (
        <input
          type="number"
          className="form-control"
          key={`discount_key_${index}`}
          value={row.ItemDiscount}
          onChange={(e: any) => {
            const val = e.target.value === null ? 0 : Number(e.target.value);
            handleChangeItemValues(setState, stateValue, {
              ...row,
              ItemDiscount: val,
            });
          }}
        />
      ),
      width: "100px",
    },
    {
      name: getLabelName("Total"),
      selector: (row) => row.Total,
      sortable: true,
      width: "100px",
    },
    {
      cell: (row: TransactionItemResponseModel) => (
        <Button
          variant="danger"
          className="btn-xs"
          onClick={async () => {
            await handleDeleteItem(setState, stateValue, row);
          }}
        >
          {getLabelName("Delete")}
        </Button>
      ),
    },
  ];
};
export const gettransactionListcolumns = (
  isArabic: boolean
): TableColumn<TransactionResponseModel>[] => {
  return [
    {
      name: "#",
      selector: (row, index) => Number(index || 0) + 1,
      width: "50px",
    },
    {
      name: (
        // <div style={{ width: "fit-content" }}>{getLabelName("ItemName")}</div>
        <label style={{ width: "fit-content" }}>
          {getLabelName("CustomerName")}
        </label>
      ),
      selector: (row) => (isArabic ? row.customerNameAr : row.customerNameEn),
      sortable: true,
    },
    {
      name: getLabelName("UnifiedNumber"),
      selector: (row) => row.id,
      sortable: true,
      wrap: true,
      allowOverflow: true,
    },
    {
      name: getLabelName("Code"),
      selector: (row) => row.code,
      sortable: true,
      allowOverflow: true,
    },
    {
      name: getLabelName("Date"),
      selector: (row) => formatDate(row.creationDate),
      sortable: true,
      allowOverflow: true,
    },
    {
      name: getLabelName("Discount"),
      selector: (row) => row.discount || 0,
      sortable: true,
      allowOverflow: true,
    },
    {
      name: getLabelName("NetMoney"),
      selector: (row) => row.netMoney || 0,
      sortable: true,
      allowOverflow: true,
    },
  ];
};
