import { t } from "i18next";
import _ from "lodash";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { TableColumn } from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { LoadingBox, SelectBox, TableComponent, TextBox } from "..";
import {
  ActionTypeEnum,
  EstehekakModel,
  LookupItem,
  RequestAction,
  SearchItemsTypeEnum,
  SearchItemRequestModel,
  LookupTypeEnum,
  AccrualSubtractRuleTypeEnum,
} from "../../models";
import { searchEstihkakSubtract } from "../../serviceBroker/employeesApiServiceBroker";
import { getLookupByType } from "../../serviceBroker/lookupApiServiceBroker";
import { getLabelName, isArabicCurrentLanguage } from "../../utils";
import { EmployeeList } from "./employeeList";

export const EstehkakList: FC<{
  getDueList:(searchEmp:string|null,searchRule:string|null,typeId:number,pageSize:number,pageNumber:number)=>void
  onActionEvent: (o: RequestAction) => void;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
  isRefresh: boolean;
  totalRows:number;
  request:EstehekakModel[]
}> = ({ onActionEvent = () => {},getDueList=(searchEmp:string|null,searchRule:string|null,typeId:number,pageSize:number,pageNumber:number)=>{},setIsRefresh, isRefresh = false,request,totalRows }) => {
  
  //#region variables
  const isArabic = isArabicCurrentLanguage();
  const defaultPageSize: number = 50;
  const { t } = useTranslation();
  const columns: TableColumn<EstehekakModel>[] = useMemo(
    () => [
      {
        name: "#",
        selector: (row, index) => Number(index || 0) + 1,
        sortable: true,
        width: "100px",
      },
      {
        name: getLabelName("Employee"),
        selector: (row) => isArabic? row.EmployeeNameAr:row.EmployeeNameEn,
        sortable: true,
        allowOverflow: true,
      },
      {
        name: getLabelName("Rule"),
        selector: (row) => isArabic? row.EsthkakSubtractRuleAr:row.EsthkakSubtractRuleEn,
        sortable: true,
        allowOverflow: true,
      },
      {
        name: getLabelName("Date"),
        selector: (row) => new Date(row.Date).toDateString(),
        sortable: true,
        wrap: true,
      },
      {
        name: getLabelName("Value"),
        selector: (row) =>row.Value,
        sortable: true,
        wrap: true,
        allowOverflow: true,
      },
     
      {
        // eslint-disable-next-line react/button-has-type
        name: t("Modify"),
        cell: (row: EstehekakModel) => (
          <Button size="sm" variant="outline-primary" 
            onClick={() => {
              onActionEvent({
                id: row.ID,
                request: row,
                action: ActionTypeEnum.Update,
              });
            }}
          >
            {t("Modify")}
          </Button>
        ),
      },
      {
        // eslint-disable-next-line react/button-has-type
        name:t("Delete"),
        cell: (row: EstehekakModel) => (
          <Button size="sm" variant="outline-danger"
            onClick={() => {
              onActionEvent({
                id: row.ID,
                request: row,
                action: ActionTypeEnum.Delete,
              });
            }}
          >
            {t("Delete")}
          </Button>
        ),
      },
    ],
    []
  );
  //#endregion
  //#region state
  // const [data, setData] = useState<EstehekakModel[]>();
  const [searchEmp, setSearchEmp] = useState<string|null>(null);
  const [searchRule, setSearchRule] = useState<string|null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const [ruleList, setRuleList] = useState<LookupItem[]>([]);
  const [empList, setEmpList] = useState<LookupItem[]>([]);
  const [loading, setLoading] = useState(false);
  //#endregion
  //#region useEffect
  useEffect(()=>{
    if (request) {

    }
  }, [request.length])
  useEffect(() => {
    const fillData = async () => {
      setLoading(true);
      
      //await searchEstihkakSubtract(null,null,Number(AccrualSubtractRuleTypeEnum.Accrual),pageSize,pageNumber);
      var estList = await getLookupByType(LookupTypeEnum.Estehkak);
        if (estList != null) {
          setRuleList(estList);
         }
         var empList = await getLookupByType(LookupTypeEnum.Employee);
         if(empList!=null){
         setEmpList(empList);
        }
      setLoading(false);
    };
    fillData();
  }, []);
  // useEffect(() => {
  //   const fillData = async () => {
  //     setLoading(true);
  //     await getallObjects(searchEmp,searchRule,pageSize,pageNumber);
  //     setLoading(false);
  //   };
  //   fillData();
  // }, []);
  // useEffect(() => {
  //   if (isRefresh) {
  //     const fillData = async () => {
  //       setLoading(true);
  //       await getallObjects(searchEmp,searchRule,pageSize,pageNumber);
  //       setLoading(false);
  //     };
  //     fillData();
  //     setIsRefresh(false);
  //   }
  // }, [isRefresh]);

  //#endregion
  //#region functions
  // const getallObjects = async (searchEmp:string|null,searchRule:string|null,pageSize:number,pageNumber:number) => {
  //   let emp=searchEmp!=null?parseInt(searchEmp):null
  //   let rule=searchRule!=null?parseInt(searchRule):null
  
  //   const result = await searchEstihkakSubtract(emp,rule,Number(AccrualSubtractRuleTypeEnum.Accrual),pageSize,pageNumber);
  //   setData(result?.Result || []);
  //   setTotalRows(result?.TotalRecoredCount || 0);
  // };
  const onCurrentPageChange = async (number: number) => {
  
    if (number !== pageNumber) {
      setPageNumber(number);
    }

    getDueList(searchEmp,searchRule,Number(AccrualSubtractRuleTypeEnum.Accrual),pageSize,number)
  };
  const onPageSizeChange = async (size: number) => {
    if (size !== pageSize) {
      setPageSize(size)
    }
   await getDueList(searchEmp,searchRule,Number(AccrualSubtractRuleTypeEnum.Accrual),size,pageNumber)
  console.log("request",request)
  };
  //#endregion
//   const subHeaderComponent = useMemo(() => {
//     const handleSearch = async() => {
//      await getallObjects(searchEmp,searchRule);
//     };
//     return (
//       <>
//         <table style={{ width: "100%" }}>
//           <tr>
//             <td>
//               <SelectBox
//                 labelName={getLabelName("Rule")}
//                 isSingleSelect={true}
//                 selectedValues={[searchRule!]}
//                 source={ruleList}
//                 onStatusChange={(e: LookupItem) => {
//                   if (e != null) {
//                       setSearchRule(e.value)
//                     handleSearch();
//                   }
//                 }}
//                 multiselectRef={undefined}
//               />
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <SelectBox
//                 labelName={getLabelName("Employee")}
//                 isSingleSelect={true}
//                 selectedValues={[searchEmp!]}
//                 source={empList}
//                 onStatusChange={(e: LookupItem) => {
                    
//                   if (e != null) {
//                       setSearchEmp(e.value)
//                     handleSearch();
//                   }
//                 }}
//                 multiselectRef={undefined}
//               />
//             </td>
//             <td>
//               <Button
//                 onClick={() => {
//                   handleSearch();
//                 }}
//               >
//                 clear
//               </Button>
//             </td>
//           </tr>
//         </table>
//       </>
//     );
//   }, [searchEmp,searchRule]);
  //#region html
      const handleSearch = async() => {
        setLoading(true);
         await getDueList(searchEmp,searchRule,Number(AccrualSubtractRuleTypeEnum.Accrual),pageSize,pageNumber);
         setLoading(false);
        };
      const clearSelectBox=async()=>{
        setSearchEmp(null)
           
        }
  return (
    <>
    <Container>

    
<div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start">
    <SelectBox
              labelName={getLabelName("Employee")}
              source={empList}
              isSingleSelect={true}
              onStatusChange={(e: any) => {
                setSearchEmp(e.value);
              }}
              selectedValues={[searchEmp!]}
              
              multiselectRef={undefined}
            />
          <SelectBox
              labelName={getLabelName("Rule")}
              source={ruleList}
              isSingleSelect={true}
              onStatusChange={(e: any) => {
                setSearchRule(e.value);
              }}
              selectedValues={[searchRule!]}
              multiselectRef={undefined}
            />

   <Button
            onClick={() => {
              handleSearch();
            }}
          >
            {t('Search')}
          </Button>

 </div>


  {loading && <LoadingBox />}
  <TableComponent
    columns={columns}
    data={request}
    totalRows={totalRows}
    currentPage={pageNumber || 1}
    pageSize={pageSize || defaultPageSize}
    onCurrentPageChange={onCurrentPageChange}
    onPageSizeChange={onPageSizeChange}
    paginationType="server"
    //subHeaderComponent={subHeaderComponent}
  />
 
  </Container>
    </>
  );
  //#endregion
};
