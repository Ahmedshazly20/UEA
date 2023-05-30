import axios from "axios";
import { FC, useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { TableComponent } from "../../components";
import { LoadingBox } from "../../components/box/loadingBox";
import { UserRegisterationResponse } from "../../models/user/userRegisterationResponse";
import { getUsers } from "../../serviceBroker/userApiServiceBroker";
import { sleep } from "../../utils/common/commonManager";

export const DataTablePageWithClientPagination: FC<{}> = () => {
  //#region state
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [data, setData] = useState<UserRegisterationResponse[]>([]);
  //#endregion
  //#region varaibles
  interface DataRow {
    first_name: string;
    last_name: string;
    email: string;
  }
  const columns: TableColumn<UserRegisterationResponse>[] = [
    {
      name: "ItemCode",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "ItemName",
      selector: (row) => row.Name_EN,
      sortable: true,
    },
    {
      name: "PriceSale",
      selector: (row) => row.User_Name,
      sortable: true,
    },
    {
      name: "Current_Balance",
      selector: (row) => row.JWT,
      sortable: true,
    },
    {
      name: "PriceCost",
      selector: (row) => row.Password,
      sortable: true,
    },
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
    const url: string = `https://reqres.in/api/users?page=${1}&per_page=${10000}&delay=1`;
    console.log("url_1", url);
    const response = await getUsers();
    var rows: UserRegisterationResponse[] = [];
    console.log("response", response);
    response.forEach((row: UserRegisterationResponse) => {
      rows.push(row);
    });
    for (let i = 0; i < 2000; i++) {
      response.forEach((row: UserRegisterationResponse) => {
        rows.push(row);
      });
    }
    setData(rows);
    setTotalRows(rows.length);
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
          paginationType="client"
        />
      )}
    </>
  );
  //#endregion
};
