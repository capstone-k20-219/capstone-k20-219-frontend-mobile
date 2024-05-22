import React, { FC, useEffect, useState } from "react"

// modules
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, ScrollView, ImageStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import {
  Text,
  DropDownList,
  Icon,
  PrimaryButton,
  VerticalSeparator,
  ServiceBox,
  MessageModal,
  ConfirmBookingModal,
} from "app/components"

// hooks
import { useForm, useWatch } from "react-hook-form"
import { useStores } from "app/models"

// themes
import { appStyle, colors, typography } from "app/theme"

// interfaces
import { ServiceBookingInfo } from "app/services/booking/booking.types"

interface ServiceScreenProps extends AppStackScreenProps<"Service"> {}

export const ServiceScreen: FC<ServiceScreenProps> = observer(function ServiceScreen() {
  const rootStore = useStores()
  const [count, setCount] = useState(0)
  const [isServiceNotChosen, setIsServiceNotChosen] = useState(false)
  const [isServiceBooking, setIsServiceBooking] = useState(false)
  const [isServiceBookingSuccess, setIsServiceBookingSuccess] = useState(false)
  const { handleSubmit, control, setValue, getValues } = useForm<ServiceBookingInfo>({
    defaultValues: {
      serviceId: [],
      vehicleId: 0,
    },
  })

  const watchField = useWatch({ control, name: "vehicleId" })

  const handleSubmitOnPress = (data: ServiceBookingInfo) => {
    if (data.serviceId.length === 0) {
      setIsServiceNotChosen(true)
    } else {
      setIsServiceBooking(true)
    }
  }

  useEffect(() => {
    setCount(0)
    setValue("serviceId", [])
  }, [watchField])

  useEffect(() => {
    if (rootStore.postServiceBookingStatus === "done") {
      setIsServiceBookingSuccess(true)
      rootStore.setProp("postServiceBookingStatus", null)
    }
  }, [rootStore.postServiceBookingStatus])

  return (
    <SafeAreaView style={appStyle.rootContainer}>
      <View style={$dropDownContainer}>
        <DropDownList
          control={control}
          controlName="vehicleId"
          setValue={setValue}
          isOutline={true}
          labelTx="chooseYourVehicle"
          labelStyle={$label}
          data={rootStore.myParkingVehicleInfo}
          type="vehicle"
        />
      </View>
      <View style={$headerContainer}>
        <Text style={$label} tx="availableService" />
        {count !== 0 && (
          <View style={$counterContainer}>
            <Text style={$text} text={`${count}`} />
            <Icon style={$icon} icon="list" />
          </View>
        )}
      </View>
      <View style={appStyle.maxHeightHalfScreen}>
        {rootStore.service.length && rootStore.service[0].id && getValues("vehicleId") !== 0 ? (
          <ScrollView contentContainerStyle={$scrollViewContainer}>
            {rootStore.service.map((value, index) => (
              <ServiceBox
                key={`${value.id}-${index}`}
                serviceName={value.name}
                price={value.prices[0].unitPrice}
                setCounter={setCount}
                setValue={setValue}
                getValues={getValues}
                serviceId={value.id}
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={$noServiceText} tx="noAvailableService" />
        )}
      </View>
      {rootStore.service.length && rootStore.service[0].id && getValues("vehicleId") !== 0 ? (
        <View style={$footerContainer}>
          <VerticalSeparator color={colors.palette.neutral400} />
          <PrimaryButton titleTx="book" onPress={handleSubmit(handleSubmitOnPress)} />
        </View>
      ) : null}
      <MessageModal
        titleTx="noServiceChosen"
        contentTx="pleaseSelectService"
        visibility={isServiceNotChosen}
        setVisibility={setIsServiceNotChosen}
        buttonTx="ok"
      />
      <MessageModal
        visibility={isServiceBookingSuccess}
        setVisibility={setIsServiceBookingSuccess}
        titleTx="bookingServiceSuccessTitle"
        contentTx="bookingServiceSuccess"
        buttonTx="ok"
      />
      <ConfirmBookingModal
        actionButtonTitleTx="book"
        cancelButtonTitleTx="cancel"
        bookingData={getValues()}
        visibility={isServiceBooking}
        setVisibility={setIsServiceBooking}
      />
    </SafeAreaView>
  )
})

const $dropDownContainer: ViewStyle = {
  paddingTop: 40,
  paddingHorizontal: 24,
  paddingBottom: 39,
}

const $label: TextStyle = {
  fontFamily: typography.fonts.rubik.bold,
  fontSize: 16,
  color: colors.palette.neutral700,
}

const $headerContainer: ViewStyle = {
  paddingHorizontal: 24,
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 9,
}

const $counterContainer: ViewStyle = {
  flexDirection: "row",
  columnGap: 4,
}

const $scrollViewContainer: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal: 24,
  rowGap: 12,
}

const $text: TextStyle = {
  fontFamily: typography.fonts.rubik.bold,
  fontSize: 18,
  color: colors.palette.primary200,
}

const $icon: ImageStyle = {
  width: 18,
  height: 18,
  tintColor: colors.palette.primary200,
}

const $footerContainer: ViewStyle = {
  paddingHorizontal: 24,
  rowGap: 24,
  paddingTop: 24,
}

const $noServiceText: TextStyle = {
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 18,
  color: colors.black,
  textAlign: "center",
  paddingVertical: 24,
  width: "80%",
  alignSelf: "center",
  opacity: 0.8,
}
