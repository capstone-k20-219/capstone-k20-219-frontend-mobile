import React, { FC, useEffect } from "react"

// modules
import { observer } from "mobx-react-lite"
// import { Image, ImageStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import { ParkingLotMap } from "app/components"

// hooks
import { useStores } from "app/models"

// themes
import { appStyle } from "app/theme"

interface MapScreenProps extends AppStackScreenProps<"Map"> {}

export const MapScreen: FC<MapScreenProps> = observer(function MapScreen() {
  const rootStore = useStores()

  useEffect(() => {
    if (rootStore.checkInStatus) {
      rootStore.checkin()
    }
  }, [rootStore.checkInStatus])

  useEffect(() => {
    if (rootStore.checkOutStatus) {
      rootStore.checkout()
    }
  }, [rootStore.checkOutStatus])

  return (
    <SafeAreaView style={appStyle.rootContainer}>
      <ParkingLotMap interactiveMode={false} />
    </SafeAreaView>
  )
})
