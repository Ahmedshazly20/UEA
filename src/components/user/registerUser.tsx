import { useFormik } from "formik";
import * as Yup from "yup";
import { FC, useState } from "react";
import {
  RequestAction,
  UserRegisterationOptionsRequest,
  UserRegisterationResponse,
  ValidationError,
  ActionTypeEnum,
  RowState,
} from "../../models";
import { ErrorValidationBox, TextBox, LoadingBox } from "..";
import { useTranslation } from "react-i18next";
import { getLabelName } from "../../utils";
import { Button } from "react-bootstrap";
import { registerUser } from "../../serviceBroker/userApiServiceBroker";
export const RegisterUser: FC<{
  request?: UserRegisterationResponse | null;
  options?: UserRegisterationOptionsRequest | null;
  onActionEvent: (o: RequestAction) => void;
}> = ({ request, options, onActionEvent }) => {
  //#region variables
  options = options ?? {
    isUserNameModifiable: true,
    isPasswordModifiable: true,
    isNameArModifiable: true,
    isNameEnModifiable: true,
    isAdminModifiable: true,
  };
  const initialValues: UserRegisterationResponse = request ?? {
    User_Name: "",
    Name_EN: "",
    Name: "",
    Password: "",
    IsAdmin: false,
    JWT: undefined,
    ID: 0,
    CreatedBy: 0,
    ModifiedBy: 0,
    Errors: [],
    rowState: Number(RowState.Add),
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
      User_Name: options.isUserNameModifiable
        ? Yup.string().required(t("required"))
        : Yup.string(),
      Name: options.isNameArModifiable
        ? Yup.string().required(t("required"))
        : Yup.string(),
      Password: options.isPasswordModifiable
        ? Yup.string().required(t("required"))
        : Yup.string(),
    })
  );
  //#endregion
  //#region function
  const handleSubmit = async (request: UserRegisterationResponse) => {
    try {
      setLoading(true);
      request.rowState =
        request.ID === 0 ? Number(RowState.Add) : Number(RowState.Update);
      const res = await registerUser(request);
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
    onReset: (values, { resetForm }) => {
      //resetForm();
    },
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
        <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
          <TextBox
            key="User_Name"
            labelName="User Name"
            inputName="User_Name"
            placeHolder="User Name"
            isMandatory={true}
            isReadOnly={!options.isUserNameModifiable}
            inputValue={formik.values.User_Name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorText={formik.errors.User_Name}
          />

          <TextBox
            key="Password"
            labelName="Password"
            placeHolder="Password"
            inputName="Password"
            type="password"
            isMandatory={true}
            isReadOnly={!options.isUserNameModifiable}
            inputValue={formik.values.Password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorText={formik.errors.Password}
          />

          <TextBox
            key="Name_EN"
            labelName="Arabic Name"
            placeHolder="Arabic Name"
            inputName="Name"
            isMandatory={true}
            isReadOnly={!options.isUserNameModifiable}
            inputValue={formik.values.Name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorText={formik.errors.Name}
          />

          <TextBox
            key="Name_EN"
            labelName="English Name"
            placeHolder="English Name"
            inputName="Name_EN"
            isMandatory={false}
            isReadOnly={!options.isUserNameModifiable}
            inputValue={formik.values.Name_EN}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorText={formik.errors.Name_EN}
          />

          <TextBox
            key="IsAdmin"
            labelName="Is Admin"
            inputName="IsAdmin"
            type="checkbox"
            isReadOnly={!options.isUserNameModifiable}
            inputValue={formik.values.IsAdmin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="row">
        <div className="col-12 d-flex justify-content-end">
            <Button
              type="submit"
              variant=""
              className="btn-gradient-primary mx-3 btn-fw"
            >
              {getLabelName("Save")}
            </Button>
            <Button
              variant="danger"
              type="button"
              className="btn-fw"
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
