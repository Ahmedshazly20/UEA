import React, { FC } from "react";
import { ReportVatSearchParams, SearchPanelProps } from "../../../models";
import { Button, Card, Form, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import { getLabelName } from "../../../utils";
import { InputDatePicker } from "../../common/InputDatePicker/InputDatePicker";

export const ReportVatSearchPanel: FC<
  SearchPanelProps<ReportVatSearchParams>
> = ({ searchHeader, setSearchParams, handelSearch, searchParams }) => {
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
                className="form-control"
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
                selectedDate={searchParams.toDate}
                isClearable
                InputLabel={"To Date"}
                className="form-control"
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
