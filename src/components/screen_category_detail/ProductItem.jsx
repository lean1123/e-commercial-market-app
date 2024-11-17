import { View, Text, Image } from "react-native";
import React from "react";
import { FontAwesome, AntDesign } from "react-native-vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProductItem({ data }) {
  const navigate = useNavigation();
  return (
    <TouchableOpacity
      className="flex-row justify-between border border-gray-200 rounded-lg p-2 mt-2"
      onPress={() =>
        navigate.navigate("productDetail", { type: "productDetail", data })
      }
    >
      <View className="flex-row gap-2">
        <Image src={data?.image} className="w-[70px] h-[70px]" />
        <View className="flex-col justify-around">
          <Text className="font-bold text-[20px]">{data?.name}</Text>
          <View className="flex-row gap-2">
            <FontAwesome name="star" size={18} color="yellow" />
            <FontAwesome name="star" size={18} color="yellow" />
            <FontAwesome name="star" size={18} color="yellow" />
            <FontAwesome name="star" size={18} color="yellow" />
            <FontAwesome name="star" size={18} color="gray" />
          </View>
        </View>
      </View>
      <View className="flex-col justify-around items-end">
        <AntDesign name="pluscircleo" size={24} color="#7326EB" />
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>${data?.price}</Text>
      </View>
    </TouchableOpacity>
  );
}