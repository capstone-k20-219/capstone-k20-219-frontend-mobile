import React from "react"

// modules
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"
import { observer } from "mobx-react-lite"

// components
import { Text } from "app/components/Text"

// themes
import { colors, typography } from "app/theme"

// i18n
import { TxKeyPath } from "app/i18n"

type LinkButtonProps = {
  style?: StyleProp<ViewStyle>
  titleTx?: TxKeyPath
  titleStyle?: TextStyle
  color?: string
  activeOpacity?: number
} & TouchableOpacityProps

/**
 * Describe your component here
 */
export const LinkButton = observer(function LinkButton(props: LinkButtonProps) {
  const {
    style,
    titleTx,
    titleStyle,
    activeOpacity = 0.7,
    color = colors.palette.primary200,
    ...TouchableOpacityProps
  } = props

  return (
    <TouchableOpacity style={style} activeOpacity={activeOpacity} {...TouchableOpacityProps}>
      <Text style={[$title(color), titleStyle]} tx={titleTx} />
    </TouchableOpacity>
  )
})

const $title = (color: string): TextStyle => ({
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 14,
  color,
})
