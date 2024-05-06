/* eslint-disable react-native/sort-styles */
// modules
import { StyleSheet } from "react-native"
import { colors } from "./colors"
import { sizes } from "app/constants"

export const appStyle = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  justifySpaceBetwwen: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  marginTop16: {
    marginTop: 16,
  },
  maxHeightHalfScreen: {
    maxHeight: sizes.screenHeight * 0.5,
  },
  displayNone: {
    display: "none",
  },
  opacity0: {
    opacity: 0,
  },
})
