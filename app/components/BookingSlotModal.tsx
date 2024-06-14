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
import { useStores } from "app/models"
import { useStripe } from "@stripe/stripe-react-native"

// themes
import { appStyle, colors, typography } from "app/theme"
import { sizes } from "app/constants"

// date-fns
import { format } from "date-fns"

// i18n
import { translate } from "app/i18n"

export interface BookingSlotModalProps {
  style?: StyleProp<ViewStyle>
  visibility?: boolean
  setVisibility?: React.Dispatch<React.SetStateAction<boolean>>
  parkingSlotId?: string
  vehicleData?: any[]
  extraFailPopup?: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormData {
  parkingSlotId?: string
  vehicleId?: number
  arrivalTime?: string
  arrivalDate?: string
}

export const BookingSlotModal = observer(function BookingSlotModal(props: BookingSlotModalProps) {
  const {
    style,
    visibility,
    setVisibility,
    parkingSlotId = "",
    vehicleData,
    extraFailPopup,
  } = props
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const rootStore = useStores()
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const { handleSubmit, control, setValue, getValues, reset } = useForm<FormData>({
    defaultValues: {
      parkingSlotId,
      vehicleId: 0,
      arrivalDate: "",
      arrivalTime: "",
    },
  })

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Pakislot",
      customerId: rootStore.billInfo.customerId,
      customerEphemeralKeySecret: rootStore.billInfo.ephemeralKey,
      paymentIntentClientSecret: rootStore.billInfo.paymentIntent,
      defaultBillingDetails: {
        email: rootStore.userInfo.email,
        address: { country: "VN" },
      },
    })
    if (!error) {
      const { error } = await presentPaymentSheet()
      if (error) {
        extraFailPopup(true)
      } else {
        const arrivalTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          time.getHours(),
          time.getMinutes(),
        )
        rootStore.postSlotBooking({
          slotId: getValues("parkingSlotId"),
          vehicleId: getValues("vehicleId"),
          arrivalTime,
        })
        reset()
        setDate(new Date())
        setTime(new Date())
      }
    }
  }

  const handleDismissBookingModalOnPress = () => {
    setVisibility(false)
    reset()
    setDate(new Date())
    setTime(new Date())
  }

  const handleSubmitOnPress = () => {
    setVisibility(false)
    rootStore.postBillInfo({ amount: rootStore.getParkingSlotFee(parkingSlotId).slotBookingFee })
    initializePaymentSheet()
  }

  const checkTimeInterval = (time: Date, date: Date) => {
    const currentTime = new Date().getTime()
    const arrivalTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
    ).getTime()
    const timeGap = (arrivalTime - currentTime) / 1000
    if (timeGap > 86400 || timeGap <= 1800) {
      return false
    }
    return true
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
            controlName="vehicleId"
            isOutline={true}
            labelTx="vehicle"
            setValue={setValue}
            data={vehicleData}
            type="vehicle"
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
            {!checkTimeInterval(time, date) ? (
              <View>
                <Text
                  style={$warningText}
                  text={translate("invalidTimePeriod", {
                    fromTime: format(
                      new Date().setMinutes(new Date().getMinutes() + 30),
                      "HH:mm dd/MM/yyyy",
                    ),
                    toTime: format(
                      new Date().setHours(new Date().getHours() + 24),
                      "HH:mm dd/MM/yyyy",
                    ),
                  })}
                />
              </View>
            ) : (
              <>
                <View style={appStyle.justifySpaceBetwwen}>
                  <Text style={$summaryText} tx="bookingFee" />
                  <Text
                    style={$summaryText}
                    text={`$${rootStore.getParkingSlotFee(parkingSlotId).slotBookingFee}`}
                  />
                </View>
                <View style={appStyle.justifySpaceBetwwen}>
                  <Text style={$summaryText} tx="parkingFeePerHour" />
                  <Text
                    style={$summaryText}
                    text={`$${rootStore.getParkingSlotFee(parkingSlotId).parkingFee}`}
                  />
                </View>
                <View style={appStyle.justifySpaceBetwwen}>
                  <Text style={$summaryText} tx="bookingTime" />
                  <Text
                    style={$summaryText}
                    text={`${getValues("arrivalTime")} ${getValues("arrivalDate")}`}
                  />
                </View>
                <View style={appStyle.justifySpaceBetwwen}>
                  <Text style={$summaryText} tx="bookingExpiredAt" />
                  <Text
                    style={$summaryText}
                    text={`${format(
                      new Date(time).setMinutes(time.getMinutes() + 30),
                      "HH:mm",
                    )} ${getValues("arrivalDate")}`}
                  />
                </View>
              </>
            )}
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
            disabled={!checkTimeInterval(time, date)}
            color={
              !checkTimeInterval(time, date) ? colors.palette.neutral400 : colors.palette.primary200
            }
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
  fontSize: 14,
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

const $warningText: TextStyle = {
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 14,
  lineHeight: 16,
  color: "red",
  textAlign: "center",
  alignSelf: "center",
  width: "100%",
}

// const $buttonCancel: ViewStyle = {
//   width: sizes.screenWidth * 0.25,
//   height: 38,
//   borderColor: colors.palette.primary200,
//   borderWidth: 1,
// }

// const $cancelText: TextStyle = {
//   color: colors.palette.primary200,
// }
