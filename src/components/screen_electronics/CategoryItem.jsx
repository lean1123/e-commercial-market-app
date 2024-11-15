import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function CategoryItem({ category, isFocused }) {
  return (
    <TouchableOpacity
      className="w-[110px] h-[110px] justify-center items-center rounded-lg mr-5"
      style={{
        backgroundColor: category?.bgcolor,
        borderWidth: isFocused ? 2 : 0,
        borderColor: isFocused ? category?.borderColor : "transparent",
      }}
    >
      <Image src={category?.image} className="w-[70px] h-[70px]" />
    </TouchableOpacity>
  );
}
