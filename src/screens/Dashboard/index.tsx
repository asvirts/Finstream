import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from "react-native"
import {
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  Divider,
  List,
  Surface,
  ActivityIndicator
} from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import {
  useTransactions,
  useAccounts,
  useInvoices,
  useBankAccounts
} from "../../context/AppContext"
import { formatCurrency } from "../../utils/currencyUtils"
import { format, subDays, isAfter } from "date-fns"

const DashboardScreen = () => {
  const navigation = useNavigation()
  const { transactionState } = useTransactions()
  const { accountState } = useAccounts()
  const { invoiceState } = useInvoices()
  const { bankState } = useBankAccounts()
  const [refreshing, setRefreshing] = useState(false)
  const [metrics, setMetrics] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0,
    accountsReceivable: 0,
    accountsPayable: 0,
    cashBalance: 0
  })
  const [loading, setLoading] = useState(true)

  // Calculate metrics
  useEffect(() => {
    // In a real app, this would be fetched from an API
    // or calculated from actual transaction data
    calculateMetrics()
  }, [
    accountState.accounts,
    transactionState.transactions,
    invoiceState.invoices
  ])

  const calculateMetrics = () => {
    // For demonstration purposes, calculate some metrics from the state
    // In a real app, these would be calculated by backend services

    setLoading(true)

    setTimeout(() => {
      // Calculate cash balance from bank accounts
      const cashBalance = bankState.bankAccounts.reduce(
        (total, account) => total + account.balance,
        0
      )

      // Calculate other metrics
      // In a real app, these would be calculated from real transaction data
      const totalIncome = 8500 // Mock data
      const totalExpenses = 3200 // Mock data
      const netProfit = totalIncome - totalExpenses
      const accountsReceivable = 2500 // Mock data
      const accountsPayable = 1200 // Mock data

      setMetrics({
        totalIncome,
        totalExpenses,
        netProfit,
        accountsReceivable,
        accountsPayable,
        cashBalance
      })

      setLoading(false)
    }, 1000)
  }

  const onRefresh = () => {
    setRefreshing(true)
    calculateMetrics()
    setRefreshing(false)
  }

  // Get recent transactions
  const getRecentTransactions = () => {
    // In a real app, this would filter actual transaction data
    // For now, return mock transactions
    return [
      {
        id: "tx1",
        description: "Client Payment",
        amount: 1500,
        date: new Date(),
        type: "income"
      },
      {
        id: "tx2",
        description: "Office Supplies",
        amount: -250,
        date: subDays(new Date(), 1),
        type: "expense"
      },
      {
        id: "tx3",
        description: "Software Subscription",
        amount: -89,
        date: subDays(new Date(), 2),
        type: "expense"
      }
    ]
  }

  // Get upcoming bills and invoices
  const getUpcomingItems = () => {
    // In a real app, this would filter actual invoice data
    // For now, return mock items
    return [
      {
        id: "inv1",
        description: "Client Invoice #1001",
        amount: 2500,
        dueDate: subDays(new Date(), -5),
        type: "invoice"
      },
      {
        id: "bill1",
        description: "Rent Payment",
        amount: 1800,
        dueDate: subDays(new Date(), -2),
        type: "bill"
      },
      {
        id: "inv2",
        description: "Client Invoice #1002",
        amount: 1200,
        dueDate: subDays(new Date(), -10),
        type: "invoice"
      }
    ]
  }

  const renderQuickActions = () => (
    <Surface style={styles.quickActions}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate("NewTransaction")}
      >
        <MaterialCommunityIcons name="cash-plus" size={24} color="#2196F3" />
        <Text style={styles.actionText}>Add Transaction</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate("NewInvoice")}
      >
        <MaterialCommunityIcons
          name="file-document-edit"
          size={24}
          color="#2196F3"
        />
        <Text style={styles.actionText}>Create Invoice</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate("CaptureReceipt")}
      >
        <MaterialCommunityIcons name="camera" size={24} color="#2196F3" />
        <Text style={styles.actionText}>Capture Receipt</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate("Reports")}
      >
        <MaterialCommunityIcons name="chart-box" size={24} color="#2196F3" />
        <Text style={styles.actionText}>Reports</Text>
      </TouchableOpacity>
    </Surface>
  )

  const renderRecentTransactions = () => (
    <Card style={styles.card}>
      <Card.Title
        title="Recent Transactions"
        right={(props) => (
          <Button onPress={() => navigation.navigate("Transactions")} compact>
            View All
          </Button>
        )}
      />
      <Card.Content>
        {getRecentTransactions().map((transaction) => (
          <List.Item
            key={transaction.id}
            title={transaction.description}
            description={format(transaction.date, "MMM d, yyyy")}
            right={() => (
              <Text
                style={[
                  styles.amount,
                  transaction.amount > 0
                    ? styles.incomeText
                    : styles.expenseText
                ]}
              >
                {formatCurrency(transaction.amount)}
              </Text>
            )}
            left={() => (
              <MaterialCommunityIcons
                name={transaction.amount > 0 ? "arrow-down" : "arrow-up"}
                size={24}
                color={transaction.amount > 0 ? "#4CAF50" : "#F44336"}
                style={styles.transactionIcon}
              />
            )}
          />
        ))}
      </Card.Content>
      <Divider />
      <Card.Actions>
        <Button onPress={() => navigation.navigate("Transactions")}>
          View All
        </Button>
      </Card.Actions>
    </Card>
  )

  const renderUpcomingItems = () => (
    <Card style={styles.card}>
      <Card.Title title="Upcoming Bills & Invoices" />
      <Card.Content>
        {getUpcomingItems().map((item) => (
          <List.Item
            key={item.id}
            title={item.description}
            description={`Due ${format(item.dueDate, "MMM d, yyyy")}`}
            right={() => (
              <Text
                style={[
                  styles.amount,
                  item.type === "invoice"
                    ? styles.incomeText
                    : styles.expenseText
                ]}
              >
                {formatCurrency(item.amount)}
              </Text>
            )}
            left={() => (
              <MaterialCommunityIcons
                name={item.type === "invoice" ? "file-document" : "receipt"}
                size={24}
                color={item.type === "invoice" ? "#2196F3" : "#FF9800"}
                style={styles.transactionIcon}
              />
            )}
          />
        ))}
      </Card.Content>
      <Divider />
      <Card.Actions>
        <Button onPress={() => navigation.navigate("Invoices")}>
          View Invoices
        </Button>
      </Card.Actions>
    </Card>
  )

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Title>Dashboard</Title>
        <Paragraph>Financial overview for your business</Paragraph>
      </View>

      {renderQuickActions()}

      <Card style={styles.card}>
        <Card.Title title="Profit & Loss" />
        <Card.Content>
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Income</Text>
              <Text style={[styles.metricValue, styles.incomeText]}>
                {formatCurrency(metrics.totalIncome)}
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Expenses</Text>
              <Text style={[styles.metricValue, styles.expenseText]}>
                {formatCurrency(metrics.totalExpenses)}
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Net Profit</Text>
              <Text
                style={[
                  styles.metricValue,
                  metrics.netProfit >= 0
                    ? styles.incomeText
                    : styles.expenseText
                ]}
              >
                {formatCurrency(metrics.netProfit)}
              </Text>
            </View>
          </View>
        </Card.Content>
        <Divider />
        <Card.Actions>
          <Button
            onPress={() =>
              navigation.navigate("Reports", { screen: "ProfitLoss" })
            }
          >
            View Report
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Cash Position" />
        <Card.Content>
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Cash Balance</Text>
              <Text style={styles.metricValue}>
                {formatCurrency(metrics.cashBalance)}
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Receivables</Text>
              <Text style={[styles.metricValue, styles.incomeText]}>
                {formatCurrency(metrics.accountsReceivable)}
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Payables</Text>
              <Text style={[styles.metricValue, styles.expenseText]}>
                {formatCurrency(metrics.accountsPayable)}
              </Text>
            </View>
          </View>
        </Card.Content>
        <Divider />
        <Card.Actions>
          <Button
            onPress={() =>
              navigation.navigate("Reports", { screen: "CashFlow" })
            }
          >
            Cash Flow
          </Button>
          <Button onPress={() => navigation.navigate("BankFeed")}>
            Bank Feeds
          </Button>
        </Card.Actions>
      </Card>

      {renderRecentTransactions()}
      {renderUpcomingItems()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16
  },
  header: {
    padding: 16,
    backgroundColor: "#fff"
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    borderRadius: 8
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center"
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
    maxWidth: 80
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  metricItem: {
    alignItems: "center",
    flex: 1
  },
  metricLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: "#666"
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "bold"
  },
  incomeText: {
    color: "#4CAF50"
  },
  expenseText: {
    color: "#F44336"
  },
  amount: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 4
  },
  transactionIcon: {
    alignSelf: "center",
    marginRight: 8
  }
})

export default DashboardScreen
