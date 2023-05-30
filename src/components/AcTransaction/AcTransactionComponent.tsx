import React, { FC, useEffect, useState } from "react";
import {
  ActionButtons,
  AcTransaction,
  AcTransactionTypeEnum,
  LookupItem,
  LookupTypeEnum,
  SearchAcTransactionRequest,
} from "../../models";
import AcTransactionSearchPanel from "./AcTransactionSearchPanel";
import { LoadingBox } from "../box/loadingBox";
import {
  DeleteAcTransaction,
  SearchAcTransactionTreasury,
} from "../../serviceBroker/acTransactionsApiServiceBroker";
import { AcTransactionList } from "./AcTransactionList";
import { getLookupByType } from "../../serviceBroker/lookupApiServiceBroker";
import { AcTransactionSearch } from "../../models/AcTransaction/AcTransaction";
import { ModelDialogBox } from "../box/modelDialogBox";
import { AcTransactionForm } from "./AcTransactionForm";
import { ConfirmModelDialogBox } from "../box/confirmDialogBox";
import { getLabelName, getUserId } from "../../utils";
import { PdfViewer } from "../common/pdfViewer/pdfViewer";

export const AcTransactionComponent: FC<{
  acTransactionType: AcTransactionTypeEnum;
}> = ({ acTransactionType }) => {
  const defaultPageSize: number = 50;
  const acTransactionInitValue: AcTransaction = {
    ID: 0,
    FromAccount_ID: 0,
    ToAccount_ID: 0,
    CostCenter_ID: 0,
    Currency_ID: 0,
    Station_ID: 1,
    Code: "",
    Note: "",
    Value: 0,
    Date: new Date(),
    AcTransactionType: acTransactionType,
    CreatedBy: getUserId(),
    ModifiedBy: 0,
    CreationDate: new Date(),
    ModificationDate: new Date(),
    rowState: 1,
    ValueCurrency: 1,
  };
  let searchPanelHeader = "";
  switch (+acTransactionType) {
    case AcTransactionTypeEnum.MoneyIn:
      searchPanelHeader = "Money In Search";
      acTransactionInitValue.ToAccount_ID = -30;
      break;
    case AcTransactionTypeEnum.MoneyOut:
      searchPanelHeader = "Money Out Search";
      acTransactionInitValue.FromAccount_ID = -30;
      break;
    case AcTransactionTypeEnum.SupplierPayments:
      searchPanelHeader = "Supplier Payments Search";
      acTransactionInitValue.FromAccount_ID = -30;
      break;
    case AcTransactionTypeEnum.CustomerPayment:
      searchPanelHeader = "Customer Receipts Search";
      acTransactionInitValue.ToAccount_ID = -30;
      break;
    case AcTransactionTypeEnum.RefundCustomerPayments:
      searchPanelHeader = "Refund Customer Receipts Search";
      acTransactionInitValue.FromAccount_ID = -30;
      break;
    case AcTransactionTypeEnum.RefundSupplierPayments:
      searchPanelHeader = "Refund Supplier Payments Search";
      acTransactionInitValue.ToAccount_ID = -30;
      break;
    default:
  }

  const [loading, setLoading] = useState(false);
  const [showAcTransactionModel, setShowAcTransactionModel] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState({
    show: false,
    id: 0,
  });
  const [showPrintModel, setShowPrintModel] = useState({
    show: false,
    content: "",
  });

  const [totalRows, setTotalRows] = useState(0);

  const [searchParams, setSearchParams] = useState<SearchAcTransactionRequest>({
    pageNumber: 1,
    pageSize: defaultPageSize,
    acTransactionType: +acTransactionType,
  });
  const [acTransaction, setAcTransaction] = useState<AcTransaction>(
    acTransactionInitValue
  );
  const [customerAccountLookups, setCustomerAccountLookups] = useState<
    LookupItem[]
  >([]);
  const [allAccountLookups, setAllAccountLookups] = useState<LookupItem[]>([]);
  const [suppliersAccountLookups, setSuppliersAccountLookups] = useState<
    LookupItem[]
  >([]);
  const [userLookUps, setUserLookUps] = useState<LookupItem[]>([]);
  const [coastCenterLookUps, setCoastCenterLookUps] = useState<LookupItem[]>(
    []
  );
  const [currencyLookUps, setCurrencyLookUps] = useState<LookupItem[]>([]);
  const [allTreasuryInAccount, setAllTreasuryInAccount] = useState<
    LookupItem[]
  >([]);
  const [allTreasuryOutAccount, setAllTreasuryOutAccount] = useState<
    LookupItem[]
  >([]);
  const [acTransactionSearch, setAcTransactionSearch] = useState<
    AcTransactionSearch[]
  >([]);

  useEffect(() => {
    const fillData = async () => {
      setLoading(true);
      await getAllLookups();
      setLoading(false);
    };
    fillData();
  }, []);

  const getAllLookups = async () => {
    const customers = await getLookupByType(
      LookupTypeEnum.CustomerAccounts,
      true,
      true
    );
    setCustomerAccountLookups(customers);
    const users = await getLookupByType(LookupTypeEnum.Users, true, true);
    setUserLookUps(users);
    const allAccounts = await getLookupByType(
      LookupTypeEnum.AllAccounts,
      true,
      true
    );
    setAllAccountLookups(allAccounts);
    const allCurrency = await getLookupByType(
      LookupTypeEnum.Currency,
      true,
      true
    );
    setCurrencyLookUps(allCurrency);
    const suppliersAccounts = await getLookupByType(
      LookupTypeEnum.SupplierAccounts,
      true,
      true
    );
    setSuppliersAccountLookups(suppliersAccounts);
    const coastCenters = await getLookupByType(
      LookupTypeEnum.CostCenters,
      true,
      true
    );
    setCoastCenterLookUps(coastCenters);
    const treasuryInAccount = await getLookupByType(
      LookupTypeEnum.AllTreasuryInAccount,
      true,
      true
    );
    setAllTreasuryInAccount(treasuryInAccount);
    const treasuryOutAccount = await getLookupByType(
      LookupTypeEnum.AllTreasuryOutAccount,
      true,
      true
    );
    setAllTreasuryOutAccount(treasuryOutAccount);
  };

  const handelSearch = async () => {
    setLoading(true);
    const response = await SearchAcTransactionTreasury(searchParams);
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
  };

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
      onClick: async () => {
        setLoading(true);
        await DeleteAcTransaction(showDeleteModel.id, 32); //todo: get current User
        await handelSearch();
        setShowDeleteModel({ show: false, id: 0 });
        setLoading(false);
      },
    },
    {
      text: getLabelName("No"),
      onClick: () => {
        setShowDeleteModel({ show: false, id: 0 });
      },
    },
  ];

  return (
    <>
      {loading && <LoadingBox />}
      <AcTransactionSearchPanel
        acTransactionType={acTransactionType}
        header={searchPanelHeader}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handelSearch={async (e) => handelSearch()}
        customerAccountLookups={customerAccountLookups}
        allTreasuryOutAccount={allTreasuryOutAccount}
        allTreasuryInAccount={allTreasuryInAccount}
        userLookUps={userLookUps}
        setShowAcTransactionModel={setShowAcTransactionModel}
      />

      <AcTransactionList
        acTransactionSearch={acTransactionSearch}
        totalRows={totalRows}
        searchParams={searchParams}
        defaultPageSize={defaultPageSize}
        onCurrentPageChange={onCurrentPageChange}
        onPageSizeChange={onPageSizeChange}
        setShowAcTransactionModel={setShowAcTransactionModel}
        setAcTransaction={setAcTransaction}
        setShowDeleteModel={setShowDeleteModel}
        setShowPrintModel={setShowPrintModel}
        setLoading={setLoading}
      />

      <ModelDialogBox
        isModelVisible={showAcTransactionModel}
        isCloseButtonVisible={false}
        size="xl"
      >
        <AcTransactionForm
          searchPanelHeader={searchPanelHeader}
          acTransactionType={acTransactionType}
          acTransaction={acTransaction}
          setLoading={setLoading}
          customerAccountLookups={customerAccountLookups}
          handleSaveEmployeeComplete={handleSaveEmployeeComplete}
          currencyLookUps={currencyLookUps}
          coastCenterLookUps={coastCenterLookUps}
          suppliersAccountLookups={suppliersAccountLookups}
        />
      </ModelDialogBox>
      <ConfirmModelDialogBox
        isModelVisible={showDeleteModel.show}
        onCloseEvent={() => {
          setShowDeleteModel({ show: false, id: 0 });
        }}
        actions={deleteEmployeeActions}
      >
        <>Are you sure?</>
      </ConfirmModelDialogBox>
      <ModelDialogBox
        isModelVisible={showPrintModel.show}
        isCloseButtonVisible={true}
        onCloseEvent={() => {
          setShowPrintModel({ show: false, content: "" });
        }}
      >
        <PdfViewer content={showPrintModel.content} />
      </ModelDialogBox>
    </>
  );
};
