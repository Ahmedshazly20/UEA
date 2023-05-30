import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone, { Accept, FileRejection, useDropzone } from "react-dropzone";
import { LoadingBox } from "../box/loadingBox";
import { ValidationError } from "../../models/validation/error";
import { CompanySetting } from "../../models/company/companySetting";
import { getLabelName, isArabicCurrentLanguage } from "../../utils";
import { SaveCompanySetting } from "../../serviceBroker/companySettingApiServiceBroker";
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { ErrorValidationBox, TextBox } from "..";
export const CompanySettingDetails: FC<{
  request?: CompanySetting | null;
  onComplete?: any | null;
}> = ({ request, onComplete = () => {} }) => {
  console.log("request", request);

  //#region varaibles
  const allowedMimeTypes: string[] = ["image/png", "image/jpg", "image/jpeg"];
  const accesptTypes: Accept = { allowedMimeTypes };

  const cssPrefix: string = isArabicCurrentLanguage() ? "_ar" : "_en";
  const initialValues: CompanySetting = request ?? {
    FormatDecimal: "",
    DefaultCurrency_ID: 0,
    Currency_ID: 0,
    CurrencyShortCut: "",
    IsTrialVersion: false,
    SoftwareName: undefined,
    Advert: undefined,
    PrintItemPrescriptionOfTransaction: false,
    BacckGroundImage: "",
    LogoImage: "",
    BackColor: 0,
    BackGroundImageName: "",
    LogoImageName: "",
    Phone: "",
    Mail: "",
    Password: "",
    DateType: false,
    TextLogo: "",
    ValueOfPoint: 0,
    SendMailOfSalesOnClose: false,
    RecivedMail: "",
    Header: undefined,
    DecimalPlace: 0,
    PathBackUp: "",
    UserNameSMS: "",
    PasswordSMS: "",
    MobileReceiver: "",
    SendSMS: false,
    SenderName: "",
    SetScaleOnPrice: false,
    SetScaleWeightonKG: false,
    UseOldModelForSearch: false,
    DefaultTaxPercentage: 0,
    ApplyTax: false,
    TaxNumber: "",
    HideItemFromCloseDay: false,
    MaxQuantity: 0,
    TransferTaxToDiscount: false,
    ShowItemPriceWithoutTax: false,
    PrintItemArabicEngInBill: false,
    Company_Address: "",
    CalcDiscountWithVAT: false,
    SetCostPriceZeroOnSalePriceZero: false,
    Is_Company_Authorized_Tobacco: false,
    WaterMarkImage: "",
    ServiceUI: "",
    IsUploadTransactionToCloud: false,
    Printer_Tablet_List: "",
    SystemSettings: "",
    IncludeVatOnEditPrice: false,
    DaysOfDeleteBackupFiles: 0,
    IsCodeTransactionSeparated: false,
    CompanyAddress: "",
    IsSentEmailReportAfterCloseDayOnly: false,
    CompanySetting_UniqueId: "",
    TermsAndCondations: "",
    IsFloorSecondeCurrency: false,
    CheckBalanceOfItemOnAdd: false,
    LogoImage64: "",
    ValueOfCurrency: 0,
    FormatDate: "",
    ArabicLanguage: "",
    EnglishLanguage: "",
    voucherSettings: undefined,
    AttachmentFolder: undefined,
    IsUploadShipmentTrackToCloud: false,
    Token: undefined,
    IsEnableToUploadEinvoice: false,
    ID: 0,
    CreatedBy: undefined,
    ModifiedBy: undefined,
    Name: "",
    CreationDate: "",
    ModificationDate: "",
    VerifyOnUpdate: false,
    Errors: [],
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
      Name: Yup.string().required(t("setting.companyName.missing")),
      DecimalPlace: Yup.number()
        .positive(t("mustpositive"))
        .integer(t("mustintegar")),
      Password: Yup.string().required(),
      Mail: Yup.string().email(t("validemail")),
      RecivedMail: Yup.string().email(t("validemail")),
      MaxQuantity: Yup.number()
        .positive(t("mustpositive"))
        .integer(t("mustintegar")),
      DefaultTaxPercentage: Yup.number()
        .positive(t("mustpositive"))
        .integer(t("mustintegar")),
    })
  );
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone();
  //#endregion
  //#region function
  const handleFileDrop = async (type: number, files: File[]) => {
    setLoading(true);
    try {
      if (files != null && files.length !== 0) {
        files.map((file) => {
          // acceptedFiles.push(file);
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            switch (type) {
              case 1:
                // @ts-ignore
                const _logoImage: string = reader.result || "";
                // @ts-ignore
                setLogoImage(
                  _logoImage.replace(/^data:image\/[a-z]+;base64,/, "")
                );
                break;
            }
          };
          reader.onabort = () => console.log("file reading was aborted");
          reader.onerror = () => console.log("file reading has failed");
          setLoading(false);
        });
      }
    } catch (err) {
      alert(err);
      setLoading(false);
    } finally {
    }
  };
  const handleFileReject = (files: FileRejection[]) => {
    files.map(async (file) => {
      alert(
        `${file.file.name} ${file.errors[0].code}  ${file.errors[0].message}`
      );
    });
    //console.log("handleFileReject", JSON.stringify(files[0]));
    //  alert("handleFileReject");
  };
  const handleSubmit = async (data: CompanySetting) => {
    try {
      setLoading(true);
      // @ts-ignore
      data.rowState = 2;
      data.LogoImageName = "";
      if (logoImage != null) {
        console.log("image_assign_1");
        data.LogoImage = logoImage;
      } else {
        console.log("image_assign_0");
      }
      const res = await SaveCompanySetting(data);
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
    initialValues: { ...initialValues },
    validationSchema: validationSchema,
    // enableReinitialize: true,
    onReset: (values) => {
      console.log("reset");
      //onComplete(false);
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log("compsnysetting", values);
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
        <Card>
          <Card.Header>
            <span>{t("CompanySetting")}</span>
          </Card.Header>
          <Card.Body>
            <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
              <TextBox
                labelName={t("setting.CompanyName")}
                inputName={"Name"}
                inputValue={formik.values.Name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorText={formik.errors.Name}
              />
              <TextBox
                labelName={t("setting.Phone")}
                inputName={"Phone"}
                inputValue={formik.values.Phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorText={formik.errors.Phone}
              />
              <TextBox
                labelName={t("setting.TextLogo")}
                inputName={"TextLogo"}
                inputValue={formik.values.TextLogo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorText={formik.errors.TextLogo}
              />
              <TextBox
                labelName={getLabelName("Address")}
                inputName={"CompanyAddress"}
                errorText={formik.errors.CompanyAddress}
                inputValue={formik.values.CompanyAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextBox
                labelName={getLabelName("Tax Number")}
                inputName={"TaxNumber"}
                errorText={formik.errors.TaxNumber}
                inputValue={formik.values.TaxNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextBox
                labelName={getLabelName("Terms and Condations")}
                inputName={"TermsAndCondations"}
                errorText={formik.errors.TermsAndCondations}
                inputValue={formik.values.TermsAndCondations}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="textarea"
              />
            </div>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label d-flex">
                  {t("setting.LogoImage64")}
                </label>
                {formik.values.LogoImage64 && (
                  <div className="img-cotainer img-thumbnail">
                    <img
                      className="img-fluid"
                      alt=""
                      src={`data:image/jpeg;base64,${formik.values.LogoImage64}`}
                    />
                  </div>
                )}
              </div>
              <div className="col-md-8">
                <label className="form-label d-flex">File Upload</label>
                <Dropzone
                  key={`dropZone-LogoImage64`}
                  accept={accesptTypes}
                  maxFiles={1}
                  onDrop={(files: File[]) => {
                    handleFileDrop(1, files).then((r) => {});
                  }}
                  onDropRejected={handleFileReject}
                >
                  {({ getRootProps, getInputProps, acceptedFiles }) => {
                    return (
                      <div className="container file-upload-custom">
                        <div {...getRootProps({ className: "dropzone" })}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here</p>
                        </div>
                        <aside>
                          <h4>Files</h4>
                          <ul>
                            {acceptedFiles.map((file, index) => (
                              <li key={`file_${index}`}>
                                {file.name} - {file.size} bytes
                              </li>
                            ))}
                          </ul>
                        </aside>
                      </div>
                    );
                  }}
                </Dropzone>
              </div>
            </div>
          </Card.Body>
          <Card.Header>
            <span>{t("SystemSetting")}</span>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xs={3}>
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="SetScaleOnPrice"
                  name="SetScaleOnPrice"
                  checked={formik.values.SetScaleOnPrice}
                  label={getLabelName(
                    "Set Scale Barcode Reading To  Price not Quntity"
                  )}
                />
              </Col>
              <Col xs={3}>
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="SetScaleWeightonKG"
                  name="SetScaleWeightonKG"
                  checked={formik.values.SetScaleWeightonKG}
                  label={getLabelName("Set Scale Weight on KG")}
                />
              </Col>
              <Col xs={3}>
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="SendMailOfSalesOnClose"
                  name="SendMailOfSalesOnClose"
                  checked={formik.values.SendMailOfSalesOnClose}
                  label={getLabelName(
                    "Send Mail With Sales on Close Application"
                  )}
                />
              </Col>
              <Col xs={3}>
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="IsSentEmailReportAfterCloseDayOnly"
                  name="IsSentEmailReportAfterCloseDayOnly"
                  checked={formik.values.IsSentEmailReportAfterCloseDayOnly}
                  label={getLabelName(
                    "Send Report Of Sales After Close Day Only"
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="HideItemFromCloseDay"
                  name="HideItemFromCloseDay"
                  checked={formik.values.HideItemFromCloseDay}
                  label={getLabelName("Remove Item From Report Close Day")}
                />
              </Col>
              <Col xs={3}>
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="CalcDiscountWithVAT"
                  name="CalcDiscountWithVAT"
                  checked={formik.values.CalcDiscountWithVAT}
                  label={getLabelName("Calc Discount With Vat")}
                />
              </Col>
              <Col xs={3}>
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="Is_Company_Authorized_Tobacco"
                  name="Is_Company_Authorized_Tobacco"
                  checked={formik.values.Is_Company_Authorized_Tobacco}
                  label={getLabelName("Is Company Authorized For Tobacco")}
                />
              </Col>
              <Col xs={3}>
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="PrintItemArabicEngInBill"
                  name="PrintItemArabicEngInBill"
                  checked={formik.values.PrintItemArabicEngInBill}
                  label={getLabelName("Print Item Name Arabic and English")}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <Form.Check
                  type="checkbox"
                  onChange={formik.handleChange}
                  id="IncludeVatOnEditPrice"
                  name="IncludeVatOnEditPrice"
                  checked={formik.values.IncludeVatOnEditPrice}
                  label={getLabelName("Include Vat On Edit Price")}
                />
              </Col>
            </Row>
            <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
              <TextBox
                labelName={getLabelName("Decimal Place Number")}
                inputName={"DecimalPlace"}
                errorText={formik.errors.DecimalPlace}
                inputValue={formik.values.DecimalPlace}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
              />
              <TextBox
                labelName={getLabelName("CurrentPasswordText")}
                inputName={"DecimalPlace"}
                errorText={formik.errors.Password}
                inputValue={formik.values.Password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
              />
              <TextBox
                labelName={getLabelName("Recived Mail")}
                inputName={"RecivedMail"}
                errorText={formik.errors.RecivedMail}
                inputValue={formik.values.RecivedMail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              />
              <TextBox
                labelName={getLabelName("Sender Mail")}
                inputName={"Mail"}
                errorText={formik.errors.Mail}
                inputValue={formik.values.Mail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              />
              <TextBox
                labelName={getLabelName("Max Quantity")}
                inputName={"MaxQuantity"}
                errorText={formik.errors.MaxQuantity}
                inputValue={formik.values.MaxQuantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
              />
              <TextBox
                labelName={getLabelName("Default Tax Percentage")}
                inputName={"DefaultTaxPercentage"}
                errorText={formik.errors.DefaultTaxPercentage}
                inputValue={formik.values.DefaultTaxPercentage}
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
