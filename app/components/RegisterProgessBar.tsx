import React from "react"

// modules
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

// components
import { Text } from "app/components/Text"
import { VerticalSeparator } from "app/components/VerticalSeparator"

// themes
import { colors, typography } from "app/theme"

export interface RegisterProgessBarProps {
  style?: StyleProp<ViewStyle>
  level?: number
  lineWidth?: number | string
  lineHeight?: number | string
}

export const RegisterProgessBar = observer(function RegisterProgessBar(
  props: RegisterProgessBarProps,
) {
  const { style, level, lineWidth = 80, lineHeight = 2 } = props

  return (
    <View style={[$container, style]}>
      <View style={$roundContainer(level >= 1)}>
        <Text style={$text} text="1" />
      </View>
      <VerticalSeparator
        width={lineWidth}
        height={lineHeight}
        color={level >= 1 ? colors.palette.primary100 : colors.palette.neutral400}
      />
      <View style={$roundContainer(level >= 2)}>
        <Text style={$text} text="2" />
      </View>
      <VerticalSeparator
        width={lineWidth}
        height={lineHeight}
        color={level >= 2 ? colors.palette.primary100 : colors.palette.neutral400}
      />
      <View style={$roundContainer(level === 3)}>
        <Text style={$text} text="3" />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}

const $roundContainer = (isFilled: boolean): ViewStyle => ({
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: isFilled ? colors.palette.primary100 : colors.palette.neutral400,
})

const $text: TextStyle = {
  flex: 1,
  fontFamily: typography.fonts.rubik.bold,
  fontSize: 16,
  lineHeight: 20,
  textAlign: "center",
  textAlignVertical: "center",
  color: colors.white,
}
