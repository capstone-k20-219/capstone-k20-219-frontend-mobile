import React, { useState } from "react"

// modules
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  ImageStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import DatePicker from "react-native-date-picker"

// components
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"

// hooks
import { useController, UseFormSetValue } from "react-hook-form"

// themes
import { colors, typography } from "app/theme"

// i18n
import { TxKeyPath } from "app/i18n"

// date-fns
import { format } from "date-fns"

type PickerProps = {
  style?: StyleProp<ViewStyle>
  control?: any
  controlName?: string
  activeOpacity?: number
  isOutline?: boolean
  textColor?: string
  labelTx?: TxKeyPath
  labelStyle?: StyleProp<TextStyle>
  setValue?: UseFormSetValue<any>
  state?: Date
  setState?: React.Dispatch<React.SetStateAction<Date>>
  type?: "date" | "time"
  placeholder?: string
  placeholderStyle?: StyleProp<TextStyle>
} & TouchableOpacityProps

export const Picker = observer(function Picker(props: PickerProps) {
  const {
    style,
    control,
    controlName,
    labelTx,
    labelStyle,
    setValue,
    type,
    state,
    setState,
    activeOpacity = 0.7,
    isOutline = false,
    textColor = colors.text,
    placeholder = "",
    placeholderStyle,
    ...TouchableOpacityProps
  } = props
  const [isOpen, setIsOpen] = useState(false)

  const controller =
    control && controlName
      ? useController({
          control,
          name: controlName,
          defaultValue: "",
        })
      : undefined

  const handleOpenPickerOnPress = () => {
    setIsOpen(true)
  }

  const handleSelectDateOnPress = (date: Date) => {
    setIsOpen(false)
    type === "date"
      ? setValue(controlName, format(date, "dd/MM/yyyy"))
      : setValue(controlName, format(date, "HH:mm"))
    setState(date)
  }

  const handleCancelSelectDateOnPress = () => {
    setIsOpen(false)
  }

  return (
    <View>
      {labelTx && <Text style={[$labelText, labelStyle]} tx={labelTx} />}
      <TouchableOpacity
        style={[$container(isOutline), style]}
        activeOpacity={activeOpacity}
        onPress={handleOpenPickerOnPress}
        {...TouchableOpacityProps}
      >
        <Text
          style={[$text(textColor), placeholderStyle]}
          text={controller.field.value === "" ? placeholder : controller.field.value}
        />
        <Icon style={$icon} icon={type === "date" ? "calendar" : "clock"} />
      </TouchableOpacity>
      <DatePicker
        modal={true}
        open={isOpen}
        date={state}
        mode={type}
        onConfirm={handleSelectDateOnPress}
        onCancel={handleCancelSelectDateOnPress}
      />
    </View>
  )
})

const $labelText: TextStyle = {
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 14,
}

const $container = (isOutLine: boolean): ViewStyle => ({
  flexDirection: "row",
  alignItems: "center",
  borderWidth: isOutLine ? 1 : 0,
  borderBottomWidth: 1,
  borderRadius: isOutLine ? 5 : 0,
  borderColor: colors.border,
  paddingVertical: 5,
  paddingHorizontal: 10,
  height: 40,
})

const $text = (textColor: string): TextStyle => ({
  flex: 1,
  height: "100%",
  paddingVertical: 0,
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 14,
  textAlignVertical: "center",
  color: textColor,
})

const $icon: ImageStyle = {
  width: 18,
  height: 18,
}
