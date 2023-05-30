import React, {FC} from 'react';
import {AcTransactionComponent} from "../../components";
import {AcTransactionTypeEnum} from "../../models";

export const MoneyOut: FC<{}>=() => {
    return (
        <AcTransactionComponent acTransactionType={AcTransactionTypeEnum.MoneyOut}/>
    )
};
    
export const MoneyIn: FC<{}>=() => {
    return (
        <AcTransactionComponent acTransactionType={AcTransactionTypeEnum.MoneyIn}/>
    )
};

export const SupplierPaymentsPage: FC<{}>=() => {
    return (
        <AcTransactionComponent acTransactionType={AcTransactionTypeEnum.SupplierPayments}/>
    )
};

export const CustomerPaymentPage: FC<{}>=() => {
    return (
        <AcTransactionComponent acTransactionType={AcTransactionTypeEnum.CustomerPayment}/>
    )
};

export const RefundSupplierPaymentsPage: FC<{}>=() => {
    return (
        <AcTransactionComponent acTransactionType={AcTransactionTypeEnum.RefundSupplierPayments}/>
    )
};

export const RefundCustomerPaymentPage: FC<{}>=() => {
    return (
        <AcTransactionComponent acTransactionType={AcTransactionTypeEnum.RefundCustomerPayments}/>
    )
};