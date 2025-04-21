// filepath: /Users/andrew/dev/Finstream/app/(tabs)/dashboard.tsx
import { StyleSheet, View, ScrollView } from "react-native"
import {
  Card,
  Title,
  Paragraph,
  Button,
  List,
  Divider,
  useTheme
} from "react-native-paper"

import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { useAppContext } from "@/src/context/AppContext"
import { formatCurrency } from "@/src/utils/currencyUtils"
import { formatDate } from "@/src/utils/dateUtils"

export default function DashboardScreen() {
  const theme = useTheme()
  const { state } = useAppContext()

  // Example data - in a real app would come from the AppContext
  const financialSnapshot = {
    income: 38500,
    expenses: 27200,
    profit: 11300,
    cashBalance: 22450,
    accountsReceivable: 8500,
    accountsPayable: 3200,
    netCashFlow: 5350
  }

  // Dummy data for recent transactions
  const recentTransactions = [
    {
      id: "1",
      date: new Date(2025, 3, 20),
      description: "Client Payment - ABC Corp",
      amount: 3500,
      type: "income"
    },
    {
      id: "2",
      date: new Date(2025, 3, 18),
      description: "Office Supplies",
      amount: -245,
      type: "expense"
    },
    {
      id: "3",
      date: new Date(2025, 3, 15),
      description: "Software Subscription",
      amount: -89,
      type: "expense"
    }
  ]

  // Dummy data for upcoming invoices
  const upcomingInvoices = [
    {
      id: "inv1",
      dueDate: new Date(2025, 3, 30),
      client: "XYZ Industries",
      amount: 2800,
      status: "pending"
    },
    {
      id: "inv2",
      dueDate: new Date(2025, 4, 5),
      client: "Acme Co",
      amount: 1500,
      status: "pending"
    }
  ]

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#1976D2", dark: "#0D47A1" }}
      headerImage={<View />}
    >
      <ThemedView style={styles.container}>
        <View style={styles.headerContainer}>
          <ThemedText type="title">Finstream Dashboard</ThemedText>
          <ThemedText type="subtitle">
            {formatDate(new Date(), "MMMM d, yyyy")}
          </ThemedText>
        </View>

        {/* P&L Snapshot */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Profit & Loss</Title>
            <View style={styles.plRow}>
              <Paragraph>Income</Paragraph>
              <Paragraph style={styles.amount}>
                {formatCurrency(financialSnapshot.income)}
              </Paragraph>
            </View>
            <View style={styles.plRow}>
              <Paragraph>Expenses</Paragraph>
              <Paragraph style={styles.expense}>
                {formatCurrency(financialSnapshot.expenses)}
              </Paragraph>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.plRow}>
              <Paragraph style={styles.bold}>Net Profit</Paragraph>
              <Paragraph style={[styles.amount, styles.bold]}>
                {formatCurrency(financialSnapshot.profit)}
              </Paragraph>
            </View>
          </Card.Content>
        </Card>

        {/* Cash Flow */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Cash Position</Title>
            <View style={styles.plRow}>
              <Paragraph>Cash Balance</Paragraph>
              <Paragraph style={styles.amount}>
                {formatCurrency(financialSnapshot.cashBalance)}
              </Paragraph>
            </View>
            <View style={styles.plRow}>
              <Paragraph>Accounts Receivable</Paragraph>
              <Paragraph style={styles.amount}>
                {formatCurrency(financialSnapshot.accountsReceivable)}
              </Paragraph>
            </View>
            <View style={styles.plRow}>
              <Paragraph>Accounts Payable</Paragraph>
              <Paragraph style={styles.expense}>
                {formatCurrency(financialSnapshot.accountsPayable)}
              </Paragraph>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.plRow}>
              <Paragraph style={styles.bold}>Net Cash Flow</Paragraph>
              <Paragraph style={[styles.amount, styles.bold]}>
                {formatCurrency(financialSnapshot.netCashFlow)}
              </Paragraph>
            </View>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Quick Actions</Title>
            <View style={styles.actionButtonsContainer}>
              <Button
                mode="contained"
                style={styles.actionButton}
                icon="receipt"
                onPress={() => {}}
              >
                New Invoice
              </Button>
              <Button
                mode="contained"
                style={styles.actionButton}
                icon="cash-register"
                onPress={() => {}}
              >
                Record Expense
              </Button>
            </View>
            <View style={styles.actionButtonsContainer}>
              <Button
                mode="contained"
                style={styles.actionButton}
                icon="camera"
                onPress={() => {}}
              >
                Scan Receipt
              </Button>
              <Button
                mode="contained"
                style={styles.actionButton}
                icon="bank-transfer"
                onPress={() => {}}
              >
                Bank Import
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Recent Transactions */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Recent Transactions</Title>
            {recentTransactions.map((transaction) => (
              <List.Item
                key={transaction.id}
                title={transaction.description}
                description={formatDate(transaction.date, "MMM d, yyyy")}
                right={() => (
                  <Paragraph
                    style={
                      transaction.amount > 0
                        ? styles.incomeText
                        : styles.expenseText
                    }
                  >
                    {formatCurrency(transaction.amount)}
                  </Paragraph>
                )}
              />
            ))}
            <Button mode="text" onPress={() => {}}>
              View All Transactions
            </Button>
          </Card.Content>
        </Card>

        {/* Upcoming Invoices */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Upcoming Invoices</Title>
            {upcomingInvoices.map((invoice) => (
              <List.Item
                key={invoice.id}
                title={invoice.client}
                description={`Due: ${formatDate(
                  invoice.dueDate,
                  "MMM d, yyyy"
                )}`}
                right={() => (
                  <Paragraph style={styles.amount}>
                    {formatCurrency(invoice.amount)}
                  </Paragraph>
                )}
              />
            ))}
            <Button mode="text" onPress={() => {}}>
              View All Invoices
            </Button>
          </Card.Content>
        </Card>
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  headerContainer: {
    marginBottom: 16
  },
  card: {
    marginBottom: 16,
    elevation: 4
  },
  plRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4
  },
  amount: {
    color: "#2E7D32"
  },
  expense: {
    color: "#C62828"
  },
  incomeText: {
    color: "#2E7D32",
    fontWeight: "bold"
  },
  expenseText: {
    color: "#C62828",
    fontWeight: "bold"
  },
  divider: {
    marginVertical: 8
  },
  bold: {
    fontWeight: "bold"
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4
  }
})
