import { View, Text, FlatList } from "react-native";
import React from "react";
import ProductItem from "./ProductItem";
import { TouchableOpacity } from "react-native";

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
  {
    id: 4,
    name: "Product 4",
    price: 400,
    image:
      "https://th.bing.com/th/id/R.091041199673c891a15abb759026d141?rik=WLlR%2fd8FPDl3PQ&pid=ImgRaw&r=0",
  },
];

export default function ListProduct() {
  return (
    <View className="flex-1 bg-white mt-4">
      {/* <Text>ListProduct</Text> */}
      <FlatList
        data={products}
        renderItem={({ item, index }) => (
          <ProductItem data={item} key={index} />
        )}
        keyExtractor={(item) => item.id.toString()}
        //nestedScrollEnabled={true}
        scrollEnabled={false}
      />
      <TouchableOpacity
        className="bg-gray-200 py-3 rounded-md mt-4"
        onPress={() => alert("See all")}
      >
        <Text className="text-gray-700 text-center">See all</Text>
      </TouchableOpacity>
    </View>
  );
}
