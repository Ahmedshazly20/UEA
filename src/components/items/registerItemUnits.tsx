import { FC, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import {
  ActionTypeEnum,
  ItemUnitModel,
  LookupItem,
  RequestAction,
  RowState,
} from "../../models";
import { LoadingBox, SelectBox, TextBox } from "..";
import { Button, Card, Modal } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { generateGuid, getLabelName } from "../../utils";
export const RegisterItemUnit: FC<{
  request?: ItemUnitModel | null;
  units: LookupItem[];
  onActionEvent: (o: RequestAction) => void;
}> = ({ request, units, onActionEvent = () => {} }) => {
  //#region varaibles
  const initialValues: ItemUnitModel = request ?? {
    ID: 0,
    Name: "",
    ItemInstore_ID: 0,
    Unit_ID: 0,
    Price: 0,
    PriceSale: 0,
    PriceSaleWithTax: 0,
    PriceSaleInOtherCurency: 0,
    OtherCurrencyValue: 0,
    QutyBegBal: 0,
    Factor: 0,
    UnitBalance: 0,
    PriceQutyBegBal: 0,
    PriceQutyBegBalWithTax: 0,
    PriceInOtherCurency: 0,
    LastPriceBuy: 0,
    MinimumPrice: 0,
    MaximumPrice: 0,
    AddationalPrice: 0,
    AddationalPriceWithTax: 0,
    WholeSalePrice: 0,
    WholeSalePriceWithTax: 0,
    PriceCost: 0,
    Balance: 0,
    Tax: 0,
    PriceLastBuy: 0,
    ProfitPercentage: 0,
    Transporttion_Cost: 0,
    IsSmallestUnit: false,
    IsDefault: false,
    IsMultiUnit: false,
    HasItemUnitBarcode: false,
    UsedInTransaction: false,
    Barcode: "",
    ScaleBarcode: "",
    ItemType: "",
    EinvoiceItemCode: "",
    rowState: Number(RowState.Add),
    clientId: null,
    rowKey: generateGuid(),
  };
  //#endregion
  //#region state
  const { t } = useTranslation();
  const [unitId, setUnitId] = useState(initialValues.Unit_ID);
  const [loading, setLoading] = useState(false);
  const [unitList, setUnitList] = useState<LookupItem[]>(units);
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      // Unit_ID: Yup.number().min(1, t("Unit_ID.missing")),

      PriceSale: Yup.number()
        .required(t("PriceSale.missing"))
        .min(0, t("PriceSale.missing")),

      PriceQutyBegBal: Yup.number()
        .required(t("PriceQutyBegBal.missing"))
        .min(0, t("PriceQutyBegBal.missing")),

      QutyBegBal: Yup.number()
        .required(t("QutyBegBal.missing"))
        .min(0, t("QutyBegBal.missing")),

      Factor: Yup.number()
        .required(t("Factor.missing"))
        .min(0, t("Factor.missing")),
    })
  );
  const unitsRef = useRef<any>();
  //#endregion
  //#region function
  const handleSubmit = async (request: ItemUnitModel) => {
    try {
      setLoading(true);
      request.Unit_ID = unitId;
      request.clientId = request.clientId ?? generateGuid();
      // const unit: LookupItem = units.filter(
      //   (p) => p.value === unitId.toString()
      // )[0];
      // request.name = unit.name;
      // request.nameAr = unit.nameAr;
      request.rowState =
        request.ID === 0 ? Number(RowState.Add) : Number(RowState.Update);
      onActionEvent({
        id: 0,
        action: ActionTypeEnum.AddSubObjectSuccess,
        request: request,
      });
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };
  const validate = (values: ItemUnitModel): any => {
    // @ts-ignore
    const errors: any = {};
    if (unitId <= 0) {
      errors.Unit_ID = t("Unit_ID.missing");
    }
    return errors;
  };
  //#endregion
  //#region formik
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validate,
    // enableReinitialize: true,
    onReset: (values, { setSubmitting, resetForm }) => {
      onActionEvent({
        id: 0,
        action: ActionTypeEnum.Clear,
      });
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await handleSubmit(values);
      //await handleSubmit(values);
      //resetForm();
    },
  });
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      <form onSubmit={formik.handleSubmit}>
        <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
          <SelectBox
            labelName={getLabelName("Unit")}
            isSingleSelect={true}
            selectedValues={[unitId.toString()]}
            source={unitList}
            multiselectRef={unitsRef}
            onStatusChange={(e: LookupItem) => {
              setUnitId(Number(e.value));
            }}
            errorText={formik.errors.Unit_ID}
          />
          <TextBox
            labelName={getLabelName("PriceSale")} //{t("lookup.nameAr")}
            inputName={"PriceSale"}
            type="number"
            errorText={formik.errors.PriceSale}
            inputValue={formik.values.PriceSale}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextBox
            labelName={getLabelName("PriceQutyBegBal")} //{t("lookup.nameAr")}
            inputName={"PriceQutyBegBal"}
            type="number"
            errorText={formik.errors.PriceQutyBegBal}
            inputValue={formik.values.PriceQutyBegBal}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextBox
            labelName={getLabelName("QutyBegBal")} //{t("lookup.nameAr")}
            inputName={"QutyBegBal"}
            type="number"
            errorText={formik.errors.QutyBegBal}
            inputValue={formik.values.QutyBegBal}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextBox
            labelName={getLabelName("Factor")} //{t("lookup.nameAr")}
            inputName={"Factor"}
            type="number"
            errorText={formik.errors.Factor}
            inputValue={formik.values.Factor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextBox
            labelName={getLabelName("Barcode")} //{t("lookup.nameAr")}
            inputName={"Barcode"}
            errorText={formik.errors.Barcode}
            inputValue={formik.values.Barcode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextBox
            labelName={getLabelName("IsSmallestUnit")} //{t("lookup.nameAr")}
            inputName={"IsSmallestUnit"}
            type="checkbox"
            errorText={formik.errors.IsSmallestUnit}
            inputValue={formik.values.IsSmallestUnit}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-end">
          <Button type="submit" className="btn btn-sm" variant="primary">
            {t("submit")}
          </Button>
          <Button
            type="button"
            variant=""
            className="btn btn-sm btn-light"
            onClick={formik.handleReset}
          >
            {t("reset")}
          </Button>
        </div>
      </form>
    </>
  );
  //#endregion
};
