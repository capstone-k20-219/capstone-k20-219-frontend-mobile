import React from "react"

// modules
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import Modal from "react-native-modal"

// components
import { Text } from "app/components/Text"
import { VerticalSeparator } from "app/components/VerticalSeparator"
import { Input } from "app/components/Input"
import { SecondaryButton } from "app/components/SecondaryButton"

// hooks
import { useForm } from "react-hook-form"

// themes
import { appStyle, colors, typography } from "app/theme"
import { sizes } from "app/constants"

export interface BookingSlotModalProps {
  style?: StyleProp<ViewStyle>
  visibility?: boolean
  setVisibility?: React.Dispatch<React.SetStateAction<boolean>>
  parkingSlotId?: string
}

interface FormData {
  parkingSlotId?: string
  vehicle?: string
  arrivalTime?: string
  arrivalDate?: string
}

export const BookingSlotModal = observer(function BookingSlotModal(props: BookingSlotModalProps) {
  const { style, visibility, setVisibility, parkingSlotId = "" } = props
  const { handleSubmit } = useForm<FormData>({
    defaultValues: {
      parkingSlotId,
      vehicle: "",
      arrivalDate: "",
      arrivalTime: "",
    },
  })

  const handleDismissBookingModalOnPress = () => {
    setVisibility(false)
  }

  const handleSubmitOnPress = (data: FormData) => {
    console.log(data)
  }

  return (
    <Modal
      style={[$container, style]}
      isVisible={visibility}
      onBackButtonPress={handleDismissBookingModalOnPress}
      onBackdropPress={handleDismissBookingModalOnPress}
      backdropTransitionOutTiming={0}
    >
      <Text style={$title} tx="parkingSlotBooking" />
      <VerticalSeparator />
      <View style={$inputContainer}>
        <Input
          labelTx="parkingSlot"
          isOutLine={true}
          disable={true}
          inputWrapperStyle={$inputWrapperStyle}
          value={parkingSlotId}
        />
      </View>
      <View style={$summaryContainer}>
        <View style={appStyle.justifySpaceBetwwen}>
          <Text style={$summaryText} tx="bookingFee" />
          <Text style={$summaryText} text={"$1.00"} />
        </View>
        <View style={appStyle.justifySpaceBetwwen}>
          <Text style={$summaryText} tx="bookingTime" />
          <Text style={$summaryText} text={"10:30 12/10/2023"} />
        </View>
        <VerticalSeparator />
        <View style={appStyle.justifySpaceBetwwen}>
          <Text style={$summaryText} tx="totalCost" />
          <Text style={$summaryText} text={"$2.00"} />
        </View>
      </View>
      <View style={$buttonContainer}>
        <SecondaryButton
          style={$button}
          titleTx="cancel"
          color={colors.palette.primary100}
          onPress={handleDismissBookingModalOnPress}
        />
        <SecondaryButton
          style={$button}
          titleTx="book"
          onPress={handleSubmit(handleSubmitOnPress)}
        />
      </View>
    </Modal>
  )
})

const $container: ViewStyle = {
  flex: 0,
  backgroundColor: colors.white,
  paddingTop: 18,
  paddingBottom: 26,
  paddingHorizontal: 21,
  borderRadius: 15,
}

const $title: TextStyle = {
  fontFamily: typography.fonts.rubik.bold,
  fontSize: 16,
  color: colors.black,
  textAlign: "center",
  paddingBottom: 5,
}

const $inputContainer: ViewStyle = {
  paddingTop: 17,
  paddingBottom: 36,
}

const $inputWrapperStyle: ViewStyle = {
  backgroundColor: colors.palette.neutral400,
}

const $summaryContainer: ViewStyle = {
  paddingTop: 30,
  paddingBottom: 38,
  paddingHorizontal: 23,
  backgroundColor: colors.palette.neutral400,
  borderRadius: 15,
  rowGap: 10,
}

const $summaryText: TextStyle = {
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 12,
  lineHeight: 16,
  color: colors.black,
}

const $buttonContainer: ViewStyle = {
  paddingTop: 19,
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  columnGap: 9,
}

const $button: ViewStyle = {
  width: sizes.screenWidth * 0.25,
  height: 38,
}
