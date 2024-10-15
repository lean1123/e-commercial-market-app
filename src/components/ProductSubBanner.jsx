import { View, Text, ImageBackground } from "react-native";
import React from "react";

const ProductSubBanner = () => {
  return (
    <ImageBackground
      className="w-full h-full"
      source={require("../../assets/subbaner.jpg")}
      resizeMode="cover"
    >
      <Text className="p-1 bg-orange-600 text-white w-10 rounded-r-xl font-bold mt-2">
        30%
      </Text>
    </ImageBackground>
  );
};

export default ProductSubBanner;
