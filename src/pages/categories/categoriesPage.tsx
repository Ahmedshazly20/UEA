import _ from "lodash";
import { DataNode } from "rc-tree/lib/interface";
import { FC, useEffect, useState } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  CategoryList,
  ConfirmModelDialogBox,
  LoadingBox,
  ModelDialogBox,
  ToastBox,
  TreeView,
} from "../../components";
import { AddCategory } from "../../components/categories/AddCategory";
import {
  ActionButtons,
  ActionTypeEnum,
  CategoryResponseModel,
  RequestAction,
  RowState,
  ToastModel,
  TreeViewModel,
} from "../../models";
import {
  deleteCategory,
  getCateoryTree,
} from "../../serviceBroker/categoryApiServiceBroker";
import { getCategories } from "../../serviceBroker/categoryApiServiceBroker";
import { isArabicCurrentLanguage } from "../../utils";
import { TreeViewPage } from "../samples/treeViewPage";
export const CategoriesPage: FC<{}> = () => {
  //#region state
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [parentId, setParentId] = useState(0);
  const [showToastModel, setShowToastModel] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [treeData, setTreeData] = useState<TreeViewModel[]>([]);

  const [objects, setObjects] = useState<CategoryResponseModel[]>([]);
  const [object, setObject] = useState<CategoryResponseModel>({
    Name: "",
    Name_En: "",
    CreatedBy: 0,
    IsDefault: false,
    IsParent: false,
    Parent_ID: parentId,
    AllParent: null,
    Code: "",
    CategorySetting: null,
    CreationDate: "",
    Default_Discount_Percentage: 0,
    DisplySequence: 0,
    Errors: [],
    ID: 0,
    IsIgnoreServiceMoneyAdd: false,
    ModificationDate: null,
    ShowInPOS: false,
    VerifyOnUpdate: false,
    ModifiedBy: 0,
    Notes: "",
    rowState: 1,
  });
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [toastModel, setToastModel] = useState<ToastModel>({
    show: false,
    variant: "Primary",
    body: t("processSuceess"),
  });
  //#endregion
  //#region varaibles
  const deleteActions: ActionButtons[] = [
    {
      text: t("connfirmDialog.yes"),
      onClick: () => {
        handleAction({
          id: object?.ID || 0,
          request: object,
          action: ActionTypeEnum.DeleteOperationStart,
        });
      },
    },
    {
      text: t("connfirmDialog.no"),
      onClick: () => {
        setObject({
          Name: "",
          Name_En: "",
          CreatedBy: 0,
          IsDefault: false,
          IsParent: false,
          Parent_ID: parentId,
          AllParent: null,
          Code: "",
          CategorySetting: null,
          CreationDate: "",
          Default_Discount_Percentage: 0,
          DisplySequence: 0,
          Errors: [],
          ID: 0,
          IsIgnoreServiceMoneyAdd: false,
          ModificationDate: null,
          ShowInPOS: false,
          VerifyOnUpdate: false,
          ModifiedBy: 0,
          Notes: "",
          rowState: 1,
        });
        setShowDeleteModel(false);
      },
    },
  ];
  //#endregion
  //#region useEffect
  useEffect(() => {
    const fillData = async () => {
      await getAllObjects();
    };
    fillData();
  }, []);
  //#endregion
  //#region function
  const getAllObjects = async () => {
    setLoading(true);
    const data: TreeViewModel[] = await getCateoryTree();
    const result = await getCategories();
    setTreeData(data);
    setObjects(result || []);
    setLoading(false);
  };
  const handleAction = async (request: RequestAction) => {
    switch (request.action) {
      case ActionTypeEnum.AddSuccess:
        setLoading(true);
        setObject({
          Name: "",
          Name_En: "",
          CreatedBy: 0,
          IsDefault: false,
          IsParent: false,
          Parent_ID: parentId,
          AllParent: null,
          Code: "",
          CategorySetting: null,
          CreationDate: "",
          Default_Discount_Percentage: 0,
          DisplySequence: 0,
          Errors: [],
          ID: 0,
          IsIgnoreServiceMoneyAdd: false,
          ModificationDate: null,
          ShowInPOS: false,
          VerifyOnUpdate: false,
          ModifiedBy: 0,
          Notes: "",
          rowState: 1,
        });
        await getAllObjects();
        console.log("before show toast");
        setShowToastModel(true);
        console.log("after show toast");

        setLoading(false);
        break;
      case ActionTypeEnum.Clear:
        setLoading(true);
        setObject({
          Name: "",
          Name_En: "",
          CreatedBy: 0,
          IsDefault: false,
          IsParent: false,
          Parent_ID: parentId,
          AllParent: null,
          Code: "",
          CategorySetting: null,
          CreationDate: "",
          Default_Discount_Percentage: 0,
          DisplySequence: 0,
          Errors: [],
          ID: 0,
          IsIgnoreServiceMoneyAdd: false,
          ModificationDate: null,
          ShowInPOS: false,
          VerifyOnUpdate: false,
          ModifiedBy: 0,
          Notes: "",
          rowState: 1,
        });
        await getAllObjects();
        setLoading(false);
        break;
      case ActionTypeEnum.Update:
        window.scrollTo(0, 0);
        var obj = objects.filter((p) => p.ID === request.id)[0];
        obj.rowState = Number(RowState.Update);
        setObject(obj);
        break;
      case ActionTypeEnum.Delete:
        var obj = objects.filter((p) => p.ID === request.id)[0];
        setObject(obj);
        setShowDeleteModel(true);
        break;
      case ActionTypeEnum.DeleteOperationStart:
        setLoading(true);
        setShowDeleteModel(false);
        var result = await deleteCategory(Number(request.id));
        setLoading(false);
        //alert(JSON.stringify(result));
        //@ts-ignore
        await getAllObjects();
        console.log("result", result);
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
        setIsRefresh(true);
        setShowToastModel(true);

        break;
      case ActionTypeEnum.Failed:
        setToastModel({
          ...toastModel,
          body: "failed",
          variant: "danger",
          show: true,
        });
        setIsRefresh(true);
        setShowToastModel(true);

        break;
    }
  };
  const isArabic = isArabicCurrentLanguage();

  const onSelectItem = (e: DataNode[]) => {
    let value = Number(e[0].key);
    setObject({ ...object, Parent_ID: value });
  };
  //#endregion
  //#region html

  return (
    <>
      {loading && <LoadingBox />}
      {/* modify category  */}
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
          <Accordion.Header>{t("AddCategory")}</Accordion.Header>
          <Accordion.Body>
            <div className="row row-cols-1 row-cols-xxl-6 row-cols-xl-6 row-cols-lg-6 row-cols-md-4 row-cols-sm-1 g-sm-2 g-md-4 align-items-start"></div>
            <Card>
              {/* <Card.Header></Card.Header> */}
              <Card.Body>
                <Row>
                  <Col xs={3}>
                    <TreeView
                      request={treeData}
                      isArabic={isArabic}
                      onSelect={onSelectItem}
                    />
                  </Col>
                  <Col>
                    <AddCategory
                      onActionEvent={(o: RequestAction) => {
                        handleAction(o);
                      }}
                      request={object}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{t("Categories")}</Accordion.Header>
          <Accordion.Body>
            <Card className="card-custom">
              {/* <Card.Header></Card.Header> */}
              <Card.Body>
                <ConfirmModelDialogBox
                  isModelVisible={showDeleteModel}
                  onCloseEvent={() => {
                    setShowDeleteModel(false);
                  }}
                  actions={deleteActions}
                >
                  <div className="alert alert-warning">Are you sure?</div>
                </ConfirmModelDialogBox>
                {objects && (
                  <CategoryList
                    getCategoriesList={() => {
                      getAllObjects();
                    }}
                    setIsRefresh={setIsRefresh}
                    isRefresh={isRefresh}
                    request={objects}
                    onActionEvent={(o: RequestAction) => {
                      handleAction(o);
                    }}
                    totalRows={totalRows}
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
