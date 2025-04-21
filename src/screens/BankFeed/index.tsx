import React, { useState, useEffect, useContext } from "react"
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from "react-native"
import {
  Text,
  Title,
  Paragraph,
  Card,
  Button,
  Searchbar,
  ActivityIndicator,
  List,
  Avatar,
  Divider,
  Chip,
  Badge
} from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { AppContext } from "../../context/AppContext"
import { formatCurrency } from "../../utils/currencyUtils"
import { formatDate } from "../../utils/dateUtils"
import {
  getBankAccounts,
  refreshBankTransactions
} from "../../services/bankService"

const BankFeedScreen = () => {
  const navigation = useNavigation()
  const { state, dispatch } = useContext(AppContext)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [bankAccounts, setBankAccounts] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [expandedAccount, setExpandedAccount] = useState<string | null>(null)
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing">("idle")

  useEffect(() => {
    loadBankData()
  }, [])

  const loadBankData = async () => {
    try {
      setLoading(true)
      const accounts = await getBankAccounts()
      setBankAccounts(accounts)

      // Get transactions from all accounts
      const allTransactions = accounts.reduce((all: any[], account: any) => {
        return [...all, ...(account.transactions || [])]
      }, [])

      setTransactions(
        allTransactions.sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      )

      setLoading(false)
    } catch (error) {
      console.error("Failed to load bank data:", error)
      setLoading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadBankData()
    setRefreshing(false)
  }

  const syncTransactions = async () => {
    setSyncStatus("syncing")
    try {
      await refreshBankTransactions()
      await loadBankData()
    } catch (error) {
      console.error("Failed to sync transactions:", error)
    }
    setSyncStatus("idle")
  }

  const toggleAccountExpanded = (accountId: string) => {
    setExpandedAccount(expandedAccount === accountId ? null : accountId)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  const filteredTransactions = searchQuery
    ? transactions.filter(
        (tx) =>
          tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tx.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          formatCurrency(tx.amount).includes(searchQuery)
      )
    : transactions

  const getTransactionIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case "food":
      case "restaurant":
      case "dining":
        return "food"
      case "travel":
      case "transportation":
        return "airplane"
      case "shopping":
      case "retail":
        return "shopping"
      case "entertainment":
        return "movie"
      case "utilities":
        return "flash"
      case "housing":
      case "rent":
        return "home"
      case "income":
      case "deposit":
        return "cash-plus"
      case "transfer":
        return "bank-transfer"
      default:
        return "cash"
    }
  }

  const getAccountIcon = (accountType: string) => {
    switch (accountType.toLowerCase()) {
      case "checking":
        return "bank"
      case "savings":
        return "piggy-bank"
      case "credit card":
        return "credit-card"
      case "loan":
        return "cash-minus"
      case "investment":
        return "chart-line"
      default:
        return "bank"
    }
  }

  const renderBankAccounts = () => {
    if (bankAccounts.length === 0) {
      return (
        <Card style={styles.emptyCard}>
          <Card.Content>
            <Paragraph style={styles.emptyText}>
              No bank accounts connected.
            </Paragraph>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("LinkBank")}
              style={styles.actionButton}
            >
              Link a Bank Account
            </Button>
          </Card.Content>
        </Card>
      )
    }

    return (
      <>
        {bankAccounts.map((account) => (
          <Card key={account.id} style={styles.accountCard}>
            <TouchableOpacity
              onPress={() => toggleAccountExpanded(account.id)}
              style={styles.accountHeader}
            >
              <View style={styles.accountTitleRow}>
                <Avatar.Icon
                  size={40}
                  icon={getAccountIcon(account.type)}
                  color="white"
                  style={{
                    backgroundColor:
                      account.type.toLowerCase() === "credit card"
                        ? "#FF9800"
                        : "#2196F3"
                  }}
                />
                <View style={styles.accountTitleContent}>
                  <Text style={styles.accountName}>{account.name}</Text>
                  <Text style={styles.accountInfo}>
                    {account.institutionName} • {account.type}
                  </Text>
                </View>
                <View style={styles.accountBalance}>
                  <Text style={styles.balanceAmount}>
                    {formatCurrency(account.balance)}
                  </Text>
                  <MaterialCommunityIcons
                    name={
                      expandedAccount === account.id
                        ? "chevron-up"
                        : "chevron-down"
                    }
                    size={24}
                    color="#757575"
                  />
                </View>
              </View>
            </TouchableOpacity>

            {expandedAccount === account.id && (
              <>
                <Divider style={styles.divider} />
                <Card.Content style={styles.accountDetails}>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailLabel}>Account Number</Text>
                    <Text style={styles.detailValue}>
                      •••• {account.accountNumber.slice(-4)}
                    </Text>
                  </View>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailLabel}>Last Updated</Text>
                    <Text style={styles.detailValue}>
                      {formatDate(account.lastUpdated)}
                    </Text>
                  </View>

                  <View style={styles.accountActions}>
                    <Button
                      mode="outlined"
                      onPress={() =>
                        navigation.navigate("BankAccountDetail", {
                          accountId: account.id
                        })
                      }
                      style={styles.accountActionButton}
                      labelStyle={styles.accountActionLabel}
                    >
                      View Details
                    </Button>
                    <Button
                      mode="outlined"
                      onPress={() =>
                        navigation.navigate("BankAccountTransactions", {
                          accountId: account.id
                        })
                      }
                      style={styles.accountActionButton}
                      labelStyle={styles.accountActionLabel}
                    >
                      View Transactions
                    </Button>
                  </View>
                </Card.Content>
              </>
            )}
          </Card>
        ))}
      </>
    )
  }

  const renderTransactions = () => {
    if (filteredTransactions.length === 0) {
      return (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="bank-off" size={48} color="#9e9e9e" />
          <Paragraph style={styles.emptyText}>
            {searchQuery
              ? "No transactions matching your search"
              : "No transactions available"}
          </Paragraph>
        </View>
      )
    }

    return filteredTransactions.map((transaction) => (
      <TouchableOpacity
        key={transaction.id}
        onPress={() =>
          navigation.navigate("TransactionDetail", {
            transactionId: transaction.id
          })
        }
      >
        <List.Item
          title={transaction.description}
          description={`${formatDate(transaction.date)} • ${
            transaction.pending ? "Pending" : "Posted"
          }`}
          left={() => (
            <Avatar.Icon
              size={40}
              icon={getTransactionIcon(transaction.category)}
              style={[
                styles.transactionIcon,
                {
                  backgroundColor:
                    transaction.amount < 0 ? "#F44336" : "#4CAF50"
                }
              ]}
              color="white"
            />
          )}
          right={() => (
            <View style={styles.transactionRight}>
              <Text
                style={[
                  styles.transactionAmount,
                  { color: transaction.amount < 0 ? "#F44336" : "#4CAF50" }
                ]}
              >
                {formatCurrency(transaction.amount)}
              </Text>
              {transaction.category && (
                <Chip
                  style={styles.categoryChip}
                  textStyle={styles.categoryText}
                >
                  {transaction.category}
                </Chip>
              )}
              {transaction.pending && (
                <Badge style={styles.pendingBadge}>Pending</Badge>
              )}
            </View>
          )}
          style={styles.transactionItem}
        />
        <Divider />
      </TouchableOpacity>
    ))
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading your bank accounts...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Title style={styles.title}>Bank Feed</Title>
          <View style={styles.headerActions}>
            <Button
              mode="contained"
              onPress={syncTransactions}
              loading={syncStatus === "syncing"}
              disabled={syncStatus === "syncing"}
              style={styles.syncButton}
            >
              Sync
            </Button>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("LinkBank")}
              icon="plus"
              style={styles.addButton}
            >
              Add
            </Button>
          </View>
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.contentScroll}
      >
        <View style={styles.accountsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Connected Accounts</Text>
          </View>
          {renderBankAccounts()}
        </View>

        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
          </View>

          <Searchbar
            placeholder="Search transactions"
            onChangeText={handleSearchChange}
            value={searchQuery}
            style={styles.searchBar}
          />

          {renderTransactions()}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  header: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    marginBottom: 8
  },
  headerActions: {
    flexDirection: "row"
  },
  syncButton: {
    marginRight: 8
  },
  addButton: {
    backgroundColor: "#4CAF50"
  },
  contentScroll: {
    flex: 1
  },
  accountsSection: {
    padding: 16
  },
  sectionHeader: {
    marginBottom: 8
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#757575"
  },
  accountCard: {
    marginBottom: 12,
    elevation: 1
  },
  accountHeader: {
    padding: 16
  },
  accountTitleRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  accountTitleContent: {
    marginLeft: 12,
    flex: 1
  },
  accountName: {
    fontSize: 16,
    fontWeight: "bold"
  },
  accountInfo: {
    fontSize: 12,
    color: "#757575"
  },
  accountBalance: {
    flexDirection: "row",
    alignItems: "center"
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8
  },
  divider: {
    marginHorizontal: 16
  },
  accountDetails: {
    paddingVertical: 12
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4
  },
  detailLabel: {
    fontSize: 14,
    color: "#757575"
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500"
  },
  accountActions: {
    flexDirection: "row",
    marginTop: 12
  },
  accountActionButton: {
    flex: 1,
    marginHorizontal: 4
  },
  accountActionLabel: {
    fontSize: 12
  },
  transactionsSection: {
    padding: 16,
    paddingTop: 8
  },
  searchBar: {
    marginBottom: 16,
    backgroundColor: "#fff"
  },
  transactionItem: {
    backgroundColor: "#fff"
  },
  transactionIcon: {
    margin: 8
  },
  transactionRight: {
    alignItems: "flex-end",
    justifyContent: "center"
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4
  },
  categoryChip: {
    height: 20,
    backgroundColor: "#f0f0f0"
  },
  categoryText: {
    fontSize: 10
  },
  pendingBadge: {
    fontSize: 10,
    backgroundColor: "#FF9800",
    color: "white",
    marginTop: 4
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#757575"
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32
  },
  emptyText: {
    marginTop: 8,
    fontSize: 16,
    color: "#9e9e9e",
    textAlign: "center"
  },
  emptyCard: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginBottom: 12
  },
  actionButton: {
    marginTop: 16
  }
})

export default BankFeedScreen
