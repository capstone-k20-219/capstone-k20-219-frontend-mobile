import React, { useState } from "react"

// modules
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

// components
import { Text } from "app/components/Text"
import { BookingSlotModal } from "./BookingSlotModal"

// hooks
import { useStores } from "app/models"

// themes
import { colors, typography } from "app/theme"

// interfaces
import { SlotInfo } from "app/services/parkingSlot/parkingSlot.types"

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
  const slotOffset = rootStore.slotOffset

  const handleOpenModalOnPress = () => {
    setIsModalOpen(true)
  }

  return (
    <TouchableOpacity
      style={[$container(slotInfo, slotOffset), style]}
      activeOpacity={interactiveMode ? activeOpacity : 1}
      disabled={!interactiveMode}
      onPress={handleOpenModalOnPress}
    >
      <Text style={$text} text={slotInfo.id} />
      <BookingSlotModal
        visibility={isModalOpen}
        setVisibility={setIsModalOpen}
        parkingSlotId={slotInfo.id}
      />
    </TouchableOpacity>
  )
})

const $container = (slot: SlotInfo, slotOffset: number): ViewStyle => ({
  position: "absolute",
  top: slot.y_start,
  left: (slot.x_start - slotOffset) * 1.5,
  width: (slot.x_end - slot.x_start) * 1.5,
  height: slot.y_end - slot.y_start,
  borderColor: colors.black,
  backgroundColor: colors.white,
  borderWidth: 0.5,
  justifyContent: "center",
})

const $text: TextStyle = {
  fontFamily: typography.fonts.rubik.regular,
  color: colors.black,
  fontSize: 12,
  textAlign: "center",
}
