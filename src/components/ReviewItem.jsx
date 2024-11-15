import { View, Text, Image } from "react-native";
import React from "react";

export default function ReviewItem({ review }) {
  return (
    <View className="flex-row my-2 gap-4">
      <Image
        source={{ uri: review.image }}
        style={{ width: 50, height: 50, borderRadius: 50 }}
      />
      <View className="flex-col flex-1">
        <View className="flex-row flex-1 justify-between">
          <Text className="text-lg">{review.name}</Text>
          <Text className="text-lg text-gray-500">{review.date}</Text>
        </View>
        <Text className="text-sm text-gray-500">{review.review}</Text>
      </View>
    </View>
  );
}
