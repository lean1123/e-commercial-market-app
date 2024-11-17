import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
//import CategoryDetailsScreen from "../screens/CategoryDetailsScreen";

import FilterScreen from "../screens/FilterScreen";
import FreshFruitScreen from "../screens/FreshFruitScreen";
import HomeScreen from "../screens/HomeScreen";
import CheckOutPage from "../screens/CheckOutPage";
import CheckOutStatusScreen from "../screens/CheckOutStatusScreen";
import CartScreen from "../screens/CartScreen";
import Header from "../components/Header";
import CategoryDetail from "../screens/CategoryDetail";
import ProductDetail from "../screens/ProductDetail";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProductDetail"
      screenOptions={
        {
          //headerShown: false,
        }
      }
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: () => <Header title="Home" parent={true} />,
        }}
      />

      {/* <Stack.Screen
        name="CategoryDetailsScreen"
        //component={CategoryDetailsScreen}
        options={{
          header: () => <Header title="Electronics" />,
        }}
      >
        {() => <CategoryDetail />}
      </Stack.Screen> */}
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="CheckOutPage" component={CheckOutPage} />
      <Stack.Screen name="CheckOutStatus" component={CheckOutStatusScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

export default HomeStack;
