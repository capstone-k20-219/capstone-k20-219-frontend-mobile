import React, { FC } from "react"

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
  DropDownList,
  Input,
  PrimaryButton,
} from "app/components"

// hooks
import { useForm } from "react-hook-form"

// themes
import { appStyle } from "app/theme"

// constants
import { sizes } from "app/constants"

// i18n
import { translate } from "app/i18n"

interface RegisterVehicleScreenProps extends AppStackScreenProps<"RegisterVehicle"> {}

interface FormData {
  plateNumber?: string
  vehicleType?: string
}

export const RegisterVehicleScreen: FC<RegisterVehicleScreenProps> = observer(
  function RegisterVehicleScreen(props) {
    const data: string[] = [translate("car"), translate("motorbike"), translate("truck")]
    const { handleSubmit, control, setValue } = useForm<FormData>({
      defaultValues: {
        plateNumber: "",
        vehicleType: "",
      },
    })

    const handleSubmitOnPress = (data: FormData) => {
      console.log(data)
      // rootStore.userInfo.setProp("vehicle", [{plateNo: data.plateNumber, typeId: data.vehicleType}])
      // console.log(JSON.stringify(rootStore.userInfo.vehicle))
      props.navigation.navigate("RegisterBankAccount")
    }

    const handleSkipOnPress = () => {
      props.navigation.navigate("RegisterBankAccount")
    }

    return (
      <SafeAreaView style={appStyle.rootContainer}>
        <KeyboardAvoidingView style={appStyle.flex1} behavior="padding">
          <View style={$container}>
            <BackButton />
            <RegisterProgessBar lineWidth={sizes.screenWidth * 0.205} level={1} />
          </View>
          <PrimaryHeader style={$title} tx="vehicleRegister" />
          <ScrollView contentContainerStyle={$scrollViewContainer}>
            <Input control={control} controlName="plateNumber" placeHolderTx="plateNumber" />
            <DropDownList
              control={control}
              controlName="vehicleType"
              placeholder={translate("vehicleType")}
              setValue={setValue}
              data={data}
            />
            <PrimaryButton
              style={appStyle.marginTop16}
              titleTx="continue"
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
