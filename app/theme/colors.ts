const palette = {
  neutral100: "#F4F2F1",
  neutral200: "#D7CEC9",
  neutral300: "#B6ACA6",
  neutral400: "#D9D9D9",
  neutral500: "rgba(255,255,255,0.6)",
  neutral600: "rgba(245,245,245,0.7)",
  neutral700: "rgba(255,255,255,0.7)",
  neutral800: "#F5F5F5",

  primary100: "#9E77ED",
  primary200: "#6941C6",
  primary300: "#BEBEBE",

  angry100: "#F2D6CD",
  angry500: "#C03403",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral700,
  textDim: palette.neutral500,
  background: palette.neutral100,
  border: palette.neutral300,
  separator: palette.neutral200,
  error: palette.angry500,
  errorBackground: palette.angry100,
  white: "#000000",
  black: "#FFFFFF",
}
