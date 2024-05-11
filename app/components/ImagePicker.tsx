import React, { useState } from "react"

// modules
import { StyleProp, View, ViewStyle, Image, ImageStyle, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"

// components
import { Icon } from "./Icon"

// hooks
import { UseFormSetValue } from "react-hook-form"
import { useStores } from "app/models"

// image picker
import { launchImageLibrary } from "react-native-image-picker"
import { colors } from "app/theme"

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
  const { style, defaultImage, width = 140, height = 140, imageStyle, activeOpacity = 0.7 } = props
  const [uri, setUri] = useState(defaultImage)
  const rootStore = useStores()

  const handleImagePickerOnPress = async () => {
    const result = await launchImageLibrary({ mediaType: "photo", quality: 1 })
    if (!result.didCancel && !result.errorCode) {
      setUri(result.assets[0].uri)
      rootStore.putUploadAvatar(result.assets[0].uri)
    }
  }

  return (
    <View style={[$container(width, height), style]}>
      <Image style={[$image(width, height), imageStyle]} source={{ uri }} />
      <TouchableOpacity
        style={$uploadButton}
        activeOpacity={activeOpacity}
        onPress={handleImagePickerOnPress}
      >
        <Icon icon="addCircle" size={21} color={colors.black} />
      </TouchableOpacity>
    </View>
  )
})

const $container = (width: number | string, height: number | string): ViewStyle => ({
  justifyContent: "center",
  alignItems: "center",
  width,
  height,
  alignSelf: "center",
})

const $image = (width: number | string, height: number | string): ImageStyle => ({
  width,
  height,
  borderRadius: 70,
})

const $uploadButton: ViewStyle = {
  position: "absolute",
  bottom: 5,
  right: 5,
  padding: 3,
  borderRadius: 50,
  backgroundColor: colors.white,
}
