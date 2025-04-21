import React, { useState } from "react"
import { StyleSheet, View, Image, Alert, Platform, Linking } from "react-native"
import {
  Button,
  Text,
  Title,
  Card,
  ActivityIndicator
} from "react-native-paper"
import { PlaidLink, LinkSuccess, LinkExit } from "react-native-plaid-link-sdk"
import { useBankAccounts } from "../../context/AppContext"
import { BankAccount } from "../../types"

interface BankLinkScreenProps {
  onContinue: () => void
  onSkip: () => void
  onBack: () => void
}

const BankLinkScreen: React.FC<BankLinkScreenProps> = ({
  onContinue,
  onSkip,
  onBack
}) => {
  const [loading, setLoading] = useState(false)
  const [linkToken, setLinkToken] = useState<string | null>(null)
  const { bankState, dispatch } = useBankAccounts()

  // Function to create a link token
  const createLinkToken = async () => {
    try {
      setLoading(true)
      // In a real app, this would be an API call to your backend
      // which would then call Plaid to get a link token

      // Mock response for demo
      setTimeout(() => {
        // This is a fake token - in a real app, you'd get this from your server
        setLinkToken("link-sandbox-fake-token-for-demo")
        setLoading(false)
      }, 1500)
    } catch (error) {
      setLoading(false)
      Alert.alert(
        "Error",
        "Failed to initialize bank connection. Please try again."
      )
      console.error("Error creating link token:", error)
    }
  }

  // Function to handle successful bank linking
  const handleSuccess = async (success: LinkSuccess) => {
    try {
      setLoading(true)

      // In a real app, you would:
      // 1. Send the public_token to your backend
      // 2. Exchange it for an access_token
      // 3. Fetch account info using the access token
      // 4. Save the accounts to your database

      // Mock successful bank connection for demo
      setTimeout(() => {
        // Create mock bank accounts
        const mockBankAccounts: BankAccount[] = [
          {
            id: `bank-${Date.now()}-1`,
            accountId: "acc-checking", // Link to an existing account in the Chart of Accounts
            institutionName: "Mock Bank",
            accountName: "Checking Account",
            accountType: "checking",
            accountNumber: "1234", // Last 4 digits
            plaidAccessToken: "access-sandbox-fake-token",
            plaidItemId: success.metadata.institution?.id || "ins_mock",
            balance: 5000,
            lastUpdated: new Date()
          },
          {
            id: `bank-${Date.now()}-2`,
            accountId: "acc-savings", // Link to an existing account in the Chart of Accounts
            institutionName: "Mock Bank",
            accountName: "Savings Account",
            accountType: "savings",
            accountNumber: "5678", // Last 4 digits
            plaidAccessToken: "access-sandbox-fake-token",
            plaidItemId: success.metadata.institution?.id || "ins_mock",
            balance: 10000,
            lastUpdated: new Date()
          }
        ]

        // Update bank accounts in state
        dispatch({
          type: "ADD_BANK_ACCOUNTS",
          payload: mockBankAccounts
        })

        setLoading(false)
        onContinue()
      }, 2000)
    } catch (error) {
      setLoading(false)
      Alert.alert(
        "Error",
        "Failed to complete bank connection. Please try again."
      )
      console.error("Error handling Plaid success:", error)
    }
  }

  // Function to handle exit/cancellation
  const handleExit = (exit: LinkExit) => {
    console.log("Plaid link exited:", exit)
    setLinkToken(null)
    if (exit.error) {
      Alert.alert(
        "Connection Error",
        "There was an issue connecting to your bank. Please try again."
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Connect Your Bank</Title>
        <Text style={styles.description}>
          Connect your bank accounts to automatically import transactions and
          keep your books up to date.
        </Text>

        <Card style={styles.card}>
          <Card.Cover
            source={require("../../../assets/images/bank-connection.png")}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <Card.Content>
            <Text style={styles.cardText}>
              Finstream uses Plaid to securely connect to thousands of financial
              institutions. Your credentials are never stored by Finstream.
            </Text>
          </Card.Content>
        </Card>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2196F3" />
            <Text style={styles.loadingText}>Connecting to bank...</Text>
          </View>
        ) : linkToken ? (
          <PlaidLink
            tokenConfig={{
              token: linkToken
            }}
            onSuccess={handleSuccess}
            onExit={handleExit}
          >
            <View style={styles.plaidButton}>
              <Text style={styles.plaidButtonText}>Continue with Plaid</Text>
            </View>
          </PlaidLink>
        ) : (
          <Button
            mode="contained"
            onPress={createLinkToken}
            style={styles.connectButton}
          >
            Connect Bank Account
          </Button>
        )}
      </View>

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
          mode="text"
          onPress={onSkip}
          style={styles.skipButton}
          disabled={loading}
        >
          Skip for now
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
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    lineHeight: 24
  },
  card: {
    marginBottom: 30
  },
  cardImage: {
    height: 120,
    backgroundColor: "#f9f9f9"
  },
  cardText: {
    marginTop: 16,
    lineHeight: 22
  },
  connectButton: {
    marginTop: 20,
    paddingVertical: 8
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  loadingText: {
    marginTop: 16
  },
  plaidButton: {
    backgroundColor: "#2196F3",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    marginTop: 20
  },
  plaidButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
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
  skipButton: {
    flex: 1
  }
})

export default BankLinkScreen
