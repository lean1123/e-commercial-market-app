import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FavouriteScreen from "../screens/FavouriteScreen";
import Header from "../components/Header";
import ProductDetail from "../screens/ProductDetail";

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

const FavouriteStack = () => {
  return (
    <Stack.Navigator initialRouteName="favouriteScreen">
      <Stack.Screen
        name="favouriteScreen"
        component={FavouriteScreen}
        options={{
          header: () => <Header title="Favourite" />,
        }}
      />
      {/* <Stack.Screen
        name="ProductDetail"
        options={{
          header: () => <Header title={product.name} parent={false} />,
        }}
      >
        {() => <ProductDetail data={product} type={"clothes"} />}
      </Stack.Screen> */}
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          header: () => <Header title="Product Detail" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default FavouriteStack;
