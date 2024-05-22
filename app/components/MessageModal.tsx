import React from "react"

// modules
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import Modal from "react-native-modal"

// components
import { Text } from "app/components/Text"
import { VerticalSeparator } from "app/components/VerticalSeparator"

// themes
import { appStyle, colors, typography } from "app/theme"

// i18n
import { TxKeyPath, translate } from "app/i18n"

// constants
import { sizes } from "app/constants"
import { SecondaryButton } from "./SecondaryButton"

export interface MessageModalProps {
  style?: StyleProp<ViewStyle>
  buttonTx?: TxKeyPath
  visibility?: boolean
  setVisibility?: React.Dispatch<React.SetStateAction<boolean>>
  titleTx?: TxKeyPath
  contentTx?: TxKeyPath
  contentParams?: any
}

/**
 * Describe your component here
 */
export const MessageModal = observer(function MessageModal(props: MessageModalProps) {
  const { style, buttonTx, visibility, setVisibility, titleTx, contentTx, contentParams } = props

  const handleDismissModalOnPress = () => {
    setVisibility(false)
  }

  return (
    <Modal
      style={appStyle.flex1}
      isVisible={visibility}
      onBackButtonPress={handleDismissModalOnPress}
      onBackdropPress={handleDismissModalOnPress}
      backdropTransitionOutTiming={0}
    >
      <View style={[$container, style]}>
        <Text style={$title} tx={titleTx} />
        <VerticalSeparator />
        <Text
          style={$informText}
          text={contentParams ? translate(contentTx, contentParams) : translate(contentTx)}
        />
        <View style={$buttonContainer}>
          <SecondaryButton
            style={$button}
            titleTx={buttonTx}
            titleStyle={$buttonText}
            onPress={handleDismissModalOnPress}
          />
        </View>
      </View>
    </Modal>
  )
})

const $container: ViewStyle = {
  backgroundColor: colors.white,
  paddingTop: 18,
  paddingBottom: 26,
  paddingHorizontal: 21,
  borderRadius: 15,
  justifyContent: "center",
  alignItems: "center",
}

const $title: TextStyle = {
  fontFamily: typography.fonts.rubik.bold,
  fontSize: 16,
  color: colors.black,
  textAlign: "center",
  paddingBottom: 5,
}

const $informText: TextStyle = {
  paddingTop: 10,
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 14,
  color: colors.black,
  textAlign: "center",
  width: sizes.screenWidth * 0.8,
}

const $buttonContainer: ViewStyle = {
  paddingTop: 19,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  columnGap: sizes.screenWidth * 0.05,
}

const $button: ViewStyle = {
  width: sizes.screenWidth * 0.7,
  height: 38,
  borderRadius: 10,
}

const $buttonText: TextStyle = {
  fontSize: 14,
}
