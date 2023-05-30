import { log } from "console";
import { AnyARecord } from "dns";
import { t } from "i18next";
import _ from "lodash";
import { FC, useEffect, useMemo, useState } from "react";
import { Button,Col,Row,Table } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";  
import { text } from "stream/consumers";
import { date, number } from "yup";
import { ConfirmModelDialogBox, LoadingBox, RadioCheckBox, TableComponent, TextBox, ToastBox } from "..";
import { ActionTypeEnum, CategoryResponseModel, RequestAction, ToastModel } from "../../models";
import { UpdateTaxCategoryPage } from "../../pages/updateTaxCategory/updateTaxCategoryPage";
import { updateTaxPercentageOfCategorys } from "../../serviceBroker/categoryApiServiceBroker";
import { getLabelName, isArabicCurrentLanguage } from "../../utils";
export const CategoryListTax: FC<{
  request: CategoryResponseModel[];
  onActionEvent: (o: RequestAction) => void;
  onCompleteEvent?: any | null;
}> = ({ request, onActionEvent = () => {}, onCompleteEvent = () => {} }) => {
  //#region varaiables
  const isArabic = isArabicCurrentLanguage();
  const columns: TableColumn<CategoryResponseModel>[] = [
    {
      name: "#",
      selector: (row, index) => Number(index || 0) + 1,
      sortable: true,
    },
    {
      name: getLabelName("Code"),
      selector: (row) => row.Code,
      sortable: true,
      grow: 100,
    },
    {
      name: getLabelName("Name"),
      selector: (row) => (isArabic ? row.Name : row.Name_En),
      sortable: true,
      grow: 100,
    },
   
  ];

  //#endregion
  //#region state
  const [data, setData] = useState<CategoryResponseModel[]>(request);
  const [filteredData, setFilteredData] = useState<CategoryResponseModel[]>(request);
  const [totalRows, setTotalRows] = useState(filteredData.length);
  const [loading, setLoading] = useState(false);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState<string>("");
  const [filterType, setFilterType] = useState<number>(1);
  const [checked, setChecked] = useState<number[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, SetisCheck] = useState(false);
  const [showToastModel, setShowToastModel] = useState(false);
  const [toastModel, setToastModel] = useState<ToastModel>({
    show: false,
    variant: "Primary",
    body: t("processSuceess"),
  });



  const handleAllChecked = (event:any) => 
  { 
    if (event.target.checked)
    {
      var normalizedArray = request.map(function(obj)
      {
        return obj.ID;
      });
      console.log(normalizedArray);
      setChecked(normalizedArray)
    
    }
    else
    {
      setChecked([])
      
    }
    
  };
const isChecked = (item:number) =>
   checked.includes(item) ? "checked-item" : "not-checked-item";

  const handleCheck = (event:any) => 
  {   
    console.log('handleCheck',handleCheck)
   
    var updatedList = [...checked];
       
    if (event.target.checked)
    {

     
      updatedList.push(parseInt(event.target.value))

      setChecked(updatedList)
      
    } else 
    {
     
     var list= updatedList.filter(word => word!= event.target.value);
      setChecked(list);
     
    }
    //setChecked(updatedList);
    console.log("updatedList",updatedList);  
  };
  const subHeaderComponent = useMemo(() => {
    const handleSearch = (value: string, filterBy: number = 1) => {
      setLoading(true);
      setFilterText(value);
      setFilterType(filterBy);
      switch (filterBy) {
        case 1:
          request = _.filter(data, (row) => {
            return row.Name.toLowerCase().includes(value.toLowerCase());
          });
          break;
        case 2:
          request = _.filter(data, (row) => {
            return row.Code.toLowerCase().includes(value.toLowerCase());
          });
          break;
        default:
          request = _.filter(data, (row) => {
            return row.Name.toLowerCase().includes(value.toLowerCase());
          });
          break;
      }

      setCurrentPage(1);
      setTotalRows(request.length);
      setFilteredData(request);
      setLoading(false);
    };
    return (
      <>
       
       

       
      </>
    );
  }, [filterText, filterType]);
  //#endregion
  //#region html


 const handleSubmit=async()=>{

  if(taxPercentage>100 || taxPercentage<0)
  {
    let toastObjectToastModelerr = toastModel;
    toastObjectToastModelerr.show = true;
    toastObjectToastModelerr.body = "Invalid Tax";
    setToastModel(toastObjectToastModelerr);
   
    return;
  }
  if(checked.length==0)
  {
   alert ("Please Select Catgory ");
    return;
  }
  else
  {    
  var Response= await updateTaxPercentageOfCategorys({categoryIdsList:checked,TaxPercentage:taxPercentage,ModifcationDate:new Date(),ModifiedBy:0})
  setChecked([])
 if (
  Response.Errors != null &&
  Response.Errors.length !== 0
 ) {
  setShowToastModel(false);
 } else {
  setShowToastModel(true);
 }

 }
}
  return (
    <>
        {showToastModel && (
        <ToastBox
          isShown={showToastModel}
          header={toastModel.Header}
          body={toastModel.body}
          variant={toastModel.variant}
          delayDuration={toastModel.delayDuration}
          onCloseEvent={() => {
            setShowToastModel(false);
          }}
        />
      )}
    <div className="row">
      {loading && <LoadingBox />}
       
      <div className="Col-md-12">
       
      <input
          type="checkbox"
          onChange={handleAllChecked}
          value="checkedall" 
        
          
        />
        اختيار الكل
        {/* {t("SelectAll")} */}
        
        </div>
        
  
       

       {request !== null && request.length !== 0 && 
      (
             
        request.map((row:any, index:number) => {
       
              return (
    <>       
              <div className="col-sm-3 ">
              <div className="container">
              <div key={index}>
              <input value={row.ID}  type="checkbox" 
               checked={checked.includes(row.ID)}  
               onChange={handleCheck} />
              <span  className={isChecked(row.ID)}>{isArabic ? row.Name : row.Name_En}</span>          
            </div>
            </div>
            </div>
            </>
              );
              
            })
         
       
             
      )} 
    
                  <Row>
          <Col xs={2}>
            <label>{getLabelName(t("TaxPercentage"))}</label>
            </Col>
            <Col xs={1}>
          <input min={0} max={100}  name="TaxPercentage" type="number"  onChange={(e:any)=>{
                      setTaxPercentage(e.target.value)
                    }}
           value={taxPercentage} className='form-control' />
           </Col>
          </Row>
                  <div className="col-md-2">
                  <Button
       onClick={handleSubmit}  
         >
           حفظ
         </Button>
                  </div>
                
      
         </div> 
         
      </>
  );
  //#endregion
};
