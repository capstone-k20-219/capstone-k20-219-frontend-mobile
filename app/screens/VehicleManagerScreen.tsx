import React, { FC } from "react"

// modules
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import { Text, InfoSummaryBox, BackButton, AddButton, IconTypes } from "app/components"

// themes
import { appStyle, colors, typography } from "app/theme"
import { TxKeyPath } from "app/i18n"

interface VehicleManagerScreenProps extends AppStackScreenProps<"VehicleManager"> {}

interface VehicleData {
  icon?: IconTypes
  plateNumber?: string
  type?: TxKeyPath
}

export const VehicleManagerScreen: FC<VehicleManagerScreenProps> = observer(
  function VehicleManagerScreen() {
    const data: VehicleData[] = [
      { icon: "car", plateNumber: "HP234-34.653", type: "car" },
      { icon: "motorbike", plateNumber: "HP234-34.653", type: "motorbike" },
      { icon: "truck", plateNumber: "HP234-34.653", type: "truck" },
    ]

    return (
      <SafeAreaView style={appStyle.rootContainer}>
        <View style={$headerContainer}>
          <BackButton />
          <Text style={$title} tx="vehicleList" />
          <AddButton />
        </View>
        <ScrollView contentContainerStyle={$container}>
          {data.map((value, index) => (
            <InfoSummaryBox
              key={index}
              icon={value.icon}
              title={value.plateNumber}
              labelTx={value.type}
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
