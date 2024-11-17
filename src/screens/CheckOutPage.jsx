import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Icon, RadioButton } from "react-native-paper";

const CheckOutPage = () => {
  return (
    <View className="flex flex-col flex-1 justify-center items-center p-5 bg-white">
      <View className="items-center mb-4">
        <Text className="font-semibold text-lg">Total</Text>
        <Text className="font-semibold text-2xl">$ 0.00</Text>
      </View>

      <View className="w-full items-center mb-4">
        <View className="w-full flex flex-row justify-between items-center border rounded-lg px-5 py-2 mb-4">
          <View className="flex flex-row justify-center items-center">
            <Image
              source={require("../../assets/visa-logo.webp")}
              className="w-10 h-10 mr-4"
            />
            <Text className="mr-4">**** **** **** 1234</Text>
          </View>
          <RadioButton disabled={false} />
        </View>
        <View className="w-full flex flex-row justify-between items-center border rounded-lg px-5 py-2 mb-4">
          <View className="flex flex-row justify-center items-center">
            <Image
              source={require("../../assets/master-card.webp")}
              className="w-10 h-10 mr-4"
            />
            <Text className="mr-4">**** **** **** 1234</Text>
          </View>
          <RadioButton disabled={false} />
        </View>
        <View className="w-full flex flex-row justify-between items-center border rounded-lg px-5 py-2 mb-4">
          <View className="flex flex-row justify-center items-center">
            <Image
              source={require("../../assets/paypal-logo.png")}
              className="w-10 h-10 mr-4"
            />
            <Text className="mr-4">**** **** **** 1234</Text>
          </View>
          <RadioButton disabled={false} />
        </View>
      </View>

      <TouchableOpacity className="w-full items-center rounded-md bg-sky-300 py-2 mb-2">
        <View className="flex-row items-center justify-between">
          <Icon source={"cash-multiple"} size={30} color="white" />
          <Text className="text-white text-lg ml-2 font-semibold">Pay now</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity className="w-full items-center rounded-md bg-white py-2">
        <View className="flex-row items-center justify-between">
          <Icon source={"plus"} size={30} color="#7dd3fc" />
          <Text className="text-sky-300 text-lg ml-2 font-semibold">
            Add new card
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CheckOutPage;
