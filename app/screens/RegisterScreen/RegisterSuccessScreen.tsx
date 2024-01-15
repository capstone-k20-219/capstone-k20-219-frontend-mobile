import React, { FC } from "react"

// modules
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, ImageStyle, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import { Text, Icon, PrimaryButton, RegisterProgessBar } from "app/components"

// themes
import { appStyle, colors, typography } from "app/theme"

// constants
import { sizes } from "app/constants"

interface RegisterSuccessScreenProps extends AppStackScreenProps<"RegisterSuccess"> {}

export const RegisterSuccessScreen: FC<RegisterSuccessScreenProps> = observer(
  function RegisterSuccessScreen(props) {
    const handleNavigateOnPress = () => [props.navigation.navigate("Login")]

    return (
      <SafeAreaView style={appStyle.rootContainer}>
        <View style={$container}>
          <RegisterProgessBar lineWidth={sizes.screenWidth * 0.205} level={3} />
          <Icon style={$icon} icon="success" />
          <Text style={$text} tx="createAccountSuccess" />
          <PrimaryButton titleTx="login" onPress={handleNavigateOnPress} />
        </View>
      </SafeAreaView>
    )
  },
)

const $container: ViewStyle = {
  paddingTop: 78,
  paddingHorizontal: 25,
}

const $icon: ImageStyle = {
  marginTop: 65,
  marginBottom: 34,
  width: 133,
  height: 133,
  alignSelf: "center",
}

const $text: TextStyle = {
  fontFamily: typography.fonts.rubik.bold,
  fontSize: 28,
  lineHeight: 32,
  color: colors.palette.primary300,
  textAlign: "center",
  paddingBottom: 32,
}
