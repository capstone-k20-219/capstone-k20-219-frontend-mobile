import React from "react"

// modules
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

// components

// themes
import { colors } from "app/theme"

export interface MapBackgroundProps {
  style?: StyleProp<ViewStyle>
  mapSize: number
}

export const MapBackground = observer(function MapBackground(props: MapBackgroundProps) {
  const { style, mapSize = 4800 } = props
  return (
    <View style={[$container, style]}>
      {[...Array(mapSize / 24 - 1)].map((_, index) => (
        <View key={"horizontal" + index} style={$horizontalContainer(index)}></View>
      ))}
      {[...Array(mapSize / 24 - 1)].map((_, index) => (
        <View key={"vertical" + index} style={$verticalContainer(index)}></View>
      ))}
    </View>
  )
})

const $container: ViewStyle = {
  width: 4800,
  height: 4800,
}

const $horizontalContainer = (index: number): ViewStyle => ({
  width: "100%",
  position: "absolute",
  left: 0,
  top: (index + 1) * 24,
  borderColor: colors.slotBorder,
  borderBottomWidth: 0.5,
})

const $verticalContainer = (index: number): ViewStyle => ({
  height: "100%",
  position: "absolute",
  top: 0,
  left: (index + 1) * 24 * 1.5,
  borderColor: colors.slotBorder,
  borderLeftWidth: 0.5,
})
