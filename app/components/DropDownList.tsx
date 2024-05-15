import React, { useState, useEffect } from "react"

// modules
import {
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  ImageStyle,
  ScrollView,
} from "react-native"
import { observer } from "mobx-react-lite"
import Modal from "react-native-modal"

// components
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"
import { VerticalSeparator } from "app/components/VerticalSeparator"

// hooks
import { UseFormSetValue, useController } from "react-hook-form"
import { useStores } from "app/models"

// themes
import { appStyle, colors, typography } from "app/theme"

// i18n
import { TxKeyPath, translate } from "app/i18n"

export interface DropDownListProps {
  data?: any[]
  style?: StyleProp<ViewStyle>
  control?: any
  controlName?: string
  activeOpacity?: number
  isOutline?: boolean
  textColor?: string
  labelTx?: TxKeyPath
  labelStyle?: StyleProp<TextStyle>
  placeholder?: string
  placeholderStyle?: StyleProp<TextStyle>
  setValue?: UseFormSetValue<any>
  type?: string
}

export const DropDownList = observer(function DropDownList(props: DropDownListProps) {
  const {
    style,
    control,
    controlName,
    labelTx,
    labelStyle,
    setValue,
    placeholder = "",
    placeholderStyle,
    data,
    activeOpacity = 0.7,
    isOutline = false,
    textColor = colors.text,
    type,
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const [vehicleTypeName, setVehicleTypeName] = useState("")
  const [plateNo, setPlateNo] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const rootStore = useStores()

  const controller =
    control && controlName
      ? useController({
          control,
          name: controlName,
          defaultValue: "",
        })
      : undefined

  const handleOpenModalOnPress = () => {
    setIsOpen(true)
  }

  const handleCloseModalOnPress = () => {
    setIsOpen(false)
  }

  const handleSelectDataOnPress = (data: any) => {
    setIsOpen(false)
    if (type === "bank") setValue(controlName, data)
    else {
      if (control) setValue(controlName, data.id)
      if (type === "vehicle") {
        setPlateNo(data.plateNo)
        setVehicleType(translate(data.type.id.toLocaleLowerCase() as TxKeyPath))
        if (rootStore.myParkingPlateNo.includes(data.plateNo)) rootStore.getServices(data.type.id)
        else {
          rootStore.setProp("service", [])
        }
      }
      if (type === "vehicleType") setVehicleTypeName(data.name)
    }
  }

  useEffect(() => {
    if (data.length === 1) {
      if (type === "bank") setValue(controlName, data)
      if (type === "vehicleType") {
        setVehicleTypeName(data[0].name)
        setValue(controlName, data[0].id)
      }
      if (type === "vehicle") {
        setValue(controlName, data[0].id)
        setPlateNo(data[0].plateNo)
        setVehicleType(translate(data[0].type.id.toLocaleLowerCase() as TxKeyPath))
      }
    }
  }, [])

  return (
    <View>
      {labelTx && <Text style={[$labelText, labelStyle]} tx={labelTx} />}
      <TouchableOpacity
        style={[$container(isOutline), style]}
        activeOpacity={activeOpacity}
        onPress={handleOpenModalOnPress}
      >
        <Text
          style={[$text(textColor), placeholderStyle]}
          text={
            controller.field.value === ""
              ? placeholder
              : type === "vehicleType"
              ? vehicleTypeName
              : type === "vehicle" && plateNo
              ? `${plateNo} - ${vehicleType}`
              : controller.field.value
          }
        />
        <Icon style={$icon} icon="arrowDown" />
      </TouchableOpacity>
      <Modal
        style={appStyle.flex1}
        isVisible={isOpen}
        backdropTransitionOutTiming={0}
        onBackdropPress={handleCloseModalOnPress}
        onBackButtonPress={handleCloseModalOnPress}
      >
        <View>
          <ScrollView contentContainerStyle={$scrollViewContainer}>
            {data.map((value, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={activeOpacity}
                onPress={() => handleSelectDataOnPress(value)}
              >
                {index === data.length - 1 ? (
                  <Text
                    text={
                      value.name
                        ? value.name
                        : value.plateNo
                        ? `${value.plateNo} - ${translate(
                            value.type.id.toLocaleLowerCase() as TxKeyPath,
                          )}`
                        : value
                    }
                  />
                ) : (
                  <View>
                    <Text
                      text={
                        value.name
                          ? value.name
                          : value.plateNo
                          ? `${value.plateNo} - ${translate(
                              value.type.id.toLocaleLowerCase() as TxKeyPath,
                            )}`
                          : value
                      }
                    />
                    <VerticalSeparator style={$separator} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
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
  paddingVertical: 0,
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 14,
  lineHeight: 18,
  textAlignVertical: "center",
  color: textColor,
})

const $icon: ImageStyle = {
  width: 18,
  height: 18,
}

const $separator: ViewStyle = {
  marginVertical: 15,
}

const $scrollViewContainer: ViewStyle = {
  flexGrow: 1,
  backgroundColor: colors.white,
  paddingTop: 18,
  paddingBottom: 26,
  paddingHorizontal: 21,
  borderRadius: 15,
}
