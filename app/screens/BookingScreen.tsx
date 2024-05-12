import React, { FC } from "react"

// modules
import { observer } from "mobx-react-lite"
// import { Image, ImageStyle, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import { ParkingLotMap } from "app/components"

// themes
import { appStyle } from "app/theme"

interface BookingScreenProps extends AppStackScreenProps<"Booking"> {}

export const BookingScreen: FC<BookingScreenProps> = observer(function BookingScreen() {
  return (
    <SafeAreaView style={appStyle.rootContainer}>
      <ParkingLotMap interactiveMode={true} />
    </SafeAreaView>
  )
})
