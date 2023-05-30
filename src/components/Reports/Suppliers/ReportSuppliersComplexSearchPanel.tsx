import React, { FC } from "react";
import {
  LookupItem,
  LookupTypeEnum,
  SearchPanelProps,
  SuppliersComplexReportSearchParams,
} from "../../../models";
import CardHeader from "react-bootstrap/CardHeader";
import { Button, Card, Form, Row } from "react-bootstrap";
import { getLabelName } from "../../../utils";
import { InputDatePicker } from "../../common/InputDatePicker/InputDatePicker";
import { SelectBox } from "../../common/selectBox/selectBox";
import useLookups from "../../../hooks/useLookups";

export const ReportSuppliersComplexSearchPanel: FC<
  SearchPanelProps<SuppliersComplexReportSearchParams>
> = ({
  searchHeader,
  setLoading,
  handelSearch,
  searchParams,
  setSearchParams,
}) => {
  const { getLookupItems } = useLookups(setLoading, [
    LookupTypeEnum.Supplier,
    LookupTypeEnum.Currency,
    LookupTypeEnum.CostCenters,
    LookupTypeEnum.Users,
    LookupTypeEnum.Employee,
    LookupTypeEnum.Cities,
  ]);
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
                selectedDate={searchParams.fromDate}
                isClearable
                InputLabel={"From Date"}
                selectsStart
                startDate={searchParams.fromDate}
                endDate={searchParams.toDate}
                className="form-control"
                onChange={(date) => {
                  const obj = { ...searchParams };
                  obj.fromDate = date === null ? undefined : date;
                  setSearchParams(obj);
                }}
              />
              <InputDatePicker
                selectedDate={searchParams.toDate}
                isClearable
                InputLabel={"To Date"}
                selectsEnd
                startDate={searchParams.fromDate}
                endDate={searchParams.toDate}
                minDate={searchParams.fromDate}
                className="form-control"
                onChange={(date) => {
                  const obj = { ...searchParams };
                  obj.toDate = date === null ? undefined : date;
                  setSearchParams(obj);
                }}
              />
              <SelectBox
                labelName="Customer"
                isSingleSelect={true}
                selectedValues={
                  searchParams.accountId
                    ? [searchParams.accountId.toString()]
                    : [""]
                }
                source={getLookupItems(LookupTypeEnum.Supplier, true)}
                onStatusChange={(e: LookupItem) => {
                  const obj = { ...searchParams };
                  if (e == null) {
                    obj.accountId = undefined;
                  } else {
                    obj.accountId =
                      e.value === "" || e.value === null
                        ? undefined
                        : parseInt(e.value);
                  }
                  setSearchParams(obj);
                }}
              />
              <SelectBox
                labelName="User"
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
                labelName="Coast Center"
                isSingleSelect={true}
                selectedValues={
                  searchParams.costCenterId
                    ? [searchParams.costCenterId.toString()]
                    : [""]
                }
                source={getLookupItems(LookupTypeEnum.CostCenter, true)}
                onStatusChange={(e: LookupItem) => {
                  const obj = { ...searchParams };
                  if (e == null) {
                    obj.costCenterId = undefined;
                  } else {
                    obj.costCenterId =
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
                labelName="City"
                isSingleSelect={true}
                selectedValues={
                  searchParams.cityId ? [searchParams.cityId.toString()] : [""]
                }
                source={getLookupItems(LookupTypeEnum.Cities, true)}
                onStatusChange={(e: LookupItem) => {
                  const obj = { ...searchParams };
                  if (e == null) {
                    obj.cityId = undefined;
                  } else {
                    obj.cityId =
                      e.value === "" || e.value === null
                        ? undefined
                        : parseInt(e.value);
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
