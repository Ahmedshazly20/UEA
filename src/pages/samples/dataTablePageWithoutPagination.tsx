import axios from "axios";
import { FC, useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { TableComponent } from "../../components";
import { LoadingBox } from "../../components/box/loadingBox";

export const DataTablePageWithoutPagination: FC<{}> = () => {
  //#region state
  const [loading, setLoading] = useState(false);
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
  //#endregion
  //#region function
  const fetchUsers = async () => {
    setLoading(true);
    //const url: string = `https://reqres.in/api/users?page=${currentPage}&per_page=${pageSize}&delay=1`;
    const url: string = `https://reqres.in/api/users?page=${1}&per_page=${1000}&delay=1`;
    console.log("url_1", url);
    const response = await axios.get(url);
    setData(response.data.data);
    //setTotalRows(response.data.total);
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
          totalRows={0}
          currentPage={0}
          pageSize={0}
          paginationType="none"
        />
      )}
    </>
  );
  //#endregion
};
