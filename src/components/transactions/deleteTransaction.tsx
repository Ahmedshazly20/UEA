import { useFormik } from "formik";
import * as Yup from "yup";
import { FC, useState } from "react";
import { Button, Card } from "react-bootstrap";
import {
  ActionTypeEnum,
  DeleteTransactionModelRequest,
  RequestAction,
  TransactionResponseModel,
} from "../../models";
import { getLabelName, getUserId } from "../../utils";
import { TextBox } from "../common/textBox/textBox";
import { useTranslation } from "react-i18next";

export const DeleteTransaction: FC<{
  request: TransactionResponseModel;
  onActionEvent: (o: RequestAction) => void;
}> = ({ request, onActionEvent = () => {} }) => {
  //#region state
  const { t } = useTranslation();
  const [validationSchema, setValidationSchema] = useState(
    Yup.object({
      DeleteReason: Yup.string().required(t("DeleteReason.missing")),
      //Cat_ID: Yup.number().min(1, t("categorId.missing")),
    })
  );
  const [object, setObject] = useState<DeleteTransactionModelRequest>({
    TrnsactionId: request.id,
    TransactionTypeId: request.transactionType,
    User_ID: getUserId(),
    VoucherSetting_ID: 0,
    DeleteReason: "",
    ValueOfPoint: 0,
    InstallmentPlanId: 0,
    IsContainsItemSerial: false,
    ItemSerialList: [],
  });
  //#endregion
  //#region formik
  const formik = useFormik({
    initialValues: object,
    validationSchema: validationSchema,
    // validate,
    // enableReinitialize: true,
    onReset: (values, { setSubmitting, resetForm }) => {
      onActionEvent({
        id: 0,
        action: ActionTypeEnum.Clear,
      });
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setObject({ ...object, DeleteReason: values.DeleteReason });
      onActionEvent({
        id: object.TrnsactionId,
        request: object,
        action: ActionTypeEnum.Delete,
      });
    },
  });
  //#endregion
  //#region html
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row g-3">
        <div className="col-md-12">
          <TextBox
            labelName={getLabelName("DeleteReason")}
            inputName={"DeleteReason"}
            inputValue={formik.values.DeleteReason}
            errorText={formik.errors.DeleteReason}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
      </div>
      <div className="row g-3">
        <div className="col-md-2">
          <Button type="submit">{getLabelName("Yes")}</Button>
        </div>
        <div className="col-md-2">
          <Button
            onClick={() => {
              onActionEvent({
                id: 0,
                request: {},
                action: ActionTypeEnum.DeleteReset,
              });
            }}
          >
            {getLabelName("No")}
          </Button>
        </div>
      </div>
    </form>
  );
  //#endregion
};
