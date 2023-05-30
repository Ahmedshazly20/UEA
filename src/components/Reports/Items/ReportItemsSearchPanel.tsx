import React, { FC, useEffect, useState } from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import { getLabelName } from "../../../utils";
import { SelectBox } from "../../common/selectBox/selectBox";
import {
  ItemReportSearchParams,
  LookupItem,
  LookupTypeEnum,
  SearchPanelProps,
} from "../../../models";
import { InputDatePicker } from "../../common/InputDatePicker/InputDatePicker";
import { getItemsByCategoryId } from "../../../serviceBroker/itemApiServiceBroker";
import { TextBox } from "../../common/textBox/textBox";
import useLookups from "../../../hooks/useLookups";

export const ReportItemsSearchPanel: FC<
  SearchPanelProps<ItemReportSearchParams>
> = ({
  searchHeader,
  setLoading,
  wihDateRange,
  handelSearch,
  searchParams,
  setSearchParams,
}) => {
  const { getLookupItems } = useLookups(setLoading, [
    LookupTypeEnum.AllCategrories,
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
              {wihDateRange && (
                <>
                  <InputDatePicker
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
                </>
              )}
              <SelectBox
                labelName={getLabelName("Category")}
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
                }}
              />
              <SelectBox
                labelName={getLabelName("Items")}
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

              <TextBox
                inputName={"Barcode"}
                labelName="Barcode"
                inputValue={searchParams.itemBarcode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const obj = { ...searchParams };
                  if (
                    e.target.value === "" ||
                    e.target.value === null ||
                    e.target.value === undefined
                  ) {
                    obj.itemBarcode = undefined;
                  } else {
                    obj.itemBarcode = e.target.value;
                  }
                  setSearchParams(obj);
                }}
              />
              <TextBox
                inputName={"balanceIsNotZero"}
                labelName="Balance Is Not Zero"
                type="checkbox"
                inputValue={searchParams.balanceIsNotZero}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const obj = { ...searchParams };
                  if (
                    e.target.checked === null ||
                    e.target.checked === undefined
                  ) {
                    obj.balanceIsNotZero = undefined;
                  } else {
                    obj.balanceIsNotZero = e.target.checked;
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
