import React, { FC } from "react"

// modules
import { observer } from "mobx-react-lite"
import { ViewStyle, Image, View, TextStyle, ImageStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import { Text, Icon } from "app/components"

// themes
import { images, appStyle, typography, colors } from "app/theme"

// constants
import { sizes } from "app/constants"

interface CheckoutScreenProps extends AppStackScreenProps<"Checkout"> {}

export const CheckoutScreen: FC<CheckoutScreenProps> = observer(function CheckoutScreen() {
  return (
    <SafeAreaView style={appStyle.rootContainer}>
      <View style={[$container, $display]}>
        <Image source={images.qrCode} resizeMode="contain" />
        <Text style={$text} tx="scanQRCode" />
      </View>
      <View style={$container}>
        <Icon style={$icon} icon="noVehicle" />
        <Text style={$text2} tx="noVehicleInParkingLot" />
      </View>
    </SafeAreaView>
  )
})

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $display: ViewStyle = {
  display: "none",
}

const $text: TextStyle = {
  paddingTop: 16,
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 24,
  width: sizes.screenWidth * 0.5,
  textAlign: "center",
}

const $icon: ImageStyle = {
  width: sizes.screenWidth * 0.4,
  height: sizes.screenHeight * 0.2,
}

const $text2: TextStyle = {
  paddingTop: 32,
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 24,
  width: sizes.screenWidth * 0.8,
  textAlign: "center",
  lineHeight: 32,
  color: colors.palette.neutral300,
}
