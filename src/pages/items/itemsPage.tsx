import {FC, useRef, useState} from "react";
import {Accordion} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {ItemList, LoadingBox, RegisterItem, ToastBox,} from "../../components";
import {ActionTypeEnum, ItemModel, RequestAction, ToastModel,} from "../../models";
import {deleteItem, getItemFullDetailsById,} from "../../serviceBroker/itemApiServiceBroker";
import {getLabelName, scrollToTop} from "../../utils";

export const ItemsPage: FC<{}> = () => {
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isRefreshItemList, setIsRefreshItemList] = useState(false);
  const [isRefreshItem, setIsRefreshItem] = useState(false);
  const [object, setObject] = useState<ItemModel | null>(null);
  const [toastModel, setToastModel] = useState<ToastModel>({
    show: false,
    variant: "Primary",
    body: t("processSuceess"),
  });
  const [showToastModel, setShowToastModel] = useState(false);
  const pageRef =
      useRef() as React.MutableRefObject<HTMLInputElement>;
  //#endregion
  //#region function
  const handleAction = async (request: RequestAction) => {
    switch (request.action) {
      case ActionTypeEnum.Add:
        setObject(null);
        break;
      case ActionTypeEnum.Update:
        setLoading(true);
        let item = await getItemFullDetailsById(request.id!);
        //@ts-ignore
        item.Result.rowState = 2;
        //@ts-ignore
        setObject(item.Result);
        setIsRefreshItem(true);
        setLoading(false);
          scrollToTop(pageRef);
        break;
      case ActionTypeEnum.Delete:
        setObject(request.request);
        break;
      case ActionTypeEnum.DeleteOperationStart:
        setLoading(true);
        var result = await deleteItem(request.request.id);
        setLoading(false);
        //alert(JSON.stringify(result));
        //@ts-ignore
        if (result.Result.Result === true) {
          handleAction({ id: 0, action: ActionTypeEnum.Success });
        } else {
          handleAction({ id: 0, action: ActionTypeEnum.Failed });
        }
        break;
      case ActionTypeEnum.AddSuccess:
      case ActionTypeEnum.DeleteSuccess:
      case ActionTypeEnum.Success:
        setToastModel({ ...toastModel, show: true });
        setShowToastModel(true);
        setIsRefreshItemList(true);
        break;
      case ActionTypeEnum.RaiseError:
        scrollToTop(pageRef);
        break;
      case ActionTypeEnum.Clear:
        setObject(null)
        setIsRefreshItem(true);
        scrollToTop(pageRef);
        break;
      case ActionTypeEnum.Failed:
        setToastModel({
          ...toastModel,
          body: "failed",
          variant: "danger",
          show: true,
        });
        setIsRefreshItemList(true);
        break;
    }
  };
  //#endregion
  //#region html
  return (
    <>
      {loading && <LoadingBox />}
      <div ref={pageRef} />
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
          <Accordion.Header>{getLabelName("Items")}</Accordion.Header>
          <Accordion.Body>
            <RegisterItem
              request={object}
              setIsRefresh={setIsRefreshItem}
              isRefresh={isRefreshItem}
              onActionEvent={(o: RequestAction) => {
                handleAction(o);
              }}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="1">
          <Accordion.Header></Accordion.Header>
          <Accordion.Body className="TUEFO-header">
            <ItemList
              onActionEvent={(o: RequestAction) => {
                handleAction(o);
              }}
              setIsRefresh={setIsRefreshItemList}
              isRefresh={isRefreshItemList}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
  //#endregion
};
