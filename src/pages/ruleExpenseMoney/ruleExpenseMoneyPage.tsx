import React, {FC} from 'react';
import {AcTransactionComponent} from "../../components";
import { RuleExpenseCompo } from '../../components/ruleExpenseMoney/ruleExpenseCompo';
import { RuleExpRecieAccountsEnum } from '../../models/enums/enumList';


export const RuleExpenseMoneyPage: FC<{}>=() => {
  return (
    <>
    <RuleExpenseCompo acTransactionType={RuleExpRecieAccountsEnum.Expense}/>
    
    </>
      
  )
};
export const RuleRecieveMoneyPage: FC<{}>=() => {
  return (
    <>
    <RuleExpenseCompo acTransactionType={RuleExpRecieAccountsEnum.Receive}/>
    </>    
  )
};