import { useFormik } from "formik";
import * as Yup from "yup";
import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLabelName, isArabicCurrentLanguage } from "../../utils";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import {
  getUserSetting,
  saveUserSettings,
} from "../../serviceBroker/userApiServiceBroker";
import { ValidationError } from "../../models/validation/error";
import { LoadingBox } from "../box/loadingBox";
import { ErrorValidationBox, TextBox } from "..";
import { UserRegisterationResponse } from "../../models/user/userRegisterationResponse";
import { UserSettingModel, UserSettingResponse } from "../../models";
export const UserSettings: FC<{
  userObject?: UserRegisterationResponse | null;
  onComplete?: any | null;
}> = ({ userObject, onComplete = () => {} }) => {
  //#region varaibles
  const [userSettingObject, setUserSettingObject] =
    useState<UserSettingModel | null>(null);
  useEffect(() => {
    const fillData = async () => {
      setLoading(true);
      // @ts-ignore
      var settings = await getUserSetting(userObject.ID);
      if (settings) {
        if (settings.Lang == 2) {
          setIsEnglish(true);
        } else {
          setIsArabic(true);
        }
      }
      setUserSettingObject(settings);
      setLoading(false);
    };
    fillData();
  }, []);
  const cssPrefix: string = isArabicCurrentLanguage() ? "_ar" : "_en";
  const initialValues: UserSettingModel = userSettingObject ?? {
    AddItemInNewLineInBill: false,
    AlertOfCustomerDidintPaySince: 0,
    AllowItemPriceSaleLessThanCost: false,
    AllowSaleLessThanCost: false,
    AlowRepeateFactoItemUnit: false,
    CheckMaxDebitOfCustomer: false,
    CreatedBy: 0,
    CreationDate: new Date(),
    DaysAlertBeforeExpire: 0,
    EnableManualInvoiceCode: true,
    ID: 0,
    Lang: 1,
    MaxDiscountPercentage: 0,
    ModificationDate: new Date(),
    ModifiedBy: 0,
    Name: "",
    PeriodAllowToEdit: 0,
    ShowScaleBarcode: false,
    PreventStoreOutOfItemLessZero: false,
    PrintBarcodeAfterPurches: false,
    PrintItemPrescriptionAfterSale: false,
    RequestDueDateOnDelayPayment: false,
    RigesterBillOnPayment: false,
    SelectionEmployeeIsRequierd: false,
    ShowAlert: false,
    ShowBarcode: false,
    ShowItemModifiers: false,
    ShowMinimumPriceItem: false,
    ShowProfitOfBill: false,
    User_ID: userObject?.ID,
    VerifyOnUpdate: false,
    rowState: 1,
    isArabic: false,
    isEnglish: false,
  };
  //#endregion
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isArabic, setIsArabic] = useState(userSettingObject?.Lang == 1);
  const [isEnglish, setIsEnglish] = useState(userSettingObject?.Lang == 2);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      DaysAlertBeforeExpire: Yup.number()
        .positive(t("mustpositive"))
        .integer(t("mustintegar")),
      AlertOfCustomerDidintPaySince: Yup.number()
        .positive(t("mustpositive"))
        .integer(t("mustintegar")),
      MaxDiscountPercentage: Yup.number()
        .positive(t("mustpositive"))
        .integer(t("mustintegar")),
      PeriodAllowToEdit: Yup.number()
        .positive(t("mustpositive"))
        .integer(t("mustintegar")),
    })
  );
  //#endregion
  //#region function
  const handleRadioChange = async (e: any) => {
    if (e.target.name == "arabic") {
      setIsArabic(e.target.checked);
      setIsEnglish(!e.target.checked);
    } else {
      setIsEnglish(e.target.checked);
      setIsArabic(!e.target.checked);
    }
  };
  const handleReset = async () => {
    onComplete(null);
  };
  const handleSubmit = async (request: UserSettingModel) => {
    try {
      setLoading(true);
      request.Lang = isArabic ? 1 : 2;
      request.User_ID = userObject?.ID;
      const res = await saveUserSettings(request);
      if (res != null && res.Errors != null && res.Errors.length !== 0) {
        setValidationErrors(res.Errors);
        setLoading(false);
      } else {
        setValidationErrors([]);
        onComplete(true);
      }
    } catch (err: any) {
      setLoading(false);
      const errors: ValidationError[] = [{ MessageAr: err, MessageEn: err }];
      setValidationErrors(errors);
    }
  };
  //#en
  //#endregion
  //#region formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    // onReset: (values) => {
    //   onComplete(false);
    // },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await handleSubmit(values);
      resetForm();
    },
  });
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      {<ErrorValidationBox errors={validationErrors} />}
      <form onSubmit={formik.handleSubmit}>
        <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
          <TextBox
            labelName={getLabelName("Customer Did Not Pay Since")}
            inputName={"AlertOfCustomerDidintPaySince"}
            errorText={formik.errors.AlertOfCustomerDidintPaySince}
            inputValue={formik.values.AlertOfCustomerDidintPaySince}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
          />
          <TextBox
            labelName={getLabelName("Days Before Expiry Date")}
            inputName={"DaysAlertBeforeExpire"}
            errorText={formik.errors.DaysAlertBeforeExpire}
            inputValue={formik.values.DaysAlertBeforeExpire}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
          />
          <TextBox
            labelName={getLabelName("Max Discount Percentage")}
            inputName={"MaxDiscountPercentage"}
            errorText={formik.errors.MaxDiscountPercentage}
            inputValue={formik.values.MaxDiscountPercentage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
          />
          <TextBox
            labelName={getLabelName("Period allow To Edit")}
            inputName={"PeriodAllowToEdit"}
            errorText={formik.errors.PeriodAllowToEdit}
            inputValue={formik.values.PeriodAllowToEdit}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
          />
        </div>
        <Row>
          <Col className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12"></Col>
          <Col className="col-xl-12 col-lg-3 col-md-6 col-sm-12 col-12 mb-3">
            <Form.Label>{getLabelName("Language")}</Form.Label>
            <div className="btn-group btn-group-check mx-3" role="group">
              <Form.Check
                inline
                name="arabic"
                type="radio"
                onChange={(e) => handleRadioChange(e)}
                id="Lang"
                checked={isArabic}
                label={getLabelName("Arabic")}
              />
              <Form.Check
                inline
                name="english"
                type="radio"
                onChange={(e) => handleRadioChange(e)}
                id="english"
                checked={isEnglish}
                label={getLabelName("English")}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="6" className="list-group-wrapper">
            <ul className="list-group">
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="AddItemInNewLineInBill"
                  name="AddItemInNewLineInBill"
                  checked={formik.values.AddItemInNewLineInBill}
                  label={getLabelName("Add Repeted Item In Bill In New Line")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="AllowItemPriceSaleLessThanCost"
                  checked={formik.values.AllowItemPriceSaleLessThanCost}
                  name="AllowItemPriceSaleLessThanCost"
                  label={getLabelName("AllowTo Set Sales Item Less Than Cost")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="AllowSaleLessThanCost"
                  name="AllowSaleLessThanCost"
                  checked={formik.values.AllowSaleLessThanCost}
                  label={getLabelName("Allow To Sale Less Than Cost")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="AlowRepeateFactoItemUnit"
                  checked={formik.values.AlowRepeateFactoItemUnit}
                  name="AlowRepeateFactoItemUnit"
                  label={getLabelName("Allow Repeate Item Unit Factor")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="CheckMaxDebitOfCustomer"
                  name="CheckMaxDebitOfCustomer"
                  checked={formik.values.CheckMaxDebitOfCustomer}
                  label={getLabelName("Check Max Debit of Customer")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="EnableManualInvoiceCode"
                  checked={formik.values.EnableManualInvoiceCode}
                  name="EnableManualInvoiceCode"
                  label={getLabelName("Enable Manual Code In Bill")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="PreventStoreOutOfItemLessZero"
                  name="PreventStoreOutOfItemLessZero"
                  checked={formik.values.PreventStoreOutOfItemLessZero}
                  label={getLabelName(
                    "Prevent Store Out Item Balance Less Zero"
                  )}
                />
              </li>
            </ul>
          </Col>
          <Col md="6" className="list-group-wrapper">
            <ul className="list-group">
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="PrintBarcodeAfterPurches"
                  checked={formik.values.PrintBarcodeAfterPurches}
                  name="PrintBarcodeAfterPurches"
                  label={getLabelName(
                    "Print Barcode of item In Purches Invoice After Save It"
                  )}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="ShowAlert"
                  checked={formik.values.ShowAlert}
                  name="ShowAlert"
                  label={getLabelName("Show Alert Window")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="ShowItemModifiers"
                  checked={formik.values.ShowItemModifiers}
                  name="ShowItemModifiers"
                  label={getLabelName("Show Modifiers of Items")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="RequestDueDateOnDelayPayment"
                  name="RequestDueDateOnDelayPayment"
                  checked={formik.values.RequestDueDateOnDelayPayment}
                  label={getLabelName("Request Due Date on Payment Delay")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="RigesterBillOnPayment"
                  checked={formik.values.RigesterBillOnPayment}
                  name="RigesterBillOnPayment"
                  label={getLabelName("Register Sales and Purchase in Payment")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="SelectionEmployeeIsRequierd"
                  name="SelectionEmployeeIsRequierd"
                  checked={formik.values.SelectionEmployeeIsRequierd}
                  label={getLabelName("Selection Of Employee Is Requierd")}
                />
              </li>
            </ul>
          </Col>
        </Row>
        <div className="col-md-12 d-flex justify-content-end mt-3">
          <Button type="submit" size="sm" variant="primary" className="mx-3">
            {t("setting.Save")}
          </Button>
          <Button
            variant="danger"
            size="sm"
            type="button"
            onClick={handleReset}
          >
            {t("CloseButton")}
          </Button>
        </div>
      </form>
    </>
  );
  //#endregion
};
