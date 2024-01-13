import React, { FC } from "react"

// modules
import { observer } from "mobx-react-lite"
import { ViewStyle, Image, View, TextStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import { Text } from "app/components"

// themes
import { images, appStyle, typography } from "app/theme"

// constants
import { sizes } from "app/constants"

interface CheckoutScreenProps extends AppStackScreenProps<"Checkout"> {}

export const CheckoutScreen: FC<CheckoutScreenProps> = observer(function CheckoutScreen() {
  return (
    <SafeAreaView style={appStyle.rootContainer}>
      <View style={$container}>
        <Image source={images.qrCode} resizeMode="contain" />
        <Text style={$text} tx="scanQRCode" />
      </View>
    </SafeAreaView>
  )
})

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $text: TextStyle = {
  paddingTop: 16,
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 24,
  width: sizes.screenWidth * 0.5,
  textAlign: "center",
}
