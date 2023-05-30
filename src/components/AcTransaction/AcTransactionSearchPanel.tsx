import React, { FC, MouseEventHandler, useRef } from "react";
import CardHeader from "react-bootstrap/CardHeader";
import { getLabelName } from "../../utils";
import { Button, Card, Form, Row } from "react-bootstrap";
import {
  AcTransactionTypeEnum,
  LookupItem,
  SearchAcTransactionRequest,
} from "../../models";
import { SelectBox } from "../common/selectBox/selectBox";
import { InputDatePicker } from "../common/InputDatePicker/InputDatePicker";

const AcTransactionSearchPanel: FC<{
  acTransactionType: AcTransactionTypeEnum;
  header: string;
  searchParams: SearchAcTransactionRequest;
  setSearchParams: Function;
  handelSearch: MouseEventHandler<HTMLButtonElement>;
  customerAccountLookups: LookupItem[];
  userLookUps: LookupItem[];
  allTreasuryInAccount: LookupItem[];
  allTreasuryOutAccount: LookupItem[];
  setShowAcTransactionModel: Function;
}> = (props) => {
  const {
    searchParams,
    setSearchParams,
    handelSearch,
    customerAccountLookups,
    userLookUps,
    setShowAcTransactionModel,
    acTransactionType,
    allTreasuryInAccount,
    allTreasuryOutAccount,
  } = props;
  const filterGroupSelectBoxMultiselectRef = useRef<any>();
  let accountLookupItem: LookupItem[];
  switch (acTransactionType) {
    case AcTransactionTypeEnum.MoneyIn:
      accountLookupItem = allTreasuryInAccount;
      break;
    case AcTransactionTypeEnum.MoneyOut:
      accountLookupItem = allTreasuryOutAccount;
      break;
    default:
      accountLookupItem = customerAccountLookups;
  }

  return (
    <>
      <Card className="card-custom">
        <CardHeader className="d-flex justify-content-between">
          <span>{getLabelName(props.header)}</span>
          <Button
            variant="primary"
            className="btn-xs"
            onClick={() => setShowAcTransactionModel(true)}
          >
            {getLabelName("Add")}
          </Button>
        </CardHeader>
        <Card.Body>
          <Form>
            <Row className="g-3">
              <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
                <SelectBox
                  labelName={getLabelName("Account")}
                  isSingleSelect={true}
                  selectedValues={
                    searchParams.accountId
                      ? [searchParams.accountId.toString()]
                      : [""]
                  }
                  source={accountLookupItem}
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
                  multiselectRef={filterGroupSelectBoxMultiselectRef}
                />
                <SelectBox
                  labelName={getLabelName("User")}
                  isSingleSelect={true}
                  selectedValues={
                    searchParams.userId
                      ? [searchParams.userId.toString()]
                      : [""]
                  }
                  source={userLookUps}
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
                  multiselectRef={filterGroupSelectBoxMultiselectRef}
                />
                <InputDatePicker
                  selectedDate={searchParams.toDate}
                  isClearable
                  InputLabel={"To Date"}
                  selectsEnd
                  startDate={searchParams.fromDate}
                  className="form-control"
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
                  className="btn-sm"
                  variant="primary"
                  onClick={handelSearch}
                >
                  {getLabelName("Search")}
                </Button>
              </div>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
export default AcTransactionSearchPanel;
