import { Platform } from "react-native"
import {
  SpaceGrotesk_300Light as spaceGroteskLight,
  SpaceGrotesk_400Regular as spaceGroteskRegular,
  SpaceGrotesk_500Medium as spaceGroteskMedium,
  SpaceGrotesk_600SemiBold as spaceGroteskSemiBold,
  SpaceGrotesk_700Bold as spaceGroteskBold,
} from "@expo-google-fonts/space-grotesk"

export const customFontsToLoad = {
  spaceGroteskLight,
  spaceGroteskRegular,
  spaceGroteskMedium,
  spaceGroteskSemiBold,
  spaceGroteskBold,
  rubikLight: require("../../assets/fonts/Rubik-Light.ttf"),
  rubikRegular: require("../../assets/fonts/Rubik-Regular.ttf"),
  rubikMedium: require("../../assets/fonts/Rubik-Medium.ttf"),
  rubikSemiBold: require("../../assets/fonts/Rubik-SemiBold.ttf"),
  rubikBold: require("../../assets/fonts/Rubik-Bold.ttf"),
  rubikExtraBold: require("../../assets/fonts/Rubik-ExtraBold.ttf"),
  rubikBlack: require("../../assets/fonts/Rubik-Black.ttf"),
  rubikLightItalic: require("../../assets/fonts/Rubik-LightItalic.ttf"),
  rubikRegularItalic: require("../../assets/fonts/Rubik-Italic.ttf"),
  rubikMediumItalic: require("../../assets/fonts/Rubik-MediumItalic.ttf"),
  rubikSemiBoldItalic: require("../../assets/fonts/Rubik-SemiBoldItalic.ttf"),
  rubikBoldItalic: require("../../assets/fonts/Rubik-BoldItalic.ttf"),
  rubikExtraBoldItalic: require("../../assets/fonts/Rubik-ExtraBoldItalic.ttf"),
  rubikBlackItalic: require("../../assets/fonts/Rubik-BlackItalic.ttf"),
}

const fonts = {
  spaceGrotesk: {
    // Cross-platform Google font.
    light: "spaceGroteskLight",
    normal: "spaceGroteskRegular",
    medium: "spaceGroteskMedium",
    semiBold: "spaceGroteskSemiBold",
    bold: "spaceGroteskBold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
  rubik: {
    light: "rubikLight",
    regular: "rubikRegular",
    medium: "rubikMedium",
    semiBold: "rubikSemiBold",
    bold: "rubikBold",
    extraBold: "rubikExtraBold",
    black: "rubikBlack",
    lightItalic: "rubikLightItalic",
    regularItalic: "rubikRegularItalic",
    mediumItalic: "rubikMediumItalic",
    semiBoldItalic: "rubikSemiBoldItalic",
    boldItalic: "rubikBoldItalic",
    extraBoldItalic: "rubikExtraBoldItalic",
    blackItalic: "rubikBlackItalic",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.rubik,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
