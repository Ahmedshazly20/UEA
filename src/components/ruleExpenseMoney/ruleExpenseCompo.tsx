import React, {FC, useEffect, useState} from 'react';
import {
    ActionButtons,
    AcTransaction,
    AcTransactionTypeEnum,
    LookupItem,
    LookupTypeEnum,
    SearchAcTransactionRequest,
} from "../../models";

import {LoadingBox} from "../box/loadingBox";
import {DeleteAcTransaction, SearchAcTransactionTreasury} from "../../serviceBroker/acTransactionsApiServiceBroker";
import {getLookupByType} from "../../serviceBroker/lookupApiServiceBroker";
import {AcTransactionSearch} from "../../models/AcTransaction/AcTransaction";
import {ModelDialogBox} from "../box/modelDialogBox";
import {ConfirmModelDialogBox} from "../box/confirmDialogBox";
import {getLabelName, getUserId} from "../../utils";
import {PdfViewer} from "../common/pdfViewer/pdfViewer";
import { AcTransactionList } from '../AcTransaction/AcTransactionList';
import { SearchRuleExpenseMoneyAccounts, SearchRuleReceiveMoneyAccounts } from '../../serviceBroker/ruleExpenseMoneyApiServiceBroker';
import { ruleExpenseMoneySearch, SearchruleExpenseMoneyRequest } from '../../models/ruleExpenseMoney/ruleExpenseMoney';
import { date } from 'yup/lib/locale';
import { RuleExpenseMoneyList } from './ruleExpenseMoneyList';
import { RuleExpRecieAccountsEnum } from '../../models/enums/enumList';
import RuleExpenseSearchPanel from './ruleExpenseSearchPanel';
import { RegisterRuleExpenseMoney } from './registerRuleExpenseMoney';

export const RuleExpenseCompo: FC<{acTransactionType: RuleExpRecieAccountsEnum}> = ({acTransactionType}) => {
    const defaultPageSize: number = 50;
    const acTransactionInitValue: ruleExpenseMoneySearch = {
        Code: "",
        AccountType_ID: 0,
        Orders: 0,
        ArabicName: "",
        EnglishName: "",
        Parent_ID:0 ,
        AllParent: "",
        RegisterInTrans: false,
        Active: true,
        Notes: "",
        BeginBalance: 0,
        Total_Money: 0,
        Money_Pay: 0,
        Balance: 0,
        ShowToUser: true,
        DateCreate:  new Date(),
        BalanceInCurrency: 0,
        Account_UniqueID: "",
        TotalDebit: 0,
        TotalCredit: 0,
        NatureType: 0,
        IsParent: true,
        IsShowInCostCenter: false,
        AccountTypeId: 0,
        BranchID: 0,
        ID: 0,
        CreatedBy: 0,
        ModifiedBy: 0,
        Name: "",
        CreationDate: new Date() ,
        ModificationDate: new Date(),
        VerifyOnUpdate: false,
        rowState: 1
      
    };
    let searchPanelHeader = '';
    switch (+acTransactionType) {
        case RuleExpRecieAccountsEnum.Expense:
            searchPanelHeader = "Expense Money Account";
            acTransactionInitValue.AccountType_ID = 1;
            break;
        case RuleExpRecieAccountsEnum.Receive:
            searchPanelHeader = "Receive Money Account";
            acTransactionInitValue.AccountType_ID = 2;
            break;
        default:
    }

    const [loading, setLoading] = useState(false);
    const [showAcTransactionModel, setShowAcTransactionModel] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState({show:false,id:0});
    const [showPrintModel, setShowPrintModel] = useState({show:false,content:""});
    
    const [totalRows, setTotalRows] = useState(0);

    const [searchParams, setSearchParams] =
        useState<SearchruleExpenseMoneyRequest>(
            {
            pageNumber: 1,
            pageSize: defaultPageSize,
            accountId: 0,
            
            });
    const [acTransaction, setAcTransaction] = useState<ruleExpenseMoneySearch>(acTransactionInitValue);
    const [customerAccountLookups, setCustomerAccountLookups] = useState<LookupItem[]>([]);
    const [allAccountLookups, setAllAccountLookups] = useState<LookupItem[]>([]);
    const [suppliersAccountLookups, setSuppliersAccountLookups] = useState<LookupItem[]>([]);
    const [userLookUps, setUserLookUps] = useState<LookupItem[]>([]);
    const [coastCenterLookUps, setCoastCenterLookUps] = useState<LookupItem[]>([]);
    const [currencyLookUps, setCurrencyLookUps] = useState<LookupItem[]>([]);
    const [allTreasuryInAccount, setAllTreasuryInAccount] = useState<LookupItem[]>([]);
    const [allTreasuryOutAccount, setAllTreasuryOutAccount] = useState<LookupItem[]>([]);
    const [acTransactionSearch, setAcTransactionSearch] = useState<SearchruleExpenseMoneyRequest[]>([]);



    useEffect(() => {
        const fillData = async () => {
            setLoading(true);
            await handelSearch();
            setLoading(false);
        };
        fillData();
    }, []);

    const getAllLookups = async () => 
    {
        const allAccounts = await getLookupByType(
            LookupTypeEnum.AllAccounts,true, true
        );
      
        setAllAccountLookups(allAccounts);
         
    };

    const handelSearch = async () => {
        setLoading(true);
        let response;
       
      if (acTransactionType==RuleExpRecieAccountsEnum.Expense)
      {
         response = await SearchRuleExpenseMoneyAccounts(searchParams);
       
         

      }
        else
        {
         response = await SearchRuleReceiveMoneyAccounts(searchParams);
      
        }
        

        if (response.Result != undefined) {
         
            setAcTransactionSearch(response.Result);
           
        } else {
            setAcTransactionSearch([]);
        }
        if (response.TotalRecoredCount !== undefined) {
            setTotalRows(response.TotalRecoredCount);
        } else {
            setTotalRows(0);
        }
        setLoading(false);

    }

    const onCurrentPageChange = async (pageNumber: number) => {
        if (pageNumber !== searchParams.pageNumber) {
            const obj = { ...searchParams };
            obj.pageNumber = pageNumber;
            setSearchParams(obj);
           await handelSearch();
        }
    };
    const onPageSizeChange = async (pageSize: number) => {
        if (pageSize !== searchParams.pageSize) {
            const obj = { ...searchParams };
            obj.pageSize = pageSize;
            setSearchParams(obj);
            await handelSearch();
        }
    };

    const handleSaveEmployeeComplete = async (isSaveComplete: boolean) => {
        if (isSaveComplete) {
            setShowAcTransactionModel(false);
          
            await handelSearch();
        } else {
            setShowAcTransactionModel(false);
            setAcTransaction(acTransactionInitValue);
        }

    };
    const deleteEmployeeActions: ActionButtons[] = [
        {
            text: getLabelName("yes"),
            onClick:async () => {
                setLoading(true);
                await DeleteAcTransaction(showDeleteModel.id,32); //todo: get current User
                await handelSearch();
                setShowDeleteModel({show: false,id:0});
                setLoading(false);
            },
        },
        {
            text: getLabelName("No"),
            onClick: () => {
                setShowDeleteModel({show: false,id:0});
            },
        },
    ];
    

    return (
        <>

<RuleExpenseSearchPanel acTransactionType={acTransactionType} header={searchPanelHeader}
                                      searchParams={searchParams} setSearchParams={setSearchParams}
                                      handelSearch={async (e)=> handelSearch()}
                                      customerAccountLookups={customerAccountLookups}
                                      allTreasuryOutAccount={allTreasuryOutAccount}
                                      allTreasuryInAccount={allTreasuryInAccount}
                                      userLookUps={userLookUps}
                                      setShowAcTransactionModel={setShowAcTransactionModel}/>

         




            <RuleExpenseMoneyList acTransactionSearch={acTransactionSearch} totalRows={totalRows}
                               searchParams={searchParams}
                               defaultPageSize={defaultPageSize}
                               onCurrentPageChange={onCurrentPageChange} 
                               onPageSizeChange={onPageSizeChange}
                               setShowAcTransactionModel={setShowAcTransactionModel}
                               setAcTransaction={setAcTransaction}
                               setShowDeleteModel={setShowDeleteModel}
                               setShowPrintModel={setShowPrintModel}
                               setLoading={setLoading}/>

           
<ModelDialogBox
                isModelVisible={showAcTransactionModel}
                isCloseButtonVisible={false} size="xl">
                <RegisterRuleExpenseMoney searchPanelHeader={searchPanelHeader} 
                acTransactionType={acTransactionType}
                                   acTransaction={acTransaction} 
                                   setLoading={setLoading}
                                   customerAccountLookups={customerAccountLookups}
                                   handleSaveEmployeeComplete={handleSaveEmployeeComplete}
                                   currencyLookUps={currencyLookUps}
                                   coastCenterLookUps={coastCenterLookUps}
                                   suppliersAccountLookups={suppliersAccountLookups}/>
            </ModelDialogBox>
            <ConfirmModelDialogBox
                isModelVisible={showDeleteModel.show}
                onCloseEvent={() => {
                    setShowDeleteModel({show: false,id:0});
                }}
                actions={deleteEmployeeActions}
            >
                <>Are you sure?</>
            </ConfirmModelDialogBox>
          
        </>
    )
};