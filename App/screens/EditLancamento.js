import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import { InputMaterial, HeaderTelas } from "../components";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

import { useDispatch, useSelector } from "react-redux";
import { storeLancamento } from "../store/ducks/lancamentos";

import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const EditLancamento = ({ route, navigation }) => {
  function handleStoreLancamento(Lancamento) {
    dispatch(storeLancamento(Lancamento));
  }
  const { item } = route.params;

  useEffect(() => {
    console.log("item, ", item);
  }, []);

  function renderHeaderBar() {
    return <HeaderTelas titulo="Editar Lançamento" />;
  }

  function renderForm() {
    return (
      <KeyboardAvoidingView style={[styles.keyView]}>
        <View style={[styles.container, styles.shadow]}>
          <InputMaterial
            label="Conta Gerencial"
            placeholder="Conta Gerencial"
            value={item.conta_gerencial}
          />
          <InputMaterial
            label="Descrição"
            placeholder="Descrição"
            value={item.descricao}
          />
          <InputMaterial
            label="Valor"
            placeholder="Valor"
            value={item.valor}
            keyboardType="numeric"
          />
          <InputMaterial label="Banco" placeholder="Banco" value={item.banco} />
          <InputMaterial
            label="Clinte / Fornecedor"
            placeholder="Clinte / Fornecedor"
            value={item.cliente_fornecedor}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <ScrollView horizontal={false}>
      <View style={styles.viewContainer}>
        {renderHeaderBar()}
        {renderForm()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingBottom: 130,
  },
  container: {
    flex: 1,
    alignItems: "baseline",
    justifyContent: "flex-start",
    width: "90%",

    marginTop: SIZES.padding,
    marginHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
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

  keyView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.white,
  },
});

export default EditLancamento;
