import React from "react"

// modules
import { StyleProp, ViewStyle, ImageStyle, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"

// navigators
import { navigationRef } from "app/navigators"

// components
import { Icon } from "app/components/Icon"

// themes
import { colors } from "app/theme"

export interface BackButtonProps {
  style?: StyleProp<ViewStyle>
  iconStyle?: StyleProp<ImageStyle>
  activeOpacity?: number
  width?: number | string
  height?: number | string
}

export const BackButton = observer(function BackButton(props: BackButtonProps) {
  const { style, iconStyle, activeOpacity = 0.7, width = 30, height = 30 } = props

  const handleGoBackOnPress = () => {
    if (navigationRef.canGoBack()) navigationRef.goBack()
  }

  return (
    <TouchableOpacity
      style={[$container(width, height), style]}
      activeOpacity={activeOpacity}
      onPress={handleGoBackOnPress}
    >
      <Icon style={[$icon, iconStyle]} icon="arrowLeft" />
    </TouchableOpacity>
  )
})

const $container = (width: number | string, height: number | string): ViewStyle => ({
  backgroundColor: colors.palette.primary200,
  padding: 7,
  borderRadius: 5,
  width,
  height,
})

const $icon: ImageStyle = {
  width: 16,
  height: 16,
  tintColor: colors.white,
}
