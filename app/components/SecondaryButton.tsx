import React from "react"

// modules
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"

// components
import { Text } from "app/components/Text"

// themes
import { colors, typography } from "app/theme"

// i18n
import { TxKeyPath } from "app/i18n"
type SecondaryButtonProps = {
  style?: StyleProp<ViewStyle>
  titleTx?: TxKeyPath
  titleStyle?: StyleProp<TextStyle>
  activeOpacity?: number
  color?: string
} & TouchableOpacityProps

/**
 * Describe your component here
 */
export const SecondaryButton = observer(function SecondaryButton(props: SecondaryButtonProps) {
  const {
    style,
    titleTx,
    titleStyle,
    activeOpacity = 0.7,
    color = colors.palette.primary200,
    ...TouchableOpacityProps
  } = props
  return (
    <TouchableOpacity
      style={[$container(color), style]}
      activeOpacity={activeOpacity}
      {...TouchableOpacityProps}
    >
      <Text style={[$title, titleStyle]} tx={titleTx} />
    </TouchableOpacity>
  )
})

const $container = (color: string): ViewStyle => ({
  alignItems: "center",
  paddingVertical: 11,
  backgroundColor: color,
  borderRadius: 5,
})

const $title: TextStyle = {
  fontFamily: typography.fonts.rubik.extraBold,
  fontSize: 12,
  lineHeight: 16,
  color: colors.white,
}
