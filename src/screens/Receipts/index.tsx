import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from "react-native"
import {
  Text,
  Title,
  FAB,
  Card,
  ActivityIndicator,
  Searchbar,
  Menu,
  IconButton,
  Divider
} from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import * as FileSystem from "expo-file-system"
import { format, parseISO } from "date-fns"
import { formatCurrency } from "../../utils/currencyUtils"

interface Receipt {
  id: string
  imageUri: string
  merchant: string
  date: string
  total: number
  isProcessed: boolean
  transactionId?: string
  createdAt: string
}

const ReceiptsScreen = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null)
  const [menuVisible, setMenuVisible] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    loadReceipts()

    // Subscribe to focus events to reload receipts when navigating back
    const unsubscribe = navigation.addListener("focus", () => {
      loadReceipts()
    })

    return unsubscribe
  }, [navigation])

  const loadReceipts = async () => {
    setLoading(true)
    try {
      // In a real app, this would fetch receipts from local storage or an API
      // For demo purposes, we'll use mock data
      const mockReceipts = await generateMockReceipts()
      setReceipts(mockReceipts)
    } catch (error) {
      console.error("Error loading receipts:", error)
      Alert.alert("Error", "Failed to load receipts. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const generateMockReceipts = async (): Promise<Receipt[]> => {
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const lastWeek = new Date(today)
    lastWeek.setDate(lastWeek.getDate() - 7)

    return [
      {
        id: "1",
        imageUri: "https://i.ibb.co/R9bdXfb/receipt-sample.jpg",
        merchant: "Office Supplies Inc.",
        date: today.toISOString(),
        total: 124.99,
        isProcessed: true,
        transactionId: "t1",
        createdAt: today.toISOString()
      },
      {
        id: "2",
        imageUri: "https://i.ibb.co/R9bdXfb/receipt-sample.jpg",
        merchant: "Cafe Latte",
        date: yesterday.toISOString(),
        total: 8.75,
        isProcessed: false,
        createdAt: yesterday.toISOString()
      },
      {
        id: "3",
        imageUri: "https://i.ibb.co/R9bdXfb/receipt-sample.jpg",
        merchant: "ABC Hardware",
        date: lastWeek.toISOString(),
        total: 67.32,
        isProcessed: true,
        transactionId: "t2",
        createdAt: lastWeek.toISOString()
      }
    ]
  }

  const handleOpenMenu = (receipt: Receipt, event: any) => {
    // Get the position of the tap for the menu
    setSelectedReceipt(receipt)
    setMenuPosition({
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY
    })
    setMenuVisible(true)
  }

  const handleViewReceipt = () => {
    setMenuVisible(false)
    if (selectedReceipt) {
      navigation.navigate("ReceiptDetail", { receiptId: selectedReceipt.id })
    }
  }

  const handleCreateTransaction = () => {
    setMenuVisible(false)
    if (selectedReceipt) {
      navigation.navigate("NewTransaction", {
        receipt: {
          imageUri: selectedReceipt.imageUri,
          merchant: selectedReceipt.merchant,
          date: selectedReceipt.date,
          total: selectedReceipt.total
        }
      })
    }
  }

  const handleViewTransaction = () => {
    setMenuVisible(false)
    if (selectedReceipt && selectedReceipt.transactionId) {
      navigation.navigate("TransactionDetail", {
        transactionId: selectedReceipt.transactionId
      })
    }
  }

  const handleDeleteReceipt = () => {
    setMenuVisible(false)
    if (selectedReceipt) {
      Alert.alert(
        "Delete Receipt",
        "Are you sure you want to delete this receipt?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              // In a real app, this would delete the receipt from storage
              setReceipts((currentReceipts) =>
                currentReceipts.filter((r) => r.id !== selectedReceipt.id)
              )
            }
          }
        ]
      )
    }
  }

  const filteredReceipts = receipts.filter((receipt) =>
    receipt.merchant.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderReceiptItem = ({ item }: { item: Receipt }) => (
    <Card style={styles.receiptCard}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ReceiptDetail", { receiptId: item.id })
        }
        onLongPress={(event) => handleOpenMenu(item, event)}
      >
        <Card.Cover
          source={{ uri: item.imageUri }}
          style={styles.receiptImage}
        />
        <Card.Content style={styles.cardContent}>
          <View style={styles.receiptHeader}>
            <View>
              <Text style={styles.merchantName}>{item.merchant}</Text>
              <Text style={styles.receiptDate}>
                {format(parseISO(item.date), "MMM d, yyyy")}
              </Text>
            </View>
            <Text style={styles.receiptTotal}>
              {formatCurrency(item.total)}
            </Text>
          </View>

          <View style={styles.statusContainer}>
            {item.isProcessed ? (
              <View style={styles.statusBadge}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={16}
                  color="#4CAF50"
                />
                <Text style={styles.processedText}>Processed</Text>
              </View>
            ) : (
              <View style={styles.statusBadge}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={16}
                  color="#FF9800"
                />
                <Text style={styles.pendingText}>Pending</Text>
              </View>
            )}
            <IconButton
              icon="dots-vertical"
              size={20}
              onPress={(event) => handleOpenMenu(item, event)}
            />
          </View>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Receipts</Title>
        <Searchbar
          placeholder="Search by merchant name"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Loading receipts...</Text>
        </View>
      ) : filteredReceipts.length > 0 ? (
        <FlatList
          data={filteredReceipts}
          renderItem={renderReceiptItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="receipt" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No receipts found</Text>
          <Text style={styles.emptySuggestion}>
            Tap the + button to capture a receipt
          </Text>
        </View>
      )}

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={menuPosition}
      >
        <Menu.Item
          onPress={handleViewReceipt}
          title="View Receipt"
          leadingIcon="eye"
        />
        {selectedReceipt && !selectedReceipt.isProcessed && (
          <Menu.Item
            onPress={handleCreateTransaction}
            title="Create Transaction"
            leadingIcon="bank-transfer"
          />
        )}
        {selectedReceipt && selectedReceipt.isProcessed && (
          <Menu.Item
            onPress={handleViewTransaction}
            title="View Transaction"
            leadingIcon="file-document-outline"
          />
        )}
        <Divider />
        <Menu.Item
          onPress={handleDeleteReceipt}
          title="Delete"
          leadingIcon="delete"
        />
      </Menu>

      <FAB
        style={styles.fab}
        icon="camera"
        onPress={() => navigation.navigate("ReceiptCapture")}
        label="Capture Receipt"
      />
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
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  title: {
    marginLeft: 16,
    marginBottom: 16
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 1,
    backgroundColor: "#f9f9f9"
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
  listContent: {
    padding: 16
  },
  receiptCard: {
    marginBottom: 16,
    elevation: 2
  },
  receiptImage: {
    height: 160
  },
  cardContent: {
    paddingVertical: 12
  },
  receiptHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  merchantName: {
    fontSize: 16,
    fontWeight: "bold"
  },
  receiptDate: {
    fontSize: 14,
    color: "#757575",
    marginTop: 4
  },
  receiptTotal: {
    fontSize: 16,
    fontWeight: "bold"
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  processedText: {
    color: "#4CAF50",
    fontSize: 12,
    marginLeft: 4
  },
  pendingText: {
    color: "#FF9800",
    fontSize: 12,
    marginLeft: 4
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16
  },
  emptySuggestion: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  }
})

export default ReceiptsScreen
