import React from "react"

// modules
import {
  StyleProp,
  ViewStyle,
  ImageStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"
import { observer } from "mobx-react-lite"

// components
import { Icon } from "app/components/Icon"

type AddButtonProps = {
  style?: StyleProp<ViewStyle>
  iconStyle?: StyleProp<ImageStyle>
  activeOpacity?: number
  width?: number | string
  height?: number | string
} & TouchableOpacityProps

/**
 * Describe your component here
 */
export const AddButton = observer(function AddButton(props: AddButtonProps) {
  const {
    style,
    iconStyle,
    activeOpacity = 0.7,
    width = 26,
    height = 24,
    ...TouchableOpacityProps
  } = props

  return (
    <TouchableOpacity style={style} activeOpacity={activeOpacity} {...TouchableOpacityProps}>
      <Icon style={[$icon(width, height), iconStyle]} icon="addCircle" />
    </TouchableOpacity>
  )
})

const $icon = (width: number | string, height: number | string): ImageStyle => ({
  width,
  height,
})
