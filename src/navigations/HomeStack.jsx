import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Header from "../components/Header";
import CategoryDetailsScreen from "../screens/CategoryDetailsScreen";
import FilterScreen from "../screens/FilterScreen";
import FreshFruitScreen from "../screens/FreshFruitScreen";
import HomeScreen from "../screens/HomeScreen";
import CheckOutPage from "../screens/CheckOutPage";
import CheckOutStatusScreen from "../screens/CheckOutStatusScreen";
import CartScreen from "../screens/CartScreen";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CartScreen"
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
      <Stack.Screen name="CheckOutPage" component={CheckOutPage} />
      <Stack.Screen name="CheckOutStatus" component={CheckOutStatusScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
