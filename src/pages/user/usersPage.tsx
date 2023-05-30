import { FC, useEffect, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ErrorValidationBox,
  LoadingBox,
  ConfirmModelDialogBox,
  ToastBox,
  RegisterUser,
  UsersList,
} from "../../components";
import {
  ToastModel,
  ActionTypeEnum,
  RowState,
  ActionButtons,
  RequestAction,
  UserRegisterationResponse,
  ValidationError,
} from "../../models";
import {
  deleteUser,
  getUserInformation,
  getUsers,
} from "../../serviceBroker/userApiServiceBroker";
export const UsersPage: FC<{}> = () => {
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [users, setUsers] = useState<UserRegisterationResponse[]>([]);
  const [user, setUser] = useState<UserRegisterationResponse | null>(null);
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
        handleDeleteUser();
      },
    },
    {
      text: t("connfirmDialog.no"),
      onClick: () => {
        setUser(null);
        setShowDeleteUserModel(false);
      },
    },
  ];
  //#endregion
  //#region useEffect
  useEffect(() => {
    const fillData = async () => {
      await getAllUsers();
    };
    fillData();
  }, []);
  //#endregion
  //#region function
  const handleUserAction = async (request: RequestAction) => {
    switch (request.action) {
      case ActionTypeEnum.AddSuccess:
        setLoading(true);
        setUser(null);
        await getAllUsers();
        setShowToastModel(true);
        setLoading(false);
        break;
      case ActionTypeEnum.Update:
        window.scrollTo(0, 0);
        var userObject = await getUserInformation(request.id!);
        // @ts-ignore
        userObject.rowState = Number(RowState.Update);
        setUser(userObject);
        break;
      case ActionTypeEnum.Delete:
        var userObject = await getUserInformation(request.id!);
        setUser(userObject);
        setShowDeleteUserModel(true);
        break;
      case ActionTypeEnum.Clear:
        setUser(null);
        break;
    }
  };
  const getAllUsers = async () => {
    setLoading(true);
    const userList = await getUsers();
    setUsers(userList);
    setLoading(false);
  };
  const handleDeleteUser = async () => {
    setShowDeleteUserModel(false);
    var deleteUserResponse = await deleteUser(user !== null ? user.ID : 0);
    let toastObjectToastModel = toastModel;
    toastObjectToastModel.show = true;
    if (
      deleteUserResponse.Result.Errors != null &&
      deleteUserResponse.Result.Errors.length !== 0
    ) {
      toastModel.body = "process failed try again alter";
      toastModel.variant = "Danger";
    } else {
      getAllUsers();
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
          <Accordion.Header>{t("user.Information")}</Accordion.Header>
          <Accordion.Body>
            <RegisterUser
              request={user}
              onActionEvent={(o: RequestAction) => {
                handleUserAction(o);
              }}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{t("User List")}</Accordion.Header>
          <Accordion.Body>
            <ConfirmModelDialogBox
              isModelVisible={showDeleteUserModel}
              onCloseEvent={() => {
                setShowDeleteUserModel(false);
              }}
              actions={deleteUserActions}
            >
              <div className="alert alert-warning">Are you sure?</div>
            </ConfirmModelDialogBox>
            {users && users.length !== 0 && (
              <UsersList
                request={users}
                isModifyAble={true}
                isDeleteAble={true}
                isPermissionAble={false}
                onActionEvent={(o: RequestAction) => {
                  handleUserAction(o);
                }}
                onCompleteEvent={getAllUsers}
              />
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
  //#endregion
};
