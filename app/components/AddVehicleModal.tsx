import React, { useState } from "react"

// modules
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import Modal from "react-native-modal"

// components
import { Text } from "app/components/Text"
import { SecondaryButton } from "app/components/SecondaryButton"
import { VerticalSeparator } from "app/components/VerticalSeparator"
import { Input } from "app/components/Input"
import { DropDownList } from "app/components/DropDownList"
import { MessageModal } from "./MessageModal"

// themes
import { appStyle, colors, typography } from "app/theme"

// hooks
import { useForm } from "react-hook-form"
import { useStores } from "app/models"

// i18n
import { TxKeyPath } from "app/i18n"

// constants
import { sizes } from "app/constants"

// interfaces
import { VehicleInfo } from "app/services/vehicle/vehicle.types"

export interface AddVehicleModalProps {
  style?: StyleProp<ViewStyle>
  actionButtonTitleTx?: TxKeyPath
  cancelButtonTitleTx?: TxKeyPath
  visibility?: boolean
  setVisibility?: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddVehicleModal = observer(function AddVehicleModal(props: AddVehicleModalProps) {
  const { style, actionButtonTitleTx, cancelButtonTitleTx, visibility, setVisibility } = props
  const rootStore = useStores()
  const [emptyInput, setEmptyInput] = useState(false)
  const [invalidPlateNo, setInvalidPlateNo] = useState(false)
  const regex = /^(1[1-2]|1[4-9]|[2-9][0-9])[A-Z]([0-9A-Z]|[A-Z][0-9])?-[0-9]{4,5}$/

  const { handleSubmit, control, setValue, reset } = useForm<VehicleInfo>({
    defaultValues: {
      typeId: "",
      plateNo: "",
    },
  })

  const handleDismissModalOnPress = () => {
    setVisibility(false)
  }

  const handleSubmitOnPress = (data: VehicleInfo) => {
    if (data.typeId === "" || data.plateNo === "") setEmptyInput(true)
    else {
      if (!regex.test(data.plateNo)) setInvalidPlateNo(true)
      else {
        setVisibility(false)
        rootStore.postVehicle(data)
        reset()
      }
    }
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
        <Text style={$title} tx="addNewVehicle" />
        <VerticalSeparator />
        <View style={$inputContainer}>
          <DropDownList
            control={control}
            controlName="typeId"
            isOutline={true}
            labelTx="vehicleType"
            setValue={setValue}
            data={rootStore.vehicleType}
            type="vehicleType"
          />
          <Input control={control} controlName="plateNo" labelTx="vehicleNumber" isOutLine={true} />
        </View>
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
            onPress={handleSubmit(handleSubmitOnPress)}
          />
        </View>
      </View>
      <MessageModal
        visibility={emptyInput}
        setVisibility={setEmptyInput}
        titleTx="emptyInputTitle"
        contentTx="emptyInputMessage"
        buttonTx="ok"
      />
      <MessageModal
        visibility={invalidPlateNo}
        setVisibility={setInvalidPlateNo}
        titleTx="invalidPlateNumberTitle"
        contentTx="invalidPlateNumberMessage"
        buttonTx="ok"
      />
    </Modal>
  )
})

const $container: ViewStyle = {
  backgroundColor: colors.white,
  paddingTop: 18,
  paddingBottom: 26,
  paddingHorizontal: 21,
  borderRadius: 15,
}

const $title: TextStyle = {
  fontFamily: typography.fonts.rubik.bold,
  fontSize: 16,
  color: colors.black,
  textAlign: "center",
  paddingBottom: 5,
}

const $inputContainer: ViewStyle = {
  paddingTop: 17,
  paddingBottom: 36,
  rowGap: 16,
}

const $buttonContainer: ViewStyle = {
  paddingTop: 2,
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  columnGap: 9,
}

const $button: ViewStyle = {
  width: sizes.screenWidth * 0.25,
  height: 38,
}
