import { FC } from "react";
import { TransactionMainComponent } from "../../components";
import { DailyTransactionTypeEnum } from "../../models";
export const PurchasesInvoicePage: FC<{}> = () => {
  //#region html
  return (
    <>
      <TransactionMainComponent
        transactionType={DailyTransactionTypeEnum.PurchasesInvoice}
      />
    </>
  );
  //#endregion
};
