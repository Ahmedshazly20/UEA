import React, {FC, MouseEventHandler, useRef, useState} from 'react';
import CardHeader from "react-bootstrap/CardHeader";
import {getLabelName} from "../../utils";
import {Button, Card, Form, Row} from "react-bootstrap";
import {AcTransactionTypeEnum, LookupItem, SearchAcTransactionRequest} from "../../models";
import {SelectBox} from "../common/selectBox/selectBox";
import {InputDatePicker} from "../common/InputDatePicker/InputDatePicker";
import { TextBox } from '../common/textBox/textBox';
import { RuleExpRecieAccountsEnum } from '../../models/enums/enumList';
import { SearchruleExpenseMoneyRequest } from '../../models/ruleExpenseMoney/ruleExpenseMoney';

const RuleExpenseSearchPanel: FC<{
    acTransactionType: RuleExpRecieAccountsEnum;
    header: string;
    searchParams: SearchruleExpenseMoneyRequest;
    setSearchParams: Function;
    handelSearch: MouseEventHandler<HTMLButtonElement>;
    customerAccountLookups: LookupItem[];
    userLookUps: LookupItem[];
    allTreasuryInAccount: LookupItem[];
    allTreasuryOutAccount: LookupItem[];
    setShowAcTransactionModel: Function
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
        allTreasuryOutAccount
    } = props;
    const filterGroupSelectBoxMultiselectRef = useRef<any>();
    const[searchValue,setSearchValue]=useState("");
    let accountLookupItem: LookupItem[];
    switch (acTransactionType) {
        case RuleExpRecieAccountsEnum.Expense:
            accountLookupItem = allTreasuryInAccount;
            break;
        case RuleExpRecieAccountsEnum.Receive:
            accountLookupItem = allTreasuryOutAccount;
            break;
        default:
            accountLookupItem = customerAccountLookups;
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <Row>
                        <div className="col-md-6 d-flex ">
                            {getLabelName(props.header)}
                        </div>
                        <div className="col-md-6 d-flex justify-content-end">
                            <Button onClick={() => setShowAcTransactionModel(true)}>
                                {getLabelName("Add")}
                            </Button>
                        </div>
                    </Row>
                </CardHeader>
                <Card.Body>

                    <Form>
                        <Row>
                        <TextBox
                labelName={"Search"}
                inputName={"filterTextBox"}
                inputValue={searchValue}
                onChange={(e: any) => {
                    setSearchValue(e.target.value);
                }}
            />
                        </Row>
                       
                        <div className="accordion-footer">
                            <div className="col-md-12 d-flex justify-content-end">
                                <Button className="btn btn-orange" variant="outline-primary"
                                        onClick={handelSearch}
                                >
                                    {getLabelName("Search")}
                                </Button>
                            </div>

                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};
export default RuleExpenseSearchPanel;