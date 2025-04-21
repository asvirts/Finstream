import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp
} from "react-native"
import { useColorScheme } from "@/hooks/useColorScheme"
import { useThemeColor } from "@/hooks/useThemeColor"

interface CardProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  pressable?: boolean
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  pressable = false
}) => {
  const colorScheme = useColorScheme() ?? "light"
  const cardBgColor = useThemeColor({}, "background")
  const shadowColor = colorScheme === "dark" ? "#000" : "#000"

  const renderCard = () => (
    <View
      style={[
        styles.container,
        {
          backgroundColor: cardBgColor,
          shadowColor: shadowColor,
          shadowOpacity: colorScheme === "dark" ? 0.4 : 0.1
        },
        style
      ]}
    >
      {children}
    </View>
  )

  if (pressable || onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.touchable}
      >
        {renderCard()}
      </TouchableOpacity>
    )
  }

  return renderCard()
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2
  },
  touchable: {
    width: "100%"
  }
})

export default Card
