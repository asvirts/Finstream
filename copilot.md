// GitHub Copilot Prompt:
//
// Project: Finstream (Core Accounting MVP)
// Stack: Expo (React Native) + TypeScript, React Navigation, Context+Reducer, Axios
// UI Library: React Native Paper
//
// FEATURES TO IMPLEMENT:
// 1. Onboarding wizard (Chart of Accounts setup, bank link via Plaid).
// 2. Home Dashboard (P&L snapshot, cash‑flow, quick actions).
// 3. Chart of Accounts & General Ledger
// - CRUD categories (Assets, Liabilities, Equity, Income, Expenses)
// - Journal entry screen with double‑entry validation.
// 4. Income & Expenses
// - Record sales, vendor bills, misc. expenses.
// - Attach receipts (photo upload).
// 5. Receipt Capture
// - Expo Camera integration + Google Vision OCR.
// - Auto‑extract date, vendor, amount, allow manual edits.
// 6. Invoicing & Payments
// - Create/send branded invoices (PDF/email).
// - Record full/partial payments, track receivables.
// 7. Bank Feeds & Reconciliation
// - PlaidLink integration for transaction import.
// - Auto‑match & manual match/unmatch to ledger entries.
// 8. Sales Tax
// - Single‑rate config, auto‑apply on invoices.
// - Liabilities report screen.
// 9. Basic Financial Reports
// - Profit & Loss, Balance Sheet, Cash Flow.
// - Date filters, export to PDF via expo-print.
//
// ARCHITECTURE & FILE STRUCTURE:
// - /src
// - /navigation (AppNavigator, Stack, Tabs)
// - /screens (Onboarding, Dashboard, Accounts, Transactions,
// Invoices, Receipts, BankFeed, Reports)
// - /components (common UI bits, forms, lists, headers)
// - /context (AppContext, reducers, actions)
// - /services (api.ts, plaid.ts, ocr.ts, pdf.ts)
// - /types (TS interfaces & enums)
// - /utils (date, currency, validation)
//
// TECH DETAILS:
// - State: React Context + useReducer
// - Networking: Axios, JWT auth + SecureStore
// - Bank: react‑native‑plaid-link-sdk
// - OCR: expo‑camera + Google Vision REST API
// - PDF export: expo‑print / react‑native‑pdf
// - Navigation: @react-navigation/native + stack & bottom‑tabs
// - Styling: React Native Paper theming
//
// Deliver complete, formatted code for every file listed above,
// wired up end‑to‑end so that on `expo start` you can:
// • Complete onboarding (COA + bank link)
// • Snapshot your dashboard
// • CRUD accounts, transactions, invoices, receipts
// • Run reconciliation
// • View & export reports
//
// Please generate each file in full, with imports, types, exports,
// and basic error handling. Follow Prettier (printWidth=80).
//
