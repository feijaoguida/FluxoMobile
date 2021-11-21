import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { COLORS, FONTS, icons, SIZES } from "../constants";

const InputMaterial = ({
  label,
  placeholder,
  onChangeText,
  value,
  keyboardType,
}) => {
  return (
    <View style={{ width: "95%", marginTop: SIZES.base }}>
      <Text style={styles.textLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        selectionColor={COLORS.black}
      />
      <TouchableOpacity
        style={styles.touchIcon}
        onPress={() => console.log("toggle")}
      >
        <Image source={icons.eye} style={styles.imageIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },

  textInput: {
    marginTop: 0,
    marginVertical: SIZES.base,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    width: "100%",
    color: COLORS.black,
    ...FONTS.body3,
  },
  textLabel: {
    marginBottom: 0,
    color: COLORS.gray,
    ...FONTS.body5,
  },
  touchIcon: {
    position: "absolute",
    right: 0,
    bottom: 10,
    height: 30,
    width: 30,
  },
  imageIcon: {
    height: 20,
    width: 20,
    tintColor: COLORS.black,
  },
});

export default InputMaterial;
