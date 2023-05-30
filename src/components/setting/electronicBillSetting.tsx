import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingBox } from "../box/loadingBox";
import { ValidationError } from "../../models/validation/error";
import { ElectronicBillSettingModel } from "../../models";
import { getLabelName, isArabicCurrentLanguage } from "../../utils";
import { saveEgypteInvoiceSettings } from "../../serviceBroker/companySettingApiServiceBroker";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { ErrorValidationBox, TextBox } from "..";
export const ElectronicBillSetting: FC<{
  request?: ElectronicBillSettingModel | null;
  onComplete?: any | null;
}> = ({ request, onComplete = () => {} }) => {
  //#region varaibles
  const cssPrefix: string = isArabicCurrentLanguage() ? "_ar" : "_en";
  const initialValues: ElectronicBillSettingModel = request ?? {
    CreatedBy: 30,
    CreationDate: new Date(),
    ID: 0,
    ModificationDate: new Date(),
    ModifiedBy: 0,
    Name: "",
    ActivityCode: "",
    ClientID: "",
    ClientSecret1: "",
    ClientSecret2: "",
    CompanyTypeCode: "",
    DllLibPath: "",
    DocumentTypeVersion: "",
    DysAllowedToUploadEinvoice: 0,
    HoursDelayToUploadTransaction: 0,
    TokenCertificate: "",
    TokenPin: "",
    address: null,
    VerifyOnUpdate: false,
    rowState: 0,
  };
  initialValues.address = initialValues.address ?? {
    branchID: "",
    buildingNumber: "",
    country: "",
    governate: "",
    regionCity: "",
    street: "",
  };
  //#endregion
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      HoursDelayToUploadTransaction: Yup.number()
        .positive(t("mustpositive"))
        .integer(t("mustintegar")),
      DysAllowedToUploadEinvoice: Yup.number()
        .positive(t("mustpositive"))
        .integer(t("mustintegar")),
    })
  );
  //#endregion
  //#region function
  const handleSubmit = async (data: ElectronicBillSettingModel) => {
    try {
      setLoading(true);
      // @ts-ignore
      const res = await saveEgypteInvoiceSettings(data);
      if (res != null && res.Errors != null && res.Errors.length !== 0) {
        setValidationErrors(res.Errors);
        setLoading(false);
      } else {
        setValidationErrors([]);
        setLoading(false);
        onComplete(true);
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
    // enableReinitialize: true,
    onReset: (values) => {
      console.log("reset");
      //onComplete(false);
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await handleSubmit(values);
      // resetForm();
    },
  });
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      {<ErrorValidationBox errors={validationErrors} />}
      <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
        <Card className="card-custom">
          <Card.Header>
            <span>{t("ElectronicBill")}</span>
          </Card.Header>
          <Card.Body>
            <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
              <TextBox
                labelName={getLabelName("Register Number")}
                inputName={"CompanyTypeCode"}
                errorText={formik.errors.CompanyTypeCode}
                inputValue={formik.values.CompanyTypeCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              />
              <TextBox
                labelName={getLabelName("Activity Code")}
                inputName={"ActivityCode"}
                errorText={formik.errors.ActivityCode}
                inputValue={formik.values.ActivityCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              />
              <TextBox
                labelName={getLabelName("Client ID")}
                inputName={"ClientID"}
                errorText={formik.errors.ClientID}
                inputValue={formik.values.ClientID}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              />
              <TextBox
                labelName={getLabelName("Client Secret 1")}
                inputName={"ClientSecret1"}
                errorText={formik.errors.ClientSecret1}
                inputValue={formik.values.ClientSecret1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              />
              <TextBox
                labelName={getLabelName("Client Secret 2")}
                inputName={"ClientSecret2"}
                errorText={formik.errors.ClientSecret2}
                inputValue={formik.values.ClientSecret2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              />
              <TextBox
                labelName={getLabelName("Branch Code")}
                inputName={"address.branchID"}
                inputValue={formik.values.address?.branchID}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              />
              <TextBox
                labelName={getLabelName("Governate")}
                inputName={"address.governate"}
                inputValue={formik.values.address?.governate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              />
              <TextBox
                labelName={getLabelName("Area")}
                inputName={"address.regionCity"}
                inputValue={formik.values.address?.regionCity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              />
              <TextBox
                labelName={getLabelName("Street")}
                inputName={"address.street"}
                inputValue={formik.values.address?.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              />
              <TextBox
                labelName={getLabelName("Building Number")}
                inputName={"address.buildingNumber"}
                inputValue={formik.values.address?.buildingNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              />
              <TextBox
                labelName={getLabelName("Hours Waiting To Upload")}
                inputName={"HoursDelayToUploadTransaction"}
                inputValue={formik.values.HoursDelayToUploadTransaction}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
              />
              <TextBox
                labelName={getLabelName("Days Can Upload Transaction")}
                inputName={"DysAllowedToUploadEinvoice"}
                inputValue={formik.values.DysAllowedToUploadEinvoice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
              />
            </div>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-end">
            <Button type="submit" className="mx-2" variant="primary">
              {t("setting.Save")}
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={formik.handleReset}
            >
              {t("setting.reset")}
            </Button>
          </Card.Footer>
        </Card>
      </form>
    </>
  );
  //#endregion
};
