import React from "react"

// modules
import { StyleProp, TextStyle } from "react-native"
import { observer } from "mobx-react-lite"

// components
import { Text } from "app/components/Text"

// themes
import { colors, typography } from "app/theme"

// i18n
import { TxKeyPath } from "app/i18n"

export interface PrimaryHeaderProps {
  style?: StyleProp<TextStyle>
  tx?: TxKeyPath
}

/**
 * Describe your component here
 */
export const PrimaryHeader = observer(function PrimaryHeader(props: PrimaryHeaderProps) {
  const { style, tx } = props

  return <Text style={[$text, style]} tx={tx} />
})

const $text: TextStyle = {
  fontFamily: typography.fonts.rubik.bold,
  fontSize: 24,
  color: colors.palette.primary200,
}
