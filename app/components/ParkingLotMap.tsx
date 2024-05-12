import React, { useEffect } from "react"

// modules
import { StyleProp, View, ViewStyle, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"

// components
import { Slot } from "./Slot"
import { MapBackground } from "./MapBackground"

// hooks
import { useStores } from "app/models"

// themes
import { appStyle } from "app/theme"

export interface ParkingLotMapProps {
  style?: StyleProp<ViewStyle>
  interactiveMode?: boolean
}

export const ParkingLotMap = observer(function ParkingLotMap(props: ParkingLotMapProps) {
  const { style, interactiveMode = false } = props
  const rootStore = useStores()

  useEffect(() => {
    rootStore.getSlotInfo()
  }, [])

  return (
    <ScrollView
      contentContainerStyle={appStyle.flexGrow1}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
    >
      <ScrollView
        contentContainerStyle={appStyle.flexGrow1}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={[$container, style]}>
          <MapBackground mapSize={4800} />
          {rootStore.slotInfo.map((item, index) => (
            <Slot key={index} slotInfo={item} interactiveMode={interactiveMode} />
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  )
})

const $container: ViewStyle = {
  width: 4800,
  height: 4800,
}
