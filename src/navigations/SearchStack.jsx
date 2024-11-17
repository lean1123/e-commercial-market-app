import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreen";
import Electronics from "../screens/CategoryDetail";
import FreshFruits from "../screens/FreshFruits";
import ProductDetail from "../screens/ProductDetail";
import Header from "../components/Header";
import CategoryDetail from "../screens/CategoryDetail";

const product = {
  id: 1,
  name: "Product 1",
  price: 100,
  rating: 4.5,
  image: [
    "https://healthjade.com/wp-content/uploads/2017/10/pear.jpg",
    "https://healthjade.com/wp-content/uploads/2017/10/pear.jpg",
    "https://healthjade.com/wp-content/uploads/2017/10/pear.jpg",
    "https://healthjade.com/wp-content/uploads/2017/10/pear.jpg",
  ],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, nunc eget aliquam dapibus, erat nunc ultricies nunc, nec...",
  color: ["red", "blue", "green"],
  size: ["XS", "S", "M", "L", "XL"],
};

const Stack = createStackNavigator();
const SearchStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SearchScreen"
      screenOptions={
        {
          //headerShown: false,
        }
      }
    >
      <Stack.Screen
        name="CategoryDetail"
        options={{
          header: () => <Header title="Electronics" />,
        }}
      >
        {() => <CategoryDetail />}
      </Stack.Screen>

      <Stack.Screen
        name="productDetail"
        options={{
          header: () => <Header title={product.name} parent={false} />,
        }}
      >
        {() => <ProductDetail data={product} type={""} />}
      </Stack.Screen>
      <Stack.Screen
        name="SearchScreen"
        options={{
          header: () => <Header title="Search" />,
        }}
      >
        {() => <SearchScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default SearchStack;
