import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { COLORS, SIZES, FONTS, icons } from "../constants";

const ListTransaction = ({ customContainerStyle, list, title, onPress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.touchableRender}
      onPress={() => onPress(item)}
    >
      <Image />
      <View style={styles.ViewRender}>
        <Text style={styles.TextViewTitleRender}>{item.descricao}</Text>
        <Text style={styles.TextViewBodyRender}>{item.banco}</Text>
      </View>
      <View style={styles.ViewSetaValor}>
        <Text
          style={{
            color: item.tipo == "E" ? COLORS.primary : COLORS.secondary,
            ...FONTS.h5,
          }}
        >
          {item.valor}
        </Text>
        <Image source={icons.right_arrow} style={styles.imageViewSeta} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[customContainerStyle, styles.viewContainer]}>
      <Text style={styles.textTitle}>{title}</Text>
      <FlatList
        contentContainerStyle={{ marginTop: SIZES.radius }}
        scrollEnabled={false}
        data={list}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return <View style={styles.itemSeparator}></View>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: SIZES.padding,
    marginHorizontal: SIZES.padding,
    padding: 20,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  textTitle: {
    ...FONTS.h3,
  },
  itemSeparator: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
  touchableRender: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SIZES.base,
  },
  ViewRender: {
    flex: 1,
    marginLeft: SIZES.radius,
  },
  TextViewTitleRender: {
    ...FONTS.h5,
  },
  TextViewBodyRender: {
    color: COLORS.gray,
    ...FONTS.body5,
  },
  ViewSetaValor: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
  },
  imageViewSeta: {
    width: 20,
    height: 20,
    tintColor: COLORS.gray,
  },
});

export default ListTransaction;
