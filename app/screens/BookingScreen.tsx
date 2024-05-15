import React, { FC, useState } from "react"

// modules
import { observer } from "mobx-react-lite"
// import { Image, ImageStyle, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import { ParkingLotMap, CountDownTimer } from "app/components"

// hooks
import { useStores } from "app/models"
import { useFocusEffect } from "@react-navigation/native"

// themes
import { appStyle } from "app/theme"

interface BookingScreenProps extends AppStackScreenProps<"Booking"> {}

export const BookingScreen: FC<BookingScreenProps> = observer(function BookingScreen() {
  const rootStore = useStores()
  const [isBooked, setIsBooked] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      if (
        rootStore.getSlotBookingStatus === "done" ||
        rootStore.postSlotBookingStatus === "done" ||
        rootStore.slotBooking?.id
      ) {
        setIsBooked(true)
      }
    }, [rootStore.getSlotBookingStatus, rootStore.postSlotBookingStatus]),
  )

  return (
    <SafeAreaView style={appStyle.rootContainer}>
      {!isBooked ? (
        <ParkingLotMap interactiveMode={true} />
      ) : (
        <CountDownTimer setIsBooked={setIsBooked} />
      )}
    </SafeAreaView>
  )
})
