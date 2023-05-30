import React, { FC } from "react";
import {
  CustomersSimpleReportSearchParams,
  LookupItem,
  LookupTypeEnum,
  SearchPanelProps,
} from "../../../models";
import { Button, Card, Form, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import { getLabelName } from "../../../utils";
import { SelectBox } from "../../common/selectBox/selectBox";
import { TextBox } from "../../common/textBox/textBox";
import useLookups from "../../../hooks/useLookups";

export const ReportCustomersSimpleSearchPanel: FC<
  SearchPanelProps<CustomersSimpleReportSearchParams>
> = ({
  searchHeader,
  setLoading,
  handelSearch,
  searchParams,
  setSearchParams,
}) => {
  const { getLookupItems } = useLookups(setLoading, [
    LookupTypeEnum.Customers,
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
              <SelectBox
                labelName={getLabelName("Customer")}
                isSingleSelect={true}
                selectedValues={
                  searchParams.customerId
                    ? [searchParams.customerId.toString()]
                    : [""]
                }
                source={getLookupItems(LookupTypeEnum.Customers, true)}
                onStatusChange={(e: LookupItem) => {
                  const obj = { ...searchParams };
                  if (e == null) {
                    obj.customerId = undefined;
                  } else {
                    obj.customerId =
                      e.value === "" || e.value === null
                        ? undefined
                        : parseInt(e.value);
                  }
                  setSearchParams(obj);
                }}
              />
              <SelectBox
                labelName={getLabelName("City")}
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
              <TextBox
                labelName={getLabelName("Account Balance")}
                inputName="customerBalanceCriteria"
                inputValue={searchParams.customerBalanceCriteria}
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const obj = { ...searchParams };
                  if (
                    e.target.value === "" ||
                    e.target.value === null ||
                    e.target.value === undefined
                  ) {
                    obj.customerBalanceCriteria = undefined;
                  } else {
                    obj.customerBalanceCriteria = e.target.value;
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
