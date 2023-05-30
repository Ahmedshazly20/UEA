import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  EstehekakModel,
  ValidationError,
  ActionTypeEnum,
  RequestAction,
  LookupItem,
  LookupTypeEnum,
} from "../../models";
import { ErrorValidationBox, TextBox, LoadingBox, InputDatePicker } from "..";
import { useTranslation } from "react-i18next";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import { saveEmployeeEstihkakSubtract } from "../../serviceBroker/employeesApiServiceBroker";
import { getLabelName, getUserId } from "../../utils";
import { getLookupByType } from "../../serviceBroker/lookupApiServiceBroker";
import { SelectBox } from "../common/selectBox/selectBox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export const AddEstehkak: FC<{
  request: EstehekakModel;
  onActionEvent: (o: RequestAction) => void;
}> = ({ request, onActionEvent = () => {} }) => {
  console.log("request", request);

  //#region varaibles
  const initialValues: EstehekakModel = request;
  initialValues.Date = new Date(initialValues.Date);
  //#endregion
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [empList, setEmpList] = useState<LookupItem[]>([]);
  const [empId, setEmpId] = useState<number>(initialValues.Emp_ID);
  const [ruleId, setRuleId] = useState<number>(initialValues.EsthkSubtRule_ID);
  const [date, setDate] = useState<Date>(initialValues.Date);
  const [ruleList, setRuleList] = useState<LookupItem[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );

  //I need To change It Translation customerNameAr.missing
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      Value: Yup.number().positive(t("mustpositive")).integer(t("mustintegar")),
    })
  );
  //#endregion
  //#region function
  useEffect(() => {
    const fillData = async () => {
      setLoading(true);
      var estList = await getLookupByType(LookupTypeEnum.Estehkak);
      if (estList != null) {
        setRuleList(estList);
      }
      var empList = await getLookupByType(LookupTypeEnum.Employee);
      if (empList != null) {
        setEmpList(empList);
      }
      setLoading(false);
    };
    fillData();
  }, []);

  const handleSubmit = async (request: EstehekakModel) => {
    try {
      setLoading(true);
      initialValues.rowState =
        initialValues.rowState == 0 ? 2 : initialValues.rowState;
      //@ts-ignore
      const res: ResponseBase<CustomerResponse> =
        await saveEmployeeEstihkakSubtract(request);
      if (res != null && res.Errors != null && res.Errors.length !== 0) {
        setValidationErrors(res.Errors);
        setLoading(false);
      } else {
        setValidationErrors([]);
        onActionEvent({
          id: 0,
          action: ActionTypeEnum.AddSuccess,
          request: res?.Result,
        });
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      const errors: ValidationError[] = [{ MessageAr: err, MessageEn: err }];
      setValidationErrors(errors);
    }
  };

  //#endregion
  //#region formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await handleSubmit(values);
      resetForm();
    },
  });
  //#endregion
  return (
    <>
      {loading && <LoadingBox />}
      {<ErrorValidationBox errors={validationErrors} />}
      <form className="forms-sample" onSubmit={formik.handleSubmit}>
        <Container>
          <div className="row row-cols-2 row-cols-xxl-2 row-cols-xl-2 row-cols-lg-2 row-cols-md-2 row-cols-sm-2 g-sm-2 g-md-4 align-items-start">
            <SelectBox
              labelName={getLabelName("Employee")}
              source={empList}
              isSingleSelect={true}
              onStatusChange={(e: any) => {
                formik.values.Emp_ID = e.value;
                request.Emp_ID = e.value;
                setEmpId(e.value);
              }}
              selectedValues={[request.Emp_ID.toString()]}
              multiselectRef={undefined}
            />
            <SelectBox
              labelName={getLabelName("Rule")}
              source={ruleList}
              isSingleSelect={true}
              onStatusChange={(e: any) => {
                formik.values.EsthkSubtRule_ID = e.value;
                request.EsthkSubtRule_ID = e.value;
                setRuleId(e.value);
              }}
              selectedValues={[request.EsthkSubtRule_ID.toString()]}
              multiselectRef={undefined}
            />
            <TextBox
              labelName={getLabelName("Value")}
              inputName={"Value"}
              errorText={formik.errors.Value}
              inputValue={formik.values.Value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
            />

            <InputDatePicker
              selectedDate={date}
              className="form-control"
              InputLabel={getLabelName("Date")}
              onChange={(date: Date) => {
                setDate(date);
                formik.values.Date = date;
              }}
            />

            <TextBox
              labelName={getLabelName("Note")}
              inputName={"Notes"}
              errorText={formik.errors.Notes}
              inputValue={formik.values.Notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="textarea"
            />
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-end">
              <Button
                type="submit"
                variant=""
                className="btn-gradient-primary mx-3"
              >
                {formik.values.rowState == 1 ? t("user.Add") : t("user.Modify")}
              </Button>
              <Button
                variant="danger"
                type="button"
                onClick={(e) => {
                  onActionEvent({ id: 0, action: ActionTypeEnum.Clear });
                }}
              >
                {getLabelName("Cancel")}
              </Button>
            </div>
          </div>
        </Container>
      </form>
    </>
  );
};
