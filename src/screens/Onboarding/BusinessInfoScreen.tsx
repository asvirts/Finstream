import React, { useState } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { Button, Text, TextInput, Title, HelperText } from "react-native-paper"
import DateTimePicker from "@react-native-community/datetimepicker"
import { format } from "date-fns"

interface BusinessInfo {
  businessName: string
  industry: string
  fiscalYearStart: Date
}

interface BusinessInfoScreenProps {
  businessInfo: BusinessInfo
  setBusinessInfo: (info: BusinessInfo) => void
  onContinue: () => void
  onBack: () => void
}

const BusinessInfoScreen: React.FC<BusinessInfoScreenProps> = ({
  businessInfo,
  setBusinessInfo,
  onContinue,
  onBack
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [errors, setErrors] = useState({
    businessName: ""
  })

  const validateForm = (): boolean => {
    let isValid = true
    const newErrors = { businessName: "" }

    if (!businessInfo.businessName.trim()) {
      newErrors.businessName = "Business name is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleContinue = () => {
    if (validateForm()) {
      onContinue()
    }
  }

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setBusinessInfo({
        ...businessInfo,
        fiscalYearStart: selectedDate
      })
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Business Information</Title>
        <Text style={styles.description}>
          Tell us about your business to help set up your accounting system.
        </Text>

        <TextInput
          label="Business Name*"
          value={businessInfo.businessName}
          onChangeText={(text) =>
            setBusinessInfo({ ...businessInfo, businessName: text })
          }
          style={styles.input}
          error={!!errors.businessName}
        />
        {errors.businessName ? (
          <HelperText type="error">{errors.businessName}</HelperText>
        ) : null}

        <TextInput
          label="Industry"
          value={businessInfo.industry}
          onChangeText={(text) =>
            setBusinessInfo({ ...businessInfo, industry: text })
          }
          style={styles.input}
        />

        <Text style={styles.label}>Fiscal Year Start</Text>
        <Button
          mode="outlined"
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}
        >
          {format(businessInfo.fiscalYearStart, "MMMM d, yyyy")}
        </Button>

        {showDatePicker && (
          <DateTimePicker
            value={businessInfo.fiscalYearStart}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      <View style={styles.footer}>
        <Button mode="outlined" onPress={onBack} style={styles.backButton}>
          Back
        </Button>
        <Button
          mode="contained"
          onPress={handleContinue}
          style={styles.nextButton}
        >
          Continue
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  input: {
    marginBottom: 16,
    backgroundColor: "transparent"
  },
  label: {
    fontSize: 16,
    marginBottom: 8
  },
  dateButton: {
    marginBottom: 20,
    justifyContent: "flex-start"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20
  },
  backButton: {
    flex: 1,
    marginRight: 8
  },
  nextButton: {
    flex: 1,
    marginLeft: 8
  }
})

export default BusinessInfoScreen
