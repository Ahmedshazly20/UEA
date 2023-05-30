import axios from "axios";
import { FC, useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { Pager, TableComponent } from "../../components";
import { LoadingBox } from "../../components/box/loadingBox";
export const DataTablePageWithCustomPagination: FC<{}> = () => {
  //#region state
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState<DataRow[]>([]);
  //#endregion
  //#region varaibles
  // const columns1: TableColumn<any>[] = [
  //   { name: "First Name", selector: "first_name", sortable: true },
  // ];
  interface DataRow {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  }
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
      console.log("currentPage");
      await fetchUsers();
    };
    fillData();
  }, [currentPage, pageSize]);

  //#endregion
  //#region function
  const fetchUsers = async () => {
    setLoading(true);
    const url: string = `https://reqres.in/api/users?page=${currentPage}&per_page=${pageSize}&delay=1`;
    console.log("url_6", url);
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
        <table className="table-bordered" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="width-50">#</th>
              <th>{"first_name"}</th>
              <th>{"last_name"}</th>
              <th>{"email"}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              return (
                <tr key={`test-${index}`}>
                  <td>{index + 1}</td>
                  <td>
                    <label>{row.first_name}</label>
                  </td>
                  <td>
                    <label>{row.last_name}</label>
                  </td>
                  <td>
                    <label>{row.email}</label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <Pager
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pageSize={pageSize}
        rowsCount={totalRows}
      />
    </>
  );
  //#endregion
};
