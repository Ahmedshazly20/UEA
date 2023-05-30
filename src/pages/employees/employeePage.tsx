
import { FC, useEffect, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ActionButtons,ToastModel,ValidationError,EmployeeResponse,RequestAction,
ActionTypeEnum,
RowState,
} from "../../models";

import {
  getAllEmployees,
  deleteEmployee,
  getEmployeeInformation
} from "../../serviceBroker/employeesApiServiceBroker";
import {
  ConfirmModelDialogBox,
  EmployeeForm,
  EmployeeList,
  ErrorValidationBox,
  LoadingBox,
  ModelDialogBox,
  ToastBox,
} from "../../components";


export const EmployeePage: FC<{}> = () => {
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [Employees, setEmployees] =  useState<EmployeeResponse[]>([]);
  const [Employee, setEmployee] = useState<EmployeeResponse>({
    ID: 0,
    NameEn: "",
    Name: "",
    Salary: 0,
    Mobile: "",
    Percentage_Of_Sales: 0,
    Job: "",
    BirthDay: new Date(),
    Address: "",
    Mail: "",
    IsActive: false,
    IsDefault: false,
    Errors: [],
    rowState: Number(RowState.Add),


  });
 

  const [toastModel, setToastModel] = useState<ToastModel>({
    show: false,
    body: "process completed successfully",
    variant: "Success",
  });
  const [showToastModel, setShowToastModel] = useState(false);
  const [showDeleteUserModel, setShowDeleteUserModel] = useState(false);
  //#endregion
  //#region varaibles
 
  const deleteUserActions: ActionButtons[] = [
    {
      text: t("connfirmDialog.yes"),
      onClick: () => {
        handleDeleteEmployee();
      },
    },
    {
      text: t("connfirmDialog.no"),
      onClick: () => {
        setEmployee({

    
          ID: 0,
          NameEn: "",
          Name: "",
          Salary: 0,
          Mobile: "",
          Percentage_Of_Sales: 0,
          Job: "",
          BirthDay: new Date(),
          Address: "",
          Mail: "",
          IsActive: false,
          IsDefault: false,
          Errors: [],
          rowState: Number(RowState.Add),
     
      });
     
        setShowDeleteUserModel(false);
      },
    },
  ];
  //#endregion
  //#region useEffect
  const fillData = async () => {
    await getAllEmployeeFun();
  };
  useEffect(() => {
   
    fillData();
  }, []);
  //#endregion
  //#region function


  const handleEmployeeAction = async (request: RequestAction) => {
    switch (request.action) {
      case ActionTypeEnum.AddSuccess:
        setLoading(true);
        setEmployee({

    
          ID: 0,
          NameEn: "",
          Name: "",
          Salary: 0,
          Mobile: "",
          Percentage_Of_Sales: 0,
          Job: "",
          BirthDay: new Date(),
          Address: "",
          Mail: "",
          IsActive: false,
          IsDefault: false,
          Errors: [],
          rowState: Number(RowState.Add),
     
      });
        await getAllEmployeeFun();
        setShowToastModel(true);
        setLoading(false);
        break;
      case ActionTypeEnum.Update:
        window.scrollTo(0, 0);
        var userObject =await  getEmployeeInformation(request.id);
        // @ts-ignore
        userObject.rowState= Number(RowState.Update);

        setEmployee(userObject);
        break;
      case ActionTypeEnum.Delete:
        var userObject =await  getEmployeeInformation(request.id);
        setEmployee(userObject);
        setShowDeleteUserModel(true);
        break;
      case ActionTypeEnum.Clear:
        setEmployee({
          ID: 0,
          NameEn: "",
          Name: "",
          Salary: 0,
          Mobile: "",
          Percentage_Of_Sales: 0,
          Job: "",
          BirthDay: new Date(),
          Address: "",
          Mail: "",
          IsActive: false,
          IsDefault: false,
          Errors: [],
          rowState: Number(RowState.Add),
     
      });
        break;
    }
  };
  // const getEmployeeInformation=(id:number)=>
  // {
  //   const Result=Employees.find(e=>e.ID==id)??undefined;
  //   return  Result;
    
  //  }
  const getAllEmployeeFun = async () => {
    setLoading(true);
    const employeesList = await getAllEmployees();
    if (employeesList.Result !== undefined) {
      setEmployees(employeesList.Result);
    }
    setLoading(false);
  };

  const handleDeleteEmployee= async () => {
    setShowDeleteUserModel(false);
    var deleteUserResponse = await deleteEmployee(Employee !== undefined ? Employee.ID : 0);
    let toastObjectToastModel = toastModel;
    toastObjectToastModel.show = true;
    if (
      deleteUserResponse.Result.Errors != null &&
      deleteUserResponse.Result.Errors.length !== 0
    ) {
      toastModel.body = "process failed try again alter";
      toastModel.variant = "Danger";
    } else {
      getAllEmployeeFun();
    }
    setToastModel(toastObjectToastModel);
    setShowToastModel(true);
  };
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      {<ErrorValidationBox errors={validationErrors} />}
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
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{t("employee.Information")}</Accordion.Header>
          <Accordion.Body>
            <Card>
              {/* <Card.Header></Card.Header> */}
              <Card.Body>
                <EmployeeForm
                  request={Employee}
                  onActionEvent={(o: RequestAction) => {
                    handleEmployeeAction(o);
                  }}
                />
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
        <Accordion.Header>{t("Employee.List")}</Accordion.Header>
      
          <Accordion.Body>
            <Card className="card-custom">
              {/* <Card.Header></Card.Header> */}
              <Card.Body>
                {/* delete user  */}
                <ConfirmModelDialogBox
                  isModelVisible={showDeleteUserModel}
                  onCloseEvent={() => {
                    setShowDeleteUserModel(false);
                  }}
                  actions={deleteUserActions}
                >
                  <div className="alert alert-warning">Are you sure?</div>
                </ConfirmModelDialogBox>
                {/* user list */}
                {Employees && Employees.length !== 0 && (
                  <EmployeeList
                    request={Employees}
                    isModifyAble={true}
                    isDeleteAble={true}
                    isPermissionAble={false}
                    onActionEvent={(o: RequestAction) => {
                        handleEmployeeAction(o);
                    }}
                    onCompleteEvent={getAllEmployeeFun}
                  />
                )}


              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
  //#endregion
};
