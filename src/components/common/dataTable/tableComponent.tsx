//https://codesandbox.io/s/ccyuu?file=/src/movies.js  -->basic
//https://codesandbox.io/s/xmdju?file=/src/index.js:1950-1966  -->server side pagination
//https://codesandbox.io/s/fz295?file=/src/DataTable.js:1750-1763 -->filter
//https://react-data-table-component.netlify.app/
import { FC } from "react";
import DataTable, { Direction } from "react-data-table-component";
import { TableColumnBase } from "react-data-table-component/dist/src/DataTable/types";
import { useTranslation } from "react-i18next";
import { isArabicCurrentLanguage } from "../../../utils";
type PaginationType = "none" | "client" | "server";
export const TableComponent: FC<{
  title?: string | null;
  columns: TableColumnBase[];
  data: any[];
  totalRows: number;
  currentPage: number;
  pageSize: number;
  paginationType?: PaginationType | null;
  subHeaderComponent?: React.ReactNode | React.ReactNode[];
  onPageSizeChange?: any | null;
  onCurrentPageChange?: any | null;
}> = ({
  title,
  columns = [],
  data = [],
  totalRows,
  currentPage = 1,
  pageSize,
  paginationType = "none",
  subHeaderComponent,
  onPageSizeChange = () => {},
  onCurrentPageChange = () => {},
}) => {
  //#region state
  const { t } = useTranslation();
  //#endregion
  //#region variables
  const isArabic = isArabicCurrentLanguage();
  let isPagination: boolean = paginationType === "none" ? false : true;
  let isPaginationServer: boolean = paginationType === "server" ? true : false;
  const paginationComponentOptions = {
    // selectAllRowsItem: true,
    // selectAllRowsItemText: t("selectAllRowsFromTable"),
    rowsPerPageText: t("rowsPerPageText"),
    rangeSeparatorText: t("rangeSeparatorText"),
  };
  const rowsPerPage = [5, 10, 25, 50, 100, 200, 300, 500];
  //#endregion
  //#region private
  // const CustomPagination = (): any => {
  //   return (
  //     <>
  //       <Pager
  //         currentPage={currentPage}
  //         pageSize={pageSize}
  //         rowsCount={totalRows}
  //         onCurrentPageChange={onCurrentPageChange}
  //         onPageSizeChange={onPageSizeChange}
  //       />
  //     </>
  //   );
  // };
  //#endregion
  return (
    <>
      <DataTable
        title={title}
        columns={columns}
        data={data}
        paginationPerPage={pageSize}
        progressComponent={<>loading........</>}
        //progressPending={loading} // to be checked
        pagination={isPagination}
        paginationServer={isPaginationServer}
        paginationTotalRows={totalRows}
        paginationDefaultPage={currentPage}
        direction={isArabic ? Direction.RTL : Direction.LTR}
        onChangePage={(e) => {
          onCurrentPageChange(e);
          //setCurrentPage(e);
        }}
        //@ts-ignore
        onChangeRowsPerPage={(e) => {
          onPageSizeChange(e);
          //setPageSize(e);
        }}
        //selectableRows
        paginationComponentOptions={paginationComponentOptions}
        paginationRowsPerPageOptions={rowsPerPage}
        onSelectedRowsChange={(selectedRows) => console.log(selectedRows)}
        striped
        responsive
        subHeader
        subHeaderComponent={subHeaderComponent}
        // paginationComponent={isCustomPagination ? CustomPagination : undefined}
      />
    </>
  );
};
