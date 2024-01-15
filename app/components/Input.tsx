import React, { forwardRef, useImperativeHandle, Ref, useRef, useState, useCallback } from "react"

// modules
import {
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  TextInputProps,
  TextInput,
  TouchableOpacity,
  ImageStyle,
} from "react-native"
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated"

// components
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"

// themes
import { colors, typography } from "app/theme"

// hooks
import { useController } from "react-hook-form"

// i18n
import { TxKeyPath, translate } from "app/i18n"

type InputProps = {
  containerStyle?: StyleProp<ViewStyle>
  labelTx?: TxKeyPath
  labelStyle?: StyleProp<TextStyle>
  isOutLine?: boolean
  inputWrapperStyle?: StyleProp<ViewStyle>
  control?: any
  controlName?: string
  disable?: boolean
  error?: TxKeyPath
  placeHolderTx?: TxKeyPath
  textColor?: string
} & TextInputProps

export const Input = forwardRef(function Input(props: InputProps, ref: Ref<TextInput>) {
  const {
    containerStyle,
    labelTx,
    labelStyle,
    inputWrapperStyle,
    isOutLine = false,
    control,
    controlName,
    disable = false,
    error,
    placeHolderTx,
    textColor = colors.text,
    ...TextInputProps
  } = props
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const inputRef = useRef<TextInput>()
  useImperativeHandle(ref, () => inputRef.current)
  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

  const controller =
    control && controlName
      ? useController({
          control,
          name: controlName,
          defaultValue: "",
        })
      : undefined

  const handleChangePasswordHiddenState = useCallback(() => {
    setIsPasswordHidden((prevState) => !prevState)
  }, [])

  return (
    <View style={containerStyle}>
      {labelTx && <Text style={[$labelText, labelStyle]} tx={labelTx} />}
      <View style={[$inputWrapper(isOutLine), inputWrapperStyle]}>
        {error && typeof error === "string" && (
          <Text style={$errorText(error)}>{translate(error)}</Text>
        )}
        <TextInput
          ref={inputRef}
          autoCorrect={false}
          {...TextInputProps}
          placeholder={placeHolderTx ? translate(placeHolderTx) : ""}
          placeholderTextColor={colors.text}
          value={controller ? controller.field.value : TextInputProps.value}
          onChangeText={controller ? controller.field.onChange : TextInputProps.onChangeText}
          cursorColor={colors.black}
          editable={!disable}
          secureTextEntry={props.secureTextEntry && isPasswordHidden}
          style={$input(textColor)}
        />
        {props.secureTextEntry && (
          <AnimatedTouchableOpacity
            entering={ZoomIn}
            exiting={ZoomOut}
            activeOpacity={0.7}
            onPress={handleChangePasswordHiddenState}
          >
            <Icon style={$eyeIcon} icon={isPasswordHidden ? "view" : "hidden"} />
          </AnimatedTouchableOpacity>
        )}
      </View>
    </View>
  )
})

const $labelText: TextStyle = {
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 14,
}

const $inputWrapper = (isOutLine: boolean): ViewStyle => ({
  flexDirection: "row",
  alignItems: "center",
  borderWidth: isOutLine ? 1 : 0,
  borderBottomWidth: 1,
  borderRadius: isOutLine ? 5 : 0,
  borderColor: colors.border,
  paddingVertical: 5,
  paddingHorizontal: 10,
  height: 40,
})

const $input = (textColor: string): TextStyle => ({
  flex: 1,
  height: "100%",
  paddingVertical: 0,
  fontFamily: typography.fonts.rubik.regular,
  fontSize: 14,
  color: textColor,
})

const $eyeIcon: ImageStyle = {
  width: 25,
  height: 25,
}

const $errorText = (error?: string): TextStyle => ({
  position: "absolute",
  color: colors.palette.redTab,
  paddingLeft: 10,
  fontSize: 14,
  fontFamily: typography.fonts.rubik.regular,
  ...(error?.includes("Required") ? {} : { bottom: 0 }),
})
