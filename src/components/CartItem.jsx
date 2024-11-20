import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";

const CartItem = ({ item, onCheckboxChange, handleQuantityChange }) => {
  console.log("item", item);

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
        <View className="flex-1 flex-row justify-center items-center ml-2">
          <Image
            source={require("../../assets/iphone.webp")}
            className="w-20 h-20 mr-6"
          />
          <View className="flex flex-col">
            <Text className="text-base font-semibold">{item.name}</Text>
            <Text className="text-sm font-medium">Price: ${item.price}</Text>

            <View className="flex-row items-center">
              <TouchableOpacity
                className="w-8 h-8 rounded-md bg-gray-100 flex-row items-center justify-center"
                onPress={() => handleQuantityChange(item, -1)}
              >
                <Feather name="minus" size={16} />
              </TouchableOpacity>
              <Text className="mx-4">{item.quantity}</Text>
              <TouchableOpacity
                className="w-8 h-8 rounded-md bg-gray-100 flex-row items-center justify-center"
                onPress={() => handleQuantityChange(item, 1)}
              >
                <Feather name="plus" size={16} />
              </TouchableOpacity>
            </View>
            <Text className="text-base font-medium">
              Total: ${item.price * item.quantity}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
