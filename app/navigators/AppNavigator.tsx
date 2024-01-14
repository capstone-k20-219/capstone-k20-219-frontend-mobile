// modules
import React from "react"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { TabNavigator } from "./TabNavigator"

export type AppStackParamList = {
  Login: undefined
  Home: undefined
  Payment: undefined
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
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.white,
        statusBarColor: colors.white,
        statusBarStyle: "dark",
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ animation: "slide_from_right", navigationBarColor: colors.palette.primary100 }}
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
        options={{ animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="BankAccountManager"
        component={Screens.BankAccountManagerScreen}
        options={{ animation: "slide_from_right" }}
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
        options={{ animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="BookingSlotCountDown"
        component={Screens.BookingSlotCountDownScreen}
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
