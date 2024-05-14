import React, { FC, useState, useRef } from "react"

// modules
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, KeyboardAvoidingView, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import {
  RegisterProgessBar,
  BackButton,
  PrimaryHeader,
  Picker,
  Input,
  PrimaryButton,
} from "app/components"

// hooks
import { useForm } from "react-hook-form"
import { useStores } from "app/models"

// themes
import { appStyle } from "app/theme"

// constants
import { sizes } from "app/constants"

// i18n
import { translate } from "app/i18n"

interface RegisterPersonalInfoScreenProps extends AppStackScreenProps<"RegisterPersonalInfo"> {}

interface FormData {
  fullName?: string
  dateOfBirth?: string
  phoneNumber?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export const RegisterPersonalInfoScreen: FC<RegisterPersonalInfoScreenProps> = observer(
  function RegisterPersonalInfoScreen(props) {
    const [date, setDate] = useState(new Date())
    const inputRef = Array.from({ length: 4 }, () => useRef(null))
    const rootStore = useStores()
    const { handleSubmit, control, setValue } = useForm<FormData>({
      defaultValues: {
        fullName: "",
        dateOfBirth: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    })

    const handleSubmitOnPress = (data: FormData) => {
      if (data.password === data.confirmPassword && data.password !== "") {
        rootStore.userInfo.setProp("name", data.fullName)
        rootStore.userInfo.setProp("dob", date)
        rootStore.userInfo.setProp("phone", data.phoneNumber)
        rootStore.userInfo.setProp("email", data.email)
        rootStore.userInfo.setProp("password", data.password)
        rootStore.userInfo.setProp("role", ["user"])
        props.navigation.navigate("RegisterBankAccount")
      }
    }

    const handleFocusOnNextInput = (index: number) => {
      inputRef[index + 1]?.current?.focus()
    }

    return (
      <SafeAreaView style={appStyle.rootContainer}>
        <KeyboardAvoidingView style={appStyle.flex1} behavior="padding">
          <View style={$container}>
            <BackButton />
            <RegisterProgessBar lineWidth={sizes.screenWidth * 0.205} level={1} />
          </View>
          <PrimaryHeader style={$title} tx="personalInfo" />
          <ScrollView contentContainerStyle={$scrollViewContainer}>
            <Input control={control} controlName="fullName" placeHolderTx="fullName" />
            <Picker
              control={control}
              controlName="dateOfBirth"
              setValue={setValue}
              state={date}
              type="date"
              setState={setDate}
              placeholder={translate("dateOfBirth")}
            />
            <Input
              ref={inputRef[0]}
              control={control}
              controlName="phoneNumber"
              placeHolderTx="phoneNumber"
              onSubmitEditing={() => handleFocusOnNextInput(0)}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <Input
              ref={inputRef[1]}
              control={control}
              controlName="email"
              placeHolderTx="email"
              onSubmitEditing={() => handleFocusOnNextInput(1)}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <Input
              ref={inputRef[2]}
              control={control}
              controlName="password"
              placeHolderTx="password"
              secureTextEntry={true}
              onSubmitEditing={() => handleFocusOnNextInput(2)}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <Input
              ref={inputRef[3]}
              control={control}
              controlName="confirmPassword"
              placeHolderTx="confirmPassword"
              secureTextEntry={true}
              returnKeyType="done"
            />
            <PrimaryButton
              style={appStyle.marginTop16}
              titleTx="continue"
              activeOpacity={0.7}
              onPress={handleSubmit(handleSubmitOnPress)}
            />
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
