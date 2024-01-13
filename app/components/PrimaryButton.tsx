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

type PrimaryButtonProps = {
  style?: StyleProp<ViewStyle>
  titleTx?: TxKeyPath
  titleStyle?: StyleProp<TextStyle>
  activeOpacity?: number
} & TouchableOpacityProps

/**
 * Describe your component here
 */
export const PrimaryButton = observer(function PrimaryButton(props: PrimaryButtonProps) {
  const { style, titleTx, titleStyle, activeOpacity = 0.7, ...TouchableOpacityProps } = props
  return (
    <TouchableOpacity
      style={[$container, style]}
      activeOpacity={activeOpacity}
      {...TouchableOpacityProps}
    >
      <Text style={[$title, titleStyle]} tx={titleTx} />
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  alignItems: "center",
  paddingVertical: 9,
  backgroundColor: colors.palette.primary200,
  borderRadius: 99,
}

const $title: TextStyle = {
  fontFamily: typography.fonts.rubik.bold,
  fontSize: 28,
  lineHeight: 32,
  color: colors.white,
}
