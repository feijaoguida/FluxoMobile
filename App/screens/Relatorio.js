import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { HeaderTelas, InputMaterial } from "../components";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";
import { convertData, fdata } from "../helpers/function";

import { useDispatch, useSelector } from "react-redux";
import { storeLancamento } from "../store/ducks/lancamentos";

import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const EditLancamento = ({ route, navigation }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  function handleStoreLancamento(Lancamento) {
    dispatch(storeLancamento(Lancamento));
  }

  function renderHeaderBar() {
    return <HeaderTelas titulo="Relatorio" />;
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  function renderFiltros() {
    return (
      <View>
        <Text>Filtro</Text>

        <View>
          <InputMaterial
            value={fdata(date)}
            label="Data Inicial"
            placeholder="01/01/2000"
          />
          <Button onPress={() => setShow(true)} title="data" />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    );
  }

  function renderForm() {
    return (
      <KeyboardAvoidingView style={[styles.keyView]}>
        <View style={[styles.container, styles.shadow]}>{renderFiltros()}</View>
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
