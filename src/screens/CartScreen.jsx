import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-paper";
import CartItem from "../components/CartItem";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 20,
    quantity: 1,
  },
  {
    id: 2,
    name: "Product 2",
    price: 30,
    quantity: 2,
  },
  {
    id: 3,
    name: "Product 3",
    price: 40,
    quantity: 3,
  },
];

const CartScreen = () => {
  return (
    <ScrollView
      className="flex flex-col flex-1 p-5 bg-white"
      contentContainerStyle={{ alignItems: "center" }}
    >
      <FlatList
        data={products}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ marginTop: 40 }}
        scrollEnabled={false}
        style
      />

      <View className="w-full flex-row justify-between my-4">
        <Text className="text-base font-semibold">TOTAL</Text>
        <Text className="text-lg font-bold">$9000</Text>
      </View>

      <TouchableOpacity className="bg-sky-300 rounded-md w-full flex flex-row items-center justify-center py-3 mt-4">
        <Text className="text-white text-base font-semibold mr-2">Next</Text>
        <Icon source={"arrow-right"} color="white" size={18} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CartScreen;
