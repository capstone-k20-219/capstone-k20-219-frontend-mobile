import React from "react"

// modules
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

// components
import { Text } from "app/components/Text"
import { CountdownCircleTimer } from "react-native-countdown-circle-timer"
import { SafeAreaView } from "react-native-safe-area-context"

// hooks
import { useStores } from "app/models"

// themes
import { appStyle, colors, typography } from "app/theme"

// constants
import { sizes } from "app/constants"

// date-fns
import { format } from "date-fns"

export interface CountDownTimerProps {
  style?: StyleProp<ViewStyle>
  setIsBooked?: React.Dispatch<React.SetStateAction<boolean>>
}

export const CountDownTimer = observer(function CountDownTimer(props: CountDownTimerProps) {
  const { style, setIsBooked } = props
  const rootStore = useStores()

  const handleCompleteCountdown = () => {
    rootStore.setProp("slotBooking", {})
    setIsBooked(false)
  }

  return (
    <SafeAreaView style={[appStyle.rootContainer, style]}>
      {rootStore.slotBooking?.id && (
        <View style={$outerContainer}>
          <CountdownCircleTimer
            isPlaying
            duration={
              (rootStore.slotBooking.arrivalTime.getTime() -
                rootStore.slotBooking.createdAt.getTime()) /
              1000
            }
            initialRemainingTime={
              (rootStore.slotBooking.arrivalTime.getTime() - new Date().getTime()) / 1000
            }
            colors={colors.palette.primary100}
            size={sizes.screenWidth * 0.7}
            strokeWidth={13}
            rotation="counterclockwise"
            onComplete={handleCompleteCountdown}
          >
            {({ remainingTime }) => {
              const hours = Math.floor(remainingTime / 3600)
              const minutes = Math.floor((remainingTime % 3600) / 60)
              const seconds = remainingTime % 60
              return (
                <View style={$container}>
                  <Text
                    style={$number}
                    text={format(new Date(0, 0, 0, hours, minutes, seconds), "HH:mm:ss")}
                  />
                  <Text style={$text} tx="untilYourBookingExpire" />
                </View>
              )
            }}
          </CountdownCircleTimer>
          <View style={$summaryBox}>
            <Text style={$title} tx="parkingDetail" />
            <View style={appStyle.justifySpaceBetwwen}>
              <Text style={$summaryTextTitle} tx="parkingSlotID" />
              <Text
                style={[$summaryTextTitle, $summaryTextContent]}
                text={rootStore.slotBooking.slotId}
              />
            </View>
            <View style={appStyle.justifySpaceBetwwen}>
              <Text style={$summaryTextTitle} tx="plateNumber" />
              <Text
                style={[$summaryTextTitle, $summaryTextContent]}
                text={rootStore.myBookingPlateNo}
              />
            </View>
            <View style={appStyle.justifySpaceBetwwen}>
              <Text style={$summaryTextTitle} tx="bookingTime" />
              <Text
                style={[$summaryTextTitle, $summaryTextContent]}
                text={format(
                  new Date(rootStore.slotBooking.arrivalTime).setMinutes(
                    new Date(rootStore.slotBooking.arrivalTime).getMinutes() - 30,
                  ),
                  "HH:mm dd/MM/yyyy",
                )}
              />
            </View>
            <View style={appStyle.justifySpaceBetwwen}>
              <Text style={$summaryTextTitle} tx="bookingExpiredAt" />
              <Text
                style={[$summaryTextTitle, $summaryTextContent]}
                text={format(rootStore.slotBooking.arrivalTime, "HH:mm dd/MM/yyyy")}
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
})

const $outerContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  rowGap: 65,
}

const $container: ViewStyle = {
  flexDirection: "column",
  alignItems: "center",
  paddingTop: 25,
}

const $number: TextStyle = {
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 38,
  color: colors.black,
  lineHeight: 38,
}

const $text: TextStyle = {
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 14,
  color: colors.black,
  marginTop: 8,
}

const $title: TextStyle = {
  fontFamily: typography.fonts.rubik.bold,
  fontSize: 18,
  color: colors.black,
  paddingBottom: 5,
}

const $summaryBox: ViewStyle = {
  flexDirection: "column",
  justifyContent: "center",
  paddingHorizontal: 20,
  paddingVertical: 25,
  borderWidth: 1,
  borderColor: colors.black,
  borderRadius: 10,
  width: sizes.screenWidth * 0.89,
  rowGap: 25,
}

const $summaryTextTitle: TextStyle = {
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 15,
  lineHeight: 16,
  color: colors.black,
  width: sizes.screenWidth * 0.4,
}

const $summaryTextContent: TextStyle = {
  textAlign: "right",
}
