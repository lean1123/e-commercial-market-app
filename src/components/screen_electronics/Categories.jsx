import { View, Text, FlatList } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import CategoryItem from "./CategoryItem";

const categories = [
  {
    id: 1,
    image: "https://img.icons8.com/ios/452/iphone.png",
    bgcolor: "#FFDDC1",
    borderColor: "#FFA45B",
  },
  {
    id: 2,
    image: "https://img.icons8.com/ios/452/laptop.png",
    bgcolor: "#C9EAFD",
    borderColor: "#3ECCCD",
  },
  {
    id: 3,
    image: "https://img.icons8.com/ios/452/headphones.png",
    bgcolor: "#FBD3E9",
    borderColor: "#F973D7",
  },
  {
    id: 4,
    image: "https://img.icons8.com/ios/452/headphones.png",
    bgcolor: "#C9EAFD",
    borderColor: "#3ECCCD",
  },
  {
    id: 5,
    image: "https://img.icons8.com/ios/452/camera.png",
    bgcolor: "#FFDDC1",
    borderColor: "#FFA45B",
  },
];

export default function Categories() {
  return (
    <View>
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold">Categories</Text>
        <View className="flex-row items-center">
          <Text className="text-gray-500">See all</Text>
          <AntDesign name="caretright" size={14} color="gray" />
        </View>
      </View>
      <FlatList
        data={categories}
        renderItem={({ item, index }) => (
          <CategoryItem category={item} isFocused={index === 1} />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="mt-5"
      />
    </View>
  );
}
