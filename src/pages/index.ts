import exp from "constants";

export {HomePage} from "./home/homePage";
export {DashboardPage} from "./dashboard/dashboard";
export {ForbiddenPage} from "./forbidden/forbidden";
export {UsersPage} from "./user/usersPage";
export {UserPermissionsPage} from "./user/userPermissionsPage";
export {UnitPage} from "./unit/unitPage";
export {LookupPage} from "./lookup/lookupPage";
export {NotFoundPage} from "./forbidden/notFoundPage";
export {UnAuthorizedPage} from "./forbidden/unAuthorizedPage";
export {ItemsPage} from "./items/itemsPage";
export {PdfViewerPage} from "./samples/pdfViewerPage";
export {EmployeePage} from "./employees/employeePage";
export {EdiatbleTablePage} from "./samples/ediatbleTablePage";
export {
    CustomerPaymentPage,
    RefundCustomerPaymentPage,
    RefundSupplierPaymentsPage,
    MoneyOut,
    MoneyIn,
    SupplierPaymentsPage,
} from "./AcTransactions/AcTransactionsPages";

export {CompanySettingPage} from "./setting/companySettingPage";
export {CategoriesPage} from "./categories/categoriesPage";
export {CurrencyPage} from "./currency/currencyPage";
export {SupplierPage} from "./supplier/supplierPage";
export {CustomerPage} from "./customer/customerPage";
export {StoresPage} from "./store/storePage";
export {PurchasesInvoicePage} from "./transactions/purchasesInvoicePage";
export {PurchasesReturnsPage} from "./transactions/purchasesReturnsPage";
export {SalesInvoicePage} from "./transactions/salesInvoicePage";
export {SalesRetrunsPage} from "./transactions/salesRetrunsPage";
export { RuleExpenseMoneyPage }  from "./ruleExpenseMoney/ruleExpenseMoneyPage"

//#region  sample pages
export {DataTablePageWithClientPagination} from "./samples/dataTablePageWithClientPagination";
export {DataTablePageWithCustomPagination} from "./samples/dataTablePageWithCustomPagination";
export {DataTablePageWithoutPagination} from "./samples/dataTablePageWithoutPagination";
export {DataTablePageWithServerPagination} from "./samples/dataTablePageWithServerPagination";
export {TreeViewPage} from "./samples/treeViewPage";
//#endregion
//#region  reports  pages
export {ReportItemDataPage} from "./Reports/Items/ReportItemDataPage";
export {ReportFollowItemBalancePage} from "./Reports/Items/ReportFollowItemBalancePage";
export {ReportItemsDifferenceInCostPage} from "./Reports/Items/ReportItemsDifferenceInCostPage";
export {ReportSummeryItemTransactionQuantityPage} from "./Reports/Items/ReportSummeryItemTransactionQuantityPage";
export {
    ReportSummeryItemTransactionQuantityWithValuePage
} from "./Reports/Items/ReportSummeryItemTransactionQuntityWithValuePage";
export {ReportSummeryItemTransactionPage} from "./Reports/Items/ReportSummeryItemTransacionPage";

export {ReportCustomersData} from "./Reports/Customers/ReportCustomersData";
export {ReportsCustomersPayments} from "./Reports/Customers/ReportCustomersPayments";
export {ReportsCustomersAccounts} from "./Reports/Customers/ReportCustomersAccounts";
export {ReportAllCustomersTransactions} from "./Reports/Customers/ReportAllCustomersTransactions";

export {ReportSuppliersData} from "./Reports/Suppliers/ReportSuppliersData";
export {ReportAllSuppliersTransactions} from "./Reports/Suppliers/ReportAllSuppliersTransactions";
export {ReportSuppliersPayments} from "./Reports/Suppliers/ReportSuppliersPayments";
export {ReportSuppliersAccount} from "./Reports/Suppliers/ReportSuppliersAccounts";

export {AllSalesAndReturnTransactionsReport} from "./Reports/Transactions/AllSalesAndReturnTransactionsReport";
export {PurchaseTransactionsReport} from "./Reports/Transactions/PurchaseTransactionsReport";
export {ReportCashier} from "./Reports/Transactions/ReportCashier";
export {ReportEmployeeSales} from "./Reports/Transactions/ReportEmployeeSales";
export {ReturnPurchaseTransactionsReport} from "./Reports/Transactions/ReturnPurchaseTransactionsReport";
export {ReturnSalesTransactionsReport} from "./Reports/Transactions/ReturnSalesTransactionsReport";
export {SalesTransactionsReport} from "./Reports/Transactions/SalesTransactionsReport";
export {ReportVatPage} from "./Reports/Transactions/ReportVatPage";
export {ReportProfitOfSalePage} from "./Reports/Transactions/ReportProfitOfSalePage";
export {ReportInMoneyPage} from "./Reports/Treasury/ReportInMoneyPage"
export {ReportOutMoneyPage} from "./Reports/Treasury/ReportOutMoneyPage"
export {ReportInAndOutMoneyPage} from "./Reports/Treasury/ReportInAndOutMoneyPage"
export {ReportAllInAndOutMoneyPage} from "./Reports/Treasury/ReportAllInAndOutMoneyPage"



//#endregion

export {UpdateTaxCategoryPage} from "./updateTaxCategory/updateTaxCategoryPage";