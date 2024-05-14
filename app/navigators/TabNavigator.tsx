import React from "react"

// modules
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

// components
import { Icon } from "app/components"
import { ViewStyle, TextStyle } from "react-native"

// screens
import { MapScreen, BookingScreen, CheckoutScreen, ServiceScreen, MoreScreen } from "app/screens"

// i18n
import { translate } from "app/i18n"

// hooks
import { useSafeAreaInsets } from "react-native-safe-area-context"

// themes
import { colors, typography } from "app/theme"

export type TabNavigatorParamList = {
  Map: undefined
  Booking: undefined
  Checkout: undefined
  Service: undefined
  More: undefined
}

const Tab = createBottomTabNavigator<TabNavigatorParamList>()

export const TabNavigator = () => {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 92 }],
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.palette.neutral600,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
      initialRouteName="Map"
    >
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: translate("map"),
          tabBarIcon: ({ color }) => <Icon icon="map" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          tabBarLabel: translate("booking"),
          tabBarIcon: ({ color }) => <Icon icon="bookingSlot" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          tabBarLabel: translate("checkout"),
          tabBarIcon: ({ color }) => <Icon icon="checkout" color={color} size={35} />,
          tabBarItemStyle: $checkoutTab,
        }}
      />
      <Tab.Screen
        name="Service"
        component={ServiceScreen}
        options={{
          tabBarLabel: translate("service"),
          tabBarIcon: ({ color }) => <Icon icon="service" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: translate("more"),
          tabBarIcon: ({ color }) => <Icon icon="more" color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.palette.primary200,
}

const $tabBarItem: ViewStyle = {
  paddingTop: 12,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.fonts.rubik.regular,
  lineHeight: 20,
  flex: 1,
  letterSpacing: -0.12,
}

const $checkoutTab: ViewStyle = {
  borderRadius: 44,
  backgroundColor: colors.palette.primary200,
  bottom: 33,
  paddingTop: 20,
  paddingHorizontal: 3,
  gap: 6,
}
