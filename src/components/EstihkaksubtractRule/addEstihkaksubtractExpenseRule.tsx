import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  ActionTypeEnum,
  RequestAction,
  ValidationError,
  LookupItem,
  LookupModel,
  LookupTypeEnum,
} from "../../models";

import { EmployeeEstihkakSubtracResponse } from "../../models/Estihkaksubtract/EmployeeEstihkakRule";

import { ErrorValidationBox, LoadingBox, TextBox, TreeView } from "..";
import { getLabelName } from "../../utils";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { addCurrency } from "../../serviceBroker/currencyApiServiceBroker";
import { GetCurrenciesShourtCutList } from "../../serviceBroker/currencyApiServiceBroker";
import { SelectBox } from "../common/selectBox/selectBox";
import { getLookupByType } from "../../serviceBroker/lookupApiServiceBroker";
import { SaveEstihkakSubtractRule } from "../../serviceBroker/EmployeeEstihkakSubtracApiServiceBroker";

export const AddEstihkaksubtractExpenseRule: FC<{
  request?: EmployeeEstihkakSubtracResponse | null;
  onActionEvent: (o: RequestAction) => void;
}> = ({ request, onActionEvent = () => {} }) => {
  //#region varaibles
  const initialValues: EmployeeEstihkakSubtracResponse = request ?? {
    Notes: "",
    TypeRule_ID: 2,
    Name_En: "",
    Row_State: 0,
    ID: 0,
    CreatedBy: 0,
    ModifiedBy: "",
    Name: "",
    CreationDate: new Date(),
    ModificationDate: new Date(),
    VerifyOnUpdate: false,
    rowState: 1,
  };
  const [asd, setasd] = useState(request?.Name);

  useEffect(() => {
    const fillData = async () => {
      setasd(request?.Name);
    };
    fillData();
  }, []);
  console.log(asd);
  //#endregion
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [EmployeeEstihkakRule, setEmployeeEstihkakRule] =
    useState<EmployeeEstihkakSubtracResponse>(initialValues);
  const [EmployeeEstihkakRuleList, setEmployeeEstihkakRuleList] = useState<
    LookupItem[]
  >([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  console.log("initialValues", initialValues.Name);
  //I need To change It Translation customerNameAr.missing
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      Name: Yup.string().required(t("Name.missing")),
    })
  );

  const handleSubmit = async (request: EmployeeEstihkakSubtracResponse) => {
    try {
      setLoading(true);
      //@ts-ignore

      const res: ResponseBase<EmployeeEstihkakSubtracResponse> =
        await SaveEstihkakSubtractRule(request);
      if (res != null && res.Errors != null && res.Errors.length !== 0) {
        setValidationErrors(res.Errors);
        setLoading(false);
      } else {
        setValidationErrors([]);
        onActionEvent({
          id: 0,
          action: ActionTypeEnum.AddSuccess,
          request: res?.Result,
        });
      }
      setLoading(false);
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
    onReset: (values, { setSubmitting, resetForm }) => {
      onActionEvent({
        id: 0,
        action: ActionTypeEnum.Clear,
      });
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await handleSubmit(values);
      //resetForm();
    },
  });
  //#endregion

  const anme = request?.Name ?? "";

  return (
    <>
      {loading && <LoadingBox />}
      {<ErrorValidationBox errors={validationErrors} />}
      <form onSubmit={formik.handleSubmit}>
        <Table className="table table-bordered">
          <tr>
            <div className="row g-3">
              <TextBox
                // inputContainerClassName="col-md-4"
                //  labelContainerClassName="col-md-2"
                labelName={getLabelName("Name")} //{t("lookup.nameAr")}
                inputName={"Name"}
                errorText={formik.errors.Name}
                inputValue={asd}
                onChange={(e: any) => {
                  setasd(e.target.value);
                  formik.values.Name = e.target.value;
                }}
                onBlur={formik.handleBlur}
              />
              <TextBox
                // inputContainerClassName="col-md-4"
                // labelContainerClassName="col-md-2"
                labelName={getLabelName("nameEn")}
                inputName={"Name_En"}
                errorText={formik.errors.Name_En}
                inputValue={formik.values.Name_En}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="row g-3">
              <TextBox
                // inputContainerClassName="col-md-4"
                // labelContainerClassName="col-md-2"
                labelName={getLabelName("Notes")}
                inputName={"Notes"}
                errorText={formik.errors.Notes}
                inputValue={formik.values.Notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="row g-3">
              <div className="accordion-footer">
                <div className="col-md-12 d-flex justify-content-end">
                  <Button
                    type="submit"
                    className="btn btn-orange"
                    variant="outline-primary"
                  >
                    {t("entity.register")}
                  </Button>
                </div>
              </div>
            </div>
          </tr>
        </Table>
      </form>
    </>
  );
};
