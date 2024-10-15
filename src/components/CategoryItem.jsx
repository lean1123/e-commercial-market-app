import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CategoryItem = ({ category }) => {
  const navigation = useNavigation();

  const handleOnPressCategory = () => {
    navigation.navigate("Orther", { category });
  };

  return (
    <TouchableOpacity className="pr-4" onPress={handleOnPressCategory}>
      <View className="flex flex-col justify-center items-center">
        <Image
          source={{ uri: category.picUrl }}
          className="w-20 h-20 mb-2 rounded-full"
        />
        <Text className="font-bold text-base">{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;
