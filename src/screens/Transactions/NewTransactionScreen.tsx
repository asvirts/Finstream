import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native"
import {
  Text,
  Title,
  TextInput,
  Button,
  Divider,
  IconButton,
  Menu,
  List,
  ActivityIndicator,
  Chip
} from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useTransactions, useAccounts } from "../../context/AppContext"
import { JournalEntry, Transaction, Account, AccountType } from "../../types"
import { format } from "date-fns"
import { formatCurrency, parseCurrency } from "../../utils/currencyUtils"
import { v4 as uuidv4 } from "uuid"

type TransactionType = "income" | "expense" | "transfer" | "journal"

const NewTransactionScreen = () => {
  const navigation = useNavigation()
  const { dispatch: transactionDispatch } = useTransactions()
  const { accountState } = useAccounts()
  const [loading, setLoading] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [selectedEntryIndex, setSelectedEntryIndex] = useState<number | null>(
    null
  )
  const [transactionType, setTransactionType] =
    useState<TransactionType>("expense")

  // Initialize form state with default values
  const [transaction, setTransaction] = useState<{
    date: Date
    description: string
    reference: string
    entries: {
      accountId: string
      accountName?: string
      amount: number | string
      memo: string
    }[]
  }>({
    date: new Date(),
    description: "",
    reference: "",
    entries: [
      { accountId: "", accountName: "", amount: "", memo: "" },
      { accountId: "", accountName: "", amount: "", memo: "" }
    ]
  })

  // Get accounts by type for selection
  const assetAccounts = accountState.accounts.filter(
    (account) => account.type === AccountType.ASSET
  )
  const expenseAccounts = accountState.accounts.filter(
    (account) => account.type === AccountType.EXPENSE
  )
  const incomeAccounts = accountState.accounts.filter(
    (account) => account.type === AccountType.INCOME
  )
  const liabilityAccounts = accountState.accounts.filter(
    (account) => account.type === AccountType.LIABILITY
  )

  // Set appropriate accounts based on transaction type
  useEffect(() => {
    let updatedEntries = [...transaction.entries]

    switch (transactionType) {
      case "expense":
        updatedEntries = [
          { accountId: "", accountName: "", amount: "", memo: "" },
          { accountId: "", accountName: "", amount: "", memo: "" }
        ]
        // Pre-select the first bank account if available
        if (assetAccounts.length > 0) {
          const bankAccount = assetAccounts.find(
            (acc) => acc.subtype === "BANK"
          )
          if (bankAccount) {
            updatedEntries[1].accountId = bankAccount.id
            updatedEntries[1].accountName = bankAccount.name
          }
        }
        break

      case "income":
        updatedEntries = [
          { accountId: "", accountName: "", amount: "", memo: "" },
          { accountId: "", accountName: "", amount: "", memo: "" }
        ]
        // Pre-select the first bank account if available
        if (assetAccounts.length > 0) {
          const bankAccount = assetAccounts.find(
            (acc) => acc.subtype === "BANK"
          )
          if (bankAccount) {
            updatedEntries[0].accountId = bankAccount.id
            updatedEntries[0].accountName = bankAccount.name
          }
        }
        break

      case "transfer":
        updatedEntries = [
          { accountId: "", accountName: "", amount: "", memo: "" },
          { accountId: "", accountName: "", amount: "", memo: "" }
        ]
        break

      case "journal":
        // For journal entries, start with 2 lines but allow more
        break
    }

    setTransaction((prev) => ({
      ...prev,
      entries: updatedEntries
    }))
  }, [transactionType])

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setTransaction({ ...transaction, date: selectedDate })
    }
  }

  const handleSelectAccount = (accountId: string) => {
    if (selectedEntryIndex === null) return

    const account = accountState.accounts.find((acc) => acc.id === accountId)
    if (!account) return

    const updatedEntries = [...transaction.entries]
    updatedEntries[selectedEntryIndex] = {
      ...updatedEntries[selectedEntryIndex],
      accountId,
      accountName: account.name
    }

    setTransaction({ ...transaction, entries: updatedEntries })
    setShowAccountMenu(false)
    setSelectedEntryIndex(null)
  }

  const handleEntryChange = (index: number, field: string, value: string) => {
    const updatedEntries = [...transaction.entries]
    updatedEntries[index] = {
      ...updatedEntries[index],
      [field]: value
    }

    // Auto-calculate offsetting amount for simple transactions
    if (field === "amount" && transactionType !== "journal" && index === 0) {
      const numValue = value === "" ? 0 : parseCurrency(value)

      if (transactionType === "expense") {
        // For expenses: debit expense (positive), credit bank (negative)
        updatedEntries[1].amount = (-numValue).toString()
      } else if (transactionType === "income") {
        // For income: debit bank (positive), credit income (negative)
        updatedEntries[1].amount = (-numValue).toString()
      } else if (transactionType === "transfer") {
        // For transfers: debit destination (positive), credit source (negative)
        updatedEntries[1].amount = (-numValue).toString()
      }
    }

    setTransaction({ ...transaction, entries: updatedEntries })
  }

  const addJournalEntryLine = () => {
    setTransaction({
      ...transaction,
      entries: [
        ...transaction.entries,
        { accountId: "", accountName: "", amount: "", memo: "" }
      ]
    })
  }

  const removeJournalEntryLine = (index: number) => {
    if (transaction.entries.length <= 2) {
      Alert.alert("Error", "A transaction must have at least two entries.")
      return
    }

    const updatedEntries = [...transaction.entries]
    updatedEntries.splice(index, 1)
    setTransaction({ ...transaction, entries: updatedEntries })
  }

  const validateTransaction = () => {
    // Check required fields
    if (!transaction.description.trim()) {
      Alert.alert("Error", "Please enter a description.")
      return false
    }

    // Validate entry accounts and amounts
    const validEntries = transaction.entries.filter(
      (entry) => entry.accountId && entry.amount !== ""
    )

    if (validEntries.length < 2) {
      Alert.alert(
        "Error",
        "Please complete at least two transaction entries with account and amount."
      )
      return false
    }

    // For journal entries, ensure debits equal credits
    if (transactionType === "journal") {
      const totalDebits = transaction.entries
        .filter((entry) => Number(entry.amount) > 0)
        .reduce((sum, entry) => sum + Number(entry.amount), 0)

      const totalCredits = transaction.entries
        .filter((entry) => Number(entry.amount) < 0)
        .reduce((sum, entry) => sum + Math.abs(Number(entry.amount)), 0)

      if (Math.abs(totalDebits - totalCredits) > 0.001) {
        Alert.alert(
          "Error",
          "Journal entries must balance (debits must equal credits)."
        )
        return false
      }
    }

    return true
  }

  const saveTransaction = () => {
    if (!validateTransaction()) {
      return
    }

    setLoading(true)

    try {
      const transactionId = uuidv4()
      const now = new Date()

      // Format entries with proper IDs
      const formattedEntries: JournalEntry[] = transaction.entries
        .filter((entry) => entry.accountId && entry.amount !== "")
        .map((entry, index) => ({
          id: `entry-${now.getTime()}-${index}`,
          transactionId,
          accountId: entry.accountId,
          amount: Number(entry.amount),
          memo: entry.memo
        }))

      // Create the transaction object
      const newTransaction: Transaction = {
        id: transactionId,
        date: transaction.date,
        description: transaction.description,
        reference: transaction.reference,
        entries: formattedEntries,
        isReconciled: false,
        createdAt: now,
        updatedAt: now
      }

      // In a real app, this would be an API call
      setTimeout(() => {
        transactionDispatch({
          type: "CREATE_TRANSACTION_SUCCESS",
          payload: newTransaction
        })

        setLoading(false)
        Alert.alert("Success", "Transaction saved successfully!")
        navigation.goBack()
      }, 1000)
    } catch (error) {
      setLoading(false)
      Alert.alert("Error", "Failed to save transaction. Please try again.")
      console.error("Error saving transaction:", error)
    }
  }

  const getEntryDirection = (index: number) => {
    if (transactionType === "journal") {
      return ""
    }

    if (transactionType === "expense") {
      return index === 0 ? "Debit (Expense)" : "Credit (Bank)"
    }

    if (transactionType === "income") {
      return index === 0 ? "Debit (Bank)" : "Credit (Income)"
    }

    if (transactionType === "transfer") {
      return index === 0 ? "Debit (To)" : "Credit (From)"
    }

    return ""
  }

  const renderAccountSelection = () => {
    if (selectedEntryIndex === null) return null

    let accounts: Account[] = []

    // Determine which accounts to show based on transaction type and entry index
    if (transactionType === "journal") {
      accounts = accountState.accounts
    } else if (transactionType === "expense") {
      accounts = selectedEntryIndex === 0 ? expenseAccounts : assetAccounts
    } else if (transactionType === "income") {
      accounts = selectedEntryIndex === 0 ? assetAccounts : incomeAccounts
    } else if (transactionType === "transfer") {
      accounts = assetAccounts
    }

    return (
      <View style={styles.accountList}>
        <Title style={styles.accountListTitle}>Select Account</Title>
        <ScrollView style={styles.accountScroll}>
          {accounts.map((account) => (
            <List.Item
              key={account.id}
              title={account.name}
              description={`${account.type} • ${account.subtype
                .replace(/_/g, " ")
                .toLowerCase()}`}
              onPress={() => handleSelectAccount(account.id)}
              right={() => (
                <Text style={styles.accountBalance}>
                  {formatCurrency(account.balance)}
                </Text>
              )}
            />
          ))}
        </ScrollView>
        <Button onPress={() => setShowAccountMenu(false)}>Cancel</Button>
      </View>
    )
  }

  const renderTransactionTypeSelector = () => (
    <View style={styles.typeSelector}>
      <TouchableOpacity
        style={[
          styles.typeOption,
          transactionType === "expense" && styles.typeOptionSelected
        ]}
        onPress={() => setTransactionType("expense")}
      >
        <MaterialCommunityIcons
          name="arrow-up"
          size={24}
          color={transactionType === "expense" ? "#fff" : "#F44336"}
        />
        <Text
          style={[
            styles.typeText,
            transactionType === "expense" && styles.typeTextSelected
          ]}
        >
          Expense
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.typeOption,
          transactionType === "income" && styles.typeOptionSelected
        ]}
        onPress={() => setTransactionType("income")}
      >
        <MaterialCommunityIcons
          name="arrow-down"
          size={24}
          color={transactionType === "income" ? "#fff" : "#4CAF50"}
        />
        <Text
          style={[
            styles.typeText,
            transactionType === "income" && styles.typeTextSelected
          ]}
        >
          Income
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.typeOption,
          transactionType === "transfer" && styles.typeOptionSelected
        ]}
        onPress={() => setTransactionType("transfer")}
      >
        <MaterialCommunityIcons
          name="bank-transfer"
          size={24}
          color={transactionType === "transfer" ? "#fff" : "#2196F3"}
        />
        <Text
          style={[
            styles.typeText,
            transactionType === "transfer" && styles.typeTextSelected
          ]}
        >
          Transfer
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.typeOption,
          transactionType === "journal" && styles.typeOptionSelected
        ]}
        onPress={() => setTransactionType("journal")}
      >
        <MaterialCommunityIcons
          name="notebook-outline"
          size={24}
          color={transactionType === "journal" ? "#fff" : "#9C27B0"}
        />
        <Text
          style={[
            styles.typeText,
            transactionType === "journal" && styles.typeTextSelected
          ]}
        >
          Journal
        </Text>
      </TouchableOpacity>
    </View>
  )

  const renderEntryItem = (entry: any, index: number) => (
    <View key={index} style={styles.entryContainer}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryLabel}>
          {getEntryDirection(index) || `Entry ${index + 1}`}
        </Text>

        {transactionType === "journal" && index > 1 && (
          <IconButton
            icon="close"
            size={20}
            onPress={() => removeJournalEntryLine(index)}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.accountField}
        onPress={() => {
          setSelectedEntryIndex(index)
          setShowAccountMenu(true)
        }}
      >
        <Text style={styles.fieldLabel}>Account</Text>
        <Text
          style={[
            styles.accountValue,
            !entry.accountName && styles.placeholderText
          ]}
        >
          {entry.accountName || "Select an account"}
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color="#757575"
        />
      </TouchableOpacity>

      <View style={styles.row}>
        <View style={styles.amountField}>
          <Text style={styles.fieldLabel}>Amount</Text>
          <TextInput
            value={entry.amount.toString()}
            onChangeText={(value) => handleEntryChange(index, "amount", value)}
            style={styles.textInput}
            keyboardType="decimal-pad"
            placeholder="0.00"
            left={<TextInput.Affix text="$" />}
          />
        </View>
      </View>

      <View style={styles.memoField}>
        <Text style={styles.fieldLabel}>Memo</Text>
        <TextInput
          value={entry.memo}
          onChangeText={(value) => handleEntryChange(index, "memo", value)}
          style={styles.textInput}
          placeholder="Description of entry"
        />
      </View>
    </View>
  )

  if (showAccountMenu) {
    return renderAccountSelection()
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Title style={styles.title}>New Transaction</Title>
        </View>

        {renderTransactionTypeSelector()}

        <View style={styles.formContainer}>
          <View style={styles.dateField}>
            <Text style={styles.fieldLabel}>Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{format(transaction.date, "MMMM d, yyyy")}</Text>
              <MaterialCommunityIcons
                name="calendar"
                size={20}
                color="#757575"
              />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={transaction.date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View style={styles.descriptionField}>
            <Text style={styles.fieldLabel}>Description</Text>
            <TextInput
              value={transaction.description}
              onChangeText={(text) =>
                setTransaction({ ...transaction, description: text })
              }
              style={styles.textInput}
              placeholder="What is this transaction for?"
            />
          </View>

          <View style={styles.referenceField}>
            <Text style={styles.fieldLabel}>Reference (Optional)</Text>
            <TextInput
              value={transaction.reference}
              onChangeText={(text) =>
                setTransaction({ ...transaction, reference: text })
              }
              style={styles.textInput}
              placeholder="Invoice or reference number"
            />
          </View>

          <Divider style={styles.divider} />

          <Text style={styles.sectionTitle}>Transaction Entries</Text>

          {transaction.entries.map((entry, index) =>
            renderEntryItem(entry, index)
          )}

          {transactionType === "journal" && (
            <Button
              mode="outlined"
              onPress={addJournalEntryLine}
              style={styles.addEntryButton}
              icon="plus"
            >
              Add Entry
            </Button>
          )}

          <Button
            mode="contained"
            onPress={saveTransaction}
            style={styles.saveButton}
            loading={loading}
            disabled={loading}
          >
            Save Transaction
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  scrollContent: {
    paddingBottom: 40
  },
  header: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  title: {
    fontSize: 20
  },
  typeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 8
  },
  typeOption: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4
  },
  typeOptionSelected: {
    backgroundColor: "#2196F3"
  },
  typeText: {
    marginTop: 4,
    fontSize: 12
  },
  typeTextSelected: {
    color: "#fff"
  },
  formContainer: {
    padding: 16,
    backgroundColor: "#fff"
  },
  fieldLabel: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 4
  },
  dateField: {
    marginBottom: 16
  },
  dateButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  descriptionField: {
    marginBottom: 16
  },
  referenceField: {
    marginBottom: 16
  },
  textInput: {
    backgroundColor: "transparent",
    paddingHorizontal: 0
  },
  divider: {
    marginVertical: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16
  },
  entryContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3"
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  entryLabel: {
    fontSize: 16,
    fontWeight: "500"
  },
  accountField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 16
  },
  accountValue: {
    flex: 1,
    marginHorizontal: 8
  },
  placeholderText: {
    color: "#9e9e9e",
    fontStyle: "italic"
  },
  row: {
    flexDirection: "row"
  },
  amountField: {
    flex: 1,
    marginBottom: 16
  },
  memoField: {
    marginBottom: 8
  },
  addEntryButton: {
    marginTop: 8,
    marginBottom: 24
  },
  saveButton: {
    marginTop: 16,
    paddingVertical: 8
  },
  accountList: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16
  },
  accountListTitle: {
    marginBottom: 16
  },
  accountScroll: {
    flex: 1,
    marginBottom: 16
  },
  accountBalance: {
    fontWeight: "bold"
  }
})

export default NewTransactionScreen
