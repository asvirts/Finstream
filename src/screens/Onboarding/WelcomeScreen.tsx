import React from "react"
import { StyleSheet, View, Image } from "react-native"
import { Button, Text, Title } from "react-native-paper"

interface WelcomeScreenProps {
  onContinue: () => void
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../../assets/images/react-logo.png")}
          style={styles.logo}
        />
        <Title style={styles.title}>Welcome to Finstream</Title>
        <Text style={styles.description}>
          Your simple, powerful accounting solution. Let's get you set up in
          just a few steps.
        </Text>
        <Text style={styles.features}>
          • Chart of Accounts setup{"\n"}• Bank account connection{"\n"}•
          Invoice templates{"\n"}• Financial reporting
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={onContinue}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Get Started
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30
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
  features: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 20,
    alignSelf: "flex-start"
  },
  footer: {
    padding: 20
  },
  button: {
    borderRadius: 4
  },
  buttonContent: {
    paddingVertical: 8
  }
})

export default WelcomeScreen
