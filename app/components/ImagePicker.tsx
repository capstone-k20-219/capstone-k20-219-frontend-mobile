import React, { useState } from "react"

// modules
import { StyleProp, View, ViewStyle, Image, ImageStyle, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"

// components
import { Icon } from "./Icon"

// hooks
import { UseFormSetValue } from "react-hook-form"

// image picker
import { launchImageLibrary } from "react-native-image-picker"

export interface ImagePickerProps {
  style?: StyleProp<ViewStyle>
  defaultImage?: string
  width?: number | string
  height?: number | string
  imageStyle?: StyleProp<ImageStyle>
  activeOpacity?: number
  setValue?: UseFormSetValue<any>
}

export const ImagePicker = observer(function ImagePicker(props: ImagePickerProps) {
  const {
    style,
    defaultImage,
    width = 100,
    height = 100,
    imageStyle,
    activeOpacity = 0.7,
    setValue,
  } = props
  const [uri, setUri] = useState(defaultImage)

  const handleImagePickerOnPress = async () => {
    const result = await launchImageLibrary({ mediaType: "photo", quality: 1 })
    if (!result.didCancel && result.errorCode) {
      setUri(result.assets[0].uri)
      setValue("image", result.assets[0].fileName)
    }
  }

  return (
    <View style={[$container, style]}>
      <Image style={[$image(width, height), imageStyle]} source={{ uri }} />
      <TouchableOpacity
        style={$uploadButton}
        activeOpacity={activeOpacity}
        onPress={handleImagePickerOnPress}
      >
        <Icon icon="bug" />
      </TouchableOpacity>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  borderColor: "black",
  borderWidth: 1,
  borderRadius: 50,
}

const $image = (width: number | string, height: number | string): ImageStyle => ({
  width,
  height,
})

const $uploadButton: ViewStyle = {
  position: "absolute",
  bottom: 0,
  right: 0,
  padding: 5,
  backgroundColor: "white",
  borderRadius: 50,
}
