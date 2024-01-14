import React, { FC } from "react"

// modules
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, ScrollView, ImageStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import { Text, InfoSummaryBox, BackButton, AddButton, IconTypes } from "app/components"

// themes
import { appStyle, colors, typography } from "app/theme"

interface BankAccountManagerScreenProps extends AppStackScreenProps<"BankAccountManager"> {}

interface BankAccountData {
  icon?: IconTypes
  bank?: string
  accountNumber?: string
}

export const BankAccountManagerScreen: FC<BankAccountManagerScreenProps> = observer(
  function BankAccountManagerScreen() {
    const data: BankAccountData[] = [
      { icon: "ocb", bank: "OCB", accountNumber: "12312345678901897" },
      { icon: "vcb", bank: "VietcomBank", accountNumber: "12312345678901897" },
    ]

    const encryptAccountNumber = (accountNumber: string): string => {
      return (
        accountNumber.slice(0, 3) +
        "*".repeat(accountNumber.length - 6) +
        accountNumber.slice(accountNumber.length - 3)
      )
    }

    return (
      <SafeAreaView style={appStyle.rootContainer}>
        <View style={$headerContainer}>
          <BackButton />
          <Text style={$title} tx="bankAccount" />
          <AddButton />
        </View>
        <ScrollView contentContainerStyle={$container}>
          {data.map((value, index) => (
            <InfoSummaryBox
              key={index}
              icon={value.icon}
              leftIconStyle={$icon}
              title={value.bank}
              label={encryptAccountNumber(value.accountNumber)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    )
  },
)

const $headerContainer: ViewStyle = {
  paddingTop: 35,
  paddingBottom: 25,
  paddingHorizontal: 16,
  backgroundColor: colors.palette.primary100,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $title: TextStyle = {
  fontFamily: typography.fonts.rubik.bold,
  fontSize: 32,
  lineHeight: 36,
  color: colors.white,
  textAlign: "center",
}

const $container: ViewStyle = {
  flexGrow: 1,
  paddingVertical: 33,
  paddingHorizontal: 24,
  rowGap: 24,
}

const $icon: ImageStyle = {
  width: 58,
  height: 60,
  tintColor: null,
}
