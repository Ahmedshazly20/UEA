import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { addCategory } from "../../serviceBroker/categoryApiServiceBroker";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ActionTypeEnum,
  CategoryResponseModel,
  ValidationError,
} from "../../models";
import { LoadingBox } from "../box/loadingBox";
import { ErrorValidationBox } from "../box/errorValidationBox";
import { TextBox } from "../common/textBox/textBox";
import { getLabelName } from "../../utils";
export const AddCategory = (props: any) => {
  const initialState: CategoryResponseModel = props.request;

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      Name: Yup.string().required(t("categoryNameAr.missing")),
    })
  );

  const handleSubmit = async (request: CategoryResponseModel) => {
    try {
      setLoading(true);
      //@ts-ignore
      const res: ResponseBase<StoreResponse> = await addCategory(request);
      if (res != null && res.Errors != null && res.Errors.length !== 0) {
        setValidationErrors(res.Errors);
        setLoading(false);
        props.onComplete(false);
      } else {
        setValidationErrors([]);
        setLoading(false);
        props.onActionEvent({ id: 0, action: ActionTypeEnum.AddSuccess });
      }
    } catch (err: any) {
      setLoading(false);
      const errors: ValidationError[] = [{ MessageAr: err, MessageEn: err }];
      setValidationErrors(errors);
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    enableReinitialize: true,

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await handleSubmit(values);
      resetForm();
    },
  });
  return (
    <>
      {loading && <LoadingBox />}
      {<ErrorValidationBox errors={validationErrors} />}
      <form className="forms-sample" onSubmit={formik.handleSubmit}>
        <Container>
          <div className="row row-cols-2 row-cols-xxl-2 row-cols-xl-2 row-cols-lg-2 row-cols-md-2 row-cols-sm-2 g-sm-2 g-md-4 align-items-start">
            <TextBox
              labelName={getLabelName("Arabic Name")}
              inputName={"Name"}
              errorText={formik.errors.Name}
              inputValue={formik.values.Name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <TextBox
              labelName={getLabelName("Name English")}
              inputName={"Name_En"}
              errorText={formik.errors.Name_En}
              inputValue={formik.values.Name_En}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <TextBox
              labelName={getLabelName("Discount Default Ration")}
              inputName={"Default_Discount_Percentage"}
              errorText={formik.errors.Default_Discount_Percentage}
              inputValue={formik.values.Default_Discount_Percentage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
            />

            <TextBox
              labelName={getLabelName("Disply Sequence")}
              inputName={"DisplySequence"}
              errorText={formik.errors.DisplySequence}
              inputValue={formik.values.DisplySequence}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
            />
            <TextBox
              labelName={getLabelName("Is Default")}
              inputName={"IsDefault"}
              errorText={formik.errors.IsDefault}
              inputValue={formik.values.IsDefault}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="checkbox"
            />
            <TextBox
              labelName={getLabelName("Is Parent")}
              inputName={"IsDefault"}
              errorText={formik.errors.IsParent}
              inputValue={formik.values.IsParent}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="checkbox"
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-end">
            <Button
              type="submit"
              variant=""
              className="btn-primary btn-sm mx-3"
            >
              {formik.values.rowState == 1 ? t("user.Add") : t("user.Modify")}
            </Button>
            <Button
              variant="danger"
              type="button"
              className="btn-sm"
              onClick={(e) => {
                props.onActionEvent({ id: 0, action: ActionTypeEnum.Clear });
              }}
            >
              {getLabelName("Cancel")}
            </Button>
          </div>
        </Container>
      </form>
    </>
  );
};
