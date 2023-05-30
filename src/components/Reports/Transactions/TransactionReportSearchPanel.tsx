import React, {
  FC,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  LookupItem,
  LookupTypeEnum,
  SearchPanelProps,
  TransactionReportSearchParams,
} from "../../../models";
import { Button, Card, Form, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import { getLabelName } from "../../../utils";
import { InputDatePicker } from "../../common/InputDatePicker/InputDatePicker";
import { SelectBox } from "../../common/selectBox/selectBox";
import { TextBox } from "../../common/textBox/textBox";
import { getItemsByCategoryId } from "../../../serviceBroker/itemApiServiceBroker";
import useLookups from "../../../hooks/useLookups";

export const TransactionReportSearchPanel: FC<
  SearchPanelProps<TransactionReportSearchParams>
> = ({
  searchHeader,
  setLoading,
  searchParams,
  setSearchParams,
  handelSearch,
}) => {
  const { getLookupItems } = useLookups(setLoading, [
    LookupTypeEnum.ReportTypes,
    LookupTypeEnum.Customers,
    LookupTypeEnum.Users,
    LookupTypeEnum.Employee,
    LookupTypeEnum.CostCenters,
    LookupTypeEnum.Currency,
    LookupTypeEnum.AllCategrories,
    LookupTypeEnum.DaysOfWeek,
  ]);
  const [itemsLookUps, setItemsLookUps] = useState<LookupItem[]>([]);
  useEffect(() => {
    const fillData = async () => {
      setLoading(true);
      const results = await getItemsByCategoryId(searchParams.categoryId);
      setItemsLookUps(results);
      setLoading(false);
    };
    fillData();
  }, [searchParams.categoryId]);

  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <div className="col-md-6 d-flex ">{getLabelName(searchHeader)}</div>
          </Row>
        </CardHeader>
        <Card.Body>
          <Form>
            <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
              <InputDatePicker
                className="form-control"
                selectedDate={searchParams.fromDate}
                isClearable
                InputLabel={"From Date"}
                selectsStart
                startDate={searchParams.fromDate}
                endDate={searchParams.toDate}
                onChange={(date) => {
                  const obj = { ...searchParams };
                  obj.fromDate = date === null ? undefined : date;
                  setSearchParams(obj);
                }}
              />
              <InputDatePicker
                className="form-control"
                selectedDate={searchParams.toDate}
                isClearable
                InputLabel={"To Date"}
                selectsEnd
                startDate={searchParams.fromDate}
                endDate={searchParams.toDate}
                minDate={searchParams.fromDate}
                onChange={(date) => {
                  const obj = { ...searchParams };
                  obj.toDate = date === null ? undefined : date;
                  setSearchParams(obj);
                }}
              />
              <SelectBox
                labelName="Report Type"
                isSingleSelect={true}
                selectedValues={
                  searchParams.reportDesignView
                    ? [searchParams.reportDesignView.toString()]
                    : [""]
                }
                source={getLookupItems(LookupTypeEnum.ReportTypes, true)}
                onStatusChange={(e: LookupItem) => {
                  const obj = { ...searchParams };
                  if (e == null) {
                    obj.reportDesignView = undefined;
                  } else {
                    obj.reportDesignView =
                      e.value === "" || e.value === null
                        ? undefined
                        : parseInt(e.value);
                  }
                  setSearchParams(obj);
                }}
              />
              <SelectBox
                labelName="Customer"
                isSingleSelect={true}
                selectedValues={
                  searchParams.custmerId
                    ? [searchParams.custmerId.toString()]
                    : [""]
                }
                source={getLookupItems(LookupTypeEnum.Customers, true)}
                onStatusChange={(e: LookupItem) => {
                  const obj = { ...searchParams };
                  if (e == null) {
                    obj.custmerId = undefined;
                  } else {
                    obj.custmerId =
                      e.value === "" || e.value === null
                        ? undefined
                        : parseInt(e.value);
                  }
                  setSearchParams(obj);
                }}
              />
              <SelectBox
                labelName="Cashier"
                isSingleSelect={true}
                selectedValues={
                  searchParams.userId ? [searchParams.userId.toString()] : [""]
                }
                source={getLookupItems(LookupTypeEnum.Users, true)}
                onStatusChange={(e: LookupItem) => {
                  const obj = { ...searchParams };
                  if (e == null) {
                    obj.userId = undefined;
                  } else {
                    obj.userId =
                      e.value === "" || e.value === null
                        ? undefined
                        : parseInt(e.value);
                  }
                  setSearchParams(obj);
                }}
              />
              <SelectBox
                labelName="Employee"
                isSingleSelect={true}
                selectedValues={
                  searchParams.employeeId
                    ? [searchParams.employeeId.toString()]
                    : [""]
                }
                source={getLookupItems(LookupTypeEnum.Employee, true)}
                onStatusChange={(e: LookupItem) => {
                  const obj = { ...searchParams };
                  if (e == null) {
                    obj.employeeId = undefined;
                  } else {
                    obj.employeeId =
                      e.value === "" || e.value === null
                        ? undefined
                        : parseInt(e.value);
                  }
                  setSearchParams(obj);
                }}
              />
              <SelectBox
                labelName="Cost Center"
                isSingleSelect={true}
                selectedValues={
                  searchParams.costCenterID
                    ? [searchParams.costCenterID.toString()]
                    : [""]
                }
                source={getLookupItems(LookupTypeEnum.CostCenters, true)}
                onStatusChange={(e: LookupItem) => {
                  const obj = { ...searchParams };
                  if (e == null) {
                    obj.costCenterID = undefined;
                  } else {
                    obj.costCenterID =
                      e.value === "" || e.value === null
                        ? undefined
                        : parseInt(e.value);
                  }
                  setSearchParams(obj);
                }}
              />
              <SelectBox
                labelName="Currency"
                isSingleSelect={true}
                selectedValues={
                  searchParams.currencyId
                    ? [searchParams.currencyId.toString()]
                    : [""]
                }
                source={getLookupItems(LookupTypeEnum.Currency, true)}
                onStatusChange={(e: LookupItem) => {
                  const obj = { ...searchParams };
                  if (e == null) {
                    obj.currencyId = undefined;
                  } else {
                    obj.currencyId =
                      e.value === "" || e.value === null
                        ? undefined
                        : parseInt(e.value);
                  }
                  setSearchParams(obj);
                }}
              />
              <SelectBox
                labelName="Category"
                isSingleSelect={true}
                selectedValues={
                  searchParams.categoryId
                    ? [searchParams.categoryId.toString()]
                    : [""]
                }
                source={getLookupItems(LookupTypeEnum.AllCategrories, true)}
                onStatusChange={(e: LookupItem) => {
                  const obj = { ...searchParams };
                  if (e == null) {
                    obj.categoryId = undefined;
                  } else {
                    obj.categoryId =
                      e.value === "" || e.value === null
                        ? undefined
                        : parseInt(e.value);
                  }
                  obj.itemId = undefined;
                  setSearchParams(obj);
                  console.log("category", searchParams.categoryId);
                }}
              />
              <SelectBox
                labelName="Items"
                isSingleSelect={true}
                selectedValues={
                  searchParams.itemId ? [searchParams.itemId.toString()] : [""]
                }
                source={itemsLookUps}
                onStatusChange={(e: LookupItem) => {
                  const obj = { ...searchParams };
                  if (e == null) {
                    obj.itemId = undefined;
                  } else {
                    obj.itemId =
                      e.value === "" || e.value === null
                        ? undefined
                        : parseInt(e.value);
                  }
                  setSearchParams(obj);
                }}
              />
              <TextBox
                inputName={"ItemCode"}
                labelName="Item Code"
                inputValue={searchParams.itemCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const obj = { ...searchParams };
                  if (
                    e.target.value === "" ||
                    e.target.value === null ||
                    e.target.value === undefined
                  ) {
                    obj.itemCode = undefined;
                  } else {
                    obj.itemCode = e.target.value;
                  }
                  setSearchParams(obj);
                }}
              />

              <SelectBox
                labelName="Day of Week"
                isSingleSelect={true}
                selectedValues={
                  searchParams.dayWeekOfSales
                    ? [searchParams.dayWeekOfSales.toString()]
                    : [""]
                }
                source={getLookupItems(LookupTypeEnum.DaysOfWeek, true)}
                onStatusChange={(e: LookupItem) => {
                  const obj = { ...searchParams };
                  if (e == null) {
                    obj.dayWeekOfSales = undefined;
                  } else {
                    console.log(e.value);
                    obj.dayWeekOfSales =
                      e.value === "" || e.value === null ? undefined : e.value;
                  }
                  setSearchParams(obj);
                }}
              />
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-end">
              <Button
                className="btn btn-orange"
                variant="outline-primary"
                onClick={handelSearch}
              >
                {getLabelName("Search")}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
