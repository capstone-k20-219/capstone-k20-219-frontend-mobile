import React, { FC } from "react"

// modules
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { AppStackScreenProps } from "app/navigators"

// components
import { Text, BackButton, AddButton, SettingBar, VerticalSeparator } from "app/components"

// themes
import { appStyle, colors, typography } from "app/theme"

// i18n
import { TxKeyPath } from "app/i18n"
import I18n from "i18n-js"

interface SettingScreenProps extends AppStackScreenProps<"Setting"> {}

export const SettingScreen: FC<SettingScreenProps> = observer(function SettingScreen() {
  return (
    <SafeAreaView style={appStyle.rootContainer}>
      <View style={$headerContainer}>
        <BackButton />
        <Text style={$title} tx="setting" />
        <AddButton style={appStyle.opacity0} disabled />
      </View>
      <ScrollView contentContainerStyle={$container}>
        <View style={$listContainer}>
          <SettingBar titleTx="darkMode" icon="darkMode" toggleBar={true} iconsize={18} />

          <SettingBar titleTx="notification" icon="notification" toggleBar={true} iconsize={18} />
          <SettingBar
            titleTx="language"
            currentOption={true}
            icon="language"
            useModal={true}
            initialOption={I18n.locale === "en-US" ? "en" : (I18n.locale as TxKeyPath)}
            modalData={["en", "vn"]}
          />

          <VerticalSeparator width={"90%"} />

          <SettingBar titleTx="reportBug" icon="bug" />

          <SettingBar
            titleTx="version"
            currentOption={true}
            icon="version"
            initialOptionText={"1.0.0"}
            disabled
            activeOpacity={1}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})

const $headerContainer: ViewStyle = {
  paddingTop: 35,
  paddingBottom: 25,
  paddingHorizontal: 16,
  backgroundColor: colors.palette.primary100,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $container: ViewStyle = {
  flexGrow: 1,
  paddingVertical: 33,
  paddingHorizontal: 24,
}

const $listContainer: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.black,
  borderRadius: 7,
}

const $title: TextStyle = {
  fontFamily: typography.fonts.rubik.bold,
  fontSize: 32,
  lineHeight: 36,
  color: colors.white,
  textAlign: "center",
}
