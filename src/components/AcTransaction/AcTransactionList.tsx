import React, { FC, useMemo, useState } from "react";
import { TableComponent } from "../common/dataTable/tableComponent";
import { format } from "date-fns";
import {
  ActionButtons,
  ActionTypeEnum,
  RequestAction,
  SearchAcTransactionRequest,
} from "../../models";

import { TableColumn } from "react-data-table-component";
import { getLabelName, isArabicCurrentLanguage } from "../../utils";
import { Col } from "react-bootstrap";

import { AcTransactionSearch } from "../../models/AcTransaction/AcTransaction";
import { ActionButton } from "../common/ActionButton/ActionButton";
import {
  DeleteAcTransaction,
  PrintAcTransaction,
  SelectAcTransaction,
} from "../../serviceBroker/acTransactionsApiServiceBroker";
import { ConfirmModelDialogBox } from "../box/confirmDialogBox";
import { sampleBase64pdf } from "../../data/pdfData";
import { PdfViewer } from "../common/pdfViewer/pdfViewer";

export const AcTransactionList: FC<{
  acTransactionSearch: AcTransactionSearch[];
  totalRows: number;
  searchParams: SearchAcTransactionRequest;
  defaultPageSize: number;
  onCurrentPageChange: Function;
  onPageSizeChange: Function;
  setShowAcTransactionModel: Function;
  setAcTransaction: Function;
  setShowDeleteModel: Function;
  setShowPrintModel: Function;
  setLoading: Function;
}> = (props) => {
  const {
    acTransactionSearch,
    totalRows,
    searchParams,
    defaultPageSize,
    onCurrentPageChange,
    onPageSizeChange,
    setShowAcTransactionModel,
    setAcTransaction,
    setShowDeleteModel,
    setShowPrintModel,
    setLoading,
  } = props;

  const onActionEvent = async (request: RequestAction) => {
    switch (request.action) {
      case ActionTypeEnum.Update:
        const response = await SelectAcTransaction(request.id!);
        setAcTransaction(response.Result);
        setShowAcTransactionModel(true);
        break;
      case ActionTypeEnum.Delete:
        setShowDeleteModel({ show: true, id: request.id });
        break;
      case ActionTypeEnum.Print:
        setLoading(true);
        const printResponse = await PrintAcTransaction(request.id!);
        if (printResponse.Result && printResponse.Result.BillFilePdf) {
          setShowPrintModel({
            show: true,
            content: printResponse.Result?.BillFilePdf,
          });
          console.log("Base64PDF", printResponse.Result?.BillFilePdf);
        }
        setLoading(false);
        break;
    }
  };

  const isArabic = isArabicCurrentLanguage();
  const columns: TableColumn<AcTransactionSearch>[] = useMemo(
    () => [
      {
        name: "#",
        selector: (row, index) => Number(index || 0) + 1,
        sortable: true,
        width: "80px",
      },
      {
        name: getLabelName("Number"),
        selector: (row) => row.ID,
        sortable: true,
        width: "100px",
        wrap: true,
      },
      {
        name: getLabelName("From Account"),
        selector: (row) => {
          // if (row.FromAccount_ID === undefined || row.FromAccount_ID === null)
          //     return ' ';
          // const account = _.find(allAccountLookups, (item) => item.value === row.FromAccount_ID.toString());
          // if (account != undefined) {
          //     return isArabic ? account?.nameAr : account?.name;
          // }
          return " ";
        },
        sortable: true,
        allowOverflow: true,
      },
      {
        name: getLabelName("To Account"),
        selector: (row) => {
          // if (row.ToAccount_ID === undefined || row.ToAccount_ID === null)
          //     return ' ';
          // const account = _.find(allAccountLookups, (item) => item.value === row.ToAccount_ID.toString());
          // if (account != undefined) {
          //     return isArabic ? account?.nameAr : account?.name;
          // }
          return " ";
        },
        sortable: true,
        allowOverflow: true,
      },
      {
        name: getLabelName("Value"),
        selector: (row) => row.Value,
        sortable: true,
        allowOverflow: true,
      },
      {
        name: getLabelName("Date"),
        selector: (row) => format(new Date(row.Date), "MMMM d, yyyy h:mm aa"),
        sortable: true,
        allowOverflow: true,
      },
      {
        name: getLabelName("Cost Center"),
        selector: (row) =>
          isArabic ? row.CostCenterNameAr : row.CostCenterNameEn,
        sortable: true,
        allowOverflow: true,
      },
      {
        name: getLabelName("Currency"),
        selector: (row) => (isArabic ? row.CurrencyNameAr : row.CurrencyNameEn),
        sortable: true,
        allowOverflow: true,
      },
      {
        name: getLabelName("Actions"),
        // eslint-disable-next-line react/button-has-type
        cell: (row: AcTransactionSearch) => (
          <>
            <ActionButton
              commandType="Edit"
              onClick={() => {
                onActionEvent({
                  id: row.ID,
                  request: row,
                  action: ActionTypeEnum.Update,
                });
              }}
            />
            <ActionButton
              className="me-2"
              commandType="Print"
              onClick={() => {
                onActionEvent({
                  id: row.ID,
                  request: row,
                  action: ActionTypeEnum.Print,
                });
              }}
            />
            <ActionButton
              commandType="Delete"
              onClick={() => {
                onActionEvent({
                  id: row.ID,
                  request: row,
                  action: ActionTypeEnum.Delete,
                });
              }}
            />
          </>
        ),
      },
    ],
    []
  );
  return (
    <>
      <TableComponent
        columns={columns}
        data={acTransactionSearch}
        totalRows={totalRows}
        currentPage={searchParams.pageNumber || 1}
        pageSize={searchParams.pageSize || defaultPageSize}
        onCurrentPageChange={onCurrentPageChange}
        onPageSizeChange={onPageSizeChange}
        paginationType="server"
      />
    </>
  );
};
