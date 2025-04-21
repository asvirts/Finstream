import React from "react"
import { StyleSheet, View, Image } from "react-native"
import { Button, Text, Title, Card, List } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"

interface FinishScreenProps {
  onContinue: () => void
  onBack: () => void
}

const FinishScreen: React.FC<FinishScreenProps> = ({ onContinue, onBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="check-circle"
          size={80}
          color="#4CAF50"
          style={styles.icon}
        />

        <Title style={styles.title}>You're all set!</Title>
        <Text style={styles.description}>
          Your accounting system is ready to use. Here's what you can do next:
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <List.Item
              title="Record Transactions"
              description="Add income, expenses, and journal entries"
              left={() => (
                <MaterialCommunityIcons
                  name="cash-register"
                  size={24}
                  color="#2196F3"
                />
              )}
            />
            <List.Item
              title="Create Invoices"
              description="Generate professional invoices for your clients"
              left={() => (
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={24}
                  color="#2196F3"
                />
              )}
            />
            <List.Item
              title="Capture Receipts"
              description="Snap photos of receipts for automatic data entry"
              left={() => (
                <MaterialCommunityIcons
                  name="camera"
                  size={24}
                  color="#2196F3"
                />
              )}
            />
            <List.Item
              title="Generate Reports"
              description="Access financial reports for your business"
              left={() => (
                <MaterialCommunityIcons
                  name="chart-line"
                  size={24}
                  color="#2196F3"
                />
              )}
            />
          </Card.Content>
        </Card>
      </View>

      <View style={styles.footer}>
        <Button mode="outlined" onPress={onBack} style={styles.backButton}>
          Back
        </Button>
        <Button
          mode="contained"
          onPress={onContinue}
          style={styles.dashboardButton}
        >
          Go to Dashboard
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center"
  },
  icon: {
    marginBottom: 20,
    marginTop: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center"
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24
  },
  card: {
    width: "100%",
    marginBottom: 30
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0"
  },
  backButton: {
    flex: 1,
    marginRight: 8
  },
  dashboardButton: {
    flex: 2
  }
})

export default FinishScreen
