import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyInfoScreen from "../screens/MyInfoScreen";
import Header from "../components/Header";
import MyOrderScreen from "../screens/MyOrderScreen";

const Stack = createStackNavigator();

const MyInfoStack = () => {
  return (
    <Stack.Navigator initialRouteName="myInfoScreen">
      <Stack.Screen
        name="myInfoScreen"
        component={MyInfoScreen}
        options={{
          header: () => (
            <Header title="My Info" parent={false} notShowCart={true} />
          ),
        }}
      />
      <Stack.Screen
        name="MyOrderScreen"
        component={MyOrderScreen}
        options={{
          header: () => (
            <Header title="My Orders" parent={false} notShowCart={true} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MyInfoStack;
