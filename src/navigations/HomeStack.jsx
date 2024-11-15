import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Header from "../components/Header";
import CategoryDetailsScreen from "../screens/CategoryDetailsScreen";
import FilterScreen from "../screens/FilterScreen";
import FreshFruitScreen from "../screens/FreshFruitScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="FreshFruitScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="FreshFruitScreen"
        component={FreshFruitScreen}
        options={{
          headerTitle: () => <Header />,
        }}
      />
      <Stack.Screen
        name="CategoryDetailsScreen"
        component={CategoryDetailsScreen}
      />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
