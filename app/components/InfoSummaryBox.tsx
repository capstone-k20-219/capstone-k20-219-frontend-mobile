import React from "react"

// modules
import { StyleProp, TextStyle, View, ViewStyle, TouchableOpacity, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"

// components
import { Text } from "app/components/Text"
import { IconTypes, Icon } from "app/components/Icon"

// themes
import { colors, typography } from "app/theme"

// i18n
import { TxKeyPath } from "app/i18n"

// constants
import { sizes } from "app/constants"

// hooks
import { useStores } from "app/models"

export interface InfoSummaryBoxProps {
  style?: StyleProp<ViewStyle>
  icon?: IconTypes
  titleTx?: TxKeyPath
  title?: string
  labelTx?: TxKeyPath
  label?: string
  leftIconStyle?: StyleProp<ImageStyle>
  rightIconStyle?: StyleProp<ImageStyle>
  titleStyle?: StyleProp<TextStyle>
  labelStyle?: StyleProp<TextStyle>
  activeOpacity?: number
  accountNo?: string
  type?: "vehicle" | "bank"
  id?: number
}

export const InfoSummaryBox = observer(function InfoSummaryBox(props: InfoSummaryBoxProps) {
  const {
    style,
    icon,
    titleTx,
    title,
    labelTx,
    label,
    leftIconStyle,
    rightIconStyle,
    titleStyle,
    labelStyle,
    activeOpacity = 0.7,
    accountNo,
    type,
    id,
  } = props
  const rootStore = useStores()

  const handleDeleteOnPress = () => {
    if (type === "bank") {
      rootStore.deleteBankAccount({ bank: title, accountNo })
    } else {
      rootStore.deleteVehicle(id)
    }
  }

  return (
    <View style={[$container, style]}>
      <Icon style={[$leftIcon, leftIconStyle]} icon={icon} />
      <View style={$textContainer}>
        <Text style={[$title, titleStyle]} tx={titleTx} text={title} />
        <Text style={[$label, labelStyle]} tx={labelTx} text={label} />
      </View>
      <TouchableOpacity activeOpacity={activeOpacity} onPress={handleDeleteOnPress}>
        <Icon style={[$rightIcon, rightIconStyle]} icon="delete" />
      </TouchableOpacity>
    </View>
  )
})

const $container: ViewStyle = {
  padding: 20,
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: colors.palette.neutral300,
  columnGap: 21,
}

const $textContainer: ViewStyle = {
  rowGap: 10,
  width: sizes.screenWidth * 0.39,
}

const $title: TextStyle = {
  fontFamily: typography.fonts.rubik.bold,
  fontSize: 16,
  color: colors.black,
}

const $label: TextStyle = {
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 16,
  color: colors.black,
}

const $leftIcon: ImageStyle = {
  width: 80,
  height: 55,
  tintColor: colors.palette.primary100,
}

const $rightIcon: ImageStyle = {
  width: 24,
  height: 22,
  tintColor: colors.palette.primary100,
}
