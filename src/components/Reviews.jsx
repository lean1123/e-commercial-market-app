import { View, Text, FlatList } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import ReviewItem from "./ReviewItem";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    review: "Good product",
    date: "12/12/2021",
    image:
      "https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg",
  },
  {
    id: 2,
    name: "Jane Doe",
    review: "Bad product",
    date: "12/12/2021",
    image:
      "https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg",
  },
  {
    id: 3,
    name: "John Doe",
    review: "Good product",
    date: "12/12/2021",
    image:
      "https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg",
  },
  {
    id: 4,
    name: "Jane Doe",
    review: "Bad product",
    date: "12/12/2021",
    image:
      "https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg",
  },
];

export default function Reviews() {
  return (
    <View>
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold">Reviews</Text>
        <View className="flex-row items-center">
          <Text className="text-gray-500">See all</Text>
          <AntDesign name="caretright" size={14} color="gray" />
        </View>
      </View>
      {/* list review */}
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        scrollEnabled={false}
      />
    </View>
  );
}
