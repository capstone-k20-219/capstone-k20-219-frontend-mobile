// modules
import React, { useEffect } from "react"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import { useColorScheme, Alert } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { TabNavigator } from "./TabNavigator"
import { useStores } from "app/models"
import { loadString, remove } from "app/utils/storage"
import { api } from "app/services/api"
import { translate } from "app/i18n"
import database from "@react-native-firebase/database"

export type AppStackParamList = {
  Login: undefined
  Home: undefined
  Payment: { amount: number }
  Profile: undefined
  BankAccountManager: undefined
  VehicleManager: undefined
  Policy: undefined
  Faq: undefined
  Setting: undefined
  PaymentSuccess: undefined
  BookingSlotCountDown: undefined
  RegisterBankAccount: undefined
  RegisterPersonalInfo: undefined
  RegisterSuccess: undefined
  RegisterVehicle: undefined
  Map: undefined
  Booking: undefined
  Checkout: undefined
  Service: undefined
  More: undefined
  Feedback: { id: string; name: string }
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const rootStore = useStores()

  useEffect(() => {
    const checkRefreshTokenExpiration = async () => {
      const token = await loadString("refresh_token")
      if (token) {
        const response = await api.auth.postRefreshToken()
        if (response.kind === "unauthorized") {
          Alert.alert(
            translate("sessionExpiredTitle"),
            translate("sessionExpired"),
            [
              {
                text: "OK",
                onPress: async () => {
                  rootStore.setProp("userId", null)
                  await remove("refresh_token")
                  navigationRef.navigate("Login")
                },
              },
            ],
            { cancelable: false },
          )
        }
        if (response.kind === "ok") {
          rootStore.getUserInfo()
          rootStore.getSlotInfo()
          rootStore.getMyVehicles()
          rootStore.getVehicleType()
          rootStore.getParkingTicket()
          rootStore.getSlotBooking()
        }
      }
    }
    checkRefreshTokenExpiration()

    database().ref("/checkOutStatus").set(false)
    database().ref("/checkInStatus").set(false)

    // const checkoutStatusRef = database()
    //   .ref("/checkOutStatus")
    //   .on("value", (snapshot) => {
    //     if (snapshot.val()) {
    //       rootStore.setProp("checkOutStatus", snapshot.val())
    //     }
    //   })

    // const checkInStatusRef = database()
    //   .ref("/checkInStatus")
    //   .on("value", (snapshot) => {
    //     if (snapshot.val()) {
    //       rootStore.setProp("checkInStatus", snapshot.val())
    //     }
    //   })

    // return () => {
    //   database().ref("/checkOutStatus").off("value", checkoutStatusRef)
    //   database().ref("/checkInStatus").off("value", checkInStatusRef)
    // }
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.white,
        statusBarColor: colors.white,
        statusBarStyle: "dark",
      }}
      initialRouteName={rootStore.isLoggedIn ? "Home" : "Login"}
    >
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ animation: "slide_from_right", navigationBarColor: colors.palette.primary200 }}
      />

      <Stack.Screen
        name="Login"
        component={Screens.LoginScreen}
        options={{ animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="RegisterPersonalInfo"
        component={Screens.RegisterPersonalInfoScreen}
        options={{ animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="RegisterBankAccount"
        component={Screens.RegisterBankAccountScreen}
        options={{ animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="RegisterVehicle"
        component={Screens.RegisterVehicleScreen}
        options={{ animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="RegisterSuccess"
        component={Screens.RegisterSuccessScreen}
        options={{ animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="Payment"
        component={Screens.PaymentScreen}
        options={{ animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="PaymentSuccess"
        component={Screens.PaymentSuccessScreen}
        options={{ animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="Profile"
        component={Screens.ProfileScreen}
        options={{
          animation: "slide_from_right",
          statusBarColor: colors.palette.primary100,
          statusBarStyle: "light",
        }}
      />

      <Stack.Screen
        name="VehicleManager"
        component={Screens.VehicleManagerScreen}
        options={{
          animation: "slide_from_right",
          statusBarColor: colors.palette.primary100,
          statusBarStyle: "light",
        }}
      />

      <Stack.Screen
        name="BankAccountManager"
        component={Screens.BankAccountManagerScreen}
        options={{
          animation: "slide_from_right",
          statusBarColor: colors.palette.primary100,
          statusBarStyle: "light",
        }}
      />

      <Stack.Screen
        name="Faq"
        component={Screens.FaqScreen}
        options={{ animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="Policy"
        component={Screens.PolicyScreen}
        options={{ animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="Setting"
        component={Screens.SettingScreen}
        options={{
          animation: "slide_from_right",
          statusBarColor: colors.palette.primary100,
          statusBarStyle: "light",
        }}
      />

      <Stack.Screen
        name="BookingSlotCountDown"
        component={Screens.BookingSlotCountDownScreen}
        options={{ animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="Feedback"
        component={Screens.FeedbackScreen}
        options={{ animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
