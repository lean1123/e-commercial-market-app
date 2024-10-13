import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "./components/HomeScreen";
import OrtherScreen from "./components/OrtherScreen";

const Stack = createStackNavigator();

const HomeIndex = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Orther" component={OrtherScreen} />
    </Stack.Navigator>
  );
};

export default HomeIndex;
