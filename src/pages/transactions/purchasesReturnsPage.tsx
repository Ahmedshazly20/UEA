import { FC } from "react";
import { TransactionMainComponent } from "../../components";
import { DailyTransactionTypeEnum } from "../../models";
export const PurchasesReturnsPage: FC<{}> = () => {
  //#region html
  return (
    <>
      <TransactionMainComponent
        transactionType={DailyTransactionTypeEnum.PurchasesReturn}
      />
    </>
  );
  //#endregion
};
