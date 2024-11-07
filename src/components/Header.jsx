import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function Header({ title }) {
  return (
    <View className="flex-1 flex-row justify-between items-center mb-3 mt-8">
      <View className="flex-row items-center gap-2">
        <AntDesign name="left" size={14} color="gray" />
        <Text className="text-[16px] font-bold">{title}</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <AntDesign name="shoppingcart" size={24} color="gray" />
        <Image
          src="https://img.freepik.com/premium-psd/3d-render-cartoon-avatar-isolated_570939-91.jpg?w=1800"
          className="w-10 h-10 rounded-full"
        />
      </View>
    </View>
  );
}
