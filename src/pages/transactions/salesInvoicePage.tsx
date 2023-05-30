import { FC } from "react";
import { TransactionMainComponent } from "../../components";
import { DailyTransactionTypeEnum } from "../../models";

export const SalesInvoicePage: FC<{}> = () => {
  //#region html
  return (
    <>
      <TransactionMainComponent
        transactionType={DailyTransactionTypeEnum.SalesInvoice}
      />
    </>
  );
  //#endregion
};
