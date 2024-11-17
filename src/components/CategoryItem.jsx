import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CategoryItem = ({ category }) => {
  const navigation = useNavigation();

  const handleOnPressCategory = () => {
    navigation.navigate("CategoryDetail", { category });
  };

  return (
    <TouchableOpacity
      className="pr-4 justify-center items-center"
      onPress={handleOnPressCategory}
    >
      <View
        className={`flex w-20 h-20 justify-center items-center p2 rounded-full ${category?.bg}`}
      >
        <Image source={{ uri: category.picUrl }} className="w-16 h-16 " />
      </View>
      <Text className="font-bold text-base">{category.name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
