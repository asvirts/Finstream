import { ParamListBase, RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

// Auth Stack Screens
export type AuthStackParamList = {
  Login: undefined
  Register: undefined
  ForgotPassword: undefined
}

// Onboarding Stack Screens
export type OnboardingStackParamList = {
  Welcome: undefined
  BusinessInfo: undefined
  ChartOfAccounts: undefined
  BankConnection: undefined
  OnboardingComplete: undefined
}

// Main Tab Screens
export type MainTabParamList = {
  Dashboard: undefined
  Accounts: undefined
  Transactions: undefined
  Invoices: undefined
  More: undefined
}

// Account Stack Screens
export type AccountStackParamList = {
  AccountsList: undefined
  AccountDetail: { accountId: string }
  AccountForm: { accountId?: string }
  ChartOfAccounts: undefined
}

// Transaction Stack Screens
export type TransactionStackParamList = {
  TransactionsList: undefined
  TransactionDetail: { transactionId: string }
  TransactionForm: { transactionId?: string; accountId?: string }
  RecurringTransactions: undefined
}

// Invoice Stack Screens
export type InvoiceStackParamList = {
  InvoicesList: undefined
  InvoiceDetail: { invoiceId: string }
  InvoiceForm: { invoiceId?: string; customerId?: string }
  CustomersList: undefined
  CustomerDetail: { customerId: string }
  CustomerForm: { customerId?: string }
}

// Bank Feed Stack Screens
export type BankFeedStackParamList = {
  BankAccountsList: undefined
  BankAccountDetail: { bankAccountId: string }
  ConnectBank: undefined
  BankTransactionsList: { bankAccountId: string }
  BankTransactionDetail: { bankTransactionId: string }
  MatchTransaction: { bankTransactionId: string }
}

// Receipt Stack Screens
export type ReceiptStackParamList = {
  ReceiptsList: undefined
  ReceiptDetail: { receiptId: string }
  ReceiptCapture: { transactionId?: string }
  ReceiptForm: { receiptId?: string; imageUri?: string }
}

// Report Stack Screens
export type ReportStackParamList = {
  ReportsList: undefined
  ReportDetail: { reportId: string; reportType: string }
  GenerateReport: { reportType: string }
}

// More Stack Screens
export type MoreStackParamList = {
  MoreOptions: undefined
  Settings: undefined
  Profile: undefined
  About: undefined
  ChangePassword: undefined
}

// Root Navigation Param List
export type RootStackParamList = {
  Auth: undefined
  Onboarding: undefined
  Main: undefined
  AccountStack: undefined
  TransactionStack: undefined
  InvoiceStack: undefined
  BankFeedStack: undefined
  ReceiptStack: undefined
  ReportStack: undefined
  MoreStack: undefined
} & AuthStackParamList &
  OnboardingStackParamList &
  AccountStackParamList &
  TransactionStackParamList &
  InvoiceStackParamList &
  BankFeedStackParamList &
  ReceiptStackParamList &
  ReportStackParamList &
  MoreStackParamList

// Navigation Props
export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>

export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>

export type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: ScreenNavigationProp<T>
  route: ScreenRouteProp<T>
}
