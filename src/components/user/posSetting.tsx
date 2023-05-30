import { useFormik } from "formik";
import * as Yup from "yup";
import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLabelName, isArabicCurrentLanguage } from "../../utils";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  getPointOfSaleSetting,
  savePointOfSaleSettings,
} from "../../serviceBroker/userApiServiceBroker";
import { ValidationError } from "../../models/validation/error";
import { LoadingBox } from "../box/loadingBox";
import { ErrorValidationBox, TextBox } from "..";
import { UserRegisterationResponse } from "../../models/user/userRegisterationResponse";
import { LookupItem, LookupTypeEnum, POSUserSettingModel } from "../../models";
import { SelectBox } from "../common/selectBox/selectBox";
import { getLookupByType } from "../../serviceBroker/lookupApiServiceBroker";
import { getAllCustomersForDropDown } from "../../serviceBroker/customerApiServiceBroker";
export const POSSettings: FC<{
  userObject?: UserRegisterationResponse | null;
  onComplete?: any | null;
}> = ({ userObject, onComplete = () => {} }) => {
  //#region varaibles
  const [userPosSettingObject, setUserPosSettingObject] =
    useState<POSUserSettingModel | null>(null);
  useEffect(() => {
    const fillData = async () => {
      setLoading(true);
      // @ts-ignore
      var settings = await getPointOfSaleSetting(userObject.ID);
      setUserPosSettingObject(settings);
      var discounts = await getLookupByType(LookupTypeEnum.DefaultDiscountType);
      console.log("discounts", discounts);
      setDiscountTypeList(discounts);
      var notes = await getLookupByType(LookupTypeEnum.DefaultNote);
      setNoteTypeList(notes);
      var currency = await getLookupByType(LookupTypeEnum.Currency);
      setCurrencyList(currency);
      var employee = await getLookupByType(LookupTypeEnum.Employee);
      var customers = await getAllCustomersForDropDown();
      setCustomerList(customers);
      setEmployeeList(employee);
      setLoading(false);
    };
    fillData();
  }, []);
  const initialValues: POSUserSettingModel = userPosSettingObject ?? {
    Currency_ID: 0,
    Customer_ID: 0,
    Emp_ID: 0,
    AllowClickNew: false,
    AllowDeleteItems: false,
    AllowReturnWithoutBill: false,
    Ask_MoneyBox_Station: false,
    DefaultDiscountType: 0,
    DefaultNoteType: 0,
    DefaultRatioDiscount: 0,
    EnableChangeCalcType: false,
    EnableCloseDay: false,
    EnablePrintSaleReportAndPrintCloseDay: false,
    EnablePrintSavedTransaction: false,
    PortName: "",
    PrintInvoiceInA4: false,
    ShowItemForSecondScreenCustomerDisplay: false,
    UseCustomerDisplay: false,
    UseItemImageAsBackGround: false,
    WelcomeMessage: "",
    CreatedBy: 0,
    CreationDate: new Date(),
    ID: 0,
    ModificationDate: new Date(),
    ModifiedBy: 0,
    User_ID: userObject?.ID,
    VerifyOnUpdate: false,
    rowState: 1,
  };

  //#endregion
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState<LookupItem[]>([]);
  const [employeeId, setEmployeeId] = useState<number>(initialValues.Emp_ID);
  const [customerList, setCustomerList] = useState<LookupItem[]>([]);
  const [customerId, setCustomerId] = useState<number>(
    initialValues.Customer_ID
  );
  const [currencyList, setCurrencyList] = useState<LookupItem[]>([]);
  const [currencyId, setcurrencyId] = useState<number>(
    initialValues.Currency_ID
  );
  const [discountTypeList, setDiscountTypeList] = useState<LookupItem[]>([]);
  const [discountTypeId, setDiscountTypeId] = useState<number>(0);
  const [noteTypeList, setNoteTypeList] = useState<LookupItem[]>([]);
  const [noteTypeId, setNoteTypeId] = useState<number>(0);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      DefaultRatioDiscount: Yup.number()
        .positive(t("mustpositive"))
        .integer(t("mustintegar")),
    })
  );
  console.log("customerId", customerId);
  console.log("initial customer", initialValues.Customer_ID);
  console.log("customerlist", customerList);
  //#endregion
  //#region function
  const handleReset = async () => {
    onComplete(null);
  };
  const handleSubmit = async (request: POSUserSettingModel) => {
    try {
      setLoading(true);
      request.User_ID = userObject?.ID;
      console.log("request", request);

      const res = await savePointOfSaleSettings(request);
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
            labelName={getLabelName("Default Discount")}
            source={discountTypeList}
            isSingleSelect={true}
            errorText={formik.errors.DefaultDiscountType}
            onStatusChange={(e: any) => {
              formik.values.DefaultDiscountType = e.value;
              setDiscountTypeId(e.value);
              initialValues.DefaultDiscountType = e.value;
            }}
            selectedValues={[initialValues.DefaultDiscountType.toString()]}
            multiselectRef={undefined}
          />
          <SelectBox
            labelName={getLabelName("Default Notes")}
            source={noteTypeList}
            isSingleSelect={true}
            errorText={formik.errors.DefaultNoteType}
            onStatusChange={(e: any) => {
              formik.values.DefaultNoteType = e.value;
              setNoteTypeId(e.value);
              initialValues.DefaultNoteType = e.value;
            }}
            selectedValues={[initialValues.DefaultNoteType.toString()]}
            multiselectRef={undefined}
          />
          <SelectBox
            labelName={getLabelName("Customer")}
            source={customerList}
            isSingleSelect={true}
            errorText={formik.errors.Customer_ID}
            onStatusChange={(e: any) => {
              formik.values.Customer_ID = e.value;
              setCustomerId(e.value);
              initialValues.Customer_ID = e.value;
            }}
            selectedValues={[initialValues.Customer_ID.toString()]}
            multiselectRef={undefined}
          />
          <SelectBox
            labelName={getLabelName("Employee")}
            source={employeeList}
            isSingleSelect={true}
            errorText={formik.errors.Emp_ID}
            onStatusChange={(e: any) => {
              formik.values.Emp_ID = e.value;
              setEmployeeId(e.value);
              initialValues.Emp_ID = e.value;
            }}
            selectedValues={[initialValues.Emp_ID.toString()]}
            multiselectRef={undefined}
          />
          <TextBox
            labelName={getLabelName("Wellcome Message")}
            inputName={"WelcomeMessage"}
            errorText={formik.errors.WelcomeMessage}
            inputValue={formik.values.WelcomeMessage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextBox
            labelName={getLabelName("Port Name")}
            inputName={"PortName"}
            errorText={formik.errors.PortName}
            inputValue={formik.values.PortName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextBox
            labelName={getLabelName("Discount Default Ration")}
            inputName={"DefaultRatioDiscount"}
            errorText={formik.errors.DefaultRatioDiscount}
            inputValue={formik.values.DefaultRatioDiscount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
          />
          <SelectBox
            labelName={getLabelName("Currency")}
            source={currencyList}
            isSingleSelect={true}
            errorText={formik.errors.Currency_ID}
            onStatusChange={(e: any) => {
              formik.values.Currency_ID = e.value;
              setcurrencyId(e.value);
              initialValues.Currency_ID = e.value;
            }}
            selectedValues={[initialValues.Currency_ID.toString()]}
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
                  id="AllowClickNew"
                  name="AllowClickNew"
                  checked={formik.values.AllowClickNew}
                  label={getLabelName("Allow New")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="AllowDeleteItems"
                  checked={formik.values.AllowDeleteItems}
                  name="AllowDeleteItems"
                  label={getLabelName("Allow Delete Item From Bill")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="AllowReturnWithoutBill"
                  name="AllowReturnWithoutBill"
                  checked={formik.values.AllowReturnWithoutBill}
                  label={getLabelName("Allow Return ")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="Ask_MoneyBox_Station"
                  checked={formik.values.Ask_MoneyBox_Station}
                  name="Ask_MoneyBox_Station"
                  label={getLabelName(
                    "Ask For Money In Drawer On Close or Open Day"
                  )}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="EnableChangeCalcType"
                  name="EnableChangeCalcType"
                  checked={formik.values.EnableChangeCalcType}
                  label={getLabelName("Enable Change CalcT ype")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="EnableCloseDay"
                  checked={formik.values.EnableCloseDay}
                  name="EnableCloseDay"
                  label={getLabelName("Close Day")}
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
                  id="EnablePrintSaleReportAndPrintCloseDay"
                  name="EnablePrintSaleReportAndPrintCloseDay"
                  checked={formik.values.EnablePrintSaleReportAndPrintCloseDay}
                  label={getLabelName(
                    "Enable Print Sales Report And Print Close Day"
                  )}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="EnablePrintSavedTransaction"
                  checked={formik.values.EnablePrintSavedTransaction}
                  name="EnablePrintSavedTransaction"
                  label={getLabelName("Print Previous Bill")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="PrintInvoiceInA4"
                  checked={formik.values.PrintInvoiceInA4}
                  name="PrintInvoiceInA4"
                  label={getLabelName("Use A4 Invoice Print")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="ShowItemForSecondScreenCustomerDisplay"
                  checked={formik.values.ShowItemForSecondScreenCustomerDisplay}
                  name="ShowItemForSecondScreenCustomerDisplay"
                  label={getLabelName(
                    "Show Item On Second Screen Customer Display"
                  )}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="UseCustomerDisplay"
                  name="UseCustomerDisplay"
                  checked={formik.values.UseCustomerDisplay}
                  label={getLabelName("Customer Display")}
                />
              </li>
              <li className="list-group-item">
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="UseItemImageAsBackGround"
                  checked={formik.values.UseItemImageAsBackGround}
                  name="UseItemImageAsBackGround"
                  label={getLabelName("Use Item Image As BackGround")}
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
            size="sm"
            variant="danger"
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
