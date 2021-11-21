import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";

/* import {
  VictoryScatter,
  VictoryLine,
  VictoryChart,
  VictoryAxis,
} from "victory-native";

import { VictoryCustomTheme } from "../styles"; */

import { useDispatch, useSelector } from "react-redux";
import { getEmpresas } from "../store/fetchActions/empresas";
import { getGrupoEconomico } from "../store/fetchActions/grupoEconomico";
import { getContas } from "../store/fetchActions/contas";
import { getGrupoSelecionado } from "../store/ducks/grupoEconomico";
import { getEmpresa } from "../store/ducks/empresas";

import { TextButton } from "../components";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";
import { useEffect } from "react";

const SelectGroup = ({ navigation }) => {
  const { gruposEconomicos } = useSelector((state) => state.grupoEconomico);
  const empresas = useSelector((state) => state.empresas.empresas);

  const [modalVisibleGrupo, setModalVisibleGrupo] = useState(false);
  const [modalVisibleEmpresa, setModalVisibleEmpresa] = useState(false);
  const [grupoSelecionado, setGrupoSelecionado] = useState({});
  const [empresaSelecionada, setEmpresaSelecionada] = useState({});

  const dispatch = useDispatch();

  function handleGetGrupo() {
    dispatch(getGrupoEconomico());
  }

  function handleGetContas(item) {
    dispatch(getContas(item.id));
  }

  function handleGetEmpresas(GE) {
    dispatch(getEmpresas(GE));
  }

  function handleStoreGrupo(GE) {
    dispatch(getGrupoSelecionado(GE));
  }

  function handleStoreEmpresa(Empresa) {
    dispatch(getEmpresa(Empresa));
  }

  function handlerAcessar() {
    navigation.navigate("Home", {});
  }

  useEffect(() => {
    handleGetGrupo();
  }, []);

  function renderAreaGroupModal() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ padding: SIZES.padding, flexDirection: "row" }}
          onPress={() => {
            setGrupoSelecionado(item);
            handleStoreGrupo(item);
            setModalVisibleGrupo(false);
            handleGetEmpresas(item.id);
          }}
        >
          <Text style={{ ...FONTS.body4 }}>{item.nome}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleGrupo}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisibleGrupo(false)}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View style={styles.viewModal}>
              <FlatList
                data={gruposEconomicos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                style={{
                  padding: SIZES.padding * 1.5,
                  marginBottom: SIZES.padding * 1.5,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  function renderAreaEmpresaModal() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ padding: SIZES.padding, flexDirection: "row" }}
          onPress={() => {
            setEmpresaSelecionada(item);
            setModalVisibleEmpresa(false);
            handleStoreEmpresa(item);
            handleGetContas(item);
          }}
        >
          <Text style={{ ...FONTS.body4 }}>{item.nome}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleEmpresa}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisibleEmpresa(false)}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View style={styles.viewModal}>
              <FlatList
                data={empresas}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                style={{
                  padding: SIZES.padding * 1.5,
                  marginBottom: SIZES.padding * 1.5,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          resizeMode="contain"
          style={{ width: 150, height: 150 }}
          source={images.fluxodecaixa}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          alignContent: "center",
          width: "90%",
        }}
      >
        <TouchableOpacity
          style={styles.touchSelect}
          onPress={() => setModalVisibleGrupo(true)}
        >
          <View style={{ justifyContent: "center" }}>
            <Image source={icons.right_arrow} style={styles.imageSelect} />
          </View>
          <View style={{ justifyContent: "center", marginLeft: 5 }}>
            <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
              {grupoSelecionado?.nome || "Selecione o Grupo"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchSelect}
          onPress={() => setModalVisibleEmpresa(true)}
        >
          <View style={{ justifyContent: "center" }}>
            <Image source={icons.right_arrow} style={styles.imageSelect} />
          </View>
          <View style={{ justifyContent: "center", marginLeft: 5 }}>
            <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
              {empresaSelecionada?.nome || "Selecione a Empresa"}
            </Text>
          </View>
        </TouchableOpacity>

        {/* <View
          style={{
            marginTop: -80,
            marginBottom: 20,
            backgroundColor: COLORS.white,
          }}
        >
          <VictoryChart
            theme={VictoryCustomTheme}
            height={220}
            width={SIZES.width - 40}
          ></VictoryChart>
        </View> */}

        <TextButton label="Acessar" onPress={() => handlerAcessar()} />
      </View>
      {renderAreaGroupModal()}
      {renderAreaEmpresaModal()}
    </KeyboardAvoidingView>
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
  touchSelect: {
    width: "90%",
    height: 50,
    marginHorizontal: 5,
    marginBottom: 15,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    flexDirection: "row",
    ...FONTS.body2,
  },
  imageSelect: {
    width: 10,
    height: 10,
    tintColor: COLORS.white,
  },
  viewModal: {
    height: 300,
    width: SIZES.width * 0.8,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
  },
});

export default SelectGroup;
