import React, { useState } from "react"

// modules
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ScrollView,
  DevSettings,
} from "react-native"
import Modal from "react-native-modal"
import { observer } from "mobx-react-lite"

// async storage
import AsyncStorage from "@react-native-async-storage/async-storage"

// components
import { Text } from "app/components/Text"
import { Icon, IconTypes } from "./Icon"
import { VerticalSeparator } from "./VerticalSeparator"
import { Toggle } from "./Toggle"

// themes
import { appStyle, colors, typography } from "app/theme"

// i18n
import { TxKeyPath } from "app/i18n"

type SettingBarProps = {
  style?: StyleProp<ViewStyle>
  activeOpacity?: number
  width?: number | string
  height?: number | string
  icon?: IconTypes
  titleTx?: TxKeyPath
  currentOption?: boolean
  textStyle?: StyleProp<TextStyle>
  textOptionStyle?: StyleProp<TextStyle>
  useModal?: boolean
  initialOption?: TxKeyPath
  initialOptionText?: string
  modalData?: any[]
  toggleBar?: boolean
  iconsize?: number
} & TouchableOpacityProps

export const SettingBar = observer(function SettingBar(props: SettingBarProps) {
  const {
    style,
    width,
    height,
    activeOpacity = 0.7,
    icon,
    currentOption,
    textStyle,
    titleTx,
    textOptionStyle,
    modalData,
    useModal,
    initialOption,
    initialOptionText,
    toggleBar,
    iconsize = 16,
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const [option, setOption] = useState(initialOption)
  const [isToggle, setIsToggle] = useState(false)

  const handleCloseModalOnPress = () => {
    setIsOpen(false)
  }

  const handleOpenModalOnPress = () => {
    setIsOpen(true)
  }

  const handleToggleOnPress = (value: boolean) => {
    setIsToggle(value)
  }

  const handleSelectDataOnPress = async (option: TxKeyPath) => {
    setIsOpen(false)
    if (titleTx === "language") {
      if (option === "en") {
        await AsyncStorage.setItem("language", "en-US")
      } else {
        await AsyncStorage.setItem("language", option)
      }
      DevSettings.reload()
    } else setOption(option)
  }

  return (
    <TouchableOpacity
      style={[$container(width, height), style]}
      activeOpacity={activeOpacity}
      onPress={handleOpenModalOnPress}
    >
      <View style={$titleContainer}>
        <Icon icon={icon} size={iconsize} />
        <Text tx={titleTx} style={[$text, textStyle]} />
      </View>
      {currentOption && (
        <Text tx={option} text={initialOptionText} style={[$optionText, textOptionStyle]} />
      )}
      {toggleBar && (
        <Toggle
          value={isToggle}
          onValueChange={(value) => handleToggleOnPress(value)}
          variant="switch"
        />
      )}
      {useModal && (
        <Modal
          style={appStyle.flex1}
          isVisible={isOpen && useModal}
          backdropTransitionOutTiming={0}
          onBackdropPress={handleCloseModalOnPress}
          onBackButtonPress={handleCloseModalOnPress}
        >
          <View>
            <ScrollView contentContainerStyle={$scrollViewContainer}>
              {modalData.map((value, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={activeOpacity}
                  onPress={() => handleSelectDataOnPress(value)}
                >
                  {index === modalData.length - 1 ? (
                    <Text tx={value} />
                  ) : (
                    <View>
                      <Text tx={value} />
                      <VerticalSeparator style={$separator} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      )}
    </TouchableOpacity>
  )
})

const $container = (width: number | string, height: number | string): ViewStyle => ({
  width,
  height,
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 16,
  paddingHorizontal: 20,
  justifyContent: "space-between",
})

const $text: TextStyle = {
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 16,
  color: colors.black,
  lineHeight: 18,
}

const $titleContainer: ViewStyle = {
  flexDirection: "row",
  columnGap: 7,
}

const $optionText: TextStyle = {
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 16,
  color: colors.black,
  opacity: 0.5,
}

const $scrollViewContainer: ViewStyle = {
  flexGrow: 1,
  backgroundColor: colors.white,
  paddingTop: 18,
  paddingBottom: 26,
  paddingHorizontal: 21,
  borderRadius: 15,
}

const $separator: ViewStyle = {
  marginVertical: 15,
}
