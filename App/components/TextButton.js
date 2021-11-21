import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { COLORS, SIZES, FONTS } from "../constants";

const TextButton = ({
  label,
  customContainerStyle,
  custonLabelStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        height: 45,
        width: "90%",
        alignItems: "center",
        marginBottom: 10,
        justifyContent: "center",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.secondary,
        ...customContainerStyle,
      }}
      onPress={onPress}
    >
      <Text style={{ color: COLORS.white, ...FONTS.h3, ...custonLabelStyle }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
