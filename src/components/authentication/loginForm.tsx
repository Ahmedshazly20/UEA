import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthenticateUserRequest } from "../../models/user/authenticateUserRequest";
import { useTranslation } from "react-i18next";
import { LoadingBox } from "../box/loadingBox";
import { useDispatch, useSelector } from "react-redux";
import { AuthenticateUserResponse } from "../../models/user/authenticateUserResponse";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../slice/userAuthincateSlice";
import { ErrorValidationBox } from "..";
import { getUser, isUserAuthenticated } from "../../utils";
import { use } from "i18next";
export const LoginForm: FC<{}> = () => {
  //#region variables region
  const redirectUrlPage: string = "/dashboard";
  const initialValues: AuthenticateUserRequest = {
    userName: "",
    password: "",
  };
  const loginPageClass = "login-page";
  //#endregion
  //#region state region
  const { t } = useTranslation();
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      userName: Yup.string().required(t("login.userNameMissing")),
      password: Yup.string().required(t("login.passwordMissing")),
    })
  );
  const user: AuthenticateUserResponse = useSelector((state: any) => ({
    ...state.user,
  }));

  const dispatch = useDispatch();
  let navigate = useNavigate();
  //#endregion
  //#region functions region
  const handleUserAuthentication = async (request: AuthenticateUserRequest) => {
    try {
      // const result = await AuthenticateUser(request);

      dispatch(
        // @ts-ignore
        authenticateUser({
          userName: request.userName,
          password: request.password,
          remember: true,
        })
      );
    } catch (err: any) {
      window.scrollTo(0, 0);
    }
  };

  //#endregion
  //#region formik region
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onReset: (values) => {},
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await handleUserAuthentication(values);
    },
  });
  //#endregion
  //#region useEffect region
  useEffect(() => {
    if (
      user &&
      user.Errors !== null &&
      user.Errors !== undefined &&
      user.Errors.length !== 0
    ) {
      window.scrollTo(0, 0);
    }
    if (user.isAuthenticated) {
      //props.history.push("/");
      navigate(redirectUrlPage);
    }
  }, []);
  useEffect(() => {
    if (
      user &&
      user.Errors !== null &&
      user.Errors !== undefined &&
      user.Errors.length !== 0
    ) {
      window.scrollTo(0, 0);
    }
    if (user.isAuthenticated) {
      navigate(redirectUrlPage);
      document.body.classList.remove('login-page');
    } else{
      document.body.classList.add('login-page');
    }
  }, [user.isAuthenticated, user.Errors]);
  //#endregion
  return (
    <>
      {user.isLoading && <LoadingBox />}

      {user != null &&
        user.Errors !== null &&
        user.Errors !== undefined &&
        user.Errors.length !== 0 && <ErrorValidationBox errors={user.Errors} />}
      <form className="pt-3" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            {t("login.userName")}{" "}
            <span className="asterisk text-danger">*</span>
          </label>
          <input
            id="userName"
            name="userName"
            type="text"
            className="form-control"
            placeholder={t("login.enter_userName")}
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.userName ? (
            <span className="field-validate">{formik.errors.userName}</span>
          ) : null}
        </div>
        <div className="mb-3">
          <label className="form-label">
            {t("login.password")}{" "}
            <span className="asterisk text-danger">*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder={t("login.enter_password")}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.userName ? (
            <span className="field-validate">{formik.errors.userName}</span>
          ) : null}
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-gradient-primary">
            {t("login.submit")}
          </button>
        </div>
      </form>
      <div className="bg-div"></div>
    </>
  );
};
