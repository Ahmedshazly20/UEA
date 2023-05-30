import _ from "lodash";
import { FC, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  
  ConfirmModelDialogBox,
  LoadingBox,
  ModelDialogBox,
  ToastBox,
  TreeView,
  CategoryList,
  
} from "../../components";

import {CategoryListTax} from "../../components/updateTaxCategory/categoryListTax"
import Checkbox from "../../components/updateTaxCategory/Checkbox";
import {
  
  ActionButtons,
  ActionTypeEnum,
  CategoryResponseModel,
  RequestAction,
  ToastModel,
  TreeViewModel,
  
} from "../../models";
import {
  getCateoryTree
} from "../../serviceBroker/categoryApiServiceBroker";
import { getCategories } from "../../serviceBroker/categoryApiServiceBroker";
export const UpdateTaxCategoryPage: FC<{}> = () => {
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [objects, setObjects] = useState<CategoryResponseModel[]>([]);
  const [isCheck, setIsCheck] =  useState<number[]>([]);;
  const [toastModel, setToastModel] = useState<ToastModel>({
    show: false,
    variant: "Primary",
    body: t("processSuceess"),
  });
  //#endregion
  //#region varaibles

  //#endregion
  //#region useEffect
  useEffect(() => {
    const fillData = async () => {
      await getAllObjects();
    };
    const datat=fillData();
    fillData();
  }, []);
  //#endregion
  //#region function
  const getAllObjects = async () => {
    setLoading(true);
    const result = await getCategories();
    setObjects(result || []);
    setLoading(false);
  };
    
    const resultold =  getCategories();
    console.log("resultold",resultold);
    const handleSelectAll = (e:any) => {
      setIsCheckAll(!isCheckAll);
      setIsCheck(objects.map(li => li.ID));
      if (isCheckAll) {
        setIsCheck([]);
      }
    };
  
    
  const handleClick =(e:any)=> {


    const { id, checked } = e.target;
    var updatedList = [...isCheck,id];
       


    setIsCheck(updatedList);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };
  const catalog = objects.map(({ ID, Name }) => {
    return (
      <>
        <Checkbox
          key={ID}
          type="checkbox"
          name={Name}
          id={ID}
          handleClick={handleClick}
          isChecked={isCheck.includes(ID)}
        />
        {Name}
      </>
    );
  });

  //#endregion
  //#region html
  return (

    


    <>

      {loading && <LoadingBox />}

      
      {/* modify category  */}
      {toastModel.show && (
        <ToastBox
          isShown={toastModel.show}
          header={toastModel.Header}
          body={toastModel.body}
          variant={toastModel.variant}
          delayDuration={toastModel.delayDuration}
          onCloseEvent={() => {
            setToastModel({ ...toastModel, show: false });
          }}
        />
      )}
      {/* modify category  */}
    

      {/* delete category  */}
   
     
     
      <Table>
        
        <tr></tr>
        <tr>
          {/* items list */}
          {objects !== null && objects !== undefined && objects.length !== 0 && (
            <CategoryListTax
              request={objects}
              onActionEvent={(o: RequestAction) => {
                
              }}
              onCompleteEvent={getAllObjects}
            />
          )}
        </tr>
      </Table>
    </>
  );
  //#endregion
};
