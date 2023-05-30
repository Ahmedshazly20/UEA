import _ from "lodash";
import { FC, useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { TableComponent } from "../../components";
interface TestUser {
  id: number;
  nameAr: string;
  nameEn: string;
  value: number;
}

export const EdiatbleTablePage: FC<{}> = () => {
  const columns: TableColumn<TestUser>[] = [
    {
      name: "nameAr",
      cell: (row: TestUser) => (
        <input
          value={row.nameAr}
          onChange={(e: any) => {
            handleChange({ ...row, nameAr: e.target.value });
          }}
        />
      ),
      sortable: true,
    },
    {
      name: "nameEn",
      cell: (row: TestUser) => (
        <input
          value={row.nameEn}
          onChange={(e: any) => {
            handleChange({ ...row, nameEn: e.target.value });
          }}
        />
      ),
      sortable: true,
    },
    {
      name: "value",
      cell: (row: TestUser) => (
        <input
          value={row.value}
          onChange={(e: any) => {
            handleChange({ ...row, value: e.target.value });
          }}
        />
      ),
      sortable: true,
    },
  ];
  const handleChange = (row: TestUser) => {
    console.log("row", row);
    let result = [...data];
    var index = _.findIndex(result, { id: row.id });
    result.splice(index, 1, row);
    setData(result);
    // result.map((req: TestUser) => {
    //   if (req.id === row.id) {
    //     // console.log("xxx");
    //     return row;
    //   } else {
    //     return req;
    //   }
    // });
    console.log("result", result);
  };
  const [data, setData] = useState<TestUser[]>([]);
  useEffect(() => {
    let users: TestUser[] = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        id: i,
        nameAr: "nameAr" + i,
        nameEn: "nameEn" + i,
        value: i,
      });
    }
    setData(users);
  }, []);
  return (
    <>
      <TableComponent
        columns={columns}
        data={data}
        totalRows={0}
        currentPage={0}
        pageSize={0}
        paginationType="none"
      />
    </>
  );
};
