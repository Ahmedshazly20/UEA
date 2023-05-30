import { FC } from "react";
import { TransactionMainComponent } from "../../components";
import { DailyTransactionTypeEnum } from "../../models";
export const SalesRetrunsPage: FC<{}> = () => {
  //#region html
  return (
    <>
      <TransactionMainComponent
        transactionType={DailyTransactionTypeEnum.SalesReturn}
      />
    </>
  );
  //#endregion
};
