import { t } from "i18next";
import _ from "lodash";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "react-bootstrap";
import { LoadingBox, SelectBox, TableComponent, TextBox } from "..";
import {
  ActionTypeEnum,
  SearchItemResponseModel,
  SearchItemRequestModel,
  LookupItem,
  RequestAction,
  SearchItemsTypeEnum,
  LookupTypeEnum,
} from "../../models";
import { searchItmes } from "../../serviceBroker/itemApiServiceBroker";
import { getLookupByType } from "../../serviceBroker/lookupApiServiceBroker";
import {  isArabicCurrentLanguage } from "../../utils";
import {handleGenerateItemListColumns, handleGenerateSubHeaderComponent} from "./uiHelper/dataTableColumns";
export const ItemList: FC<{
  onActionEvent: (o: RequestAction) => void;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
  isRefresh: boolean;
}> = ({ onActionEvent = () => {}, setIsRefresh, isRefresh = false }) => {
  //#region variables
  const isArabic = isArabicCurrentLanguage();
  const defaultPageSize: number = 10;
  //#endregion
  //#region state
  const [data, setData] = useState<SearchItemResponseModel[]>([]);
  const [categoryList, setCategoryList] = useState<LookupItem[]>([]);
  const [searchItemRequest, setSearchItemRequest] =
    useState<SearchItemRequestModel>({
      pageNumber: 1,
      pageSize: defaultPageSize,
      searchType: SearchItemsTypeEnum.ItemName,
      smallestUnit: true,
    });
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const filterSelectBoxMultiselectRef = useRef<any>();
  const filterGroupSelectBoxMultiselectRef = useRef<any>();
  //#endregion
  //#region useEffect
  useEffect(() => {
    const fillData = async () => {
      setLoading(true);
      await getItems();
      await getCategories();
      setLoading(false);
    };
    fillData();
  }, []);
  useEffect(() => {
    const fillData = async () => {
      setLoading(true);
      await getItems();
      setLoading(false);
    };
    fillData();
  }, [
    searchItemRequest.pageNumber,
    searchItemRequest.pageSize,
    searchItemRequest.searchGuid,
  ]);
  useEffect(() => {
    if (isRefresh) {
      const fillData = async () => {
        setLoading(true);
        await getItems();
        setLoading(false);
      };
      fillData();
      setIsRefresh(false);
    }
  }, [isRefresh]);

  //#endregion
  //#region functions
  const getCategories = async () => {
    const categoryLookupList = await getLookupByType(
      LookupTypeEnum.CategoryType
    );
    setCategoryList(categoryLookupList);
  };
  const getItems = async () => {
    const result = await searchItmes(searchItemRequest);
    setData(result?.Result || []);
    setTotalRows(result?.TotalRecoredCount || 0);
  };
  const onCurrentPageChange = async (pageNumber: number) => {
    if (pageNumber !== searchItemRequest.pageNumber) {
      const obj = { ...searchItemRequest };
      obj.pageNumber = pageNumber;
      setSearchItemRequest(obj);
    }
  };
  const onPageSizeChange = async (pageSize: number) => {
    if (pageSize !== searchItemRequest.pageSize) {
      const obj = { ...searchItemRequest };
      obj.pageSize = pageSize;
      setSearchItemRequest(obj);
    }
  };
  //#endregion
  //#region component
  const itemListColumns =useMemo( ()=>[
    ...handleGenerateItemListColumns(isArabic,onActionEvent),
  ],[]);
  const generateSubHeaderComponent = useMemo(() => {
    return  handleGenerateSubHeaderComponent(categoryList,searchItemRequest,setSearchItemRequest,filterSelectBoxMultiselectRef,filterGroupSelectBoxMultiselectRef,t)
  }, [searchItemRequest, categoryList]);
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      <TableComponent
        columns={itemListColumns}
        data={data}
        totalRows={totalRows}
        currentPage={searchItemRequest.pageNumber || 1}
        pageSize={searchItemRequest.pageSize || defaultPageSize}
        onCurrentPageChange={onCurrentPageChange}
        onPageSizeChange={onPageSizeChange}
        paginationType="server"
        subHeaderComponent={generateSubHeaderComponent}
      />
    </>
  );
  //#endregion
};
