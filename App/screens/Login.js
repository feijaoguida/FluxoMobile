import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/fetchActions";

import { InputText, TextButton } from "../components";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";

const Login = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(true);

  const dispatch = useDispatch();

  function handleLogin(navigation, username, password) {
    dispatch(login(navigation, username, password));
  }

  function handleCriarConta(navigation, username, password) {
    alert(`Aguarde novas Funcionalidades, ${username}`);
    //dispatch(login(navigation, username, password));
  }

  //"editor.formatOnPaste": true,

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
        <InputText
          placeholder="Email"
          onChangeText={setUsername}
          value={username}
        />
        <InputText
          placeholder="Senha"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={viewPassword}
        />

        <TextButton
          label="Acessar"
          onPress={() => handleLogin(navigation, username, password)}
        />
        <TextButton
          label="Criar Conta"
          onPress={() => handleCriarConta(navigation, username, password)}
        />
      </View>
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
});

export default Login;
