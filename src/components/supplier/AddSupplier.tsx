import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  ActionTypeEnum,
  CustomerResponse,
  RequestAction,
  ValidationError,
  LookupItem,
  LookupModel,
  LookupTypeEnum,
  SupplierCustomerType,
} from "../../models";
import {
  ErrorValidationBox,
  LoadingBox,
  SelectBox,
  TextBox,
  TreeView,
} from "..";
import { getLabelName } from "../../utils";
import { Button, Row, Col, Container, Modal } from "react-bootstrap";
import { addSupplier } from "../../serviceBroker/supplierApiServiceBroker";

import {
  getAllCountryIsoCode,
  getCustomerInvoiceType,
} from "../../serviceBroker/customerApiServiceBroker";
import { getLookupByType } from "../../serviceBroker/lookupApiServiceBroker";

export const AddSupplier: FC<{
  request: CustomerResponse;
  onActionEvent: (o: RequestAction) => void;
}> = ({ request, onActionEvent = () => {} }) => {
  //#region varaibles
 // alert(request.ID);
 request.CustomerType=request.CustomerType==null?0:request.CustomerType
  let initialValues: CustomerResponse = request 
   //#endregion
  //#region state
  const { t } = useTranslation();
  const [cityList, setCityList] = useState<LookupItem[]>([]);
  const [customerTypeList, setcustomerTypeList] = useState<LookupItem[]>([]);
  const [countryList, setCountryList] = useState<LookupItem[]>([]);

  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );

  //I need To change It Translation customerNameAr.missing
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      Name: Yup.string().required(t("customerNameAr.missing")),
    })
  );
  //#endregion
  //#region function
  useEffect(() => {
    const fillData = async () => {
      setLoading(true);
      var res = await getLookupByType(LookupTypeEnum.Cities);
      if (res != null) setCityList(res);
      var customerTpes = await getCustomerInvoiceType();
      if (customerTpes != null) setcustomerTypeList(customerTpes);
      var countries = await getAllCountryIsoCode();
      if (countries != null) setCountryList(countries);
      setLoading(false);
    };
    fillData();
  }, []);
  const handleReset = async () => {
    onActionEvent({ id: 0, action: ActionTypeEnum.Clear });
  };
  const handleSubmit = async (request: CustomerResponse) => {
    try {
      setLoading(true);
      initialValues.rowState =
        initialValues.rowState == 0 ? 2 : initialValues.rowState;
      //@ts-ignore
      const res: ResponseBase<CustomerResponse> = await addSupplier(request);
      if (res != null && res.Errors != null && res.Errors.length !== 0) {
        setValidationErrors(res.Errors);
        setLoading(false);
      } else {
        setValidationErrors([]);
        onActionEvent({
          id: 0,
          action: ActionTypeEnum.AddSuccess,
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
    // onReset: (values, { setSubmitting, resetForm }) => {
    //   onActionEvent({
    //     id: 0,
    //     action: ActionTypeEnum.Clear,
    //   });
    // },
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

              <TextBox
                labelName={getLabelName("Arabic Name")} //{t("lookup.nameAr")}
                inputName={"Name"}
                errorText={formik.errors.Name}
                inputValue={formik.values.Name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextBox
                labelName={getLabelName("English Name")}
                inputName={"Name_En"}
                errorText={formik.errors.Name_En}
                inputValue={formik.values.Name_En}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
         
              <TextBox
                labelName={getLabelName("Code")}
                inputName={"Code"}
                errorText={formik.errors.Code}
                inputValue={formik.values.Code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
        
              <TextBox
                labelName={getLabelName("E-Mail")}
                inputName={"Mail"}
                errorText={formik.errors.Mail}
                inputValue={formik.values.Mail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
          
              <TextBox
                labelName={getLabelName("Begin Bal")} //{t("lookup.nameAr")}
                inputName={"BalanceOfPoint"}
                errorText={formik.errors.Code}
                inputValue={formik.values.BalanceOfPoint}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
              />
          
              <TextBox
                labelName={getLabelName("Max Debit")} //{t("lookup.nameAr")}
                inputName={"MaxDebit"}
                errorText={formik.errors.Code}
                inputValue={formik.values.MaxDebit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
              />
     
              <TextBox
                labelName={getLabelName("Phone")} //{t("lookup.nameAr")}
                inputName={"Mobile"}
                errorText={formik.errors.Mobile}
                inputValue={formik.values.Mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
        
              <TextBox
                labelName={getLabelName("ID")} //{t("lookup.nameAr")}
                inputName={"IDNumber"}
                errorText={formik.errors.IDNumber}
                inputValue={formik.values.IDNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
          

              <TextBox
                labelName={getLabelName("Address")} //{t("lookup.nameAr")}
                inputName={"Address"}
                inputValue={formik.values.Address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
         
              <TextBox
                labelName={getLabelName("Tax Number")} //{t("lookup.nameAr")}
                inputName={"TaxNumber"}
                errorText={formik.errors.TaxNumber}
                inputValue={formik.values.TaxNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
           
              <TextBox
                labelName={getLabelName("Note")} //{t("lookup.nameAr")}
                inputName={"Notes"}
                errorText={formik.errors.Notes}
                inputValue={formik.values.Notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
     
              <SelectBox
                labelName={getLabelName("customer type")}
                source={customerTypeList}
                isSingleSelect={true}
                onStatusChange={(e: any) => {
                  formik.values.CustomerType = e.value;
                  request.CustomerType = e.value;
                }}
                selectedValues={[request.CustomerType.toString()]}
                multiselectRef={undefined}
              />
            
              <SelectBox
                controlSize={4}
                labelSize={2}
                labelName={getLabelName("country  الدوله")}
                source={countryList}
                isSingleSelect={true}
                onStatusChange={(e: any) => {
                  formik.values.address.CountryCode = e.value;
                  request.address.CountryCode = e.value;
                }}
                selectedValues={[request.address?.CountryCode]}
                multiselectRef={undefined}
              />
         
              <SelectBox
                labelName={getLabelName("City")}
                source={cityList}
                isSingleSelect={true}
                key="Select City"
                errorText={formik.errors.City_ID}
                onStatusChange={(e: any) => {
                  formik.values.City_ID = e.value;
                  request.City_ID = e.value;
                }}
                selectedValues={[request.City_ID.toString()]}
                multiselectRef={undefined}
              />
            
              <TextBox
                labelName={getLabelName("Area")} //{t("lookup.nameAr")}
                inputName={"address.RegionCity"}
                inputValue={formik.values.address?.RegionCity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
 
              <TextBox
                labelName={getLabelName("Street")} //{t("lookup.nameAr")}
                inputName={"address.Street"}
                inputValue={formik.values.address?.Street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
           
              <TextBox
                labelName={getLabelName("Building Number")} //{t("lookup.nameAr")}
                inputName={"address.buildingNumber"}
                inputValue={formik.values.address?.buildingNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextBox
                labelName={getLabelName("Remarks")} //{t("lookup.nameAr")}
                inputName={"address.Remarks"}
                inputValue={formik.values.address?.Remarks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-end mt-4">
           
            <Button type="submit"
              className="btn-gradient-primary mx-3"
              variant=""
             >
              {formik.values.rowState == 1 ? t("user.Add") : t("user.Modify")}
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={(e) => {
                handleReset();
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
