import React from "react"
import { StyleSheet, Linking } from "react-native"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"

export const Footer: React.FC = () => (
  <ThemedView style={styles.container}>
    <ThemedText style={styles.text}>
      © 2025 Finstream. All rights reserved.
    </ThemedText>
    <ThemedText
      style={styles.link}
      onPress={() => Linking.openURL("https://example.com/terms")}
    >
      Terms of Service
    </ThemedText>
    <ThemedText
      style={styles.link}
      onPress={() => Linking.openURL("https://example.com/privacy")}
    >
      Privacy Policy
    </ThemedText>
  </ThemedView>
)

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
  link: {
    fontSize: 14,
    color: "#1e90ff",
    textDecorationLine: "underline",
    marginVertical: 2,
  },
})
