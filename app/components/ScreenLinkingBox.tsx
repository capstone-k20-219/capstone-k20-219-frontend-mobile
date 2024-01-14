import React from "react"

// modules
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ImageStyle,
} from "react-native"
import { observer } from "mobx-react-lite"

// components
import { Text } from "app/components/Text"
import { IconTypes, Icon } from "app/components/Icon"

// themes
import { colors, typography } from "app/theme"
import { TxKeyPath } from "app/i18n"

type ScreenLinkingBoxProps = {
  style?: StyleProp<ViewStyle>
  icon?: IconTypes
  titleTx?: TxKeyPath
  titleStyle?: StyleProp<TextStyle>
  iconStyle?: StyleProp<ImageStyle>
  activeOpacity?: number
} & TouchableOpacityProps

/**
 * Describe your component here
 */
export const ScreenLinkingBox = observer(function ScreenLinkingBox(props: ScreenLinkingBoxProps) {
  const {
    style,
    icon,
    titleTx,
    titleStyle,
    iconStyle,
    activeOpacity = 0.7,
    ...TouchableOpacityProps
  } = props

  return (
    <TouchableOpacity
      style={[$container, style]}
      activeOpacity={activeOpacity}
      {...TouchableOpacityProps}
    >
      <Icon style={[$icon, iconStyle]} icon={icon} />
      <Text style={[$title, titleStyle]} tx={titleTx} />
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: colors.palette.neutral100,
  width: 102,
  height: 102,
}

const $icon: ImageStyle = {
  width: 36,
  height: 36,
  tintColor: colors.palette.primary200,
}

const $title: TextStyle = {
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 14,
  color: colors.palette.neutral500,
  paddingTop: 5,
}
