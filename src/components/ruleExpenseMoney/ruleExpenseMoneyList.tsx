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

import {
  ruleExpenseMoneySearch,
  SearchruleExpenseMoneyRequest,
} from "../../models/ruleExpenseMoney/ruleExpenseMoney";
import { ActionButton } from "../common/ActionButton/ActionButton";
import { SelectAcTransaction } from "../../serviceBroker/ruleExpenseMoneyApiServiceBroker";
import { ConfirmModelDialogBox } from "../box/confirmDialogBox";
import { sampleBase64pdf } from "../../data/pdfData";
import { PdfViewer } from "../common/pdfViewer/pdfViewer";

export const RuleExpenseMoneyList: FC<{
  acTransactionSearch: SearchruleExpenseMoneyRequest[];
  totalRows: number;
  searchParams: SearchruleExpenseMoneyRequest;
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
    }
  };

  const isArabic = isArabicCurrentLanguage();
  const columns: TableColumn<ruleExpenseMoneySearch>[] = useMemo(
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
        name: getLabelName("ArabicName"),
        selector: (row) => row.ArabicName,
        sortable: true,
        allowOverflow: true,
      },
      {
        name: getLabelName("Value"),
        selector: (row) => row.Balance,
        sortable: true,
        allowOverflow: true,
      },
      {
        name: getLabelName("Date"),
        selector: (row) =>
          format(new Date(row.DateCreate), "MMMM d, yyyy h:mm aa"),
        sortable: true,
        allowOverflow: true,
      },

      {
        name: getLabelName("Actions"),
        // eslint-disable-next-line react/button-has-type
        cell: (row: ruleExpenseMoneySearch) => (
          <>
            <Col>
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
            </Col>

            <Col>
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
            </Col>
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
