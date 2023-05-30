import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoadingBox } from "../../components/box/loadingBox";
import { ErrorValidationBox } from "../../components";
import { ModelDialogBox } from "../../components/box/modelDialogBox";
import { ToastBox } from "../../components";
import { UserPremissions, UsersList } from "../../components/user";
import { ToastModel } from "../../models/common/toastModel";
import { ActionTypeEnum } from "../../models/enums/enumList";
import {
  RequestAction,
  UserRegisterationResponse,
} from "../../models/user/userRegisterationResponse";
import { ValidationError } from "../../models/validation/error";
import {
  getUserInformation,
  getUsers,
} from "../../serviceBroker/userApiServiceBroker";
import { Accordion, Button, Card, Modal } from "react-bootstrap";
import { UserSettings } from "../../components/user/userSetting";
import { TransactionSettings } from "../../components/user/TransactionSettings";
import { POSSettings } from "../../components/user/posSetting";
export const UserPermissionsPage: FC<{}> = () => {
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
  const [showUserPremissionModel, setShowUserPremissionModel] = useState(false);
  const [showUserSettingModel, setShowUserSettingModel] = useState(false);
  const [showUserPOSSettingModel, setShowUserPOSSettingModel] = useState(false);
  const [showTransactionSettingModel, setShowTransactionSettingModel] =
    useState(false);

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
    var user = await getUserInformation(request.id!);
    switch (request.action) {
      case ActionTypeEnum.GrantPremissions:
        setUser(user);
        setShowUserPremissionModel(true);
        break;
      case ActionTypeEnum.UserSetting:
        setUser(user);
        setShowUserSettingModel(true);
        break;
      case ActionTypeEnum.TransactionSetting:
        setUser(user);
        setShowTransactionSettingModel(true);
        break;
      case ActionTypeEnum.POSSetting:
        setUser(user);
        setShowUserPOSSettingModel(true);
        break;
      default:
        break;
    }
  };
  const getAllUsers = async () => {
    setLoading(true);
    const userList = await getUsers();
    setUsers(userList);
    setLoading(false);
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
          <Accordion.Header>User Permission List</Accordion.Header>
          <Accordion.Body>
            {/* user  premission*/}
            <ModelDialogBox
              isModelVisible={showUserPremissionModel}
              isCloseButtonVisible={false}
              size="xl"
              title={t("user.Premissions")}
            >
              <UserPremissions
                userObject={user}
                onComplete={() => {
                  setShowUserPremissionModel(false);
                  setShowToastModel(true);
                }}
              />
            </ModelDialogBox>
            {/* user  setting*/}
            <ModelDialogBox
              isModelVisible={showUserSettingModel}
              isCloseButtonVisible={false}
              title={t("user.settings")}
              size="xl"
            >
              <UserSettings
                userObject={user}
                onComplete={(e: any) => {
                  setShowUserSettingModel(false);
                  setShowToastModel(e);
                }}
              />
            </ModelDialogBox>
            {/* transaction  setting*/}
            <ModelDialogBox
              isModelVisible={showTransactionSettingModel}
              isCloseButtonVisible={false}
              title={t("user.transactionsettings")}
              size="xl"
            >
              <TransactionSettings
                userObject={user}
                onComplete={(e: any) => {
                  setShowTransactionSettingModel(false);
                  setShowToastModel(e);
                }}
              />
            </ModelDialogBox>
            {/* Point Of Sale  setting*/}
            <ModelDialogBox
              isModelVisible={showUserPOSSettingModel}
              isCloseButtonVisible={false}
              title={t("user.posSetting")}
              size="xl"
            >
              <POSSettings
                userObject={user}
                onComplete={(e: any) => {
                  setShowUserPOSSettingModel(false);
                  setShowToastModel(e);
                }}
              />
            </ModelDialogBox>
            {/* user list */}
            {users && users.length !== 0 && (
              <UsersList
                isPermissionAble={true}
                request={users}
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
