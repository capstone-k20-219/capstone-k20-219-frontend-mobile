import React, { FC, useEffect } from "react"

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
import { useStores } from "app/models"

// themes
import { appStyle } from "app/theme"

// constants
import { sizes } from "app/constants"

// i18n
import { translate } from "app/i18n"

// interfaces
import { VehicleInfo } from "app/services/vehicle/vehicle.types"

interface RegisterVehicleScreenProps extends AppStackScreenProps<"RegisterVehicle"> {}

export const RegisterVehicleScreen: FC<RegisterVehicleScreenProps> = observer(
  function RegisterVehicleScreen(props) {
    const rootStore = useStores()
    const vehicleType = [
      { id: "BCL", name: "Bicycle" },
      { id: "BUS", name: "Bus" },
      { id: "CAR", name: "Car" },
      { id: "MTB", name: "Motobike" },
      { id: "TRK", name: "Truck" },
    ]
    const { handleSubmit, control, setValue } = useForm<VehicleInfo>({
      defaultValues: {
        plateNo: "",
        typeId: "",
      },
    })

    const handleSubmitOnPress = (data: VehicleInfo) => {
      rootStore.setProp("vehicle", [{ plateNo: data.plateNo, type: { id: data.typeId } }])
      props.navigation.navigate("RegisterBankAccount")
    }

    const handleSkipOnPress = () => {
      props.navigation.navigate("RegisterBankAccount")
    }

    useEffect(() => {
      console.log(JSON.stringify(rootStore.vehicleType))
    }, [])

    return (
      <SafeAreaView style={appStyle.rootContainer}>
        <KeyboardAvoidingView style={appStyle.flex1} behavior="padding">
          <View style={$container}>
            <BackButton />
            <RegisterProgessBar lineWidth={sizes.screenWidth * 0.205} level={1} />
          </View>
          <PrimaryHeader style={$title} tx="vehicleRegister" />
          <ScrollView contentContainerStyle={$scrollViewContainer}>
            <Input control={control} controlName="plateNo" placeHolderTx="plateNumber" />
            <DropDownList
              control={control}
              controlName="typeId"
              placeholder={translate("vehicleType")}
              setValue={setValue}
              data={vehicleType}
              type="vehicleType"
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
