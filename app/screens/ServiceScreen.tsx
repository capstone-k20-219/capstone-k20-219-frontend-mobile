import React, { FC, useState } from "react"

// modules
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, ScrollView, ImageStyle, Alert } from "react-native"
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
} from "app/components"

// hooks
import { useForm } from "react-hook-form"
import { useStores } from "app/models"

// themes
import { appStyle, colors, typography } from "app/theme"

// interfaces
import { ServiceBookingInfo } from "app/services/booking/booking.types"

interface ServiceScreenProps extends AppStackScreenProps<"Service"> {}

export const ServiceScreen: FC<ServiceScreenProps> = observer(function ServiceScreen() {
  const rootStore = useStores()
  const [count, setCount] = useState(0)
  const { handleSubmit, control, setValue, getValues } = useForm<ServiceBookingInfo>({
    defaultValues: {
      serviceId: [],
      ticketId: rootStore.parkingTicket[0].id,
      vehicleId: 0,
    },
  })

  const handleSubmitOnPress = (data: ServiceBookingInfo) => {
    console.log(JSON.stringify(rootStore.parkingTicket[0]))
    if (data.serviceId.length === 0) {
      Alert.alert("Error", "Please select at least one service")
    } else {
      data.serviceId.forEach((serviceId) => {
        rootStore.postServiceBooking({
          ticketId: data.ticketId,
          serviceId,
        })
      })
      Alert.alert("Success", "Your services has been booked successfully")
    }
  }

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
          data={rootStore.vehicle}
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
        {rootStore.service.length && rootStore.service[0].id ? (
          <ScrollView contentContainerStyle={$scrollViewContainer}>
            {rootStore.service.map((value, index) => (
              <ServiceBox
                key={index}
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
      {rootStore.service.length && rootStore.service[0].id ? (
        <View style={$footerContainer}>
          <VerticalSeparator color={colors.palette.neutral400} />
          <PrimaryButton titleTx="book" onPress={handleSubmit(handleSubmitOnPress)} />
        </View>
      ) : null}
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
}
