import React, { FC, useState } from "react"

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
} from "app/components"

// hooks
import { useForm } from "react-hook-form"

// themes
import { appStyle, colors, typography } from "app/theme"

interface ServiceScreenProps extends AppStackScreenProps<"Service"> {}

interface FormData {
  vehicleId?: string
}

interface VehicleData {
  name?: string
  price?: string
}
export const ServiceScreen: FC<ServiceScreenProps> = observer(function ServiceScreen() {
  const data: string[] = ["HP234-34.456"]

  const vehicleData: VehicleData[] = [
    { name: "Vehicle washing", price: "$20.00" },
    { name: "Vehicle washing", price: "$20.00" },
    { name: "Vehicle washing", price: "$20.00" },
    { name: "Vehicle washing", price: "$20.00" },
  ]

  const [count, setCount] = useState(0)
  const { handleSubmit, control, setValue } = useForm<FormData>({
    defaultValues: {
      vehicleId: "",
    },
  })

  const handleSubmitOnPress = (data: FormData) => {
    console.log(data)
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
          data={data}
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
        <ScrollView contentContainerStyle={$scrollViewContainer}>
          {vehicleData.map((value, index) => (
            <ServiceBox
              key={index}
              serviceName={value.name}
              price={value.price}
              setCounter={setCount}
            />
          ))}
        </ScrollView>
      </View>
      <View style={$footerContainer}>
        <VerticalSeparator color={colors.palette.neutral400} />
        <PrimaryButton titleTx="book" onPress={handleSubmit(handleSubmitOnPress)} />
      </View>
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
