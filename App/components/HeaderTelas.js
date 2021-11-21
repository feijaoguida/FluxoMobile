import React from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, FONTS, icons } from "../constants";

const HeaderTelas = ({ right, titulo }) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      locations={[0.0, 1]}
      colors={[COLORS.primary, COLORS.white]}
      style={[styles.touchableRender, styles.shadow]}
    >
      <View style={styles.viewContainer}>
        <View style={styles.viewTouch}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={icons.back_arrow}
              resizeMode="contain"
              style={styles.imageArrow}
            />
            <Text style={styles.textVoltar}>Voltar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewTitulo}>
          <Text style={styles.textTitulo}>{titulo}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    paddingHorizontal: SIZES.padding,
    flexDirection: "column",
    width: "100%",
    height: 65,
  },
  viewTouch: {
    flex: 1,
    alignItems: "flex-start",
    paddingBottom: SIZES.base,
    paddingTop: SIZES.base,
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageArrow: { width: 20, height: 20, tintColor: COLORS.gray },
  textVoltar: { marginLeft: SIZES.base, ...FONTS.h3 },
  viewTitulo: { flex: 1, alignItems: "center" },
  textTitulo: { ...FONTS.h3 },
});

export default HeaderTelas;
