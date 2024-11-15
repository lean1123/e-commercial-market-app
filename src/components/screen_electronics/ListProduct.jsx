import { View, Text, FlatList } from "react-native";
import React from "react";
import ProductItem from "./ProductItem";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    image:
      "https://th.bing.com/th/id/R.091041199673c891a15abb759026d141?rik=WLlR%2fd8FPDl3PQ&pid=ImgRaw&r=0",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    image:
      "https://th.bing.com/th/id/R.091041199673c891a15abb759026d141?rik=WLlR%2fd8FPDl3PQ&pid=ImgRaw&r=0",
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    image:
      "https://th.bing.com/th/id/R.091041199673c891a15abb759026d141?rik=WLlR%2fd8FPDl3PQ&pid=ImgRaw&r=0",
  },
];

export default function ListProduct() {
  return (
    <View className="flex-1 bg-white mt-5">
      <Text>ListProduct</Text>
      <FlatList
        data={products}
        renderItem={({ item, index }) => (
          <ProductItem data={item} key={index} />
        )}
        keyExtractor={(item) => item.id.toString()}
        //nestedScrollEnabled={true}
        scrollEnabled={false}
      />
    </View>
  );
}
