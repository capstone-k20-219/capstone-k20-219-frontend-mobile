import React, { FC, useState } from "react"

// modules
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import {
  Text,
  InfoSummaryBox,
  BackButton,
  AddButton,
  IconTypes,
  AddVehicleModal,
} from "app/components"

// themes
import { appStyle, colors, typography } from "app/theme"

// i18n
import { TxKeyPath } from "app/i18n"

// hooks
import { useStores } from "app/models"

interface VehicleManagerScreenProps extends AppStackScreenProps<"VehicleManager"> {}

export const VehicleManagerScreen: FC<VehicleManagerScreenProps> = observer(
  function VehicleManagerScreen() {
    const [isOpen, setIsOpen] = useState(false)
    const rootStore = useStores()

    const handleOpenModalOnPress = () => {
      setIsOpen(true)
    }

    return (
      <SafeAreaView style={appStyle.rootContainer}>
        <View style={$headerContainer}>
          <BackButton />
          <Text style={$title} tx="vehicleList" />
          <AddButton onPress={handleOpenModalOnPress} />
        </View>
        <ScrollView contentContainerStyle={$container}>
          {rootStore.vehicle.map((value, index) => (
            <InfoSummaryBox
              key={index}
              icon={value.type.id.toLocaleLowerCase() as IconTypes}
              title={value.plateNo}
              labelTx={value.type.id.toLocaleLowerCase() as TxKeyPath}
              type="vehicle"
              id={value.id}
            />
          ))}
        </ScrollView>
        <AddVehicleModal
          visibility={isOpen}
          setVisibility={setIsOpen}
          cancelButtonTitleTx="cancel"
          actionButtonTitleTx="confirm"
        />
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
