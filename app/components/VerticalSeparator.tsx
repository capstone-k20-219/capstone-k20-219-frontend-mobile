import React from "react"

// modules
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

// themes
import { colors } from "app/theme"
export interface VerticalSeparatorProps {
  width?: string | number
  height?: string | number
  color?: string
  style?: StyleProp<ViewStyle>
}

export const VerticalSeparator = observer(function VerticalSeparator(
  props: VerticalSeparatorProps,
) {
  const { width = "100%", height = 1, color = colors.black, style } = props

  return <View style={[$verticalSeparate(width, height, color), style]} />
})

const $verticalSeparate = (
  width?: string | number,
  height?: string | number,
  color?: string,
): ViewStyle => ({
  width,
  height,
  backgroundColor: color,
  alignSelf: "center",
})
