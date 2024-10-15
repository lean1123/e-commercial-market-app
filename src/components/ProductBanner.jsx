import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";

const ProductMainBanner = ({ product }) => {
  return (
    <ImageBackground
      className="pr-40 pl-6 pt-10 pb-10"
      resizeMode="cover"
      source={require("../../assets/shoesbanner2.jpg")}
    >
      <Text className="mb-1 text-xl font-bold text-white">Shoes</Text>
      <Text className="mb-4 text-base text-white">50% off</Text>
      {/* <Button title="Buy now" className="bg-black" /> */}
      <TouchableOpacity className="bg-black p-2 rounded-md">
        <Text className="text-white text-center text-sm font-bold">
          Buy Now
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default ProductMainBanner;
