import Tree, { TreeNode } from "rc-tree";
import { FC } from "react";
import "rc-tree/assets/index.css";
import { TreeViewModel } from "../../../models";
import {generateGuid} from "../../../utils";

//https://codesandbox.io/s/m3yjtf?file=/App.jsx:2623-2659
//https://tree-react-component.vercel.app/
export const TreeView: FC<{
  request: TreeViewModel[];
  selectedValues?:string[]|undefined;
  isMultiple?: boolean | undefined;
  defaultExpandAll?: boolean | undefined;
  isArabic: boolean;
  onSelect?: any | null;
}> = ({
  request,
  selectedValues=[],
  isArabic,
  isMultiple = false,
  defaultExpandAll = true,
  onSelect,
}) => {
  //console.log("load_2","rendering...");
  return (
    <>
      {request !== null && request !== undefined && request.length !== 0 && (
        <>
          <Tree
            className="myCls"
            showLine
            selectedKeys={selectedValues!==null&&selectedValues!==undefined&&selectedValues.length!==0?selectedValues:[]}
            multiple={isMultiple}
            defaultExpandAll={defaultExpandAll}
            onSelect={(selectedKeys, info) => {
              onSelect(info.selectedNodes);
            }}
          >
            {request.map((row, index) => {
              const isSelected:boolean=selectedValues!==null&&selectedValues!==undefined&&selectedValues.length!=0?selectedValues.find(p=>p===row.key)?true:false:false;
              return generateTreeViewItem(row,selectedValues,isSelected, isArabic);
            })}
          </Tree>
        </>
      )}
    </>
  );
};
//#region private
const CustomIcon = () => (
  <img
    style={{ width: 15, padding: 1 }}
    src="https://freesvg.org/img/johnny_automatic_picnic_basket.png"
    alt="Custom Icon"
  />
);
const generateTreeViewItem = (
  request: TreeViewModel,
  selectedValues:string[]|null,
  isSelected:boolean,
  isArabic: boolean
): any => {
  return (
    <TreeNode
      // icon={<CustomIcon />}
      title={isArabic ? request.nameAr : request.name}
      key={request.key}
      //selected={isSelected}
    >
      {request.children !== null &&
        request.children !== undefined &&
        request.children?.length !== 0 &&
        request.children.map((row, index) => {
          const isSelected:boolean=selectedValues!==null&&selectedValues!==undefined&&selectedValues.length!=0?selectedValues.find(p=>p===row.key)?true:false:false;
          return generateTreeViewItem(row,selectedValues,isSelected, isArabic);
        })}
    </TreeNode>
  );
};
//#endregion
