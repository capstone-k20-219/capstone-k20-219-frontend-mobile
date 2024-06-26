const palette = {
  neutral100: "rgba(0,0,0,0.1)",
  neutral200: "#D7CEC9",
  neutral300: "rgba(0,0,0,0.4)",
  neutral400: "#DEDEDE",
  neutral500: "rgba(0,0,0,0.6)",
  neutral600: "rgba(245,245,245,0.7)",
  neutral700: "rgba(0,0,0,0.7)",
  neutral800: "#F5F5F5",

  primary100: "#5575EB",
  primary200: "#1A3CB9",
  primary300: "#BEBEBE",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  redTab: "#EC1616",
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
  white: "#FFFFFF",
  black: "#000000",
  successGreen: "#4BD865",
  slotBorder: "#C4C4C4",
  starGray: "#C5C5C5",
  starYellow: "#FFE843",
}
