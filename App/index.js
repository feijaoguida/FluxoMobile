import React from "react";
import {
  CryptoDetail,
  Login,
  Transaction,
  SelectGroup,
  EditLancamento,
  Relatorio,
} from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";

import Tabs from "./navigation/tabs";

import store from "./store";

const Stack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Login"}
        >
          <Stack.Screen name="SelectGroup" component={SelectGroup} />

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Lancamento" component={EditLancamento} />
          <Stack.Screen name="CryptoDetail" component={CryptoDetail} />
          <Stack.Screen name="Transaction" component={Transaction} />
          <Stack.Screen name="Relatorio" component={Relatorio} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
