import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FavouriteScreen from "../screens/FavouriteScreen";

const Stack = createStackNavigator();

const FavouriteStack = () => {
  return (
    <Stack.Navigator initialRouteName="favouriteScreen">
      <Stack.Screen name="favouriteScreen" component={FavouriteScreen} />
    </Stack.Navigator>
  );
};

export default FavouriteStack;
