import React, { FC, useRef, useState } from "react";
import { Button, Card, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import { getLabelName } from "../../utils";
import { Form, Formik, FormikProps } from "formik";
import {
  AcTransaction,
  AcTransactionTypeEnum,
  LookupItem,
  ValidationError,
} from "../../models";
import { LabelBox } from "../common/labelBox/labelBox";
import { SelectBox } from "../common/selectBox/selectBox";
import { InputDatePickerInForm } from "../common/InputDatePicker/InputDatePicker";
import { TextBox } from "../common/textBox/textBox";
import { SaveAcTransaction } from "../../serviceBroker/acTransactionsApiServiceBroker";

export const AcTransactionForm: FC<{
  searchPanelHeader: string;
  acTransactionType: AcTransactionTypeEnum;
  acTransaction: AcTransaction;
  setLoading: Function;
  customerAccountLookups: LookupItem[];
  currencyLookUps: LookupItem[];
  coastCenterLookUps: LookupItem[];
  suppliersAccountLookups: LookupItem[];
  handleSaveEmployeeComplete: Function;
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
    suppliersAccountLookups,
  } = props;
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [validationSchema, setValidationSchema] = useState();
  // Yup.object({
  //     FromAccount_ID: Yup.string().required(getLabelName("Account is missing")),
  //     Note: Yup.string().required(getLabelName("Remarks is missing")),
  //     Value:Yup.number().required(getLabelName("Amount is Missing")).min(1,getLabelName("Invalid Amount")),
  //     Currency:Yup.string().required(getLabelName("Currency is Missing")),
  //     Date:Yup.date().required(getLabelName("Date is Missing"))
  // })
  const handleSubmit = async (request: AcTransaction) => {
    try {
      setLoading(true);
      if (request.ID === 0) request.rowState = 1;
      else {
        request.rowState = 2;
      }

      const res = await SaveAcTransaction(request);
      if (res != null && res.Errors != null && res.Errors.length !== 0) {
        setValidationErrors(res.Errors);
        setLoading(false);
      } else {
        setValidationErrors([]);
        handleSaveEmployeeComplete(true);
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      const errors: ValidationError[] = [{ MessageAr: err, MessageEn: err }];
      setValidationErrors(errors);
    }
  };

  const renderChild: FC<FormikProps<AcTransaction>> = ({
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
    values,
  }) => {
    return (
      <>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
              <LabelBox
                labelName={getLabelName("Code")}
                inputValue={values.ID}
              />
              {acTransactionType === AcTransactionTypeEnum.MoneyIn && (
                <SelectBox
                  labelName={getLabelName("Account")}
                  isSingleSelect={true}
                  selectedValues={[values.FromAccount_ID.toString()]}
                  source={suppliersAccountLookups}
                  onStatusChange={(e: LookupItem) =>
                    setFieldValue("FromAccount_ID", e.value)
                  }
                  multiselectRef={filterGroupSelectBoxMultiselectRef}
                />
              )}
              {acTransactionType === AcTransactionTypeEnum.MoneyOut && (
                <SelectBox
                  labelName={getLabelName("Account")}
                  isSingleSelect={true}
                  selectedValues={[values.ToAccount_ID.toString()]}
                  source={customerAccountLookups}
                  onStatusChange={(e: LookupItem) =>
                    setFieldValue("ToAccount_ID", e.value)
                  }
                  multiselectRef={filterGroupSelectBoxMultiselectRef}
                />
              )}
              <SelectBox
                labelName={getLabelName("Currency")}
                isSingleSelect={true}
                selectedValues={[values.Currency_ID.toString()]}
                source={currencyLookUps}
                onStatusChange={(e: LookupItem) =>
                  setFieldValue("Currency_ID", e.value)
                }
                multiselectRef={filterGroupSelectBoxMultiselectRef}
              />
              <SelectBox
                labelName={getLabelName("Coast Center")}
                isSingleSelect={true}
                selectedValues={[values.CostCenter_ID.toString()]}
                source={coastCenterLookUps}
                onStatusChange={(e: LookupItem) =>
                  setFieldValue("CostCenter_ID", e.value)
                }
                multiselectRef={filterGroupSelectBoxMultiselectRef}
              />
              <TextBox
                inputName={"Value"}
                labelName="Value"
                errorText={errors.Value}
                inputValue={values.Value}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <InputDatePickerInForm
                className="form-control"
                name="Date"
                InputLabel="Date"
                showTimeSelect={true}
                controlSize={4}
              />
              <TextBox
                inputName={"Note"}
                labelName="Note"
                errorText={errors.Note}
                type="textarea"
                inputValue={values.Note}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </Row>
          <div className="modal-footer d-flex justify-content-between mt-3">
            <Button type="submit" className="btn-sm" variant="primary">
              {getLabelName("Save")}
            </Button>
            <Button
              variant="danger"
              type="button"
              className="btn-sm"
              onClick={handleReset}
            >
              {getLabelName("Close")}
            </Button>
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
          <Formik
            initialValues={acTransaction}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
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
  );
};
