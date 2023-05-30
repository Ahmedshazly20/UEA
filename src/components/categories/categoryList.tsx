import _ from "lodash";
import { FC, useMemo, useState,useEffect, Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { LoadingBox, TableComponent, TextBox } from "..";
import { ActionTypeEnum, CategoryResponseModel, RequestAction } from "../../models";
import { getLabelName, isArabicCurrentLanguage } from "../../utils";

export const CategoryList: FC<{
  getCategoriesList:()=>void
  request: CategoryResponseModel[];
  onActionEvent: (o: RequestAction) => void;
  onCompleteEvent?: any | null;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
  isRefresh: boolean;
  totalRows:number;
}> = ({ request, onActionEvent = () => {},getCategoriesList=()=>{},setIsRefresh, isRefresh = false,totalRows }) => {
  //#region varaiables
  const isArabic = isArabicCurrentLanguage();
  const { t } = useTranslation();
  const defaultPageSize: number = 50;
  const initialdata: CategoryResponseModel[] = request ??[]


  const columns: TableColumn<CategoryResponseModel>[] = [
    {
      name: "#",
      selector: (row, index) => Number(index || 0) + 1,
      sortable: true,
    },
    {
      name: getLabelName("Code"),
      selector: (row) => row.Code,
      sortable: true,
      grow: 100,
    },
    {
      name: getLabelName("Name"),
      selector: (row) => (isArabic ? row.Name : row.Name_En),
      sortable: true,
      grow: 100,
    },
    {
      // eslint-disable-next-line react/button-has-type
      cell: (row: any) => (
        <Button size="sm" variant="outline-primary"
          onClick={() => {
            onActionEvent({ id: row.ID, action: ActionTypeEnum.Update });
          }}
        >
          {t("user.Modify")}

        </Button>
      ),
    },
    {
      // eslint-disable-next-line react/button-has-type
      cell: (row: any) => (
        <Button size="sm" variant="outline-danger"
          onClick={() => {
            onActionEvent({ id: row.ID, action: ActionTypeEnum.Delete });
          }}
        >
          {t("user.Delete")}
        </Button>
      ),
    },
  ];

  //#endregion
  //#region state
  const [filteredData, setFilteredData] = useState<CategoryResponseModel[]>(request);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState<string>("");
  const [filterType, setFilterType] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  //#endregion
  //#region component
  // const subHeaderComponent = useMemo(() => {
  //   const handleSearch = (value: string, filterBy: number = 1) => {
  //     setLoading(true);
  //     setFilterText(value);
  //     setFilterType(filterBy);
  //     switch (filterBy) {
  //       case 1:
  //         request = _.filter(request, (row) => {
  //           return row.Name.toLowerCase().includes(value.toLowerCase());
  //         });
  //         break;
  //       case 2:
  //         request = _.filter(request, (row) => {
  //           return row.Code.toLowerCase().includes(value.toLowerCase());
  //         });
  //         break;
  //       default:
  //         request = _.filter(request, (row) => {
  //           return row.Name.toLowerCase().includes(value.toLowerCase());
  //         });
  //         break;
  //     }

  //     setCurrentPage(1);
  //     setTotalRows(request.length);
  //     setFilteredData(request);
  //     setLoading(false);
  //   };
  //   console.log('request',request);
    
  //   return (
  //     <>
  //       <TextBox
  //         labelName={"Search"}
  //         inputName={"filterTextBox"}
  //         inputValue={filterText}
  //         onChange={(e: any) => {
  //           handleSearch(e.target.value, filterType);
  //         }}
  //       />
  //       <Button
  //         onClick={() => {
  //           handleSearch("", 1);
  //         }}
  //       >
  //         X
  //       </Button>
  //       {/* <RadioCheckBox
  //         labelName={"Filter"}
  //         items={[
  //           { name: "name", text: "name", value: "1" },
  //           { name: "code", text: "code", value: "2" },
  //           { name: "group", text: "group", value: "3" },
  //           { name: "bar-code", text: "bar-code", value: "4" },
  //         ]}
  //         selectedValues={[filterType.toString()]}
  //         onChange={(e: any) => {
  //           handleSearch(filterText, Number(e.target.value));
  //         }}
  //       /> */}
  //       {/* <RadioCheckBox
  //         labelName={"test"}
  //         type="checkbox"
  //         items={[
  //           { name: "name", text: "name", value: "1" },
  //           { name: "name", text: "code", value: "2" },
  //           { name: "name", text: "group", value: "3" },
  //           { name: "name", text: "bar-code", value: "4" },
  //         ]}
  //         selectedValues={[filterType.toString()]}
  //         onChange={(e: any) => {
  //           handleSearch(filterText, Number(e.target.value));
  //         }}
  //       /> */}
  //     </>
  //   );
  // }, [filterText, filterType]);
 
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      {request !== null && request.length !== 0 && (
        <>
          <TableComponent
            columns={columns}
            data={request}
            totalRows={totalRows}
            currentPage={currentPage}
            pageSize={50}
            paginationType="client"
            //subHeaderComponent={subHeaderComponent}
          />
        </>
      )}
    </>
  );
  //#endregion
};
