import React, {FC, useEffect, useState, Dispatch, SetStateAction} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
    ActionTypeEnum,
    ItemModel,
    RequestAction,
    ValidationError,
    ItemUnitModel,
    LookupItem,
    LookupTypeEnum,
    TreeViewModel
} from "../../models";
import {ErrorValidationBox,LoadingBox,AntdTableComponent,TextBox,TreeView} from "..";
import {getLabelName, isArabicCurrentLanguage, scrollToTop} from "../../utils";
import { Button, Dropdown } from "react-bootstrap";
import { DataNode } from "rc-tree/lib/interface";
import { getCateoryTree } from "../../serviceBroker/categoryApiServiceBroker";
import { getLookupByType } from "../../serviceBroker/lookupApiServiceBroker";
import {handleGenerateAndItemUnitColumns} from "./uiHelper/dataTableColumns";
import {
    handleAddItemUnitRow,
    setItemInitialValues,
    handleSubmit,
    onTreeNodeSelected,
    handleItemComponentLoad, handleRefreshItemComponent
} from "./businessLogic/itemBl";
export const RegisterItem: FC<{
  request?: ItemModel | null;
  isRefresh: boolean;
  setIsRefresh: Dispatch<SetStateAction<boolean>>
  onActionEvent: (o: RequestAction) => void;
}> = ({ request,isRefresh=false, setIsRefresh,onActionEvent = () => {} }) => {
  //#region state
    const [, updateState] = React.useState();
    //@ts-ignore
    const forceUpdate = React.useCallback(() => updateState({}), []);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState<ItemModel>(request ?? setItemInitialValues);
  const [itemUnitList, setItemUnitList] = useState<ItemUnitModel[]>(
    request !== null &&
      request !== undefined &&
      request.ItemsInstores !== null &&
      request.ItemsInstores !== undefined &&
      request.ItemsInstores.length !== 0
      ? request.ItemsInstores[0].Item_unit
      : []
  );
  const [categoryTreeData, setCategoryTreeData] = useState<TreeViewModel[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<number>(
    request?.Cat_ID || 0
  );
  const [unitList, setUnitList] = useState<LookupItem[]>([]);
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      Name: Yup.string().required(t("nameAr.missing")),
      Name_En: Yup.string().required(t("nameEn.missing")),
    })
  );
  //#endregion
  //#region variables
  const isArabic = isArabicCurrentLanguage();
  const itemUnitsAntdColumns = [
    ...handleGenerateAndItemUnitColumns(isArabic, unitList, setItemUnitList, itemUnitList),
  ];
  //#endregion
  //#region formik
  const formik = useFormik({
      initialValues: setItemInitialValues,
      //validationSchema: validationSchema,
      // validate,
      enableReinitialize: true,
      onReset: (values, {setSubmitting, resetForm}) => {
          onActionEvent({
              id: 0,
              action: ActionTypeEnum.Clear,
          });
      },
      onSubmit: async (values, {setSubmitting, resetForm}) => {
          const isSubmitted = await handleSubmit(values, itemUnitList, selectedCategory, onActionEvent, t, setItem, setItemUnitList, setLoading, setSelectedCategory, setValidationErrors);
          if (isSubmitted) {
              resetForm();
          } else {
              onActionEvent({
                  id: 0,
                  action: ActionTypeEnum.RaiseError,
              });
          }
      },
  });
  //#endregion
  //#region useEffect
  useEffect(() => {
      handleItemComponentLoad(setLoading,setCategoryTreeData,setUnitList).then();
  }, []);
  useEffect(() => {
    if (isRefresh) {
        handleRefreshItemComponent(setItem,setSelectedCategory,setIsRefresh,setValidationErrors,request).then();
    };
  }, [isRefresh]);
  //#endregion
  //#region html
  return (
    <>
        {loading && <LoadingBox />}
        {<ErrorValidationBox errors={validationErrors} />}
        <form onSubmit={formik.handleSubmit}>
           <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
            <Dropdown align={{ lg: "end" }} className="dropdown-tree">
              <Dropdown.Toggle variant="success" size="sm" id="dropdown-basic">
                Store Items
              </Dropdown.Toggle>
              < Dropdown.Menu >
                  < TreeView
                request={categoryTreeData}
                isArabic={isArabic}
                onSelect={(e:DataNode[])=>{onTreeNodeSelected(e,setSelectedCategory)}}
                selectedValues={selectedCategory!==0?[selectedCategory.toString()]:[]}
                />
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
            <TextBox
                key="Name"
              labelName={getLabelName("ItemName")} //{t("lookup.nameAr")}
              inputName="Name"
              errorText={formik.errors.Name}
              //  inputValue={item.Name}
              //   onChange={(e: any) => {
              //     formik.setFieldValue("Name", e.target.value)
              //     updateStateDynamically(setItem, item, "Name", e.target.value)
              //   }}
              inputValue={formik.values.Name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.Cat_ID ? <>{formik.errors.Cat_ID}</> : null}
            <TextBox
              labelName={getLabelName("ItemName")} //{t("lookup.nameAr")}
              inputName="Name_En"
              errorText={formik.errors.Name_En}
              inputValue={formik.values.Name_En}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextBox
              labelName={getLabelName("ItemCode")} //{t("lookup.nameAr")}
              inputName="Code"
              errorText={formik.errors.Code}
              inputValue={formik.values.Code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextBox
              labelName={getLabelName("TaxValue")} //{t("lookup.nameAr")}
              inputName="TaxValue"
              type="number"
              errorText={formik.errors.TaxValue}
              inputValue={formik.values.TaxValue}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextBox
              labelName={getLabelName("ShowInPOS")} //{t("lookup.nameAr")}
              inputName="ShowInPOS"
              type="checkbox"
              errorText={formik.errors.ShowInPOS}
              inputValue={formik.values.ShowInPOS}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextBox
              labelName={getLabelName("Without Balance")} //{t("lookup.nameAr")}
              inputName="WithoutBalance"
              type="checkbox"
              errorText={formik.errors.WithoutBalance}
              inputValue={formik.values.WithoutBalance}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="item-unit-list">
            <div className="section-title">
              <span>{getLabelName("Units")}</span>
            </div>
            <div
                className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-end"
            >
              <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => {
                    handleAddItemUnitRow(setItemUnitList,itemUnitList);
                  }}
              >
                {getLabelName("Add")}
              </Button>
            </div>
            <AntdTableComponent data={itemUnitList} columns={itemUnitsAntdColumns} />
          </div>
          <div
            className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-end"
          >
            <Button type="submit" className="btn btn-sm" variant="primary">
              {t("entity.register")}
            </Button>
            <Button
              variant="danger"
              type="button"
              className="btn btn-sm"
              onClick={formik.handleReset}
            >
              {t("entity.reset")}
            </Button>
          </div>
        </form>
      {/*</div>*/}
    </>
  );
  //#endregion
};
