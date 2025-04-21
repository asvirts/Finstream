import React from "react"
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
  Text,
  ViewStyle,
  TextStyle
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

export type ButtonVariant = "primary" | "secondary" | "outline" | "danger"

export interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: ButtonVariant
  size?: "small" | "medium" | "large"
  isLoading?: boolean
  icon?: string
  iconPosition?: "left" | "right"
  fullWidth?: boolean
  containerStyle?: ViewStyle
  textStyle?: TextStyle
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "medium",
  isLoading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  disabled = false,
  containerStyle,
  textStyle,
  ...rest
}) => {
  // Button color based on variant
  const getButtonColors = (): { bg: string; text: string; border: string } => {
    switch (variant) {
      case "primary":
        return { bg: "#0a7ea4", text: "#FFFFFF", border: "#0a7ea4" }
      case "secondary":
        return { bg: "#6c757d", text: "#FFFFFF", border: "#6c757d" }
      case "outline":
        return { bg: "transparent", text: "#0a7ea4", border: "#0a7ea4" }
      case "danger":
        return { bg: "#dc3545", text: "#FFFFFF", border: "#dc3545" }
      default:
        return { bg: "#0a7ea4", text: "#FFFFFF", border: "#0a7ea4" }
    }
  }

  // Button padding based on size
  const getButtonPadding = (): {
    paddingVertical: number
    paddingHorizontal: number
  } => {
    switch (size) {
      case "small":
        return { paddingVertical: 6, paddingHorizontal: 12 }
      case "medium":
        return { paddingVertical: 10, paddingHorizontal: 18 }
      case "large":
        return { paddingVertical: 14, paddingHorizontal: 24 }
      default:
        return { paddingVertical: 10, paddingHorizontal: 18 }
    }
  }

  // Icon size based on button size
  const getIconSize = (): number => {
    switch (size) {
      case "small":
        return 16
      case "medium":
        return 20
      case "large":
        return 24
      default:
        return 20
    }
  }

  const colors = getButtonColors()
  const padding = getButtonPadding()
  const iconSize = getIconSize()
  const opacity = disabled ? 0.6 : 1

  const buttonStyles: ViewStyle = {
    backgroundColor: colors.bg,
    borderColor: colors.border,
    borderWidth: variant === "outline" ? 1 : 0,
    paddingVertical: padding.paddingVertical,
    paddingHorizontal: padding.paddingHorizontal,
    opacity,
    width: fullWidth ? "100%" : undefined
  }

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyles, containerStyle]}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === "outline" ? colors.text : "#FFFFFF"}
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === "left" && (
            <Ionicons
              name={icon as any}
              size={iconSize}
              color={colors.text}
              style={styles.iconLeft}
            />
          )}

          <Text
            style={[
              styles.text,
              {
                color: colors.text,
                fontSize: size === "small" ? 14 : size === "large" ? 18 : 16
              },
              textStyle
            ]}
          >
            {title}
          </Text>

          {icon && iconPosition === "right" && (
            <Ionicons
              name={icon as any}
              size={iconSize}
              color={colors.text}
              style={styles.iconRight}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontWeight: "600"
  },
  iconLeft: {
    marginRight: 8
  },
  iconRight: {
    marginLeft: 8
  }
})

export default Button
