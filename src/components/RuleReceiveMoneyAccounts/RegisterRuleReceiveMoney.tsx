import { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { ValidationError } from "../../models/validation/error";
import { isArabicCurrentLanguage } from "../../utils";
import { Button } from "react-bootstrap";
import { SaveRuleExpenseMoney } from "../../serviceBroker/ruleExpenseMoneyApiServiceBroker";
import { LoadingBox } from "../box/loadingBox";
import { useSearchParams } from "react-router-dom";
import { ruleExpenseMoneySearch } from "../../models/ruleExpenseMoney/ruleExpenseMoney";
import { ErrorValidationBox, TextBox } from "..";
import { DisplayLabelNameEnum } from "../../models/enums/enumList";

export const RegisterRuleReceiveMoney: FC<{
  request?: ruleExpenseMoneySearch | null;
  onComplete: any | null;
}> = ({ request, onComplete }) => {
  //#region varaibles

  const cssPrefix: string = isArabicCurrentLanguage() ? "_ar" : "_en";
  const initialValues: ruleExpenseMoneySearch = request ?? {
   
    Code: "",
    AccountType_ID: 0,
    Orders: 0,
    ArabicName: "",
    EnglishName: "",
    Parent_ID:0 ,
    AllParent: "",
    RegisterInTrans: false,
    Active: false,
    Notes: "",
    BeginBalance: 0,
    Total_Money: 0,
    Money_Pay: 0,
    Balance: 0,
    ShowToUser: false,
    DateCreate:  new Date(),
    BalanceInCurrency: 0,
    Account_UniqueID: "",
    TotalDebit: 0,
    TotalCredit: 0,
    NatureType: 0,
    IsParent: false,
    IsShowInCostCenter: false,
    AccountTypeId: 0,
    BranchID: 0,
    ID: 0,
    CreatedBy: 0,
    ModifiedBy: 0,
    Name: "",
    CreationDate: new Date() ,
    ModificationDate: new Date(),
    VerifyOnUpdate: false,
    rowState: 0
  };
  //#endregion
  //#region state
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      Name: Yup.string().required(t("lookup.register.nameAr.missing")),
      NameEn: Yup.string().required(t("lookup.register.nameEn.missing")),
      //IsDefault: Yup.boolean(),
    })
  );
  const typeId = Number(searchParams.get("typeId"));
  const [showValueControl, setShowValueControl] = useState(() => {
    switch (typeId) {
      case 1:
        return true;
      case 2:
        return true;
      default:
        return false;
    }
  });
  //#endregion
  //#region function
  const handleSubmit = async (request: ruleExpenseMoneySearch) => {
    try {
      setLoading(true);
      request.AccountType_ID = typeId; // Number(searchParams.get("typeId"));
      const res = await SaveRuleExpenseMoney(request);
      if (res != null && res.Errors != null && res.Errors.length !== 0) {
        setValidationErrors(res.Errors);
        setLoading(false);
      } else {
        setValidationErrors([]);
        onComplete(true);
      }
    } catch (err: any) {
      setLoading(false);
      const errors: ValidationError[] = [{ MessageAr: err, MessageEn: err }];
      setValidationErrors(errors);
    }
  };
  const validate = (values: ruleExpenseMoneySearch): any => {
    // @ts-ignore
    const errors: any = {};

    switch (typeId) {
      case 1:
      case 2:
        if (
          values === null ||
          values.ArabicName === undefined ||
          values.ArabicName === ""
        ) {
          errors.Value = t("lookup.register.ArabicName.missing");
        }
        break;
    }
    return errors;
  };
  //#endregion
  //#region formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validate,
    onReset: (values) => {
      console.log("reset");
      onComplete(false);
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await handleSubmit(values);
      resetForm();
    },
  });
  //#endregion
  //#region html
  console.log("values", typeId);
  return (
    <>
      {loading && <LoadingBox />}
      {<ErrorValidationBox errors={validationErrors} />}
      <form onSubmit={formik.handleSubmit}>
        <div className="row g-3">
          <TextBox
            labelName={DisplayLabelNameEnum.arabiceName.toString()} //{t("lookup.nameAr")}
            inputName={"Name"}
            errorText={formik.errors.Name}
            inputValue={formik.values.Name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="row g-3">
          <TextBox
            labelName={DisplayLabelNameEnum.englishName.toString()} //{t("lookup.nameEn")}
            inputName={"NameEn"}
            errorText={formik.errors.ArabicName}
            inputValue={formik.values.ArabicName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <div className="row g-3">
          <TextBox
            labelName={DisplayLabelNameEnum.isDefault.toString()} //{t("lookup.isDefault")}
            inputName={"Active"}
            type="checkbox"
            inputValue={formik.values.Active}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="accordion-footer">
          <div className="col-md-12 d-flex justify-content-end">
            <Button
              type="submit"
              className="btn btn-orange"
              variant="outline-primary"
            >
              {t("entity.register")}
            </Button>
            <Button
              variant="outline-primary"
              type="button"
              className="btn btn-orange"
              onClick={formik.handleReset}
            >
              {t("entity.reset")}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
  //#endregion
};
