import { StyleSheet, ScrollView } from "react-native"
import { useRouter } from "expo-router"

import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { Hero } from "@/src/components/ui/Hero"
import { Features } from "@/src/components/ui/Features"
import { Testimonials } from "@/src/components/ui/Testimonials"
import { Pricing } from "@/src/components/ui/Pricing"
import { CTA } from "@/src/components/ui/CTA"
import { Footer } from "@/src/components/ui/Footer"

export default function Homepage() {
  const router = useRouter()

  return (
    <ScrollView style={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <CTA />
        <Footer />
      </ThemedView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  }
})
