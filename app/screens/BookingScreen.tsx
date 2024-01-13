import React, { FC, useState } from "react"

// modules
import { observer } from "mobx-react-lite"
import { Image, ImageStyle, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"

// components
import { BookingSlotModal } from "app/components"
import { SafeAreaView } from "react-native-safe-area-context"

// themes
import { appStyle, images } from "app/theme"

// constants
import { sizes } from "app/constants"
interface BookingScreenProps extends AppStackScreenProps<"Booking"> {}

export const BookingScreen: FC<BookingScreenProps> = observer(function BookingScreen() {
  const [isBookingModalOn, setIsBookingModalOn] = useState(false)

  const handleToggleBookingModalOnPress = () => {
    setIsBookingModalOn(!isBookingModalOn)
  }

  return (
    <SafeAreaView style={appStyle.rootContainer}>
      <TouchableOpacity activeOpacity={1} onPress={handleToggleBookingModalOnPress}>
        <Image style={$image} source={images.map} resizeMode="cover" />
      </TouchableOpacity>
      <BookingSlotModal
        visibility={isBookingModalOn}
        setVisibility={setIsBookingModalOn}
        parkingSlotId="PH345-5634"
      />
    </SafeAreaView>
  )
})

const $image: ImageStyle = {
  alignSelf: "center",
  width: sizes.screenWidth * 1,
  height: sizes.screenHeight * 0.9,
}
