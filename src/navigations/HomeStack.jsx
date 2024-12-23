import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
//import CategoryDetailsScreen from "../screens/CategoryDetailsScreen";

import { useSelector } from "react-redux";
import Header from "../components/Header";
import CartScreen from "../screens/CartScreen";
import CategoryDetail from "../screens/CategoryDetail";
import CheckOutPage from "../screens/CheckOutPage";
import CheckOutStatusScreen from "../screens/CheckOutStatusScreen";
import FilterScreen from "../screens/FilterScreen";
import HomeScreen from "../screens/HomeScreen";
import ProductDetail from "../screens/ProductDetail";

const Stack = createStackNavigator();

const HomeStack = () => {
  const { category } = useSelector((state) => state.search);
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
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
      <Stack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CheckOutPage" component={CheckOutPage} />
      <Stack.Screen
        name="CheckOutStatus"
        component={CheckOutStatusScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          header: () => <Header title="Product Detail" />,
        }}
      />

      <Stack.Screen name="CartScreen" component={CartScreen} />

      <Stack.Screen
        name="CategoryDetail"
        options={{
          header: () => <Header title={category} />,
        }}
      >
        {() => <CategoryDetail />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeStack;
