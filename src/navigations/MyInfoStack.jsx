import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyInfoScreen from "../screens/MyInfoScreen";

const Stack = createStackNavigator();

const MyInfoStack = () => {
  return (
    <Stack.Navigator initialRouteName="myInfoScreen">
      <Stack.Screen name="myInfoScreen" component={MyInfoScreen} />
    </Stack.Navigator>
  );
};

export default MyInfoStack;
