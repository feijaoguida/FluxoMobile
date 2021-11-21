import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import LinearGradient from "react-native-linear-gradient";

import { Home, Relatorio } from "../screens";
import { COLORS, FONTS, icons } from "../constants";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={(styles.shadow, styles.touchableButton)}
      onPress={onPress}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={{ width: 60, height: 60, borderRadius: 35 }}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: "transparent",
          height: 65,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.viewTab}>
              <Image
                source={icons.home}
                resizeMode="contain"
                style={{
                  ...styles.imageTab,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
              <Text
                style={{
                  ...styles.textTab,
                  color: focused ? COLORS.primary : COLORS.black,
                }}
              >
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.viewTab}>
              <Image
                source={icons.pie_chart}
                resizeMode="contain"
                style={{
                  ...styles.imageTab,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
              <Text
                style={{
                  ...styles.textTab,
                  color: focused ? COLORS.primary : COLORS.black,
                }}
              >
                LANÇAMENTOS
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Lancamentos"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.viewTab}>
              <Image
                source={icons.home}
                resizeMode="contain"
                style={{
                  ...styles.imageTab,
                  tintColor: COLORS.white,
                }}
              />
            </View>
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Relatório"
        component={Relatorio}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.viewTab}>
              <Image
                source={icons.line_graph}
                resizeMode="contain"
                style={{
                  ...styles.imageTab,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
              <Text
                style={{
                  ...styles.textTab,
                  color: focused ? COLORS.primary : COLORS.black,
                }}
              >
                RELATÓRIO
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.viewTab}>
              <Image
                source={icons.settings}
                resizeMode="contain"
                style={{
                  ...styles.imageTab,
                  tintColor: focused ? COLORS.primary : COLORS.black,
                }}
              />
              <Text
                style={{
                  ...styles.textTab,
                  color: focused ? COLORS.primary : COLORS.black,
                }}
              >
                CONFIG
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  touchableButton: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
  },

  viewTab: {
    alignItems: "center",
    justifyContent: "center",
  },

  imageTab: {
    width: 25,
    height: 25,
  },
  textTab: {
    ...FONTS.body7,
  },
});

export default Tabs;
