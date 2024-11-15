import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreen";
import Electronics from "../screens/Electronics";
import FreshFruits from "../screens/FreshFruits";
import ProductDetail from "../screens/ProductDetail";

const Stack = createStackNavigator();
const SearchStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="searchScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="searchScreen" component={Electronics} /> */}
      {/* <Stack.Screen name="Search" component={FreshFruits} /> */}
      <Stack.Screen name="Electronics" component={ProductDetail} />
    </Stack.Navigator>
  );
};

export default SearchStack;
