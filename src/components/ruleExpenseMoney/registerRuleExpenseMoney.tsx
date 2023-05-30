import React, {FC, useRef, useState} from 'react';
import {Button, Card, Row} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import {getLabelName} from "../../utils";
import {Form, Formik, FormikProps} from "formik";
import {AcTransaction, AcTransactionTypeEnum, LookupItem, ValidationError} from "../../models";
import {LabelBox} from "../common/labelBox/labelBox";
import {SelectBox} from "../common/selectBox/selectBox";
import {InputDatePickerInForm} from "../common/InputDatePicker/InputDatePicker";
import {TextBox} from "../common/textBox/textBox";
import {SaveRuleExpenseMoney, SaveRuleReceiveMoney} from "../../serviceBroker/ruleExpenseMoneyApiServiceBroker";
import { RuleExpRecieAccountsEnum } from '../../models/enums/enumList';
import { ruleExpenseMoneySearch } from '../../models/ruleExpenseMoney/ruleExpenseMoney';


export const RegisterRuleExpenseMoney: FC<{
    searchPanelHeader: string;
    acTransactionType: RuleExpRecieAccountsEnum;
    acTransaction: ruleExpenseMoneySearch;
    setLoading: Function;
    customerAccountLookups: LookupItem[];
    currencyLookUps: LookupItem[];
    coastCenterLookUps: LookupItem[];
    suppliersAccountLookups: LookupItem[];
    handleSaveEmployeeComplete: Function
}> = (props) => {
    const filterGroupSelectBoxMultiselectRef = useRef<any>();
    const {
        searchPanelHeader,
        acTransactionType,
        acTransaction,
        setLoading,
        customerAccountLookups,
        handleSaveEmployeeComplete,
        currencyLookUps,
        coastCenterLookUps,
        suppliersAccountLookups
    } = props;
    const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
        []
    );
    const [validationSchema, setValidationSchema] = useState(
        // Yup.object({
        //     FromAccount_ID: Yup.string().required(getLabelName("Account is missing")),
        //     Note: Yup.string().required(getLabelName("Remarks is missing")),
        //     Value:Yup.number().required(getLabelName("Amount is Missing")).min(1,getLabelName("Invalid Amount")),
        //     Currency:Yup.string().required(getLabelName("Currency is Missing")),
        //     Date:Yup.date().required(getLabelName("Date is Missing"))
        // })
    );
    const handleSubmit = async (request: ruleExpenseMoneySearch) => {
        try {
            setLoading(true);
            if(request.ID===0)
                request.rowState=1;
            else{
                request.rowState=2;
            }
            let res
            if (acTransactionType==RuleExpRecieAccountsEnum.Expense)
             res = await SaveRuleExpenseMoney(request);
             else
             res = await SaveRuleReceiveMoney(request);
            if (res != null && res.Errors != null && res.Errors.length !== 0) 
            {
                console.log("ttttttttttttt",res.Errors)
                setValidationErrors(res.Errors);
                handleSaveEmployeeComplete(true);
                setLoading(false);
            } else {
                console.log("yyyyyyyy")
                setValidationErrors([]);
                handleSaveEmployeeComplete(true);
                setLoading(false);
            }
        } catch (err: any) {
            setLoading(false);
            const errors: ValidationError[] = [{MessageAr: err, MessageEn: err}];
            setValidationErrors(errors);
        }
    };


    const renderChild: FC<FormikProps<ruleExpenseMoneySearch>> = ({
                                                             errors,
                                                             status,
                                                             touched,
                                                             setFieldValue,
                                                             setFieldTouched,
                                                             handleChange,
                                                             handleBlur,
                                                             handleSubmit,
                                                             handleReset,
                                                             isSubmitting,
                                                             dirty,
                                                             values
                                                         }) => {
        return (
            <>
                <Form onSubmit={handleSubmit}>
                  
                    
                    <Row>
                        <TextBox inputName={"ArabicName"} labelName="ArabicName" controlSize={6} errorText={errors.ArabicName}
                                 inputValue={values.ArabicName}
                                 onChange={handleChange}
                                 onBlur={handleBlur}/>

                        
                    </Row>

                    <TextBox inputName={"Notes"} labelName="Notes" errorText={errors.Notes} type="textarea"
                             inputValue={values.Notes}
                             onChange={handleChange}
                             onBlur={handleBlur}
                    />


                    <div className="accordion-footer">
                        <div className="col-md-12 d-flex justify-content-end">
                            <Button
                                type="submit"
                                className="btn btn-orange"
                                variant="outline-primary"
                            >
                                {getLabelName("Save")}
                            </Button>
                            <Button
                                variant="outline-primary"
                                type="button"
                                className="btn btn-orange"
                                onClick={handleReset}
                            >
                                {getLabelName("Close")}
                            </Button>
                        </div>
                    </div>
                </Form>
            </>
        );
    };

    return (
        <>
            <Card>
                <CardHeader>{getLabelName(searchPanelHeader)}</CardHeader>
                <Card.Body>
                    <Formik initialValues={acTransaction}
                            validationSchema={validationSchema}
                            onSubmit={async (values, {setSubmitting, resetForm}) => {
                                await handleSubmit(values);
                            }}
                            onReset={(values) => {
                                console.log("reset");
                                handleSaveEmployeeComplete(false);
                            }}
                            children={(formik) => renderChild(formik)}
                    />
                </Card.Body>
            </Card>
        </>
    )
}