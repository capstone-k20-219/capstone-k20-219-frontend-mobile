import React, { useState } from "react"

// modules
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import Modal from "react-native-modal"

// components
import { Text } from "app/components/Text"
import { VerticalSeparator } from "app/components/VerticalSeparator"
import { Input } from "app/components/Input"
import { SecondaryButton } from "app/components/SecondaryButton"
import { Picker } from "app/components/Picker"
import { DropDownList } from "app/components/DropDownList"

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
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const { handleSubmit, control, setValue, getValues, reset } = useForm<FormData>({
    defaultValues: {
      parkingSlotId,
      vehicle: "",
      arrivalDate: "",
      arrivalTime: "",
    },
  })

  const data: string[] = ["PH345-5634", "PH345-5634", "PH345-5634", "PH345-5634"]

  const handleDismissBookingModalOnPress = () => {
    setVisibility(false)
  }

  const handleSubmitOnPress = (data: FormData) => {
    setVisibility(false)
    console.log(data)
    reset()
  }

  return (
    <Modal
      style={appStyle.flex1}
      isVisible={visibility}
      onBackButtonPress={handleDismissBookingModalOnPress}
      onBackdropPress={handleDismissBookingModalOnPress}
      backdropTransitionOutTiming={0}
    >
      <View style={[$container, style]}>
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
          <DropDownList
            control={control}
            controlName="vehicle"
            isOutline={true}
            labelTx="vehicle"
            setValue={setValue}
            data={data}
          />
          <Picker
            control={control}
            controlName="arrivalDate"
            labelTx="arrivalDate"
            type="date"
            isOutline={true}
            setValue={setValue}
            state={date}
            setState={setDate}
          />
          <Picker
            control={control}
            controlName="arrivalTime"
            labelTx="arrivalTime"
            type="time"
            isOutline={true}
            setValue={setValue}
            state={time}
            setState={setTime}
          />
        </View>
        {getValues("arrivalTime") !== "" && getValues("arrivalDate") !== "" && (
          <View style={$summaryContainer}>
            <View style={appStyle.justifySpaceBetwwen}>
              <Text style={$summaryText} tx="bookingFee" />
              <Text style={$summaryText} text={"$1.00"} />
            </View>
            <View style={appStyle.justifySpaceBetwwen}>
              <Text style={$summaryText} tx="bookingTime" />
              <Text
                style={$summaryText}
                text={`${getValues("arrivalTime")} ${getValues("arrivalDate")}`}
              />
            </View>
            <VerticalSeparator />
            <View style={appStyle.justifySpaceBetwwen}>
              <Text style={$summaryText} tx="totalCost" />
              <Text style={$summaryText} text={"$2.00"} />
            </View>
          </View>
        )}
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
  rowGap: 16,
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
