import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../services/api";

import { addUser, addToken, addExpiration } from "../ducks/auth";

export const login = (navigation, username, password) => {
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("token", value);
    } catch (e) {
      // saving error
    }
  };

  return async (dispatch) => {
    let authdata = {
      grant_type: "password",
      username,
      password,
    };

    let response = await api(
      "/token",
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
      authdata
    );
    if (response.access_token) {
      storeData(response.access_token);
      dispatch(addUser(response.user));
      dispatch(addToken(response.access_token));
      dispatch(
        addExpiration(Math.floor(new Date().getTime() / 1000) + 1440 * 60)
      );

      navigation.navigate("SelectGroup", {});
    }
    return response;
  };
};
