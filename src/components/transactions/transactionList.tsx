import {
  FC,
  useMemo,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from "react";
import { Button, Card } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import { LoadingBox, SelectBox, TableComponent, TextBox } from "..";
import {
  ActionTypeEnum,
  DailyTransactionTypeEnum,
  LookupItem,
  LookupTypeEnum,
  RequestAction,
  SearchDailyTransactionTypeEnum,
  SearchTransactionRequestModel,
  TransactionResponseModel,
  validateTransactionModeEnum,
} from "../../models";
import {
  searchTransactions,
  validateTransaction,
} from "../../serviceBroker/transactionApiServiceBroker";
import {
  generateGuid,
  getLabelName,
  getPagePrivileges,
  isArabicCurrentLanguage,
} from "../../utils";
import { getLookUp } from "./businessLogic/transactionBl";
import { gettransactionListcolumns } from "./uiHelper/dataTableColumns";
export const TransactionList: FC<{
  transactionType: DailyTransactionTypeEnum;
  onActionEvent: (o: RequestAction) => void;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
  isRefresh: boolean;
}> = ({
  transactionType,
  onActionEvent = () => {},
  setIsRefresh,
  isRefresh = false,
}) => {
  //#region variables
  const isArabic = isArabicCurrentLanguage();
  const defaultPageSize: number = 50;
  const initialValues: SearchTransactionRequestModel = {
    pageNumber: 1,
    pageSize: defaultPageSize,
    transactionType: transactionType,
    searchType: SearchDailyTransactionTypeEnum.itemName,
    searchValue: "",
  };
  const columns: TableColumn<TransactionResponseModel>[] = useMemo(
    () => [
      ...gettransactionListcolumns(isArabic),
      {
        // eslint-disable-next-line react/button-has-type
        cell: (row: TransactionResponseModel) =>
          getPagePrivileges().update && (
            <Button
              onClick={async () => {
                if (
                  await validateTransactionObject(
                    row,
                    validateTransactionModeEnum.Modify
                  )
                ) {
                  onActionEvent({
                    id: row.id,
                    //request: row,
                    action: ActionTypeEnum.ModifyStart,
                  });
                } else {
                }
              }}
            >
              {getLabelName("Modify")}
            </Button>
          ),
      },
      {
        // eslint-disable-next-line react/button-has-type
        cell: (row: TransactionResponseModel) =>
          getPagePrivileges().delete && (
            <Button
              variant="danger"
              className="btn-xs"
              onClick={async () => {
                if (
                  await validateTransactionObject(
                    row,
                    validateTransactionModeEnum.Delete
                  )
                ) {
                  onActionEvent({
                    id: row.id,
                    request: row,
                    action: ActionTypeEnum.DeleteStart,
                  });
                }
              }}
            >
              {getLabelName("Delete")}
            </Button>
          ),
      },
    ],
    [isArabic]
  );
  const searchTypeList: LookupItem[] = [
    {
      name: getLabelName("ItemName"),
      nameAr: getLabelName("ItemName"),
      value: SearchDailyTransactionTypeEnum.itemName.toString(),
    },
    {
      name: getLabelName("Code"),
      nameAr: getLabelName("Code"),
      value: SearchDailyTransactionTypeEnum.code.toString(),
    },
    {
      name: getLabelName("Id"),
      nameAr: getLabelName("Id"),
      value: SearchDailyTransactionTypeEnum.id.toString(),
    },
    {
      name: getLabelName("Serial"),
      nameAr: getLabelName("Serial"),
      value: SearchDailyTransactionTypeEnum.serial.toString(),
    },
  ];
  //#endregion
  //#region state
  const customerAccountsSelectBoxMultiselectRef = useRef<any>();
  const citiesSelectBoxMultiselectRef = useRef<any>();
  const searchTypeSelectBoxMultiselectRef = useRef<any>();
  const [data, setData] = useState<TransactionResponseModel[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [customerList, setCustomerList] = useState<LookupItem[]>([]);
  const [cityList, setCityList] = useState<LookupItem[]>([]);
  const [searchRequest, setSearchRequest] =
    useState<SearchTransactionRequestModel>(initialValues);
  //#endregion
  //#region useEffect
  useEffect(() => {
    const fillData = async () => {
      setLoading(true);
      await getAllLookups();
      await getTransactions();
      setLoading(false);
    };
    fillData();
  }, []);
  useEffect(() => {
    const fillData = async () => {
      setLoading(true);
      await getTransactions();
      setLoading(false);
    };
    fillData();
  }, [
    searchRequest.pageNumber,
    searchRequest.pageSize,
    searchRequest.searchGuid,
  ]);
  useEffect(() => {
    if (isRefresh) {
      const fillData = async () => {
        setLoading(true);
        await getTransactions();
        setLoading(false);
      };
      fillData();
      setIsRefresh(false);
    }
  }, [isRefresh]);
  //#endregion
  //#region component
  const subHeaderComponent = useMemo(() => {
    return (
      <>
        <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
          <SelectBox
            labelName={getLabelName("Customer")}
            isSingleSelect={true}
            selectedValues={
              searchRequest.customerId !== null &&
              searchRequest.customerId !== undefined
                ? //@ts-ignore
                  [searchRequest.customerId.toString()]
                : null
            } //categoryfilter.map(String)
            source={customerList}
            onStatusChange={(e: LookupItem) => {
              setSearchRequest({
                ...searchRequest,
                customerId:
                  e === null || e.value === null ? null : Number(e.value),
              });
            }}
            multiselectRef={customerAccountsSelectBoxMultiselectRef}
          />

          <SelectBox
            labelName={getLabelName("City")}
            isSingleSelect={true}
            selectedValues={
              searchRequest.cityId !== null &&
              searchRequest.cityId !== undefined
                ? //@ts-ignore
                  [searchRequest.cityId.toString()]
                : null
            }
            source={cityList}
            onStatusChange={(e: LookupItem) => {
              setSearchRequest({
                ...searchRequest,
                cityId: e === null || e.value === null ? null : Number(e.value),
              });
            }}
            multiselectRef={citiesSelectBoxMultiselectRef}
          />

          <SelectBox
            labelName={getLabelName("Search Type")}
            isSingleSelect={true}
            selectedValues={[searchRequest.searchType.toString()]}
            source={searchTypeList}
            onStatusChange={(e: LookupItem) => {
              setSearchRequest({
                ...searchRequest,
                searchType:
                  e === null || e.value === null
                    ? initialValues.searchType
                    : Number(e.value),
              });
            }}
            multiselectRef={searchTypeSelectBoxMultiselectRef}
          />

          <TextBox
            labelName={getLabelName("Search Value")}
            inputName={"filterTextBox"}
            inputValue={searchRequest.searchValue}
            onChange={(e: any) => {
              setSearchRequest({
                ...searchRequest,
                searchValue: e.target.value,
              });
            }}
          />
        </div>
        <div className="row mt-3">
          <div className="col-12 text-end">
            <Button
              variant=""
              className="btn-sm mx-2 btn-gradient-primary"
              onClick={() => {
                setSearchRequest({
                  ...searchRequest,
                  searchGuid: generateGuid(),
                });
              }}
            >
              {getLabelName("Search")}
            </Button>
            <Button
              variant="danger"
              className="btn-sm"
              onClick={() => {
                customerAccountsSelectBoxMultiselectRef.current.clearValue();
                citiesSelectBoxMultiselectRef.current.clearValue();
                searchTypeSelectBoxMultiselectRef.current.clearValue();
                setSearchRequest({
                  ...initialValues,
                  searchGuid: generateGuid(),
                });
              }}
            >
              {getLabelName("Clear")}
            </Button>
          </div>
        </div>
      </>
    );
  }, [searchRequest, customerList, cityList, searchTypeList]);
  //#endregion
  //#region functions
  const getAllLookups = async () => {
    //customers
    await getLookUp([setCustomerList], LookupTypeEnum.Customers);
    //cities
    await getLookUp([setCityList], LookupTypeEnum.Cities);
  };
  const validateTransactionObject = async (
    row: TransactionResponseModel,
    mode: validateTransactionModeEnum
  ): Promise<boolean> => {
    let result = await validateTransaction(
      row.id,
      row.creationDate,
      row.totalTax,
      mode
    );
    if (
      result.Errors !== null &&
      result.Errors !== undefined &&
      result.Errors.length !== 0
    ) {
      result.Result = false;
      onActionEvent({
        id: 0,
        request: result.Errors,
        action: ActionTypeEnum.RaiseError,
      });
    }
    return result.Result || false;
  };
  const getTransactions = async () => {
    const result = await searchTransactions(searchRequest);
    setData(result?.Result || []);
    setTotalRows(result?.TotalRecoredCount || 0);
  };
  const onCurrentPageChange = async (pageNumber: number) => {
    if (pageNumber !== searchRequest.pageNumber) {
      const obj = { ...searchRequest };
      obj.pageNumber = pageNumber;
      setSearchRequest(obj);
    }
  };
  const onPageSizeChange = async (pageSize: number) => {
    if (pageSize !== searchRequest.pageSize) {
      const obj = { ...searchRequest };
      obj.pageSize = pageSize;
      setSearchRequest(obj);
    }
  };
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      <TableComponent
        columns={columns}
        data={data}
        totalRows={totalRows}
        currentPage={searchRequest.pageNumber || 1}
        pageSize={searchRequest.pageSize || defaultPageSize}
        onCurrentPageChange={onCurrentPageChange}
        onPageSizeChange={onPageSizeChange}
        paginationType="server"
        subHeaderComponent={getPagePrivileges().search && subHeaderComponent}
      />
    </>
  );
  //#endregion
};
