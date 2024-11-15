import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function FreshFruitsItem({ data }) {
  return (
    <View className="flex-1 gap-2">
      <Image src={data?.image} className="w-full h-[130px]" />
      <View className="flex-row justify-between items-center">
        <Text className="text-[20px] font-bold">{data?.name}</Text>
        <AntDesign name="pluscircleo" size={24} color="#7326EB" />
      </View>
      <View className="flex-row justify-between items-center">
        <View className="flex-row gap-2">
          <FontAwesome name="star" size={18} color="yellow" />
          <FontAwesome name="star" size={18} color="yellow" />
          <FontAwesome name="star" size={18} color="yellow" />
          <FontAwesome name="star" size={18} color="yellow" />
          <FontAwesome name="star" size={18} color="gray" />
        </View>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>${data?.price}</Text>
      </View>
    </View>
  );
}
