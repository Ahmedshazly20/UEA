import { ColumnsType } from "antd/es/table";
import React, {Dispatch, MutableRefObject, SetStateAction, useMemo, useRef} from "react";
import { TableColumn } from "react-data-table-component";
import {
    ActionTypeEnum,
    ItemUnitModel,
    LookupItem,
    RequestAction, SearchItemRequestModel,
    SearchItemResponseModel,
    SearchItemsTypeEnum
} from "../../../models";
import {generateGuid, getLabelName} from "../../../utils";
import { SelectBox } from "../../common/selectBox/selectBox";
import {
  handleChangeItemUnitValues,
  handleDeleteItemUnitRow,
} from "../businessLogic/itemBl";
import {Button} from "react-bootstrap";
import {TextBox} from "../..";
import _ from "lodash";
import {t} from "i18next";
//#region dataTable
export const handleGenerateAndItemUnitColumns = (
  isArabic: boolean,
  units: LookupItem[],
  setState: Dispatch<SetStateAction<ItemUnitModel[]>>,
  stateValue: ItemUnitModel[]
): ColumnsType<ItemUnitModel> => {
  return [
    {
      title: "#",
      key: "index_"+generateGuid(),
      render: (value, row, index) => Number(index || 0) + 1,
      width: '5%',
    },
    {
      title: getLabelName("unit"),
        key: "unit_"+generateGuid(),
      render: (row: ItemUnitModel, index) => (
        <SelectBox
          labelSize={0}
          selectedValues={row.Unit_ID!==null && row.Unit_ID!==undefined && row.Unit_ID>0?[row.Unit_ID.toString()]:[]}
          controlSize={12}
          isSingleSelect={true}
          labelName={""}
          source={units}
          onStatusChange={(e: LookupItem) => {
            handleChangeItemUnitValues(setState,stateValue,row.rowKey,"Unit_ID",e.value)
          }}
        />
      ),
      width: '20%',
    },
    {
      title: getLabelName("PriceSale"),
        key: "PriceSale_"+generateGuid(),
      render: (value, row: ItemUnitModel, index) => (
        <TextBox
          labelSize={0}
          controlSize={12}
          labelName={""}
          inputName={"PriceSale"}
          type="number"
          inputValue={row.PriceSale}
          onChange={(e:any)=>{
            handleChangeItemUnitValues(setState,stateValue,row.rowKey,"PriceSale",e.target.value)
          }}
        />
      ),
      width: '10%',
    },
    {
      title: getLabelName("PriceQutyBegBal"),
        key: "PriceQutyBegBal_"+generateGuid(),
      render: (value, row: ItemUnitModel, index) => (
        <TextBox
          labelSize={0}
          controlSize={12}
          labelName={""}
          inputName={"PriceQutyBegBal"}
          type="number"
          inputValue={row.PriceQutyBegBal}
          onChange={(e:any)=>{
            handleChangeItemUnitValues(setState,stateValue,row.rowKey,"PriceQutyBegBal",e.target.value)
          }}
        />
      ),
      width: '10%',
    },
    {
      title: getLabelName("QutyBegBal"),
        key: "QutyBegBal_"+generateGuid(),
      render: (value, row: ItemUnitModel, index) => (
        <TextBox
          labelSize={0}
          controlSize={12}
          labelName={""} //{t("lookup.nameAr")}
          inputName={"QutyBegBal"}
          type="number"
          inputValue={row.QutyBegBal}
          onChange={(e:any)=>{
            handleChangeItemUnitValues(setState,stateValue,row.rowKey,"QutyBegBal",e.target.value)
          }}
        />
      ),
      width: '10%',
    },
    {
      title: getLabelName("Factor"),
        key: "Factor_"+generateGuid(),
      render: (value, row: ItemUnitModel, index) => (
        <TextBox
          labelSize={0}
          controlSize={12}
          labelName={""} //{t("lookup.nameAr")}
          inputName={"Factor"}
          type="number"
          inputValue={row.Factor}
          onChange={(e:any)=>{
            handleChangeItemUnitValues(setState,stateValue,row.rowKey,"Factor",e.target.value)
          }}
        />
      ),
      width: '10%',
    },
    {
      title: getLabelName("Barcode"),
        key: "Barcode_"+generateGuid(),
      render: (value, row: ItemUnitModel, index) => (
        <TextBox
          labelSize={0}
          controlSize={12}
          labelName={""} //{t("lookup.nameAr")}
          inputName={"Barcode"}
          type="number"
          inputValue={row.Barcode}
          onChange={(e:any)=>{
            handleChangeItemUnitValues(setState,stateValue,row.rowKey,"Barcode",e.target.value)
          }}
        />
      ),
      width: '10%',
    },
    {
      title: getLabelName("IsSmallestUnit"),
        key: "IsSmallestUnit_"+generateGuid(),
      render: (value, row: ItemUnitModel, index) => (
        <TextBox
          labelSize={0}
          controlSize={2}
          labelName={""} //{t("lookup.nameAr")}
          inputName={"IsSmallestUnit"}
          type="checkbox"
          inputValue={row.IsSmallestUnit}
          onChange={(e:any)=>{
            handleChangeItemUnitValues(setState,stateValue,row.rowKey,"IsSmallestUnit",e.target.checked)
          }}
        />
      ),
      width: '10%',
    },
    {
      title:"",
        key: "action_"+generateGuid(),
      render:(value, row: ItemUnitModel, index) => (
          <>
            <Button
                variant="outline-danger"
                onClick={() => {
                  handleDeleteItemUnitRow(setState,stateValue,row.rowKey);
                }}
            >
              {getLabelName("Delete")}
            </Button>
          </>
      )
    },
  ];
};
export const handleGenerateItemListColumns=(isArabic:boolean,onActionEvent: (o: RequestAction) => void): TableColumn<SearchItemResponseModel>[] => {
  return [
          {
            name: "#",
            selector: (row, index) => Number(index || 0) + 1,
            sortable: true,
            width: "60px",
          },
          {
            name: getLabelName("ItemCode"),
            selector: (row) => row.code,
            sortable: true,
            width: "80px",
            wrap: true,
          },
          {
            name: getLabelName("ItemName"),
            selector: (row) => (isArabic ? row.nameAr : row.nameEN),
            sortable: true,
            wrap: true,
            allowOverflow: true,
          },
          {
            name: getLabelName("PriceSale"),
            selector: (row) => row.priceSale,
            sortable: true,
            allowOverflow: true,
          },
          {
            name: getLabelName("Current Balance"),
            selector: (row) => row.currentBalance,
            sortable: true,
            allowOverflow: true,
          },
          {
            name: getLabelName("PriceCost"),
            selector: (row) => row.priceCost,
            sortable: true,
            allowOverflow: true,
          },
          {
            // eslint-disable-next-line react/button-has-type
            cell: (row: SearchItemResponseModel) => (
                <>
                  <Button
                      variant=""
                      className="btn-xs btn-info mx-2"
                      onClick={() => {
                        onActionEvent({
                          id: row.id,
                          request: row,
                          action: ActionTypeEnum.Update,
                        });
                      }}
                  >
                    {getLabelName("Modify")}
                  </Button>
                  <Button
                      variant=""
                      className="btn-xs btn-danger"
                      onClick={() => {
                        onActionEvent({
                          id: row.id,
                          request: row,
                          action: ActionTypeEnum.Delete,
                        });
                      }}
                  >
                    {getLabelName("Delete")}
                  </Button>
                </>
            ),
          },
        ];
};
//#endregion
//#region header Search
export const handleGenerateSubHeaderComponent =(categoryList:LookupItem[],
                                  stateValue: SearchItemRequestModel,
                                  setState: Dispatch<SetStateAction<SearchItemRequestModel>>,
                                  filterSelectBoxMultiselectRef: MutableRefObject<any>,
                                  filterGroupSelectBoxMultiselectRef:MutableRefObject<any>,
                                                t:any
): React.ReactNode=> {
    const handleSearch = (
        searchType: SearchItemsTypeEnum,
        searchValue?: string | null,
        category?: number | null
    ) => {
        const obj = { ...stateValue };
        //@ts-ignore
        const searchValueLength: number =
            searchValue !== null ? searchValue?.length : 0;
        const searchValueMiniLength: number = 3;
        if (
            obj.searchType !== searchType &&
            searchValue !== null &&
            searchValueLength >= searchValueMiniLength
        ) {
            obj.searchGuid = _.uniqueId("searchType_");
            obj.pageNumber = 1;
        }
        if (
            obj.searchValue !== searchValue &&
            (searchValueLength >= searchValueMiniLength || obj.searchValue === null)
        ) {
            obj.searchGuid = _.uniqueId("searchValue_");
            obj.pageNumber = 1;
        }
        if (obj.categoryId !== category) {
            obj.searchGuid = _.uniqueId("searchCategory_");
            obj.pageNumber = 1;
        }
        obj.searchType = searchType;
        obj.categoryId = category;
        obj.searchValue = searchValue;
        setState(obj);
    };
    return (
        <>
            <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
                <SelectBox
                    labelName={t("Search Criteria")}
                    isSingleSelect={true}
                    selectedValues={[stateValue.searchType]}
                    source={[
                        {
                            name: t("Search By Name"),
                            nameAr: t("Search By Name"),
                            value: SearchItemsTypeEnum.ItemName,
                        },
                        {
                            name: t("Search By Code"),
                            nameAr: t("Search By Code"),
                            value: SearchItemsTypeEnum.ItemCode,
                        },
                        {
                            name: t("Search By BarCode"),
                            nameAr: t("Search By BarCode"),
                            value: SearchItemsTypeEnum.ItemBarCode,
                        },
                    ]}
                    onStatusChange={(e: LookupItem) => {
                        if (e != null) {
                            handleSearch(
                                Object.values(SearchItemsTypeEnum).filter(
                                    (p) => p === e.value
                                )[0],
                                stateValue.searchValue,
                                stateValue.categoryId
                            );
                        }
                    }}
                    multiselectRef={filterSelectBoxMultiselectRef}
                />
                <TextBox
                    labelName={"Filter By"}
                    inputName={"filterTextBox"}
                    inputValue={stateValue.searchValue}
                    onChange={(e: any) => {
                        handleSearch(
                            stateValue.searchType,
                            e.target.value,
                            stateValue.categoryId
                        );
                    }}
                />
                <SelectBox
                    labelName={t("Category")}
                    isSingleSelect={true}
                    selectedValues={
                        stateValue.categoryId !== null &&
                        stateValue.categoryId !== undefined
                            ? //@ts-ignore
                            [searchItemRequest.categoryId.toString()]
                            : null
                    } //categoryfilter.map(String)
                    source={categoryList}
                    onStatusChange={(e: LookupItem) => {
                        if (e != null) {
                            handleSearch(
                                stateValue.searchType,
                                stateValue.searchValue,
                                Number(e.value)
                            );
                        }
                    }}
                    multiselectRef={filterGroupSelectBoxMultiselectRef}
                />
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-end">
                <Button
                    variant="danger"
                    type="button"
                    className="btn btn-sm"
                    onClick={() => {
                        filterSelectBoxMultiselectRef.current.clearValue();
                        filterGroupSelectBoxMultiselectRef.current.clearValue();
                        handleSearch(stateValue.searchType, "", null);
                    }}
                >
                    {t("entity.reset")}
                </Button>
            </div>
        </>
    );
};
//#endregion
export const handleGenerateItemUnitColumns = (
    isArabic: boolean,
    units: LookupItem[],
    setState: Dispatch<SetStateAction<ItemUnitModel[]>>,
    stateValue: ItemUnitModel[]
): TableColumn<ItemUnitModel>[] => {
    return [
        {
            name: "#",
            selector: (row, index) => Number(index || 0) + 1,
            width: "50px",
        },
        {
            name: getLabelName("unit"),
            cell: (row: ItemUnitModel, index) => (
                <SelectBox
                    labelSize={0}
                    controlSize={4}
                    isSingleSelect={true}
                    labelName={""}
                    source={units}
                    onStatusChange={(e: LookupItem) => {}}
                />
            ),
            width: "600px",
            wrap: true,
            allowOverflow: true,
        },
        {
            name: getLabelName("PriceSale"),
            cell: (row: ItemUnitModel, index) => (
                <TextBox
                    labelSize={0}
                    controlSize={4}
                    labelName={""}
                    inputName={"PriceSale"}
                    type="number"
                    inputValue={row.PriceSale}
                    // errorText={formik.errors.PriceSale}
                    // inputValue={formik.values.PriceSale}
                    // onChange={formik.handleChange}
                    //onBlur={formik.handleBlur}
                />
            ),
        },
        {
            name: getLabelName("PriceQutyBegBal"),
            cell: (row: ItemUnitModel, index) => (
                <TextBox
                    labelSize={0}
                    controlSize={4}
                    labelName={""} //{t("lookup.nameAr")}
                    inputName={"PriceQutyBegBal"}
                    type="number"
                    inputValue={row.PriceQutyBegBal}
                />
            ),
        },
        {
            name: getLabelName("QutyBegBal"),
            cell: (row: ItemUnitModel, index) => (
                <TextBox
                    labelSize={0}
                    controlSize={4}
                    labelName={""} //{t("lookup.nameAr")}
                    inputName={"QutyBegBal"}
                    type="number"
                    inputValue={row.QutyBegBal}
                />
            ),
        },
        {
            name: getLabelName("Factor"),
            cell: (row: ItemUnitModel, index) => (
                <TextBox
                    labelSize={0}
                    controlSize={4}
                    labelName={""} //{t("lookup.nameAr")}
                    inputName={"Factor"}
                    type="number"
                    inputValue={row.Factor}
                />
            ),
        },
        {
            name: getLabelName("Barcode"),
            cell: (row: ItemUnitModel, index) => (
                <TextBox
                    labelSize={0}
                    controlSize={4}
                    labelName={""} //{t("lookup.nameAr")}
                    inputName={"Barcode"}
                    type="number"
                    inputValue={row.Barcode}
                />
            ),
        },
        {
            name: getLabelName("IsSmallestUnit"),
            cell: (row: ItemUnitModel, index) => (
                <TextBox
                    labelSize={0}
                    controlSize={2}
                    labelName={""} //{t("lookup.nameAr")}
                    inputName={"IsSmallestUnit"}
                    type="checkbox"
                    inputValue={row.IsSmallestUnit}
                />
            ),
        },
    ];
};
