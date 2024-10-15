import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator();
const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName="searchScreen">
      <Stack.Screen name="searchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;
