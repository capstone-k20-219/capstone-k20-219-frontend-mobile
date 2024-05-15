import React, { useState } from "react"

// modules
import { Alert, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

// components
import { Text } from "app/components/Text"
import { BookingSlotModal } from "./BookingSlotModal"

// hooks
import { useStores } from "app/models"
import { useFocusEffect } from "@react-navigation/native"

// themes
import { colors, typography } from "app/theme"

// interfaces
import { SlotInfo } from "app/services/parkingSlot/parkingSlot.types"

// i18n
import { TxKeyPath, translate } from "app/i18n"

export interface SlotProps {
  style?: StyleProp<ViewStyle>
  slotInfo: SlotInfo
  activeOpacity?: number
  interactiveMode?: boolean
}

export const Slot = observer(function Slot(props: SlotProps) {
  const { style, slotInfo, activeOpacity = 0.7, interactiveMode = false } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const rootStore = useStores()
  const [suitableVehicle, setSuitableVehicle] = useState([])
  const slotOffset = rootStore.slotOffset

  const handleOpenModalOnPress = () => {
    if (suitableVehicle.length) {
      setIsModalOpen(true)
    } else {
      Alert.alert(
        translate("noSuitableVehicleTitle"),
        translate("noSuitableVehicle", {
          vehicleType: translate(
            slotInfo.typeId.toLocaleLowerCase() as TxKeyPath,
          ).toLocaleLowerCase(),
        }),
        [{ text: "OK" }],
        { cancelable: false },
      )
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      if (rootStore.postVehicleStatus === "done" || rootStore.deleteVehicleStatus === "done") {
        rootStore.getSuitableBookingVehicle(slotInfo.id).then((res) => {
          setSuitableVehicle(res)
        })
      }
    }, [rootStore.postVehicleStatus, rootStore.deleteVehicleStatus]),
  )

  return (
    <TouchableOpacity
      style={[$container(slotInfo, slotOffset, rootStore.myParkingSlotId, interactiveMode), style]}
      activeOpacity={interactiveMode ? activeOpacity : 1}
      disabled={!interactiveMode || slotInfo.isBusy}
      onPress={handleOpenModalOnPress}
    >
      <Text
        style={$text(slotInfo, rootStore.myParkingSlotId, interactiveMode)}
        text={slotInfo.id}
      />
      <BookingSlotModal
        visibility={isModalOpen}
        setVisibility={setIsModalOpen}
        parkingSlotId={slotInfo.id}
        vehicleData={suitableVehicle}
      />
    </TouchableOpacity>
  )
})

const $container = (
  slot: SlotInfo,
  slotOffset: number,
  slotIdList: string[],
  interactiveMode: boolean,
): ViewStyle => ({
  position: "absolute",
  top: slot.y_start,
  left: (slot.x_start - slotOffset) * 1.5,
  width: (slot.x_end - slot.x_start) * 1.5,
  height: slot.y_end - slot.y_start,
  borderColor: colors.black,
  backgroundColor:
    slot.isBusy && interactiveMode
      ? colors.slotBorder
      : slot.isBusy && !interactiveMode && slotIdList.includes(slot.id)
      ? colors.palette.primary100
      : colors.white,
  borderWidth: 0.5,
  justifyContent: "center",
})

const $text = (slot: SlotInfo, slotIdList: string[], interactiveMode: boolean): TextStyle => ({
  fontFamily: typography.fonts.rubik.regular,
  color:
    slot.isBusy && interactiveMode
      ? colors.black
      : slot.isBusy && !interactiveMode && slotIdList.includes(slot.id)
      ? colors.white
      : colors.black,
  fontSize: 12,
  textAlign: "center",
})
