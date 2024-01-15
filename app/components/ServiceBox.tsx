import React, { useState } from "react"

// modules
import { StyleProp, TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"

// components
import { Text } from "app/components/Text"

// themes
import { colors, typography } from "app/theme"

export interface ServiceBoxProps {
  style?: StyleProp<ViewStyle>
  setCounter?: React.Dispatch<React.SetStateAction<number>>
  serviceName?: string
  textStyle?: StyleProp<TextStyle>
  price?: string
  activeOpacity?: number
}

export const ServiceBox = observer(function ServiceBox(props: ServiceBoxProps) {
  const { style, setCounter, serviceName, textStyle, price, activeOpacity = 0.7 } = props
  const [isSelected, setIsSelected] = useState(false)

  const handleSelectedOnPress = () => {
    if (!isSelected) {
      setIsSelected(true)
      setCounter((prev) => prev + 1)
    } else {
      setIsSelected(false)
      setCounter((prev) => prev - 1)
    }
  }

  return (
    <TouchableOpacity
      style={[$container(isSelected), style]}
      activeOpacity={activeOpacity}
      onPress={handleSelectedOnPress}
    >
      <Text style={[$serviceText(isSelected), textStyle]} text={serviceName} />
      <Text style={[$priceText(isSelected), textStyle]} text={price} />
    </TouchableOpacity>
  )
})

const $container = (isSelected: boolean): ViewStyle => ({
  paddingVertical: 14,
  paddingHorizontal: 16,
  rowGap: 11,
  borderWidth: 1,
  borderColor: colors.palette.neutral300,
  borderRadius: 5,
  backgroundColor: isSelected ? colors.palette.primary200 : colors.white,
})

const $serviceText = (isSelected: boolean): TextStyle => ({
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 16,
  color: isSelected ? colors.white : colors.black,
})

const $priceText = (isSelected: boolean): TextStyle => ({
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 16,
  color: isSelected ? colors.white : colors.black,
  textAlign: "right",
})
