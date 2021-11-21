import React from "react";
import { TextInput } from "react-native";

import { COLORS, SIZES, FONTS } from "../constants";

const InputText = ({
  placeholder,
  customContainerStyle,
  onChangeText,
  secureTextEntry,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCorrect={false}
      onChangeText={onChangeText}
      style={{
        backgroundColor: COLORS.white,
        width: "90%",
        marginBottom: 15,
        color: COLORS.gray,
        fontSize: 17,
        borderRadius: 7,
        padding: 10,
        ...customContainerStyle,
      }}
    />
  );
};

export default InputText;
