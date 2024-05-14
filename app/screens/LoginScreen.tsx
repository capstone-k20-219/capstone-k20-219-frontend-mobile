import React, { FC, useRef, useEffect } from "react"

// modules
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  View,
  ImageStyle,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TextStyle,
} from "react-native"
import { AppStackScreenProps } from "app/navigators"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

// components
import { Text, Input, PrimaryButton, LinkButton } from "app/components"
import { SafeAreaView } from "react-native-safe-area-context"

// constants
import { sizes } from "app/constants"

// hooks
import { useForm } from "react-hook-form"
import { useStores } from "app/models"

// interfaces
import { LoginInfo } from "app/services/authentication/auth.types"

// themes
import { appStyle, colors, images, typography } from "app/theme"
// import { TxKeyPath } from "app/i18n"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

const schema = yup
  .object({
    email: yup.string(),
    password: yup.string().required("passwordRequired"),
  })
  .required()

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(props) {
  const passwordRef = useRef(null)
  const rootStore = useStores()

  const { handleSubmit, control, reset } = useForm<LoginInfo>({
    resolver: yupResolver<any>(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleNextInputFocusOnPress = () => {
    passwordRef.current?.focus()
  }

  const handleSubmitOnPress = (data: LoginInfo) => {
    rootStore.postAuth(data)
  }

  const handleRegisterOnPress = () => {
    props.navigation.navigate("RegisterPersonalInfo")
  }

  useEffect(() => {
    if (rootStore.isLoggedIn) {
      rootStore.getUserInfo()
      rootStore.getSlotInfo()
      rootStore.getMyVehicles()
      rootStore.getVehicleType()
      rootStore.getParkingTicket()
      props.navigation.navigate("Home")
      reset()
    }
  }, [rootStore.isLoggedIn])

  return (
    <SafeAreaView style={appStyle.rootContainer}>
      <KeyboardAvoidingView style={appStyle.flex1} behavior="height">
        <ScrollView contentContainerStyle={$contentContainer}>
          <Image style={$image} source={images.loginLogo} resizeMode="contain" />
          <View style={$inputContainer}>
            <Input
              control={control}
              controlName="email"
              placeHolderTx="emailOrPhone"
              // error={(errors.email?.message ? errors.email?.message : errors.phoneNumber?.message) as TxKeyPath}
              onSubmitEditing={handleNextInputFocusOnPress}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <Input
              ref={passwordRef}
              control={control}
              controlName="password"
              // error={errors.password?.message as TxKeyPath}
              placeHolderTx="password"
              secureTextEntry={true}
              returnKeyType="done"
            />
          </View>
          <PrimaryButton
            titleTx="login"
            activeOpacity={0.7}
            onPress={handleSubmit(handleSubmitOnPress)}
          />
          <View style={$buttonContainer}>
            <LinkButton titleTx="forgotPassword" color={colors.palette.neutral500} />
            <View style={$registerButtonContanier}>
              <Text style={$text} tx="dontHaveAccount" />
              <LinkButton titleTx="signUp" onPress={handleRegisterOnPress} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
})

const $contentContainer: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal: 25,
}

const $image: ImageStyle = {
  width: sizes.screenWidth * 0.55,
  height: sizes.screenHeight * 0.3,
  marginTop: sizes.screenHeight * 0.11,
  alignSelf: "center",
}

const $inputContainer: ViewStyle = {
  paddingTop: 59,
  paddingBottom: 24,
  rowGap: 24,
}

const $buttonContainer: ViewStyle = {
  paddingTop: 24,
  alignItems: "center",
  rowGap: 16,
}

const $registerButtonContanier: ViewStyle = {
  flexDirection: "row",
}

const $text: TextStyle = {
  fontFamily: typography.fonts.rubik.regular,
  color: colors.palette.neutral500,
  fontSize: 14,
}
