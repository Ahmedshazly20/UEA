import { Dispatch, FC, SetStateAction } from "react";
import { Pagination } from "react-bootstrap";

const pageSizes = [5, 10, 25, 50, 100, 200, 500];
export const Pager: FC<{
  setPageSize: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  pageSize: number;
  rowsCount: number;
  alwaysShown?: boolean;
  // onPageSizeChange?: any | null;
  // onCurrentPageChange?: any | null;
}> = ({
  setPageSize,
  setCurrentPage,
  currentPage,
  pageSize = 50,
  rowsCount,
  alwaysShown = true,
  // onPageSizeChange,
  // onCurrentPageChange,
}) => {
  //#region variables
  let isPageNumberOutOfRange: boolean = false;
  const pagesCount = Math.ceil(rowsCount / pageSize);
  console.log("pager", rowsCount, pageSize);
  const isPaginationShown = alwaysShown ? true : pagesCount > 1;
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pagesCount;
  //#endregion
  //#region functions
  const generaterPageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageNumber - currentPage) <= 2;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
      return (
        <Pagination.Item
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </Pagination.Item>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <Pagination.Ellipsis key={pageNumber} className="muted" />;
    }

    return null;
  });
  const changeCurrentPage = (number: number) => {
    if (currentPage === number) return;
    setCurrentPage(number);
    //onCurrentPageChange(number);
  };
  const onPageNumberClick = (pageNumber: number) => {
    changeCurrentPage(pageNumber);
  };
  const onPreviousPageClick = () => {
    changeCurrentPage(currentPage - 1);
  };
  const onNextPageClick = () => {
    changeCurrentPage(currentPage + 1);
  };
  //#endregion
  if (rowsCount !== 0 && pagesCount !== 0) {
    return (
      <div className="table-footer-control">
        <select
          className="form-select width-auto"
          onChange={(event) => {
            //onPageSizeChange(Number(event.target.value), 1);
            setPageSize(Number(event.target.value));
            setCurrentPage(1);
          }}
          value={pageSize}
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        {isPaginationShown && (
          <Pagination>
            <Pagination.Prev
              onClick={onPreviousPageClick}
              disabled={isCurrentPageFirst}
            />
            {generaterPageNumbers}
            <Pagination.Next
              onClick={onNextPageClick}
              disabled={isCurrentPageLast}
            />
          </Pagination>
        )}
      </div>
    );
  }
  return null;
};
