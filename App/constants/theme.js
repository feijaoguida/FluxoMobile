import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#00d9f5", // Light purple
  secondary: "#bf5ae0", // Dark purple

  white: "#fff",
  black: "#000000",
  green: "#37E39F",
  red: "#F9A8BA",
  gray: "#6A6A6A",
  lightGray: "#dbdbdb",
  lightGray1: "#f5f6fa",
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 18,
  h4: 16,
  h5: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
  body6: 10,
  body7: 8,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
  h5: { fontFamily: "Roboto-Bold", fontSize: SIZES.h5, lineHeight: 22 },
  body1: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
  body6: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body6,
    lineHeight: 22,
  },
  body7: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body7,
    lineHeight: 20,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
