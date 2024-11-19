import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Checkbox, Icon } from "react-native-paper";

const CartItem = ({ item, onCheckboxChange }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxPress = () => {
    setChecked(!checked);
    onCheckboxChange(item);
  };

  return (
    <View className="w-full border-b border-gray-300 mb-2 py-2">
      <TouchableOpacity className="w-full flex flex-row justify-between items-center">
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={handleCheckboxPress}
        />
        <View className="flex-row">
          <Image
            source={require("../../assets/iphone.webp")}
            className="w-20 h-20 mr-6"
          />
          <View className="flex flex-col">
            <Text className="text-lg font-semibold">Product 1</Text>
            <Text className="text-gray-400">Lorem ipsum dolor sit.</Text>
            <Text className="text-black text-base font-semibold">$500</Text>
          </View>
        </View>
        <View className="flex flex-col">
          <TouchableOpacity className="mb-6">
            <Icon source={"pencil"} size={16} />
          </TouchableOpacity>
          <Text>X1</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
