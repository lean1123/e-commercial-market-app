import { View, Text } from "react-native";
import React from "react";
import { Icon } from "react-native-paper";

const OrtherFilterSubItem = ({ title, iconName }) => {
  return (
    <View className="w-40 h-28 border border-gray-300 rounded-md justify-center items-center">
      <Icon source={iconName} size={40} />
      <Text>{title}</Text>
    </View>
  );
};

export default OrtherFilterSubItem;
