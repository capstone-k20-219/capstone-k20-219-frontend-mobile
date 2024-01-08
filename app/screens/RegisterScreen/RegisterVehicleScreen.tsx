import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface RegisterVehicleScreenProps extends AppStackScreenProps<"RegisterVehicle"> {}

export const RegisterVehicleScreen: FC<RegisterVehicleScreenProps> = observer(
  function RegisterVehicleScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="scroll">
        <Text text="registerVehicle" />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
