import { useFormik } from "formik";
import * as Yup from "yup";
import { FC, useState } from "react";
import {RequestAction,ValidationError,ActionTypeEnum,RowState,EmployeeResponse} from "../../models";
import { ErrorValidationBox, TextBox, LoadingBox, InputDatePickerInForm } from "..";
import { useTranslation } from "react-i18next";
import { getLabelName } from "../../utils";
import { Button } from "react-bootstrap";
import { saveEmployee } from "../../serviceBroker/employeesApiServiceBroker";
export const EmployeeForm:
FC<{request: EmployeeResponse 
  ; onActionEvent: (o: RequestAction) => void;

  }> = ({ request, onActionEvent }) => 
  {
  const initialValues: EmployeeResponse = request;
  //#endregion
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const handleSubmit = async (request: EmployeeResponse) => {
    try {
      setLoading(true);
      request.rowState =
        request.ID === 0 ? Number(RowState.Add) : Number(RowState.Update);
      const res = await saveEmployee(request);
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
  const validationSchema = Yup.object({
    Name:  Yup.string().required(t("required")),
   
    
    })
  
  //#endregion
  //#region formik
  const formik = useFormik(
    {
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await handleSubmit(values);
      resetForm();
    },
  });

  console.log("Request",request);
 
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      {<ErrorValidationBox errors={validationErrors} />}
      <form className="forms-sample" onSubmit={formik.handleSubmit}>
       
        <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
      
           
              <TextBox
                key="Name"
                labelName="Name"
                inputName="Name"
                placeHolder="Arbic Name"
                isMandatory={true}
                inputValue={formik.values.Name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorText={formik.errors.Name}
              />
            
          
              <TextBox
                key="NameEn"
                labelName="English Name"
                placeHolder="English Name"
                inputName="NameEn"
                isMandatory={true}
                inputValue={formik.values.NameEn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorText={formik.errors.NameEn}
              />
            
            <TextBox
               key="Mobile"
                labelName="Mobile"
                inputName="Mobile"
                errorText={formik.errors.Mobile}
                inputValue={formik.values.Mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
           
      

         
            <TextBox
               key="Salary"
                labelName="Salary"
                placeHolder="Salary"
                inputName="Salary"          
                inputValue={formik.values.Salary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorText={formik.errors.Salary}
            />
          
            <TextBox
                key="Percentage_Of_Sales"
                labelName="Percentage Sales"
                placeHolder="Percentage_Of_Sales"
                inputName="Percentage_Of_Sales"          
                inputValue={formik.values.Percentage_Of_Sales}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorText={formik.errors.Percentage_Of_Sales}           
            />
          
            <TextBox
                labelName="Job"
                inputName={"Job"}
                errorText={formik.errors.Job}
                inputValue={formik.values.Job}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
               
            />
           </div>
           <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <Button
              type="submit"
              variant=""
              className="btn-gradient-primary mx-3"
            >
              {getLabelName("Save")}
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={(e) => {
                formik.handleReset(e);
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
