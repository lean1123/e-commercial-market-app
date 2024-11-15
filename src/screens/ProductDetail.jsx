import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../components/Header";
import SliderBanner from "../components/screen_electronics/SliderBanner";
import { Feather } from "@expo/vector-icons";
import Reviews from "../components/Reviews";

export default function ProductDetail() {
  return (
    <ScrollView className="flex-1 p-5 bg-white">
      <Header title="Product Detail" />
      <SliderBanner />
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-bold">$59</Text>
        <View className="flex-row items-center">
          <Text className="text-lg font-bold">⭐4.5</Text>
          <Text className="text-lg text-gray-500">(99 reviews)</Text>
        </View>
      </View>
      <View className="w-full h-[1px] bg-gray-100 my-6"></View>
      {/* Description */}
      <View>
        <Text className="text-lg font-bold">Description</Text>
        <Text className="text-lg text-gray-500 mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          tincidunt, nunc eget aliquam dapibus, erat nunc ultricies nunc, nec...
        </Text>
      </View>
      {/* option */}
      <View className="flex-row justify-between items-center mt-4">
        <View className="flex-col gap-1 items-start">
          <View className="flex-row gap-4">
            <Feather name="truck" size={24} color="cyan" />
            <Text className="text-lg text-gray-500">Express</Text>
          </View>
          <View className="flex-row gap-4">
            <Feather name="truck" size={24} color="cyan" />
            <Text className="text-lg text-gray-500">Good review</Text>
          </View>
        </View>
        <View className="flex-col gap-1 items-start">
          <View className="flex-row gap-4">
            <Feather name="truck" size={24} color="cyan" />
            <Text className="text-lg text-gray-500">30 - day free return</Text>
          </View>
          <View className="flex-row gap-4">
            <Feather name="truck" size={24} color="cyan" />
            <Text className="text-lg text-gray-500">Authorized shop</Text>
          </View>
        </View>
      </View>
      <View className="w-full h-[1px] bg-gray-100 my-6"></View>
      {/* reviews */}
      <Reviews />
    </ScrollView>
  );
}
