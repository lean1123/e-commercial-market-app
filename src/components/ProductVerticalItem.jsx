import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ProductVerticalItem = () => {
  return (
    <View className="items-center w-1/2 p-2">
      <View className="bg-slate-300 flex-col justify-center items-center p-4 rounded-md">
        <Image
          source={require("../../assets/apple.png")}
          className="w-28 h-28 mb-1 "
          style={{ resizeMode: "cover" }}
        />
        <View className="w-full flex-row justify-between mb-1">
          <Text className="font-bold">Apple</Text>
          <TouchableOpacity className="p-1 rounded-full bg-white items-center">
            <FontAwesomeIcon icon={faAdd} />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between w-full">
          <View className="flex-row">
            <FontAwesomeIcon icon={faStar} color="yellow" />
            <FontAwesomeIcon icon={faStar} color="yellow" />
            <FontAwesomeIcon icon={faStar} color="yellow" />
            <FontAwesomeIcon icon={faStar} color="yellow" />
            <FontAwesomeIcon icon={faStar} color="yellow" />
          </View>
          <Text>$2.99</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductVerticalItem;
