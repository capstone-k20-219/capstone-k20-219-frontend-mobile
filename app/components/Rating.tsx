import React, { useCallback } from "react"

// modules
import { StyleProp, View, ViewStyle, TouchableOpacity, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"

// components
import { Icon } from "./Icon"

// themes
import { colors } from "app/theme"

export interface RatingProps {
  style?: StyleProp<ViewStyle>
  length?: number
  onChange?: React.Dispatch<React.SetStateAction<number>>
  value: number
  size?: number
  activeOpacity?: number
}

export const Rating = observer(function Rating(props: RatingProps) {
  const { style, length, onChange, value, size = 18, activeOpacity = 0.7 } = props

  const highlightStar = useCallback((index) => onChange(index + 1), []) as (index: number) => void

  return (
    <View style={[$container, style]}>
      {[...Array(length).keys()].map((_, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={activeOpacity}
          onPress={() => highlightStar(index)}
        >
          <Icon icon="star_gray" style={$iconStyle(index < value)} size={size} />
        </TouchableOpacity>
      ))}
    </View>
  )
})

const $container: ViewStyle = {
  flexDirection: "row",
  columnGap: 4,
  alignItems: "center",
}

const $iconStyle = (condition: boolean): ImageStyle => ({
  tintColor: condition ? colors.starYellow : colors.starGray,
})
