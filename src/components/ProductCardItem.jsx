import { View, Text, Image } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMoneyBill, faStar } from "@fortawesome/free-solid-svg-icons";

const ProductCardItem = ({ product }) => {
  return (
    <View className="p-2 w-60 h-80 bg-slate-200 rounded-md shadow-md mr-4">
      <Image
        source={{ uri: "https://picsum.photos/200" }}
        className="w-full h-40 rounded-md mb-10"
      />
      <Text className="text-lg font-bold mb-4">Product Name</Text>
      <View className="flex-row justify-between">
        <View className="flex-row items-center">
          <FontAwesomeIcon icon={faStar} color="#fde047" />
          <Text className="ml-1 text-sm font-bold"> 4.5</Text>
        </View>
        <View className="flex-row items-center">
          <FontAwesomeIcon icon={faMoneyBill} color="#38bdf8" />
          <Text className="ml-1 text-sm font-bold text-sky-400"> 200.00</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductCardItem;
