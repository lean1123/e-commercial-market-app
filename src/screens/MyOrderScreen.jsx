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
import { useNavigation } from "@react-navigation/native";

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

const MyOrderScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      className="flex flex-col flex-1 p-5 bg-white"
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Text className="text-2xl font-bold mb-4">My Orders</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ marginTop: 40 }}
        scrollEnabled={false}
        style
      />

      <TouchableOpacity
        className="bg-sky-300 rounded-md w-full flex flex-row items-center justify-center py-3 mt-4"
        onPress={() => {
          navigation.navigate("myInfoScreen");
        }}
      >
        <Text className="text-white text-base font-semibold mr-2">
          BACK TO MY PROFILE
        </Text>
        <Icon source={"arrow-left"} color="white" size={18} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MyOrderScreen;
