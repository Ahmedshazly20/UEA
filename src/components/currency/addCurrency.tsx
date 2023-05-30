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

import { CurrencyResponse } from "../../models/currency/currencyResponse";

import { ErrorValidationBox, LoadingBox, TextBox, TreeView } from "..";
import { getLabelName } from "../../utils";
import { Button } from "react-bootstrap";
import { addCurrency } from "../../serviceBroker/currencyApiServiceBroker";
import { GetCurrenciesShourtCutList } from "../../serviceBroker/currencyApiServiceBroker";
import { SelectBox } from "../common/selectBox/selectBox";
import { getLookupByType } from "../../serviceBroker/lookupApiServiceBroker";

export const AddCurrency: FC<{
  request?: CurrencyResponse | null;
  onActionEvent: (o: RequestAction) => void;
}> = ({ request, onActionEvent = () => {} }) => {
  //#region varaibles
  const initialValues: CurrencyResponse = request ?? {
    ArabicName: "",
    EnglishName: "",
    ShortCutArab: "",
    ShorCutEng: "",
    IsDefault: false,
    Value: 0,
    Note: "",
    ArabicShourtCut: "",
    EnglishShourtCust: "",
    CountryName: "",
    ID: 0,
    CreatedBy: 0,
    ModifiedBy: 0,
    Name: "",
    CreationDate: new Date(),
    VerifyOnUpdate: false,
    rowState: 1,
  };

  //#endregion
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [currencyUnit, setcurrencyUnit] = useState<string>(
    initialValues?.ShortCutArab
  );
  const [currency, setCurrency] = useState<CurrencyResponse>(initialValues);
  const [CurrenciesShourtCutList, setCurrenciesShourtCutList] = useState<
    LookupItem[]
  >([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );

  //I need To change It Translation customerNameAr.missing
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      ShortCutArab: Yup.string().required(t("ShortCutArab.missing")),
      ArabicName: Yup.string().required(t("ArabicName.missing")),
      Value: Yup.number().required(t("Value.missing")),
    })
  );
  //#endregion
  //#region function
  useEffect(() => {
    const fillData = async () => {
      setLoading(true);
      var res = await GetCurrenciesShourtCutList();
      setCurrenciesShourtCutList(res);
      setLoading(false);
    };
    fillData();
  }, []);
  const handleSubmit = async (request: CurrencyResponse) => {
    try {
      console.log("Request", request);
      setLoading(true);
      //@ts-ignore

      const res: ResponseBase<CurrencyResponse> = await addCurrency(request);
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
  return (
    <>
      {loading && <LoadingBox />}
      {<ErrorValidationBox errors={validationErrors} />}
      <form onSubmit={formik.handleSubmit}>
        <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
          <TextBox
            //inputContainerClassName="col-md-4"
            // labelContainerClassName="col-md-2"
            labelName={getLabelName("ArabicName")} //{t("lookup.nameAr")}
            inputName={"ArabicName"}
            errorText={formik.errors.ArabicName}
            inputValue={formik.values.ArabicName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextBox
            // inputContainerClassName="col-md-4"
            // labelContainerClassName="col-md-2"
            labelName={getLabelName("EnglishName")}
            inputName={"EnglishName"}
            errorText={formik.errors.EnglishName}
            inputValue={formik.values.EnglishName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextBox
            //inputContainerClassName="col-md-4"
            //labelContainerClassName="col-md-2"
            labelName={getLabelName("Value")}
            inputName={"Value"}
            errorText={formik.errors.Value}
            inputValue={formik.values.Value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <SelectBox
            labelName={"Currency ShortCutArab"}
            source={CurrenciesShourtCutList}
            isSingleSelect={true}
            onStatusChange={(e: any) => {
              formik.values.ShortCutArab = e.value;
              setcurrencyUnit(e.label);
            }}
            selectedValues={[currencyUnit?.toString()]}
            multiselectRef={undefined}
          />
          <TextBox
            // inputContainerClassName="col-md-4"
            //labelContainerClassName="col-md-2"
            labelName={getLabelName("Note")}
            inputName={"Note"}
            errorText={formik.errors.Note}
            inputValue={formik.values.Note}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="row mt-3">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-end">
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
};
