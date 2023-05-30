import { useFormik } from "formik";
import * as Yup from "yup";
import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLabelName, isArabicCurrentLanguage } from "../../utils";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import {
  getTransactionSettings,
  saveTransactionSettings,
} from "../../serviceBroker/userApiServiceBroker";
import { ValidationError } from "../../models/validation/error";
import { LoadingBox } from "../box/loadingBox";
import { ErrorValidationBox, TextBox } from "..";
import { UserRegisterationResponse } from "../../models/user/userRegisterationResponse";
import {
  LookupItem,
  LookupTypeEnum,
  UserTransactionSettingModel,
} from "../../models";
import { getLookupByType } from "../../serviceBroker/lookupApiServiceBroker";
import { SelectBox } from "../common/selectBox/selectBox";
import {
  getAllCustomers,
  getAllCustomersForDropDown,
} from "../../serviceBroker/customerApiServiceBroker";
export const TransactionSettings: FC<{
  userObject?: UserRegisterationResponse | null;
  onComplete?: any | null;
}> = ({ userObject, onComplete = () => {} }) => {
  //#region varaibles
  const [userTransactionSettingObject, setUserTransactionSettingObject] =
    useState<UserTransactionSettingModel | null>(null);

  const cssPrefix: string = isArabicCurrentLanguage() ? "_ar" : "_en";
  const initialValues: UserTransactionSettingModel =
    userTransactionSettingObject ?? {
      CreatedBy: 0,
      CreationDate: new Date(),
      DeafultNote: "",
      DefaultCalcTypeID: 0,
      DefaultPaymentTypeID: 0,
      DirectPrintBillAfterSave: false,
      EnableButonAdd: false,
      EnableDiscount: false,
      EnableShangePrice: false,
      ID: 0,
      ModificationDate: new Date(),
      ModifiedBy: 0,
      Name: "",
      NumberOfCopy: 0,
      PeriodAllowForReturn: 0,
      RemarksVisable: "",
      ShowButtonPrintPrepairingOrder: false,
      ShowCalcType: false,
      ShowCinfirm: false,
      ShowCurrency: false,
      ShowCustomerCar: false,
      ShowDone: false,
      ShowEmployeeResponsibile: false,
      ShowNotefy: false,
      ShowPaymentType: false,
      ShowPrice: false,
      ShowRefrence: false,
      TransactionType_ID: 0,
      User_ID: userObject?.ID,
      VerifyOnUpdate: false,
      rowState: 0,
    };

  //#endregion
  //#region state
  const { t } = useTranslation();
  const [employeeList, setEmployeeList] = useState<LookupItem[]>([]);
  const [employeeId, setEmployeeId] = useState<number>(6);
  const [customerList, setCustomerList] = useState<LookupItem[]>([]);
  const [customerId, setCustomerId] = useState<number>(6);
  const [defaultCalcTypeList, setDefaultCalcTypeList] = useState<LookupItem[]>(
    []
  );
  const [defaultCalcTypeId, setDefaultCalcTypeId] = useState<number>(17);
  const [transactionTypeList, setTransactionTypeList] = useState<LookupItem[]>(
    []
  );
  const [currencyList, setCurrencyList] = useState<LookupItem[]>([]);
  const [paymentTypeList, setPaymentTypeList] = useState<LookupItem[]>([]);
  const [paymentTypeId, setPaymentTypeId] = useState<number>(2);
  const [currencyId, setcurrencyId] = useState<number>(6);
  const [transactionTypeId, setTransactionTypeId] = useState<number>(2);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  useEffect(() => {
    const fillData = async () => {
      setLoading(true);
      // @ts-ignore
      var settings = await getTransactionSettings(
        // @ts-ignore
        userObject.ID,
        transactionTypeId
      );
      if (settings != null) {
        setUserTransactionSettingObject(settings);
      }
      var transaction = await getLookupByType(LookupTypeEnum.TransactionType);
      setTransactionTypeList(transaction);
      var calcType = await getLookupByType(LookupTypeEnum.CalcType);
      setDefaultCalcTypeList(calcType);
      var currency = await getLookupByType(LookupTypeEnum.Currency);
      setCurrencyList(currency);
      var employee = await getLookupByType(LookupTypeEnum.Employee);
      setEmployeeList(employee);
      var paymentType = await getLookupByType(LookupTypeEnum.PaymentType);
      console.log("paymentType", paymentType);

      setPaymentTypeList(paymentType);
      var customers = await getAllCustomersForDropDown();
      setCustomerList(customers);
      setLoading(false);
    };
    fillData();
  }, [transactionTypeId]);
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      NumberOfCopy: Yup.number()
        .positive(t("mustpositive"))
        .integer(t("mustintegar")),
      PeriodAllowForReturn: Yup.number()
        .positive(t("mustpositive"))
        .integer(t("mustintegar")),
      //   MaxDiscountPercentage: Yup.number().positive(t('mustpositive')).integer(t('mustintegar')),
      //   PeriodAllowToEdit: Yup.number().positive(t('mustpositive')).integer(t('mustintegar')),
    })
  );
  //#endregion
  //#region function

  const handleReset = async () => {
    onComplete(null);
  };
  const handleSubmit = async (request: UserTransactionSettingModel) => {
    try {
      setLoading(true);
      request.User_ID = userObject?.ID;
      console.log("request", request);

      const res = await saveTransactionSettings(request);
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
          <SelectBox
            labelName={getLabelName("Trans Type")}
            source={transactionTypeList}
            isSingleSelect={true}
            errorText={formik.errors.TransactionType_ID}
            onStatusChange={(e: any) => {
              console.log("e", e.value);
              formik.values.TransactionType_ID = e.value;
              setTransactionTypeId(e.value);
            }}
            selectedValues={[transactionTypeId.toString()]}
            multiselectRef={undefined}
          />
          <SelectBox
            labelName={getLabelName("Calc Type")}
            source={defaultCalcTypeList}
            isSingleSelect={true}
            errorText={formik.errors.DefaultCalcTypeID}
            onStatusChange={(e: any) => {
              console.log("e", e);
              formik.values.DefaultCalcTypeID = e.value;
              setDefaultCalcTypeId(e.value);
            }}
            selectedValues={[defaultCalcTypeId.toString()]}
            multiselectRef={undefined}
          />
          <TextBox
            labelName={getLabelName("Period Allow to Return")}
            inputName={"PeriodAllowForReturn"}
            errorText={formik.errors.PeriodAllowForReturn}
            inputValue={formik.values.PeriodAllowForReturn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
          />
          <TextBox
            labelName={getLabelName("Num. Copy")}
            inputName={"NumberOfCopy"}
            errorText={formik.errors.NumberOfCopy}
            inputValue={formik.values.NumberOfCopy}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
          />
          <SelectBox
            labelName={getLabelName("Calc Type")}
            source={paymentTypeList}
            isSingleSelect={true}
            errorText={formik.errors.DefaultPaymentTypeID}
            onStatusChange={(e: any) => {
              console.log("e", e);
              formik.values.DefaultPaymentTypeID = e.value;
              setPaymentTypeId(e.value);
            }}
            selectedValues={[paymentTypeId.toString()]}
            multiselectRef={undefined}
          />
        </div>
        <Row>
          <Col md="6" className="list-group-wrapper">
            <ul className="list-group">
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="ShowPaymentType"
                  checked={formik.values.ShowPaymentType}
                  name="ShowPaymentType"
                  label={getLabelName("Calc Type")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="ShowEmployeeResponsibile"
                  name="ShowEmployeeResponsibile"
                  checked={formik.values.ShowEmployeeResponsibile}
                  label={getLabelName("Employee")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="ShowCalcType"
                  checked={formik.values.ShowCalcType}
                  name="ShowCalcType"
                  label={getLabelName("Calc Type")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="ShowCurrency"
                  name="ShowCurrency"
                  checked={formik.values.ShowCurrency}
                  label={getLabelName("Currency")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="EnableShangePrice"
                  name="EnableShangePrice"
                  checked={formik.values.EnableShangePrice}
                  label={getLabelName("Allow Shange Price")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="EnableDiscount"
                  checked={formik.values.EnableDiscount}
                  name="EnableDiscount"
                  label={getLabelName("Allow Discount")}
                />
              </li>
            </ul>
          </Col>

          <Col md="6" className="list-group-wrapper">
            <li className="list-group-item">
              <Form.Check
                type="checkbox"
                onChange={formik.handleChange}
                id="DirectPrintBillAfterSave"
                name="DirectPrintBillAfterSave"
                checked={formik.values.DirectPrintBillAfterSave}
                label={getLabelName("Direct Print After Reserve Bill")}
              />
            </li>
            <ul className="list-group">
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="EnableButonAdd"
                  name="EnableButonAdd"
                  checked={formik.values.EnableButonAdd}
                  label={getLabelName("Enable Button Add")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="ShowPrice"
                  checked={formik.values.ShowPrice}
                  name="ShowPrice"
                  label={getLabelName("Show Price")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="ShowRefrence"
                  name="ShowRefrence"
                  checked={formik.values.ShowRefrence}
                  label={getLabelName("Show Refrence")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="ShowButtonPrintPrepairingOrder"
                  name="ShowButtonPrintPrepairingOrder"
                  checked={formik.values.ShowButtonPrintPrepairingOrder}
                  label={getLabelName("Show Print Prepairing order")}
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
