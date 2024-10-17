import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAdd, faStar } from "@fortawesome/free-solid-svg-icons";

const ProductHorizalCardItem = () => {
  return (
    <TouchableOpacity className="p-2 flex-row justify-around border rounded-md border-gray-100 items-center mb-2">
      <Image
        source={{ uri: "https://picsum.photos/200" }}
        className="w-20 h-20 rounded-md overflow-hidden"
      />
      <View className="flex-col items-center">
        <Text className="font-bold text-sm">Product name</Text>
        {/* rating */}
        <View className="flex-row">
          <FontAwesomeIcon icon={faStar} color="#facc15" />
          <FontAwesomeIcon icon={faStar} color="#facc15" />
          <FontAwesomeIcon icon={faStar} color="#facc15" />
          <FontAwesomeIcon icon={faStar} color="#facc15" />
          <FontAwesomeIcon icon={faStar} color="#facc15" />
        </View>
      </View>
      <View className="flex-col items-center">
        <TouchableOpacity className="p-2 bg-cyan-50 rounded-full">
          <FontAwesomeIcon icon={faAdd} />
        </TouchableOpacity>
        <Text>$899</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductHorizalCardItem;
