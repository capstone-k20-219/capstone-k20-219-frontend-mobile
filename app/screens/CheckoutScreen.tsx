import React, { FC, useEffect, useState } from "react"

// modules
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, ImageStyle, TouchableOpacity, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"
import QRCode from "react-native-qrcode-svg"
import Modal from "react-native-modal"

// components
import { Text, Icon, VerticalSeparator } from "app/components"

// hooks
import { useStores } from "app/models"

// themes
import { appStyle, typography, colors } from "app/theme"

// constants
import { sizes } from "app/constants"

interface CheckoutScreenProps extends AppStackScreenProps<"Checkout"> {}

export const CheckoutScreen: FC<CheckoutScreenProps> = observer(function CheckoutScreen() {
  const rootStore = useStores()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPlateNo, setSelectedPlateNo] = useState("")
  const [ticketId, setTicketId] = useState("")

  const handleOpenModalOnPress = () => {
    setIsOpen(true)
  }

  const handleCloseModalOnPress = () => {
    setIsOpen(false)
  }

  const handleSelectDataOnPress = (value: any) => {
    setIsOpen(false)
    setSelectedPlateNo(value.plateNo)
    setTicketId(value.id)
  }

  useEffect(() => {
    if (rootStore.myParkingVehicle.length === 1) {
      setSelectedPlateNo(rootStore.myParkingVehicle[0].plateNo)
      setTicketId(rootStore.myParkingVehicle[0].id)
    }
  }, [])

  return (
    <SafeAreaView style={appStyle.rootContainer}>
      {!rootStore.myParkingVehicle.length ? (
        <View style={[$container, appStyle.flex1]}>
          <View>
            <Icon style={$icon} icon="noVehicle" />
            <Text style={$text} tx="noVehicleInParkingLot" />
          </View>
        </View>
      ) : (
        <View style={[$container, appStyle.flex1]}>
          <TouchableOpacity
            style={$dropdownContainer}
            activeOpacity={0.7}
            onPress={handleOpenModalOnPress}
          >
            <Text style={$dropDownText} text={selectedPlateNo} />
            <Icon icon="arrowDown" size={18} />
          </TouchableOpacity>
          {ticketId && (
            <View style={$qrcodeContainer}>
              <QRCode value={ticketId} size={sizes.screenWidth * 0.65} />
              <Text style={$scanQrText} tx="scanQRCode" />
            </View>
          )}
          <Modal
            style={appStyle.flex1}
            isVisible={isOpen}
            backdropTransitionOutTiming={0}
            onBackdropPress={handleCloseModalOnPress}
            onBackButtonPress={handleCloseModalOnPress}
          >
            <View>
              <ScrollView contentContainerStyle={$scrollViewContainer}>
                {rootStore.myParkingVehicle.map((value, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                    onPress={() => handleSelectDataOnPress(value)}
                  >
                    {index === rootStore.myParkingVehicle.length - 1 ? (
                      <Text text={value.plateNo} />
                    ) : (
                      <View>
                        <Text text={value.plateNo} />
                        <VerticalSeparator style={$separator} />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Modal>
        </View>
      )}
    </SafeAreaView>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const $icon: ImageStyle = {
  width: sizes.screenWidth * 0.4,
  height: sizes.screenHeight * 0.2,
  alignSelf: "center",
}

const $text: TextStyle = {
  paddingTop: 32,
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 24,
  width: sizes.screenWidth * 0.8,
  textAlign: "center",
  lineHeight: 32,
  color: colors.palette.neutral300,
}

const $qrcodeContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginTop: 110,
}

const $scanQrText: TextStyle = {
  marginTop: 24,
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 24,
  width: sizes.screenWidth * 0.65,
  textAlign: "center",
}

const $dropdownContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderBottomWidth: 1,
  borderRadius: 5,
  borderColor: colors.border,
  paddingHorizontal: 10,
  paddingVertical: 5,
  height: 40,
  marginHorizontal: 35,
  marginTop: -80,
}

const $dropDownText: TextStyle = {
  flex: 1,
  paddingVertical: 0,
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 14,
  lineHeight: 18,
  textAlignVertical: "center",
  color: colors.black,
}

const $separator: ViewStyle = {
  marginVertical: 15,
}

const $scrollViewContainer: ViewStyle = {
  flexGrow: 1,
  backgroundColor: colors.white,
  paddingTop: 18,
  paddingBottom: 26,
  paddingHorizontal: 21,
  borderRadius: 15,
}
