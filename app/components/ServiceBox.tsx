import React, { useState } from "react"

// modules
import { StyleProp, TextStyle, ViewStyle, TouchableOpacity, View } from "react-native"
import { observer } from "mobx-react-lite"

// components
import { Text } from "app/components/Text"
import { Icon } from "./Icon"

// themes
import { colors, typography } from "app/theme"

// navigation ref
import { navigationRef } from "app/navigators"

// hooks
import { UseFormSetValue, UseFormGetValues } from "react-hook-form"

export interface ServiceBoxProps {
  style?: StyleProp<ViewStyle>
  setCounter?: React.Dispatch<React.SetStateAction<number>>
  serviceName?: string
  textStyle?: StyleProp<TextStyle>
  price?: number
  activeOpacity?: number
  serviceId?: string
  setValue?: UseFormSetValue<any>
  getValues?: UseFormGetValues<any>
}

export const ServiceBox = observer(function ServiceBox(props: ServiceBoxProps) {
  const {
    style,
    setCounter,
    serviceName,
    textStyle,
    price,
    activeOpacity = 0.7,
    serviceId,
    setValue,
    getValues,
  } = props
  const [isSelected, setIsSelected] = useState(false)

  const handleSelectedOnPress = () => {
    const serviceIdList = getValues("serviceId")
    if (!isSelected) {
      setIsSelected(true)
      setCounter((prev) => prev + 1)
      setValue("serviceId", [...serviceIdList, serviceId])
    } else {
      setIsSelected(false)
      setCounter((prev) => prev - 1)
      setValue(
        "serviceId",
        serviceIdList.filter((id: string) => id !== serviceId),
      )
    }
  }

  const handleFeedbackOnPress = () => {
    navigationRef.navigate("Feedback", { id: serviceId, name: serviceName })
  }

  return (
    <TouchableOpacity
      style={[$container(isSelected), style]}
      activeOpacity={activeOpacity}
      onPress={handleSelectedOnPress}
    >
      <View style={$subContainer}>
        <Text style={[$serviceText(isSelected), textStyle]} text={serviceName} />
        <TouchableOpacity activeOpacity={activeOpacity} onPress={handleFeedbackOnPress}>
          <Icon icon="feedback" size={20} />
        </TouchableOpacity>
      </View>
      <Text style={[$priceText(isSelected), textStyle]} text={`$${price}`} />
    </TouchableOpacity>
  )
})

const $container = (isSelected: boolean): ViewStyle => ({
  paddingVertical: 14,
  paddingHorizontal: 16,
  rowGap: 11,
  borderWidth: 1,
  borderColor: colors.palette.neutral300,
  borderRadius: 5,
  backgroundColor: isSelected ? colors.palette.primary200 : colors.white,
})

const $subContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $serviceText = (isSelected: boolean): TextStyle => ({
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 16,
  color: isSelected ? colors.white : colors.black,
})

const $priceText = (isSelected: boolean): TextStyle => ({
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 16,
  color: isSelected ? colors.white : colors.black,
  textAlign: "right",
})
