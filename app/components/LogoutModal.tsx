import React, { useEffect } from "react"

// modules
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import Modal from "react-native-modal"

// navigators
import { navigationRef } from "app/navigators"

// components
import { Text } from "app/components/Text"
import { SecondaryButton } from "app/components/SecondaryButton"
import { VerticalSeparator } from "app/components/VerticalSeparator"

// themes
import { appStyle, colors, typography } from "app/theme"

// i18n
import { TxKeyPath } from "app/i18n"

// constants
import { sizes } from "app/constants"

// hooks
import { useStores } from "app/models"

export interface LogoutModalProps {
  style?: StyleProp<ViewStyle>
  actionButtonTitleTx?: TxKeyPath
  cancelButtonTitleTx?: TxKeyPath
  visibility?: boolean
  setVisibility?: React.Dispatch<React.SetStateAction<boolean>>
}

export const LogoutModal = observer(function LogoutModal(props: LogoutModalProps) {
  const { style, actionButtonTitleTx, cancelButtonTitleTx, visibility, setVisibility } = props
  const rootStore = useStores()

  const handleDismissModalOnPress = () => {
    setVisibility(false)
  }

  const handleLogoutOnPress = () => {
    setVisibility(false)
    rootStore.postLogout()
  }

  useEffect(() => {
    if (!rootStore.isLoggedIn) {
      navigationRef.navigate("Login")
    }
  }, [rootStore.isLoggedIn])

  return (
    <Modal
      style={appStyle.flex1}
      isVisible={visibility}
      onBackButtonPress={handleDismissModalOnPress}
      onBackdropPress={handleDismissModalOnPress}
      backdropTransitionOutTiming={0}
    >
      <View style={[$container, style]}>
        <Text style={$title} tx="logout" />
        <VerticalSeparator />
        <Text style={$informText} tx="logoutConfirmation" />
        <View style={$buttonContainer}>
          <SecondaryButton
            style={$button}
            titleTx={cancelButtonTitleTx}
            color={colors.palette.primary100}
            onPress={handleDismissModalOnPress}
          />
          <SecondaryButton
            style={$button}
            titleTx={actionButtonTitleTx}
            onPress={handleLogoutOnPress}
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
  width: sizes.screenWidth * 0.6,
}

const $buttonContainer: ViewStyle = {
  paddingTop: 19,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  columnGap: sizes.screenWidth * 0.05,
}

const $button: ViewStyle = {
  width: sizes.screenWidth * 0.35,
  height: 38,
}
