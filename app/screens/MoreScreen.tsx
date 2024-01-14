import React, { FC, useState } from "react"

// modules
import { observer } from "mobx-react-lite"
import { ViewStyle, View, ImageStyle } from "react-native"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import { IconTypes, ScreenLinkingBox, LogoutModal } from "app/components"

// themes
import { appStyle } from "app/theme"

// i18n
import { TxKeyPath } from "app/i18n"

interface MoreScreenProps extends AppStackScreenProps<"More"> {}

interface ScreenLinkingData {
  icon?: IconTypes
  title?: TxKeyPath
  destinationScreen?: keyof AppStackParamList
}

export const MoreScreen: FC<MoreScreenProps> = observer(function MoreScreen(props) {
  const [isLogoutModalOn, setIsLogoutModalOn] = useState(false)
  const data: ScreenLinkingData[] = [
    { icon: "user", title: "profile", destinationScreen: "Profile" },
    { icon: "creditCard", title: "bankAccount", destinationScreen: "BankAccountManager" },
    { icon: "car", title: "vehicle", destinationScreen: "VehicleManager" },
    { icon: "policy", title: "policy", destinationScreen: "Policy" },
    { icon: "info", title: "FAQ", destinationScreen: "Faq" },
    { icon: "settings", title: "setting", destinationScreen: "Setting" },
    { icon: "signout", title: "logout" },
  ]

  const handleNavigateOnPress = (screen: keyof AppStackParamList) => {
    props.navigation.navigate(screen)
  }

  const handleToggleLogoutModalOnPress = () => {
    setIsLogoutModalOn(true)
  }

  return (
    <SafeAreaView style={appStyle.rootContainer}>
      <View style={$container}>
        {data.map((value, index) => (
          <ScreenLinkingBox
            key={index}
            icon={value.icon}
            iconStyle={index === 2 ? $icon : null}
            titleTx={value.title}
            onPress={
              index === data.length - 1
                ? handleToggleLogoutModalOnPress
                : () => handleNavigateOnPress(value.destinationScreen)
            }
          />
        ))}
      </View>
      <LogoutModal
        cancelButtonTitleTx="cancel"
        actionButtonTitleTx="yes"
        visibility={isLogoutModalOn}
        setVisibility={setIsLogoutModalOn}
      />
    </SafeAreaView>
  )
})

const $container: ViewStyle = {
  rowGap: 12,
  paddingTop: 48,
  paddingHorizontal: 24,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
}

const $icon: ImageStyle = {
  width: 60,
  height: 35,
}
