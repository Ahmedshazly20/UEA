import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingBox } from "../box/loadingBox";
import { ValidationError } from "../../models/validation/error";
import { LoyaltySettingModel } from "../../models";
import { getLabelName, isArabicCurrentLanguage } from "../../utils";
import { saveVoucherSettings } from "../../serviceBroker/companySettingApiServiceBroker";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { ErrorValidationBox, TextBox } from "..";
export const LoyaltySetting: FC<{
  request?: LoyaltySettingModel | null;
  onComplete?: any | null;
}> = ({ request, onComplete = () => {} }) => {
  //#region varaibles
  const cssPrefix: string = isArabicCurrentLanguage() ? "_ar" : "_en";
  const initialValues: LoyaltySettingModel = request ?? {
    CreatedBy: 30,
    CreationDate: new Date(),
    DaysExpire: 0,
    ID: 0,
    IsActive: false,
    ModificationDate: new Date(),
    ModifiedBy: 0,
    Name: "",
    Points: 0,
    TermsCondations: "",
    Value: 0,
    ValueOfPoint: 0,
    VerifyOnUpdate: false,
    rowState: 0,
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
      ValueOfPoint: Yup.number()
        .positive(t("mustpositive"))
        .integer(t("mustintegar")),
      Points: Yup.number()
        .positive(t("mustpositive"))
        .integer(t("mustintegar")),
      Value: Yup.number().positive(t("mustpositive")).integer(t("mustintegar")),
      DaysExpire: Yup.number()
        .positive(t("mustpositive"))
        .integer(t("mustintegar")),
    })
  );
  //#endregion
  //#region function
  const handleSubmit = async (data: LoyaltySettingModel) => {
    try {
      setLoading(true);
      // @ts-ignore
      const res = await saveVoucherSettings(data);
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
      <form onSubmit={formik.handleSubmit}>
        <Card className="card-custom">
          <Card.Header>
            <span>{t("PointCalc")}</span>
          </Card.Header>
          <Card.Body>
            <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
              <TextBox
                labelName={getLabelName("Value Of Point")}
                inputName={"ValueOfPoint"}
                errorText={formik.errors.ValueOfPoint}
                inputValue={formik.values.ValueOfPoint}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
              />
               <TextBox
                labelName={getLabelName("Is Active")}
                inputName={"IsActive"}
                errorText={formik.errors.IsActive}
                inputValue={formik.values.IsActive}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="checkbox"
              />
              {/* <Form.Check
                type="checkbox"
                onChange={formik.handleChange}
                id="IsActive"
                name="IsActive"
                checked={formik.values.IsActive}
                label={getLabelName("Is Active")}
              /> */}
              <TextBox
                labelName={getLabelName("Points Of Voucher")}
                inputName={"Points"}
                errorText={formik.errors.Points}
                inputValue={formik.values.Points}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
              />
              <TextBox
                labelName={getLabelName("Value of Vouchers")}
                inputName={"Value"}
                errorText={formik.errors.Value}
                inputValue={formik.values.Value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
              />
              <TextBox
                labelName={getLabelName("Days of Expire")}
                inputName={"DaysExpire"}
                errorText={formik.errors.DaysExpire}
                inputValue={formik.values.DaysExpire}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
              />
              <TextBox
                labelName={getLabelName("Terms and Condations")}
                inputName={"TermsCondations"}
                errorText={formik.errors.TermsCondations}
                inputValue={formik.values.TermsCondations}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="textarea"
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
