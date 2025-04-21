import React, { useState } from "react"
import { StyleSheet, View, SafeAreaView } from "react-native"
import { Button, Text, ProgressBar } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../context/AppContext"
import WelcomeScreen from "./WelcomeScreen"
import BusinessInfoScreen from "./BusinessInfoScreen"
import ChartOfAccountsScreen from "./ChartOfAccountsScreen"
import BankLinkScreen from "./BankLinkScreen"
import FinishScreen from "./FinishScreen"

type OnboardingStep =
  | "welcome"
  | "business-info"
  | "chart-of-accounts"
  | "bank-link"
  | "finish"

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome")
  const [businessInfo, setBusinessInfo] = useState({
    businessName: "",
    industry: "",
    fiscalYearStart: new Date()
  })
  const { authState, dispatch } = useAuth()
  const navigation = useNavigation()

  const getStepIndex = (step: OnboardingStep): number => {
    const steps: OnboardingStep[] = [
      "welcome",
      "business-info",
      "chart-of-accounts",
      "bank-link",
      "finish"
    ]
    return steps.indexOf(step)
  }

  const progressValue = getStepIndex(currentStep) / 4

  const handleNext = () => {
    switch (currentStep) {
      case "welcome":
        setCurrentStep("business-info")
        break
      case "business-info":
        setCurrentStep("chart-of-accounts")
        break
      case "chart-of-accounts":
        setCurrentStep("bank-link")
        break
      case "bank-link":
        setCurrentStep("finish")
        break
      case "finish":
        // Mark user as onboarded and navigate to dashboard
        if (authState.user) {
          // TODO: Update user onboarding status via API
          dispatch({
            type: "UPDATE_USER",
            payload: { ...authState.user, isOnboarded: true }
          })
        }
        navigation.reset({
          index: 0,
          routes: [{ name: "Root" }]
        })
        break
    }
  }

  const handleBack = () => {
    switch (currentStep) {
      case "business-info":
        setCurrentStep("welcome")
        break
      case "chart-of-accounts":
        setCurrentStep("business-info")
        break
      case "bank-link":
        setCurrentStep("chart-of-accounts")
        break
      case "finish":
        setCurrentStep("bank-link")
        break
    }
  }

  const handleSkip = () => {
    if (currentStep === "bank-link") {
      setCurrentStep("finish")
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "welcome":
        return <WelcomeScreen onContinue={handleNext} />
      case "business-info":
        return (
          <BusinessInfoScreen
            businessInfo={businessInfo}
            setBusinessInfo={setBusinessInfo}
            onContinue={handleNext}
            onBack={handleBack}
          />
        )
      case "chart-of-accounts":
        return (
          <ChartOfAccountsScreen onContinue={handleNext} onBack={handleBack} />
        )
      case "bank-link":
        return (
          <BankLinkScreen
            onContinue={handleNext}
            onSkip={handleSkip}
            onBack={handleBack}
          />
        )
      case "finish":
        return <FinishScreen onContinue={handleNext} onBack={handleBack} />
      default:
        return null
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        <ProgressBar progress={progressValue} color="#2196F3" />
        <Text style={styles.stepText}>
          Step {getStepIndex(currentStep) + 1} of 5
        </Text>
      </View>
      <View style={styles.content}>{renderCurrentStep()}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 20
  },
  stepText: {
    marginTop: 5,
    marginBottom: 20,
    textAlign: "center"
  },
  content: {
    flex: 1,
    paddingHorizontal: 20
  }
})

export default OnboardingScreen
