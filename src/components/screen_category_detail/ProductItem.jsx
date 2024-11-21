import { View, Text, Image } from "react-native";
import React from "react";
import { FontAwesome, AntDesign } from "react-native-vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AirbnbRating } from "react-native-ratings";

export default function ProductItem({ data = {} }) {
  const navigate = useNavigation();
  return (
    <TouchableOpacity
      className="flex-row justify-between border border-gray-200 rounded-lg p-2 mt-2"
      onPress={() =>
        navigate.navigate("ProductDetail", { type: "productDetail", data })
      }
    >
      <View className="flex-row gap-2">
        <Image source={{ uri: data?.image[0] }} className="w-[70px] h-[70px]" />
        <View className="flex-col justify-around">
          <Text className="font-bold text-[20px]">
            {data?.name.length > 20
              ? `${data?.name.substring(0, 20)}...`
              : data?.name}
          </Text>
          <View className="flex-row gap-2">
            {data?.rating == 0 ? (
              <Text className="text-gray-500">No rating</Text>
            ) : (
              <AirbnbRating
                showRating={false}
                size={14}
                defaultRating={data?.rating}
                isDisabled
              />
            )}
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
