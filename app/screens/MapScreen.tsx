import React, { FC } from "react"

// modules
import { observer } from "mobx-react-lite"
import { Image, ImageStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"

// components
import { SafeAreaView } from "react-native-safe-area-context"

// themes
import { appStyle, images } from "app/theme"

// constants
import { sizes } from "app/constants"

interface MapScreenProps extends AppStackScreenProps<"Map"> {}

export const MapScreen: FC<MapScreenProps> = observer(function MapScreen() {
  return (
    <SafeAreaView style={appStyle.rootContainer}>
      <Image style={$image} source={images.map} resizeMode="cover" />
    </SafeAreaView>
  )
})

const $image: ImageStyle = {
  alignSelf: "center",
  width: sizes.screenWidth * 1,
  height: sizes.screenHeight * 0.9,
}
