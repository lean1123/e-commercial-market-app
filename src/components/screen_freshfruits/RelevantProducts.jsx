import { View, Text, FlatList } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import ProductItem from "../screen_category_detail/ProductItem";

const data = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    image: "https://healthjade.com/wp-content/uploads/2017/10/pear.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    image: "https://healthjade.com/wp-content/uploads/2017/10/pear.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    image: "https://healthjade.com/wp-content/uploads/2017/10/pear.jpg",
  },
  {
    id: 4,
    name: "Product 4",
    price: 400,
    image: "https://healthjade.com/wp-content/uploads/2017/10/pear.jpg",
  },
];

export default function RelevantProducts() {
  return (
    <View className="my-5">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold">Relevant products</Text>
        <View className="flex-row items-center">
          <Text className="text-gray-500">See all</Text>
          <AntDesign name="caretright" size={14} color="gray" />
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <ProductItem data={item} key={index} />
        )}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />
    </View>
  );
}
