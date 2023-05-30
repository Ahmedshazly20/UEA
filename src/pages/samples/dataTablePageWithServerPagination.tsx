import axios from "axios";
import { FC, useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { TableComponent } from "../../components";
import { LoadingBox } from "../../components/box/loadingBox";

export const DataTablePageWithServerPagination: FC<{}> = () => {
  //#region state
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  //#endregion
  //#region varaibles
  interface DataRow {
    first_name: string;
    last_name: string;
    email: string;
  }
  const columns: TableColumn<DataRow>[] = [
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    // {
    //   // eslint-disable-next-line react/button-has-type
    //   cell: (row: any) => <button onClick={handleDelete(row)}>Delete</button>,
    // },
  ];

  //#endregion
  //#region useEffect
  useEffect(() => {
    const fillData = async () => {
      await fetchUsers();
    };
    fillData();
  }, []);
  useEffect(() => {
    const fillData = async () => {
      await fetchUsers();
    };
    fillData();
  }, [currentPage, pageSize]);
  //#endregion;
  //#region function
  const onCurrentPageChange = async (newPageNumber: number) => {
    if (newPageNumber !== currentPage) {
      console.log(
        "current page number change",
        newPageNumber,
        " ",
        currentPage
      );
      setCurrentPage(newPageNumber);
    }
  };
  const onPageSizeChange = async (newPageSize: number) => {
    if (newPageSize !== pageSize) {
      console.log("current page size change", newPageSize, " ", pageSize);
      setPageSize(newPageSize);
    }
  };
  const fetchUsers = async () => {
    setLoading(true);
    const url: string = `https://reqres.in/api/users?page=${currentPage}&per_page=${pageSize}&delay=1`;
    console.log("url_1", url);
    const response = await axios.get(url);
    setData(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  };
  //#endregion
  //#region html

  return (
    <>
      {loading && <LoadingBox />}
      {data !== null && data.length !== 0 && (
        <TableComponent
          columns={columns}
          data={data}
          totalRows={totalRows}
          currentPage={currentPage}
          pageSize={pageSize}
          paginationType="server"
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </>
  );
  //#endregion
};
