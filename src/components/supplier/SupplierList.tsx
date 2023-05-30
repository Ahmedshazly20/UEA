import _ from "lodash";
import { Dispatch, FC, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { Button,Row,Col } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { LoadingBox, SelectBox, TableComponent, TextBox } from "..";
import {
  ActionTypeEnum,
  SearchCustomerResponseModel,
  SearchCustomerRequestModel,
  LookupItem,
  RequestAction,
  SearchCustomersTypeEnum,
} from "../../models";
import { searchSuppliers } from "../../serviceBroker/supplierApiServiceBroker";
import { getLabelName, isArabicCurrentLanguage } from "../../utils";

export const SupplierList: FC<{
  getSupplierList:(searchModel:SearchCustomerRequestModel)=> void;
  request:SearchCustomerResponseModel[];
  onActionEvent: (o: RequestAction) => void;
  onCompleteEvent?: any | null;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
  isRefresh: boolean;
  totalRows:number;
}> = ({request, onActionEvent = () => {},getSupplierList=()=>{}, onCompleteEvent = () => {},setIsRefresh, isRefresh = false,totalRows }) => {
  //#region variables
  const isArabic = isArabicCurrentLanguage();
  const defaultPageSize: number = 50;
  const initialdata: SearchCustomerResponseModel[] = request ??[]
  const { t } = useTranslation();

  const columns: TableColumn<SearchCustomerResponseModel>[] = [
    {
      name: "#",
      selector: (row, index) => Number(index || 0) + 1,
      sortable: true,
    },
    {
      name: getLabelName("Code"),
      selector: (row) => row.Code,
      sortable: true,
      wrap: true
    },
    {
      name: getLabelName("Name"),
      selector: (row) => (isArabic ? row.Name : row.Name_En),
      sortable: true,
      wrap: true,
      grow: 10,
    },
    {
      name: getLabelName("Mobile"),
      selector: (row) => row.Mobile,
      sortable: true,
    },
    {
      name: getLabelName("Begin Bal"),
      selector: (row) => row.BalanceOfPoint,
      sortable: true,
    },
    {
      name: getLabelName("ID"),
      selector: (row) => row.IDNumber,
      sortable: true,
    },
    {
      // eslint-disable-next-line react/button-has-type
      cell: (row: any) => (
        <button
        className="btn btn-primary btn-xs"
          onClick={() => {
            onActionEvent({
              id: row.ID,
              request: row,
              action: ActionTypeEnum.Update,
            });
          }}
        >
        {t("Modify")}

        </button>
      ),
    },
    {
      // eslint-disable-next-line react/button-has-type
      cell: (row: any) => (
        <button
        className="btn btn-danger btn-xs"
          onClick={() => {
            onActionEvent({
              id: row.ID,
              request: row,
              action: ActionTypeEnum.Delete,
            });
          }}
        >
          {t("Delete")}
        </button>
      ),
    },
  ];
  //#endregion
  //#region state
  //const [categoryList, setCategoryList] = useState<LookupItem[]>([]);
  const[searchValue,setSearchValue]=useState("");

  const [searchCustomerRequest, setSearchCustomerRequest] =
    useState<SearchCustomerRequestModel>({
      pageNumber: 1,
      pageSize: defaultPageSize,
      searchType: SearchCustomersTypeEnum.CustomerName,
      searchValue:searchValue

    });
  const [loading, setLoading] = useState(false);
  //#endregion
  //#region useEffect

  //#endregion
  //#region functions
  const handleSearch = async() => {
    setLoading(true);
     await getSupplierList(searchCustomerRequest);
     setLoading(false);
    };
  const onCurrentPageChange = async (pageNumber: number) => {
    if (pageNumber !== searchCustomerRequest.pageNumber) {
      const obj = { ...searchCustomerRequest };
      obj.pageNumber = pageNumber;
      setSearchCustomerRequest(obj);
      searchCustomerRequest.pageNumber=pageNumber

    }
    getSupplierList(searchCustomerRequest)
  };
  const onPageSizeChange = async (pageSize: number) => {
    if (pageSize !== searchCustomerRequest.pageSize) {
      const obj = { ...searchCustomerRequest };
      obj.pageSize = pageSize;
      setSearchCustomerRequest(obj);
      searchCustomerRequest.pageSize=pageSize
    }

    getSupplierList(searchCustomerRequest)


  };
  //#endregion
  //#region component
  
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">

              <TextBox
                labelName={""}
                inputName={"filterTextBox"}
                inputValue={searchValue}
                onChange={(e: any) => {
                  setSearchCustomerRequest({
                    ...searchCustomerRequest,
                    searchValue: e.target.value
                  });
                  setSearchValue(e.target.value);
                }}
            />
           
            <Button onClick={() => {
                  handleSearch();
                }} >{t("Search")}</Button>
            </div>
            
      <TableComponent
        columns={columns}
        data={request}
        totalRows={totalRows}
        currentPage={searchCustomerRequest.pageNumber || 1}
        pageSize={searchCustomerRequest.pageSize || defaultPageSize}
        onCurrentPageChange={onCurrentPageChange}
        onPageSizeChange={onPageSizeChange}
        paginationType="server"
      />
    </>
  );
  //#endregion
};
