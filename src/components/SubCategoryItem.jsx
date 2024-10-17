import { View, Text, Image, TouchableHighlight } from "react-native";
import React from "react";

const SubCategoryItem = () => {
  return (
    <TouchableHighlight
      className="w-40 h-40 rounded-md overflow-hidden mr-5"
      onTouchEnd={() => {
        alert("Touched!");
      }}
    >
      <Image
        source={{ uri: "https://picsum.photos/200" }}
        className="w-full h-40"
      />
    </TouchableHighlight>
  );
};

export default SubCategoryItem;
