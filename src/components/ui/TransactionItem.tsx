import React from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { Text, List, Badge } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Transaction } from "../../types"
import { formatCurrency } from "../../utils/currencyUtils"
import { format } from "date-fns"

interface TransactionItemProps {
  transaction: Transaction
  onPress: () => void
  onLongPress: () => void
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onPress,
  onLongPress
}) => {
  // Calculate the total amount by summing positive entries (debits)
  const amount = transaction.entries.reduce(
    (sum, entry) => (entry.amount > 0 ? sum + entry.amount : sum),
    0
  )

  // Determine if transaction is an expense or income based on entries
  const isExpense = transaction.entries.some(
    (entry) => entry.amount < 0 && entry.accountId.startsWith("a1") // If bank account is credited
  )

  // Function to get appropriate icon for the transaction
  const getTransactionIcon = () => {
    if (isExpense) {
      return "arrow-up"
    } else {
      return "arrow-down"
    }
  }

  // Get color based on transaction type
  const getIconColor = () => {
    return isExpense ? "#F44336" : "#4CAF50"
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}
      activeOpacity={0.7}
    >
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={getTransactionIcon()}
            size={24}
            color={getIconColor()}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.description} numberOfLines={1}>
              {transaction.description}
            </Text>
            <Text
              style={[
                styles.amount,
                isExpense ? styles.expense : styles.income
              ]}
            >
              {formatCurrency(isExpense ? -amount : amount)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.date}>
              {format(transaction.date, "MMM d, yyyy")}
            </Text>

            <View style={styles.tagsContainer}>
              {transaction.reference && (
                <Badge style={styles.referenceBadge}>
                  {transaction.reference}
                </Badge>
              )}

              {transaction.isReconciled && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={16}
                  color="#4CAF50"
                  style={styles.reconciledIcon}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  content: {
    flex: 1
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4
  },
  description: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    marginRight: 8
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold"
  },
  expense: {
    color: "#F44336"
  },
  income: {
    color: "#4CAF50"
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  date: {
    fontSize: 14,
    color: "#757575"
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  referenceBadge: {
    fontSize: 12,
    backgroundColor: "#E3F2FD",
    color: "#1976D2",
    marginRight: 8
  },
  reconciledIcon: {
    marginLeft: 4
  }
})

export default TransactionItem
