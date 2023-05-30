import { useFormik } from "formik";
import * as Yup from "yup";
import React, { FC, useEffect,useState } from "react";
import {
  RequestAction,
  AccrualSubtractItemModel,
  ValidationError,
  ActionTypeEnum,
  RowState,
} from "../../models";
import { ErrorValidationBox, TextBox, LoadingBox } from "..";
import { useTranslation } from "react-i18next";
import { getLabelName } from "../../utils";
import { Button, Col, Container, Row } from "react-bootstrap";
import { SaveAccrualSubtractRule } from "../../serviceBroker/EmployeeEstihkakSubtracApiServiceBroker";
export const AddDueSubtractRule: FC<{
  request: AccrualSubtractItemModel;
  onActionEvent: (o: RequestAction) => void;
}> = ({ request, onActionEvent }) => {
  //#region varaibles

  const initialValues: AccrualSubtractItemModel = request
  //#endregion
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
const validationSchema = Yup.object({
    Name:  Yup.string().required(t("required"))
    })
  
  //#endregion
  //#region function
  const handleSubmit = async (request: AccrualSubtractItemModel) => {
    try {
      setLoading(true);
      request.rowState =
        request.ID === 0 ? Number(RowState.Add) : Number(RowState.Update);
      const res = await SaveAccrualSubtractRule(request);
      if (res != null && res.Errors != null && res.Errors.length !== 0) {
        setValidationErrors(res.Errors);
        setLoading(false);
      } else {
        setValidationErrors([]);
        setLoading(false);
        onActionEvent({ id: 0, action: ActionTypeEnum.AddSuccess });
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
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      {<ErrorValidationBox errors={validationErrors} />}
      <form className="forms-sample" onSubmit={formik.handleSubmit}>
      <div className="row row-cols-2 row-cols-xxl-2 row-cols-xl-2 row-cols-lg-2 row-cols-md-2 row-cols-sm-2 g-sm-2 g-md-4 align-items-start">

          <TextBox
                labelName={getLabelName("Name")}
                inputName="Name"
                isMandatory={true}
                inputValue={formik.values.Name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorText={formik.errors.Name}
              />
             
          <TextBox
               labelName={getLabelName("Eng Name")}
                inputName="Name_En"
                inputValue={formik.values.Name_En}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorText={formik.errors.Name_En}
              />
                        

          
                   <TextBox
                labelName={getLabelName("Notes")}
                inputName="Notes"
                inputValue={formik.values.Notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorText={formik.errors.Notes}
                type="textarea"
              />
        </div>

            
        <div className="row">
   
          <div className="col-12 d-flex justify-content-end mb-3">
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
                onActionEvent({ id: 0, action: ActionTypeEnum.Clear });
              }}
            >
              
              {getLabelName("Cancel")}
            </Button>
          </div>
          </div>

     
      </form>
    </>
  );
  //#endregion
};
