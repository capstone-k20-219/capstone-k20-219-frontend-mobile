import React, { FC, useRef } from "react"

// modules
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, KeyboardAvoidingView, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import { RegisterProgessBar, BackButton, PrimaryHeader, Input, PrimaryButton } from "app/components"

// hooks
import { useForm } from "react-hook-form"
import { useStores } from "app/models"

// themes
import { appStyle } from "app/theme"

// constants
import { sizes } from "app/constants"

interface RegisterBankAccountScreenProps extends AppStackScreenProps<"RegisterBankAccount"> {}

interface FormData {
  bankName?: string
  cardNumber?: string
}

export const RegisterBankAccountScreen: FC<RegisterBankAccountScreenProps> = observer(
  function RegisterBankAccountScreen(props) {
    const inputRef = useRef(null)
    const rootStore = useStores()
    const { handleSubmit, control } = useForm<FormData>({
      defaultValues: {
        bankName: "",
        cardNumber: "",
      },
    })

    const handleSubmitOnPress = (data: FormData) => {
      console.log(data)
      rootStore.postRegister()
      props.navigation.navigate("RegisterSuccess")
    }

    const handleSkipOnPress = () => {
      rootStore.postRegister()
      props.navigation.navigate("RegisterSuccess")
    }

    const handleFocusNextInputOnPress = () => {
      inputRef.current?.focus()
    }

    return (
      <SafeAreaView style={appStyle.rootContainer}>
        <KeyboardAvoidingView style={appStyle.flex1} behavior="padding">
          <View style={$container}>
            <BackButton />
            <RegisterProgessBar lineWidth={sizes.screenWidth * 0.205} level={2} />
          </View>
          <PrimaryHeader style={$title} tx="bankAccountRegister" />
          <ScrollView contentContainerStyle={$scrollViewContainer}>
            <Input
              control={control}
              controlName="bankName"
              placeHolderTx="bankName"
              onSubmitEditing={handleFocusNextInputOnPress}
              blurOnSubmit={false}
              returnKeyType="next"
            />
            <Input
              ref={inputRef}
              control={control}
              controlName="cardNumber"
              placeHolderTx="cardNumber"
              returnKeyType="done"
            />
            <PrimaryButton
              style={appStyle.marginTop16}
              titleTx="done"
              activeOpacity={0.7}
              onPress={handleSubmit(handleSubmitOnPress)}
            />
            <PrimaryButton titleTx="skipForNow" activeOpacity={0.7} onPress={handleSkipOnPress} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  },
)

const $container: ViewStyle = {
  paddingVertical: 31,
  paddingHorizontal: 16,
  rowGap: 17,
}

const $title: TextStyle = {
  textAlign: "center",
}

const $scrollViewContainer: ViewStyle = {
  flexGrow: 1,
  paddingTop: 32,
  paddingHorizontal: 25,
  rowGap: 25,
}
