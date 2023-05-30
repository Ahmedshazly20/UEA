export enum PageModeEnum {
  Add = "X9HDZ5Sx6PgtT915aWpZ",
  Edit = "svsdQIDcxgqj6jZovYHh",
  Viwe = "WdsaCA1t89Y8n0s6SKQF",
  Mode1 = "TVMHVhNPedUnPWFoxM55",
  Mode2 = "uzgV0zkpPhjgFlchwye7",
  Mode3 = "jqJPmOmEagMu6LwfW1LU",
  Mode4 = "9K0kjY8Foe0pP6JPPB2Z",
  Mode5 = "2yDHktjkifjv0suwRnFj",
  Mode6 = "sLRmg3PDsVoGPHxG3fou",
  Mode7 = "6Tj8ZT0pF85oyWalylsv",
  Mode8 = "4rPxha0mbNkf6JoFqGhh",
  Mode9 = "gvITU6gNYQ5IybAOZulL",
  Mode10 = "jvnq34BTMHBGwzHMmswW",
}
export enum CustomerComponentDisplayMode{
  defaultMode  =0,
  registerTransactionMode=1
}
export  enum  PriceTypeEnum {
  None = -1,
  DefaultPrice = 0,
  PriceSale = 1,
  PriceCost = 2,
  PricePurchase = 3,
  WholeSalePrice = 4,
  AdditionalPrice = 5
}
export enum validateTransactionModeEnum {
  None = 0,
  Modify = 1,
  Delete = 2,
  Return = 3,
}
export enum AccrualSubtractRuleTypeEnum {
  Accrual = 1,
  Subtract = 2,
}
export enum DailyTransactionTypeEnum {
  None = 0,
  SalesInvoice = 1,
  PurchasesInvoice = 2,
  SalesReturn = 3,
  PurchasesReturn = 4,
  Order = 5,
  IncrementFromInventoryCheck = 6,
  DecreaseFromInventoryCheck = 7,
  POSSales = 8,
  ReturnPOSSales = 99,
  MoveToStore = 10,
  ReceiveFromStore = 11,
  POSResurant = 12,
  ReturnPOSResturant = 13,
  OutForProdaction = 14,
  ProductionTransaction = 15,
  ExtractandDistribute = 16,
  ShowPrice = 17,
  Reserve_Resturant_Bill = 18,
  Cancel_Reserve_Resturant_Bill = 19,
  Consign_In = 20,
  Consign_Out = 21,
  Shipment = 22,
  CarRegistration = 23,
  Notice_Receive = 24,
  Examination_Inspection_Report = 25,
  Received_Note = 26,
}
export enum PremissionTypeEnum {
  None = 0,
  Save = 1,
  Update = 2,
  Delete = 3,
  Search = 4,
  Tablet = 5,
  All,
}

export enum PageEnum {
  none = 0,
  users = 1,
}

export enum DisplayLabelNameEnum {
  none = 0,
  value = 1180,
  arabiceName = 1228,
  englishName = 1229,
  isDefault = 1191,
  itemName = 1195,
  name = 1207,
}

export enum LayoutEnum {
  None = 0,
  DefaultLayout = 1,
  SeniorAdminLayout = 2,
  AdminLayout = 3,
  InspectorLayout = 4,
  GuestLayout = 5,
  OnlineLayout = 6,
}

export enum ActionTypeEnum {
  None = 0,
  Add = 1,
  Update = 2,
  Delete = 3,
  GrantPremissions = 4,
  AddSuccess = 5,
  AddFailed = 6,
  Clear = 7,
  AddSubObjectSuccess = 8,
  AddSubObjectFailed = 9,
  AddSubObjectReset = 10,
  ModifySubObjectSuccess = 11,
  ModifySubObjectFailed = 12,
  ModifySubObjectReset = 13,
  DeleteSubObjectSuccess = 14,
  DeleteSubObjectFailed = 15,
  DeleteSubObjectReset = 16,
  AddSubObject = 17,
  ModifySubObject = 18,
  DeleteSubObject = 19,
  Success = 20,
  Failed = 21,
  DeleteSubObjectComplete = 22,
  DeleteSuccess = 23,
  DeleteOperationStart = 24,
  Print = 25,
  UserSetting = 26,
  RaiseError = 27,
  TransactionSetting = 28,
  POSSetting = 29,
  ModifyStart = 30,
  ModifySuccess = 31,
  ModifyFailed = 32,
  ModifyReset = 33,
  DeleteStart = 34,
  DeleteFailed = 36,
  DeleteReset = 37,
  Save = 38,
  SaveSuccess = 39,
  SaveFailed = 40,
  AddPartialCustomerStart = 41,
  AddPartialCustomerSuccess = 42,
  AddPartialCustomerFailed = 43,
  ClearError = 44,
  Test=99,
}

export enum RowState {
  None = 0,
  Add = 1,
  Update = 2,
  Delete = 3,
}

export enum UserRoleEnum {
  None = 0,
  OnlineUser = 982,
  NoteIssuer = 986,
  Admin = 983,
  SeniorAdmin = 984,
  Inspector = 985,
  AlliedUser = 987,
  AlliedInformer = 988,
  Inquiry = 989,
  GeneralInquiry = 990,
  InspectorAdmin = 991,
  TrakheesiOfficeAdmin = 1100,
}

export enum InspectionSearchTypeEnum {
  None = 0,
  AutomaticBulk = 1,
  ManualBulk = 2,
  Individual = 3,
}

export enum LookupTypeEnum {
  None = 0,
  Users = 1,
  Stores = 2,
  CategoryType = 3,
  Customers = 4,
  Supplier = 5,
  PaymentType = 6,
  CostCenter = 7,
  Employee = 8,
  TransactionType = 9,
  Cities = 10,
  Branches = 11,
  AC_Accounts = 12,
  Units = 13,
  Departments = 14,
  JobPosition = 15,
  CalcType = 16,
  Table = 17,
  PriceType = 18,
  Modifiers = 19,
  Currency = 20,
  Device_Status = 50,
  OrderStatus = 51,
  Stage = 52,
  Country = 53,
  DelayPaymentType = 55,
  /// 54 Account Type (Balance , Income , Trading , Operation  الحساب  ميزانية – قائمة دخل – تشغيل  -متاجرة)
  AccountType = 54,
  CarPaymentType = 56,
  DiscountType = 59,
  NotesTypes = 61,
  ReportTypes = 62,
  DaysOfWeek = 63,
  /// 57 Old Account Type (Asoul , Khsoum , Income , Out come أصول خصوم ايرادات مصروفات)
  OldAccountType = 75,
  Cars_Type = 158,
  Cars_Color = 159,
  Cars_Service = 164,
  ApplicationDelivery = 160,
  ItemsOnTable = -170,
  Mortgage_Items = 176,
  AllAccounts = 901,
  CustomerAccounts = 902,
  SupplierAccounts = 903,
  AllTreasuryInAccount = 904,
  AllTreasuryOutAccount = 905,
  CostCenters = 906,
  AllCategrories = 907,
  Items = 908,
  ruleReceiveMony = 111,
  ruleExpenseMoney = 222,
  DefaultNote = 61,
  DefaultDiscountType = 59,
  Estehkak = 57,
  Estektaa = 58,
}

export enum RedirectTypeEnum {
  None = 0,
  Internal = 1,
  External = 2,
  DirectExternalRedirect = 3,
}

export enum DialogStatusEnum {
  None = 0,
  Success = 1,
  Failed = 2,
}

export enum DocumentStatusEnum {
  Add = 1,
  Remove = 2,
  View = 3,
}

export enum TransactionModeEnum {
  View = 0,
  Add = 1,
  Update = 2,
  Cancel = 3,
  Close = 4,
  Rejcted = 7,
  Edit = 8,
}

export enum UploadFileTypeEnum {
  None = 0,
  request = 1,
  Measure = 2,
}

export enum SearchItemsTypeEnum {
  None = "0",
  ItemName = "1",
  ItemCode = "2",
  ItemBarCode = "3",
}
export enum SearchDailyTransactionTypeEnum {
  None = 0,
  itemName = 1,
  id = 2,
  code = 3,
  serial = 4,
}
export enum AcTransactionTypeEnum {
  MoneyOut = 1,
  MoneyIn = 2,
  SupplierPayments = 3,
  CustomerPayment = 4,
  RefundSupplierPayments = 5,
  RefundCustomerPayments = 6,
}
export enum SupplierCustomerType {
  Customer = 1,
  Supplier = 2,
}

export enum RuleExpRecieAccountsEnum {
  Expense = 1,
  Receive = 2,
}

export enum SearchCustomersTypeEnum {
  None = "0",
  CustomerName = "1",
  CustomerCode = "2",
}

export enum ComponentActionTypeEnum {
  None = 0,
  Add = 1,
  Edit = 2,
  Clear = 3,
  AddCustomer = 4,
}
