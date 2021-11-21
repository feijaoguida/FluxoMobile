import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  LogBox,
  Button,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";

import { convertData, readdata } from "../helpers/function";
import { PriceAlert, ListTransaction } from "../components";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

import { useSelector, useDispatch } from "react-redux";
import { getLancamentos } from "../store/fetchActions/lancamentos";
import { storeLancamento } from "../store/ducks/lancamentos";
import { getBancos } from "../store/fetchActions/bancos";

const Home = ({ navigation }) => {
  const { gruposEconomicos } = useSelector((state) => state.grupoEconomico);
  const { empresa } = useSelector((state) => state.empresas);
  const { lancamentos } = useSelector((state) => state.lancamentos);
  const { contas } = useSelector((state) => state.contas);

  const bancos = useSelector((state) => state.bancos);
  const [totalDisponivel, setTotalDisponivel] = useState(0);
  const [totalBancario, setTotalBancario] = useState(0);
  const [lancamentosHoje, setLancamentosHoje] = useState([]);
  const [lancamentos15, setLancamentos15] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    dispatch(getLancamentos(empresa.id));
    dispatch(getBancos(empresa.id));
    handlerCalcularSaldo();
    handlerHoje();
    handler15();
  }, []);

  useEffect(() => {
    handlerCalcularSaldo();
  }, [bancos]);

  useEffect(() => {
    handlerHoje();
    handler15();
  }, [lancamentos]);

  const handleStoreLancamento = (Lancamento) => {
    dispatch(storeLancamento(Lancamento));
  };

  function handlerCalcularSaldo() {
    let totais = {
      Disponivel: 0,
      Bancario: 0,
    };

    for (let b of bancos) {
      if (b.nome != "Nenhum") {
        (totais.Disponivel += b.saldodisponivel),
          (totais.Bancario += b.saldobancario);
      }
    }
    setTotalBancario(totais.Bancario.toFixed(2));
    setTotalDisponivel(totais.Disponivel.toFixed(2));
  }

  function preparaLancamento(l) {
    let nomeConta = conta(l.conta_gerencial);
    l = Object.assign({}, l);
    l.data_emissao = readdata(l.data_emissao);
    l.data_vencimento = readdata(l.data_vencimento);
    l.data_fluxo = readdata(l.data_fluxo);
    l.data_conciliado = readdata(l.data_conciliado);
    l.banco = banco(l.banco).nome;
    l.nome_conta_gerencial = clabel(nomeConta);
    l.tipo = conta(l.conta_gerencial).tipo;
    //l.blocked = lancamentoBloqueado(empresa.databloqueio, l.data_fluxo);
    return l;
  }

  function conta(id) {
    for (let c of contas) {
      if (c.id == id) {
        return c;
      }
    }
    return { nome: "", numero: "" };
  }

  function banco(id) {
    for (let b of bancos) {
      if (b.id == id) {
        return b;
      }
    }
    return { nome: "" };
  }

  function clabel(contaGerencial) {
    let label = contaGerencial.nome;
    if (contaGerencial.pai) {
      label = `${clabel(conta(contaGerencial.pai))} > ${label}`;
    }
    return label;
  }

  function handlerHoje() {
    let hj = convertData(new Date());
    let lancamentosHoje = lancamentos.map((l) => preparaLancamento(l));
    setLancamentosHoje(
      lancamentosHoje
        .filter((l) => convertData(l.data_fluxo) == hj)
        .slice(0, 15)
    );
  }

  function handler15() {
    let hj = convertData(new Date());
    let date15 = moment(hj).add(15, "days").format("YYYY-MM-DD");

    let allLancamentos = lancamentos.map((l) => preparaLancamento(l));

    setLancamentos15(
      allLancamentos
        .filter((l) => moment(convertData(l.data_fluxo)).isBetween(hj, date15))
        .slice(0, 5)
    );
  }

  function renderHeader() {
    const renderItem = ({ item, index }) => (
      <TouchableOpacity
        style={{
          marginLeft: index == 0 ? SIZES.padding : 0,
        }}
      >
        <LinearGradient
          locations={[0.8, 0.9, 1]}
          colors={[COLORS.white, COLORS.primary, COLORS.secondary]}
          style={[styles.touchableRender, styles.shadow]}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={images.ethereum}
                resizeMode="cover"
                style={{ marginTop: 5, width: 25, height: 25 }}
              />
            </View>
            <View style={{ marginLeft: SIZES.base }}>
              <Text style={{ color: COLORS.gray, ...FONTS.h3 }}>
                {item.nome}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: SIZES.radius }}>
            <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
              Bancario: {item.saldobancario.toFixed(2)}
            </Text>
            <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
              Disponivel: {item.saldodisponivel.toFixed(2)}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );

    return (
      <View style={[styles.viewHeader, styles.shadow]}>
        <ImageBackground
          source={images.banner1}
          resizeMode="cover"
          style={styles.imageHeader}
        >
          {/* Header Bar */}
          <View style={styles.viewHeaderBar}>
            <TouchableOpacity
              style={styles.opacityHeader}
              onPress={() => alert("Notificação OK")}
            >
              <Image
                source={icons.notification_white}
                resizeMode="contain"
                style={{ flex: 1 }}
              />
            </TouchableOpacity>
          </View>

          {/** Balance */}
          <View style={styles.alignJustifyCenter}>
            <Text style={styles.textH1}>Saldos</Text>
            <Text style={styles.textH3}>Bancario: {totalBancario}</Text>
            <Text style={styles.textH3}>Disponivel: {totalDisponivel}</Text>
          </View>

          {/** Saldos */}
          <View style={styles.viewSaldos}>
            <Text style={styles.TextSaldos}>Saldos Bancarios</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ marginTop: SIZES.base }}
              data={bancos.filter((b) => b.nome != "Nenhum")}
              renderItem={renderItem}
              keyExtractor={(item) => String(item.id)}
              horizontal
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }

  function renderAlert() {
    return <PriceAlert title="Teste" body="corpo Teste" />;
  }

  function navigateEdit(item) {
    navigation.navigate("Lancamento", { item });
  }

  function renderListTransaction() {
    return (
      <ListTransaction
        customContainerStyle={{ ...styles.shadow }}
        list={lancamentosHoje}
        title="Hoje:"
        Press={handleStoreLancamento}
        onPress={navigateEdit}
      />
    );
  }

  function renderList15() {
    return (
      <ListTransaction
        customContainerStyle={{ ...styles.shadow }}
        list={lancamentos15}
        title="Proximos 15: "
        Press={handleStoreLancamento}
        onPress={navigateEdit}
      />
    );
  }

  return (
    <ScrollView horizontal={false}>
      <View style={styles.viewContainer}>
        {renderHeader()}
        {renderAlert()}
        {renderListTransaction()}
        {renderList15()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingBottom: 130,
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
  viewHeader: {
    width: "100%",
    height: 290,
  },
  imageHeader: {
    flex: 1,
    alignItems: "center",
  },
  viewHeaderBar: {
    marginTop: SIZES.padding * 2,
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: SIZES.padding,
  },
  opacityHeader: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  alignJustifyCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  textH1: {
    ...FONTS.h1,
    color: COLORS.white,
    marginTop: SIZES.base,
  },
  textH3: { ...FONTS.h3, color: COLORS.white },
  textBody5: { ...FONTS.body5, color: COLORS.white },
  viewSaldos: { position: "absolute", bottom: "-30%" },
  TextSaldos: { ...FONTS.h2, marginLeft: SIZES.padding, color: COLORS.white },
  touchableRender: {
    width: "95%",
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    marginRight: SIZES.radius,
    borderRadius: 10,
  },
});

export default Home;
