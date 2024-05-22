import React, { FC, useEffect, useState } from "react"

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
import database from "@react-native-firebase/database"

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
        rootStore.slotBooking.id !== null
      ) {
        setIsBooked(true)
      } else {
        setIsBooked(false)
      }
    }, [rootStore.getSlotBookingStatus, rootStore.postSlotBookingStatus, rootStore.checkInStatus]),
  )

  useEffect(() => {
    const checkOutStatusRef = database()
      .ref("/checkOutStatus")
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          rootStore.setProp("checkOutStatus", snapshot.val())
        }
      })

    const checkInStatusRef = database()
      .ref("/checkInStatus")
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          rootStore.setProp("checkInStatus", snapshot.val())
        }
      })

    return () => {
      database().ref("/checkOutStatus").off("value", checkOutStatusRef)
      database().ref("/checkInStatus").off("value", checkInStatusRef)
    }
  }, [])

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
      {!isBooked ? (
        <ParkingLotMap interactiveMode={true} />
      ) : (
        <CountDownTimer setIsBooked={setIsBooked} />
      )}
    </SafeAreaView>
  )
})
