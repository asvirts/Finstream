import React, { useState, useEffect } from "react"
import { StyleSheet, View, ScrollView, Alert } from "react-native"
import {
  Button,
  Text,
  Title,
  List,
  Checkbox,
  Divider,
  ActivityIndicator
} from "react-native-paper"
import { useAccounts } from "../../context/AppContext"
import { Account, AccountType, AccountSubtype } from "../../types"

interface ChartOfAccountsScreenProps {
  onContinue: () => void
  onBack: () => void
}

interface AccountTemplate {
  name: string
  type: AccountType
  subtype: AccountSubtype
  isSelected: boolean
}

const ChartOfAccountsScreen: React.FC<ChartOfAccountsScreenProps> = ({
  onContinue,
  onBack
}) => {
  const { dispatch } = useAccounts()
  const [loading, setLoading] = useState(false)
  const [defaultAccounts, setDefaultAccounts] = useState<AccountTemplate[]>([
    // Asset accounts
    {
      name: "Checking Account",
      type: AccountType.ASSET,
      subtype: AccountSubtype.BANK,
      isSelected: true
    },
    {
      name: "Savings Account",
      type: AccountType.ASSET,
      subtype: AccountSubtype.BANK,
      isSelected: true
    },
    {
      name: "Accounts Receivable",
      type: AccountType.ASSET,
      subtype: AccountSubtype.ACCOUNTS_RECEIVABLE,
      isSelected: true
    },
    {
      name: "Inventory",
      type: AccountType.ASSET,
      subtype: AccountSubtype.INVENTORY,
      isSelected: true
    },
    {
      name: "Office Equipment",
      type: AccountType.ASSET,
      subtype: AccountSubtype.FIXED_ASSET,
      isSelected: true
    },

    // Liability accounts
    {
      name: "Accounts Payable",
      type: AccountType.LIABILITY,
      subtype: AccountSubtype.ACCOUNTS_PAYABLE,
      isSelected: true
    },
    {
      name: "Credit Card",
      type: AccountType.LIABILITY,
      subtype: AccountSubtype.CREDIT_CARD,
      isSelected: true
    },
    {
      name: "Sales Tax Payable",
      type: AccountType.LIABILITY,
      subtype: AccountSubtype.TAX_PAYABLE,
      isSelected: true
    },

    // Equity accounts
    {
      name: "Owner's Equity",
      type: AccountType.EQUITY,
      subtype: AccountSubtype.OWNER_EQUITY,
      isSelected: true
    },
    {
      name: "Retained Earnings",
      type: AccountType.EQUITY,
      subtype: AccountSubtype.RETAINED_EARNINGS,
      isSelected: true
    },

    // Income accounts
    {
      name: "Sales Revenue",
      type: AccountType.INCOME,
      subtype: AccountSubtype.SALES,
      isSelected: true
    },
    {
      name: "Interest Income",
      type: AccountType.INCOME,
      subtype: AccountSubtype.OTHER_INCOME,
      isSelected: false
    },

    // Expense accounts
    {
      name: "Rent Expense",
      type: AccountType.EXPENSE,
      subtype: AccountSubtype.OPERATING_EXPENSE,
      isSelected: true
    },
    {
      name: "Utilities",
      type: AccountType.EXPENSE,
      subtype: AccountSubtype.OPERATING_EXPENSE,
      isSelected: true
    },
    {
      name: "Office Supplies",
      type: AccountType.EXPENSE,
      subtype: AccountSubtype.OPERATING_EXPENSE,
      isSelected: true
    },
    {
      name: "Payroll",
      type: AccountType.EXPENSE,
      subtype: AccountSubtype.PAYROLL,
      isSelected: true
    },
    {
      name: "Insurance",
      type: AccountType.EXPENSE,
      subtype: AccountSubtype.OPERATING_EXPENSE,
      isSelected: true
    },
    {
      name: "Income Tax",
      type: AccountType.EXPENSE,
      subtype: AccountSubtype.TAX_EXPENSE,
      isSelected: true
    }
  ])

  const toggleAccountSelection = (index: number) => {
    const updatedAccounts = [...defaultAccounts]
    updatedAccounts[index] = {
      ...updatedAccounts[index],
      isSelected: !updatedAccounts[index].isSelected
    }
    setDefaultAccounts(updatedAccounts)
  }

  const handleContinue = async () => {
    try {
      setLoading(true)

      // Filter only selected accounts
      const selectedAccounts = defaultAccounts.filter(
        (account) => account.isSelected
      )

      if (selectedAccounts.length === 0) {
        Alert.alert(
          "No Accounts Selected",
          "Please select at least one account to continue."
        )
        setLoading(false)
        return
      }

      // Create accounts in the system
      // In a real app, this would call an API via accountService
      const now = new Date()

      // Dispatch batch creation action (this would typically call an API)
      // For now we're just setting up the local state
      dispatch({
        type: "CREATE_ACCOUNTS_BATCH",
        payload: selectedAccounts.map((template, idx) => ({
          id: `acc-${Date.now()}-${idx}`,
          name: template.name,
          type: template.type,
          subtype: template.subtype,
          balance: 0,
          isActive: true,
          isArchived: false,
          createdAt: now,
          updatedAt: now
        }))
      })

      // Continue to next step
      setTimeout(() => {
        setLoading(false)
        onContinue()
      }, 1000) // Simulate API delay
    } catch (error) {
      setLoading(false)
      Alert.alert(
        "Error",
        "There was a problem setting up your accounts. Please try again."
      )
      console.error("Error setting up accounts:", error)
    }
  }

  // Group accounts by type for display
  const assetAccounts = defaultAccounts.filter(
    (acc) => acc.type === AccountType.ASSET
  )
  const liabilityAccounts = defaultAccounts.filter(
    (acc) => acc.type === AccountType.LIABILITY
  )
  const equityAccounts = defaultAccounts.filter(
    (acc) => acc.type === AccountType.EQUITY
  )
  const incomeAccounts = defaultAccounts.filter(
    (acc) => acc.type === AccountType.INCOME
  )
  const expenseAccounts = defaultAccounts.filter(
    (acc) => acc.type === AccountType.EXPENSE
  )

  const renderAccountGroup = (title: string, accounts: AccountTemplate[]) => (
    <>
      <List.Subheader>{title}</List.Subheader>
      {accounts.map((account, index) => {
        const globalIndex = defaultAccounts.findIndex(
          (acc) => acc.name === account.name && acc.type === account.type
        )

        return (
          <List.Item
            key={`${account.type}-${account.name}`}
            title={account.name}
            description={account.subtype.replace("_", " ").toLowerCase()}
            left={() => (
              <Checkbox
                status={account.isSelected ? "checked" : "unchecked"}
                onPress={() => toggleAccountSelection(globalIndex)}
              />
            )}
            onPress={() => toggleAccountSelection(globalIndex)}
            style={styles.accountItem}
          />
        )
      })}
      <Divider />
    </>
  )

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <Title style={styles.title}>Chart of Accounts</Title>
        <Text style={styles.description}>
          Select the accounts you want to include in your chart of accounts. You
          can add, edit, or remove accounts later.
        </Text>

        {renderAccountGroup("ASSETS", assetAccounts)}
        {renderAccountGroup("LIABILITIES", liabilityAccounts)}
        {renderAccountGroup("EQUITY", equityAccounts)}
        {renderAccountGroup("INCOME", incomeAccounts)}
        {renderAccountGroup("EXPENSES", expenseAccounts)}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="outlined"
          onPress={onBack}
          style={styles.backButton}
          disabled={loading}
        >
          Back
        </Button>
        <Button
          mode="contained"
          onPress={handleContinue}
          style={styles.nextButton}
          disabled={loading}
          loading={loading}
        >
          Continue
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContent: {
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    paddingHorizontal: 20
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    paddingHorizontal: 20
  },
  accountItem: {
    paddingVertical: 4
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff"
  },
  backButton: {
    flex: 1,
    marginRight: 8
  },
  nextButton: {
    flex: 1,
    marginLeft: 8
  }
})

export default ChartOfAccountsScreen
