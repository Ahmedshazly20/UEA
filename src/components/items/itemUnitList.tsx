import _ from "lodash";
import { FC, useEffect, useMemo, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import { TableComponent } from "..";
import {
  ActionTypeEnum,
  LookupItem,
  RequestAction,
  ItemUnitModel,
  RowState,
} from "../../models";
import {
  generateGuid,
  getLabelName,
  isArabicCurrentLanguage,
} from "../../utils";

export const ItemLUnitist: FC<{
  request: ItemUnitModel[];
  units: LookupItem[];
  onActionEvent: (o: RequestAction) => void;
}> = ({ request, units, onActionEvent = () => {} }) => {
  //#region state
  const [data, setData] = useState<ItemUnitModel[]>([]);
  const [unitList, setUnitList] = useState<LookupItem[]>(units);
  //#endregion
  //#region useEffect
  useEffect(() => {
    generateData();
  }, []);
  useEffect(() => {
    generateData();
  }, [request, unitList]);
  //#endregionm
  //#region function
  const generateData = () => {
    if (
      request !== null &&
      request !== undefined &&
      request.length !== 0 &&
      units !== null &&
      units !== undefined &&
      units.length !== 0
    ) {
    }
    request = request.filter((p) => p.rowState !== Number(RowState.Delete));
    request.forEach((row, index) => {
      const unit: LookupItem = unitList.filter(
        (p) => p.value === row.Unit_ID.toString()
      )[0];
      row.name = unit === undefined ? "" : unit.name;
      row.nameAr = unit === undefined ? "" : unit.nameAr;
      row.clientId =
        row.clientId === null || row.clientId === undefined
          ? generateGuid()
          : row.clientId;
      return row;
    });
    setData(request);
  };
  //#enregion
  //#region variables
  const isArabic = isArabicCurrentLanguage();
  const columns: TableColumn<ItemUnitModel>[] = useMemo(
    () => [
      {
        name: "#",
        selector: (row, index) => Number(index || 0) + 1,
        sortable: true,
        width: "100px",
      },
      {
        name: getLabelName("PriceSale"),
        selector: (row) => row.PriceSale,
        sortable: true,
        width: "80px",
        wrap: true,
      },
      {
        name: getLabelName("unit"),
        selector: (row) => (isArabic ? row.nameAr || "" : row.name || ""),
        sortable: true,
        wrap: true,
        allowOverflow: true,
      },
      // {
      //   name: getLabelName("default"),
      //   selector: (row) => row.IsDefault,
      //   sortable: true,
      //   wrap: true,
      //   allowOverflow: true,
      // },
      {
        name: getLabelName("PriceQutyBegBal"),
        selector: (row) => row.PriceQutyBegBal,
        sortable: true,
        allowOverflow: true,
      },
      {
        name: getLabelName("QutyBegBal"),
        selector: (row) => row.QutyBegBal,
        sortable: true,
        allowOverflow: true,
      },
      {
        name: getLabelName("Factor"),
        selector: (row) => row.Factor,
        sortable: true,
        allowOverflow: true,
      },
      {
        // eslint-disable-next-line react/button-has-type
        cell: (row: any) => (
          <>
          <Button
            variant=""
            className="btn-info btn-xs mx-2"
            onClick={() => {
              onActionEvent({
                id: row.ID,
                request: row,
                action: ActionTypeEnum.ModifySubObject,
              });
            }}
          >
            {getLabelName("Modify")}
          </Button>
          <Button
          variant=""
          className="btn-danger btn-xs"
          onClick={() => {
            onActionEvent({
              id: row.ID,
              request: row,
              action: ActionTypeEnum.DeleteSubObject,
            });
          }}
        >
          {getLabelName("Delete")}
        </Button>
        </>
        ),
      },
    ],
    []
  );
  //#endregion
  //#region component
  return (
    <>
      {request !== null && request !== undefined && request.length !== 0 && (
        <Card>
          <Card.Header>Units</Card.Header>
          <Card.Body className="item-unit-list">
            <TableComponent
              columns={columns}
              data={data}
              totalRows={0}
              currentPage={1}
              pageSize={1000}
              paginationType="none"
            />
          </Card.Body>
        </Card>
      )}
    </>
  );
  //#endregion
};
