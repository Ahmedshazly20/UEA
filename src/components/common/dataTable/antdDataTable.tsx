import { Table } from "antd";
import { ColumnsType, ColumnType } from "antd/es/table";
import { FC } from "react";

export const AntdTableComponent: FC<{
  data: any[];
  columns: any[];
  isPaginationEnable?: boolean | null;
}> = ({ data, columns, isPaginationEnable = false }) => {
  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        locale={{emptyText:" "}}
        pagination={isPaginationEnable == false ? false : undefined}
      />
    </>
  );
};
