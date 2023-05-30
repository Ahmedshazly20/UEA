import { DataNode } from "rc-tree/lib/interface";
import { FC, useEffect, useState } from "react";
import { TreeView } from "../../components";
import { TreeViewModel } from "../../models";
import { getCateoryTree } from "../../serviceBroker/categoryApiServiceBroker";

export const TreeViewPage: FC<{}> = () => {
  const [treeData, setTreeData] = useState<TreeViewModel[]>([]);
  useEffect(() => {
    const fillData = async () => {
      const data: TreeViewModel[] = await getCateoryTree();
      setTreeData(data);
    };
    fillData();
  }, []);
  const onSelectItem = (e: DataNode[]) => {
    console.log("xxx", e[0].title);
  };
  return (
    <>
      <TreeView request={treeData} isArabic={true} onSelect={onSelectItem} />{" "}
    </>
  );
};
