import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { StoreResponse } from "../../models/store/storeDto";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { addStore } from "../../serviceBroker/storeApiServiceBroker";
import { ActionTypeEnum, ValidationError } from "../../models";
import { LoadingBox } from "../box/loadingBox";
import { ErrorValidationBox } from "../box/errorValidationBox";
import { TextBox } from "../common/textBox/textBox";
import { getLabelName } from "../../utils";
export const AddStore = (props: any) => {
  const initialState: StoreResponse = props.request ?? {
    Address: "",
    Branch_ID: 0,
    Code: "",
    CreatedBy: 0,
    Name: "",
    Name_En: "",
    IsDefault: false,
    Phone: "",
    ID: 0,
    rowState: 1,
  };

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState<StoreResponse>(initialState);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      Name: Yup.string().required(t("storeNameAr.missing")),
    })
  );

  const handleSubmit = async (request: StoreResponse) => {
    try {
      setLoading(true);
      //@ts-ignore
      const res: ResponseBase<StoreResponse> = await addStore(request);
      if (res != null && res.Errors != null && res.Errors.length !== 0) {
        setValidationErrors(res.Errors);
        setLoading(false);
        props.onComplete(false);
      } else {
        setValidationErrors([]);
        props.onComplete(true);
      }
    } catch (err: any) {
      setLoading(false);
      const errors: ValidationError[] = [{ MessageAr: err, MessageEn: err }];
      setValidationErrors(errors);
    }
  };
  const handleReset = () => {
    props.onComplete(null);
  };
  const handleChange = (evt: any) => {
    const value = evt.target.value;

    setStore({
      ...store!,
      [evt.target.name]: value,
    });
  };
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    // enableReinitialize: true,
    onReset: (values, { setSubmitting, resetForm }) => {
      props.onActionEvent({
        id: 0,
        action: ActionTypeEnum.Clear,
      });
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await handleSubmit(values);
      //resetForm();
    },
  });
  return (
    <>
      {loading && <LoadingBox />}
      {<ErrorValidationBox errors={validationErrors} />}
      <form onSubmit={formik.handleSubmit}>
        <div className="row g-3">
          <TextBox
            labelName={getLabelName("Arabic Name")}
            inputName={"Name"}
            errorText={formik.errors.Name}
            inputValue={formik.values.Name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="row g-3">
          <TextBox
            labelName={getLabelName("Name English")}
            inputName={"Name_En"}
            errorText={formik.errors.Name_En}
            inputValue={formik.values.Name_En}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="row g-3">
          <TextBox
            labelName={getLabelName("Address")}
            inputName={"Address"}
            errorText={formik.errors.Address}
            inputValue={formik.values.Address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="row g-3">
          <TextBox
            labelName={getLabelName("Phone")}
            inputName={"Phone"}
            errorText={formik.errors.Phone}
            inputValue={formik.values.Phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="row g-3">
          <TextBox
            labelName={getLabelName("Branch")}
            inputName={"Branch_ID"}
            errorText={formik.errors.Branch_ID}
            inputValue={formik.values.Branch_ID}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
          />
        </div>

        <div className="accordion-footer">
          <div className="col-md-12 d-flex justify-content-end">
            <Button
              type="submit"
              className="btn btn-orange"
              variant="outline-primary"
            >
              {formik.values.rowState == 1 ? t("user.Add") : t("user.Modify")}
            </Button>
            <Button
              variant="outline-primary"
              type="button"
              className="btn btn-orange"
              onClick={handleReset}
            >
              {t("CloseButton")}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
