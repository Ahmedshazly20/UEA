import { MasterLayout } from "../../components/layout/masterLayout/masterLayout";
import { IRouteBase } from "../../models/routes/iRouteBase";
import {
  //sample pages
  DataTablePageWithClientPagination,
  DataTablePageWithCustomPagination,
  DataTablePageWithoutPagination,
  DataTablePageWithServerPagination,
  TreeViewPage,
  DashboardPage,
  ForbiddenPage,
  HomePage,
  ItemsPage,
  LookupPage,
  NotFoundPage,
  UnAuthorizedPage,
  UnitPage,
  UserPermissionsPage,
  UsersPage,
  EmployeePage,
  PdfViewerPage,
  CustomerPaymentPage,
  MoneyOut,
  MoneyIn,
  SupplierPaymentsPage,
  RefundSupplierPaymentsPage,
  RefundCustomerPaymentPage,
  EdiatbleTablePage,
  CompanySettingPage,
  CategoriesPage,
  CurrencyPage,
  SupplierPage,
  CustomerPage,
  SalesInvoicePage,
  PurchasesInvoicePage,
  SalesRetrunsPage,
  PurchasesReturnsPage,
  ReportFollowItemBalancePage,
  ReportItemsDifferenceInCostPage,
  ReportSummeryItemTransactionPage,
  ReportSummeryItemTransactionQuantityPage,
  ReportSummeryItemTransactionQuantityWithValuePage,
  StoresPage,
  UpdateTaxCategoryPage,
  ReportItemDataPage,
  ReportCustomersData,
  ReportsCustomersPayments,
  ReportsCustomersAccounts,
  ReportAllCustomersTransactions,
  ReportSuppliersData,
  ReportAllSuppliersTransactions,
  ReportSuppliersPayments,
  ReportSuppliersAccount,
  RuleExpenseMoneyPage,
  SalesTransactionsReport,
  ReturnSalesTransactionsReport,
  AllSalesAndReturnTransactionsReport,
  PurchaseTransactionsReport,
  ReturnPurchaseTransactionsReport,
  ReportCashier,
  ReportEmployeeSales,
  ReportVatPage,
  ReportProfitOfSalePage,
  ReportInMoneyPage,
  ReportOutMoneyPage,
  ReportInAndOutMoneyPage,
  ReportAllInAndOutMoneyPage,
} from "../../pages";
import { EstihkaksubtractExpenseRulePage } from "../../pages/EstihkaksubtractEmployee/EstihkaksubtractExpenseRulePage";
import { EstihkaksubtractRulePage } from "../../pages/EstihkaksubtractEmployee/EstihkaksubtractRulePage";
import { RuleRecieveMoneyPage } from "../../pages/ruleExpenseMoney/ruleExpenseMoneyPage";
import { AuthenticatedRoute } from "../route/AuthenticatedRoute";
import {
  SearchAllSalesAndReturnTransactionsReport,
  SearchPurchaseTransactionsReport,
  SearchReportCashier,
  SearchReportEmployeeSales,
  SearchReturnPurchaseTransactionsReport,
  SearchReturnSalesTransactionsReport,
  SearchSalesTransactionsReport,
} from "../../serviceBroker/transationReportApiServiceBroker";
import { EsthekakPage } from "../../pages/employees/esthekakPage";
import { EstektaaPage } from "../../pages/employees/estektaaPage";
import { EmployeeDueRulesPage } from "../../pages/EstihkaksubtractEmployee/EmployeeDueRulesPage";
import { EmployeeSubtractRulesPage } from "../../pages/EstihkaksubtractEmployee/EmployeeSubtractRulesPage";

export const DefaultRouteItems: IRouteBase[] = [
  //#region common pages
  {
    id: 10000,
    key: "defaultPage",
    path: "/default",
    content: (
      <MasterLayout>
        <HomePage />
      </MasterLayout>
    ),
  },
  {
    id: 10001,
    key: "homePage",
    path: "/",
    content: (
      <MasterLayout>
        <HomePage />
      </MasterLayout>
    ),
  },
  {
    id: 10002,
    key: "NotFoundPage",
    path: "/404",
    content: (
      <MasterLayout>
        <NotFoundPage />
      </MasterLayout>
    ),
  },
  {
    id: 10003,
    key: "UnAuthorizedPage",
    path: "/401",
    content: (
      <MasterLayout>
        <UnAuthorizedPage />
      </MasterLayout>
    ),
  },
  {
    id: 10004,
    key: "forbiddenPage",
    path: "/403",
    content: (
      <MasterLayout>
        <ForbiddenPage />
      </MasterLayout>
    ),
  },
  {
    id: 10005,
    key: "dashboardPage",
    path: "/dashboard",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <DashboardPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 10006,
    key: "logoutRedirectPage",
    path: "/logoutRedirect",
    content: (
      <MasterLayout>
        <HomePage />
      </MasterLayout>
    ),
  },
  //#endregion
  //#region users pages
  {
    id: 1,
    key: "usersPage",
    path: "/users",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <UsersPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 2,
    key: "userPermissions",
    path: "/user/permissions",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <UserPermissionsPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  //#endregion
  //#region setting pages
  {
    id: 2,
    key: "companySettingPage",
    path: "/company/setting",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <CompanySettingPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  //#endregion
  //#region items pages
  {
    id: 9,
    key: "items",
    path: "/items",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ItemsPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  //#endregion
  //#region transactions pages
  {
    id: 3,
    key: "Sales Invoice",
    path: "/transactions/sales/invoice",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <SalesInvoicePage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 4,
    key: "Purchases Invoice",
    path: "/transactions/purchases/invoice",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <PurchasesInvoicePage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 5,
    key: "Sales Returns",
    path: "/transactions/sales/return",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <SalesRetrunsPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 6,
    key: "Purchases Returns",
    path: "/transactions/purchases/return",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <PurchasesReturnsPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  //#endregion
  //#region sample pages
  {
    id: 0,
    key: "pdf",
    path: "/pdf",
    content: (
      <MasterLayout>
        <PdfViewerPage />
      </MasterLayout>
    ),
  },
  {
    id: 0,
    key: "treeview",
    path: "/sample/treeview",
    content: (
      <MasterLayout>
        <TreeViewPage />
      </MasterLayout>
    ),
  },
  {
    id: 0,
    key: "dataTablePageWithoutPagination",
    path: "/sample/table/noPagination",
    content: (
      <MasterLayout>
        <DataTablePageWithoutPagination />
      </MasterLayout>
    ),
  },
  {
    id: 0,
    key: "dataTablePageWithClientPagination",
    path: "/sample/table/clientPagination",
    content: (
      <MasterLayout>
        <DataTablePageWithClientPagination />
      </MasterLayout>
    ),
  },
  {
    id: 0,
    key: "dataTablePageWithServerPagination",
    path: "/sample/table/serverPagination",
    content: (
      <MasterLayout>
        <DataTablePageWithServerPagination />
      </MasterLayout>
    ),
  },
  {
    id: 0,
    key: "dataTablePageWithCustomPagination",
    path: "/sample/table/customPagination",
    content: (
      <MasterLayout>
        <DataTablePageWithCustomPagination />
      </MasterLayout>
    ),
  },
  {
    id: 0,
    key: "",
    path: "/sample/table/edit",
    content: (
      <MasterLayout>
        <EdiatbleTablePage />
      </MasterLayout>
    ),
  },
  //#endregion
  {
    id: 56,
    key: "MoneyOutPage",
    path: "/moneyOutPage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <MoneyOut />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 55,
    key: "MoneyIn",
    path: "/moneyInPage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <MoneyIn />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 14,
    key: "SupplierPaymentsPage",
    path: "/supplierPaymentsPage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <SupplierPaymentsPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 13,
    key: "CustomerPaymentPage",
    path: "/customerPaymentPage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <CustomerPaymentPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 16,
    key: "RefundSupplierPaymentsPage",
    path: "/refundSupplierPaymentsPage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <RefundSupplierPaymentsPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 15,
    key: "RefundCustomerPaymentPage",
    path: "/refundCustomerPaymentPage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <RefundCustomerPaymentPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 39,
    key: "employees",
    path: "/employees",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <EmployeePage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 10,
    key: "unitsPage",
    path: "/units",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <UnitPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 9999,
    key: "lookupPage",
    path: "/lookup",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <LookupPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 195,
    key: "currency",
    path: "/currency",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <CurrencyPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 55,
    key: "",
    path: "/Categories",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <CategoriesPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 7,
    key: "customerPage",
    path: "/customers",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <CustomerPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 8,
    key: "supplierPage",
    path: "/suppliers",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <SupplierPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 1206,
    key: "storePage",
    path: "/stores",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <StoresPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 19,
    key: "reportFollowItemBalancePage",
    path: "/reportFollowItemBalancePage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportFollowItemBalancePage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 18,
    key: "reportItemDataPage",
    path: "/reportItemDataPage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportItemDataPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 121,
    key: "reportItemsDifferenceInCostPage",
    path: "/reportItemsDifferenceInCostPage.tsx",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportItemsDifferenceInCostPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 89,
    key: "reportSummeryItemTransactionPage",
    path: "/reportSummeryItemTransactionPage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportSummeryItemTransactionPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 71,
    key: "reportSummeryItemTransactionQuantityPage",
    path: "/reportSummeryItemTransactionQuantityPage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportSummeryItemTransactionQuantityPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 73,
    key: "reportSummeryItemTransactionQuantityWithValuePage",
    path: "/reportSummeryItemTransactionQuantityWithValuePage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportSummeryItemTransactionQuantityWithValuePage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },

  {
    id: 195,
    key: "updateTaxCategoryPage",
    path: "/UpdateTaxCategoryPage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <UpdateTaxCategoryPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 25,
    key: "ReportCustomersData",
    path: "/reportCustomersData",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportCustomersData />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 27,
    key: "ReportsCustomersPayments",
    path: "/reportsCustomersPayments",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportsCustomersPayments />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 96,
    key: "ReportsCustomersAccounts",
    path: "/reportsCustomersAccounts",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportsCustomersAccounts />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 84,
    key: "ReportAllCustomersTransactions",
    path: "/reportAllCustomersTransactions",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportAllCustomersTransactions />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 26,
    key: "ReportSuppliersData",
    path: "/reportSuppliersData",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportSuppliersData />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 85,
    key: "ReportAllSuppliersTransactions",
    path: "/reportAllSuppliersTransactions",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportAllSuppliersTransactions />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 28,
    key: "ReportSuppliersPayments",
    path: "/reportSuppliersPayments",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportSuppliersPayments />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 97,
    key: "ReportSuppliersAccount",
    path: "/reportSuppliersAccount",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportSuppliersAccount />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 0,
    key: "ruleExpenseMoneyPage",
    path: "/ruleExpenseMoneyPage",
    content: (
      //<AuthenticatedRoute>
      <MasterLayout>
        <RuleExpenseMoneyPage />
      </MasterLayout>
      //</AuthenticatedRoute>
    ),
  },
  {
    id: 0,
    key: "ruleExpenseMoneyPage",
    path: "/ruleExpenseMoneyPage",
    content: (
      //<AuthenticatedRoute>
      <MasterLayout>
        <RuleExpenseMoneyPage />
      </MasterLayout>
      //</AuthenticatedRoute>
    ),
  },

  {
    id: 0,
    key: "RuleRecieveMoneyPage",
    path: "/RuleRecieveMoneyPage",
    content: (
      //<AuthenticatedRoute>
      <MasterLayout>
        <RuleRecieveMoneyPage />
      </MasterLayout>
      //</AuthenticatedRoute>
    ),
  },
  {
    id: 0,
    key: "EstihkaksubtractRulePage",
    path: "/EstihkaksubtractRulePage",
    content: (
      //<AuthenticatedRoute>
      <MasterLayout>
        <EstihkaksubtractRulePage />
      </MasterLayout>
      //</AuthenticatedRoute>
    ),
  },

  {
    id: 0,
    key: "EstihkaksubtractExpenseRulePage",
    path: "/EstihkaksubtractExpenseRulePage",
    content: (
      //<AuthenticatedRoute>
      <MasterLayout>
        <EstihkaksubtractExpenseRulePage />
      </MasterLayout>
      //</AuthenticatedRoute>
    ),
  },
  {
    id: 33,
    key: "SalesTransactionsReport",
    path: "/salesTransactionsReport",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <SalesTransactionsReport />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 35,
    key: "ReturnSalesTransactionsReport",
    path: "/returnSalesTransactionsReport",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReturnSalesTransactionsReport />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 65,
    key: "AllSalesAndReturnTransactionsReport",
    path: "/allSalesAndReturnTransactionsReport",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <AllSalesAndReturnTransactionsReport />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 34,
    key: "PurchaseTransactionsReport",
    path: "/purchaseTransactionsReport",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <PurchaseTransactionsReport />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 36,
    key: "ReturnPurchaseTransactionsReport",
    path: "/returnPurchaseTransactionsReport",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReturnPurchaseTransactionsReport />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 78,
    key: "ReportCashier",
    path: "/reportCashier",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportCashier />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 78,
    key: "ReportEmployeeSales",
    path: "/reportEmployeeSales",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportEmployeeSales />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 138,
    key: "ReportVatPage",
    path: "/reportVatPage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportVatPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 110,
    key: "ReportProfitOfSalePage",
    path: "/reportProfitOfSalePage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportProfitOfSalePage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 66,
    key: "ReportInMoneyPage",
    path: "/reportInMoneyPage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportInMoneyPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 67,
    key: "ReportOutMoneyPage",
    path: "/reportOutMoneyPage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportOutMoneyPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 53,
    key: "ReportInAndOutMoneyPage",
    path: "/reportInAndOutMoneyPage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportInAndOutMoneyPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 53,
    key: "ReportAllInAndOutMoneyPage",
    path: "/reportAllInAndOutMoneyPage",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <ReportAllInAndOutMoneyPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 59,
    key: "EmployeeDue",
    path: "/EmployeeDue",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <EsthekakPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 60,
    key: "EmployeeSubtract",
    path: "/EmployeeSubtract",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <EstektaaPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 57,
    key: "EmployeeDueRules",
    path: "/EmployeeDueRules",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <EmployeeDueRulesPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
  {
    id: 58,
    key: "EmployeeSubtractRules",
    path: "/EmployeeSubtractRules",
    content: (
      <AuthenticatedRoute>
        <MasterLayout>
          <EmployeeSubtractRulesPage />
        </MasterLayout>
      </AuthenticatedRoute>
    ),
  },
];
//#endregion
