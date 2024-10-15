import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InboxScreen from "../screens/InboxScreen";

const Stack = createStackNavigator();

const InboxStack = () => {
  return (
    <Stack.Navigator initialRouteName="inboxScreen">
      <Stack.Screen name="inboxScreen" component={InboxScreen} />
    </Stack.Navigator>
  );
};

export default InboxStack;
