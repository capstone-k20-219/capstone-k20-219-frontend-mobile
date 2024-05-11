import React, { FC, useState, useRef } from "react"

// modules
import { observer } from "mobx-react-lite"
import { ViewStyle, View, ScrollView, TextStyle, KeyboardAvoidingView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

// components
import { Text, BackButton, SecondaryButton, Input, ImagePicker, Picker } from "app/components"

// hooks
import { useForm } from "react-hook-form"
import { useStores } from "app/models"

// themes
import { appStyle, colors, typography } from "app/theme"

// constants
import { sizes } from "app/constants"

// date-fns
import { format } from "date-fns"

interface ProfileScreenProps extends AppStackScreenProps<"Profile"> {}

interface FormData {
  dateOfBirth?: string
  phoneNumber?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  const rootStore = useStores()
  const [isDisabled, setIsDisabled] = useState(true)
  const [date, setDate] = useState(new Date(rootStore.userInfo.dob))
  const inputRef = Array.from({ length: 2 }, () => useRef(null))
  const { handleSubmit, control, setValue } = useForm<FormData>({
    defaultValues: {
      dateOfBirth: format(rootStore.userInfo.dob, "dd/MM/yyyy"),
      phoneNumber: rootStore.userInfo.phone,
      email: rootStore.userInfo.email,
      // password: "",
      // confirmPassword: "",
    },
  })

  const handleEditInputOnPress = () => {
    setIsDisabled(!isDisabled)
  }

  const handleSubmitOnPress = (data: FormData) => {
    setIsDisabled(true)
    rootStore.putUpdateUserInfo({
      email: data.email,
      dob: date,
      phone: data.phoneNumber,
    })
  }

  const handleFocusNextInputOnPress = (index: number) => {
    inputRef[index + 1]?.current?.focus()
  }

  return (
    <SafeAreaView style={appStyle.rootContainer}>
      <KeyboardAvoidingView style={appStyle.flex1} behavior="padding">
        <View style={$headerContainer}>
          <BackButton />
          <ImagePicker defaultImage={rootStore.userInfo.image} />
          <Text style={$headerText} text="PHAM HUU DUC" />
        </View>
        <ScrollView contentContainerStyle={$container}>
          <Picker
            control={control}
            controlName="dateOfBirth"
            labelTx="dateOfBirth"
            type="date"
            disabled={isDisabled}
            isOutline={true}
            setValue={setValue}
            state={date}
            setState={setDate}
          />
          <Input
            ref={inputRef[0]}
            control={control}
            controlName="phoneNumber"
            labelTx="phoneNumber"
            disable={isDisabled}
            inputWrapperStyle={$inputWrapper}
            onSubmitEditing={() => handleFocusNextInputOnPress(0)}
            returnKeyType="next"
            blurOnSubmit={false}
          />
          <Input
            ref={inputRef[1]}
            control={control}
            controlName="email"
            labelTx="email"
            disable={isDisabled}
            inputWrapperStyle={$inputWrapper}
            onSubmitEditing={() => handleFocusNextInputOnPress(1)}
            returnKeyType="done"
          />
          {/* <Input
            ref={inputRef[3]}
            control={control}
            controlName="password"
            labelTx="password"
            secureTextEntry={true}
            disable={isDisabled}
            inputWrapperStyle={$inputWrapper}
            onSubmitEditing={() => handleFocusNextInputOnPress(3)}
            returnKeyType="next"
            blurOnSubmit={false}
          />
          <Input
            ref={inputRef[4]}
            control={control}
            controlName="confirmPassword"
            containerStyle={$display(isDisabled)}
            labelTx="confirmPassword"
            secureTextEntry={true}
            disable={isDisabled}
            inputWrapperStyle={$inputWrapper}
            onSubmitEditing={() => handleFocusNextInputOnPress(4)}
            returnKeyType="done"
          /> */}
          {isDisabled ? (
            <SecondaryButton
              titleTx="edit"
              style={$button(isDisabled)}
              titleStyle={$buttonText}
              color={colors.palette.primary100}
              onPress={handleEditInputOnPress}
            />
          ) : (
            <View style={$buttonContainer}>
              <SecondaryButton
                titleTx="cancel"
                style={$button(isDisabled)}
                titleStyle={$buttonText}
                color={colors.palette.primary100}
                onPress={handleEditInputOnPress}
              />
              <SecondaryButton
                titleTx="save"
                style={$button(isDisabled)}
                titleStyle={$buttonText}
                onPress={handleSubmit(handleSubmitOnPress)}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
})

const $headerContainer: ViewStyle = {
  paddingTop: 31,
  paddingBottom: 58,
  backgroundColor: colors.palette.primary100,
  paddingHorizontal: 16,
  rowGap: 35,
}

const $headerText: TextStyle = {
  fontFamily: typography.fonts.rubik.bold,
  fontSize: 32,
  lineHeight: 32,
  color: colors.white,
  textAlign: "center",
}

const $container: ViewStyle = {
  flexGrow: 1,
  paddingVertical: 29,
  paddingHorizontal: 32,
  rowGap: 27,
}

const $buttonContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  columnGap: sizes.screenWidth * 0.05,
}

const $button = (isDisabled: boolean): ViewStyle => ({
  marginTop: 5,
  height: 50,
  borderRadius: 10,
  width: isDisabled ? sizes.screenWidth * 0.85 : sizes.screenWidth * 0.4,
})

const $buttonText: TextStyle = {
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 24,
  lineHeight: 28,
}

const $inputWrapper: ViewStyle = {
  borderWidth: 1,
  borderRadius: 5,
  borderColor: colors.palette.neutral300,
}

// const $display = (isDisabled: boolean): ViewStyle => ({
//   display: isDisabled ? "none" : "flex",
// })
