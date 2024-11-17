import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../screens/RegisterScreen";
import Login from "../screens/Login";

const stack = createStackNavigator();

export default function AuthStack() {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="Login" component={Login} />
      <stack.Screen name="Register" component={RegisterScreen} />
    </stack.Navigator>
  );
}
