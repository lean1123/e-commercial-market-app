import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";

const CheckOutStatusScreen = () => {
  const [status, setStatus] = useState(true);
  return (
    <View className="flex flex-1 items-center justify-center p-5">
      <View className="items-center">
        {status ? (
          <Icon source={"check-circle"} size={100} color="green" />
        ) : (
          <Icon source={"close-circle"} size={100} color="red" />
        )}
        <Text className="text-sky-400 text-xl font-semibold">
          {status ? "Order Placed Successfully!" : "Order Failed!"}
        </Text>
        <Text className="px-16 py-2 text-base text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
          obcaecati, hic sed fugit velit dicta sint.
        </Text>
      </View>
      <View className="flex flex-col border-b border-gray-300">
        <View className="w-full flex-row justify-between items-center p-4">
          <Text className="text-base font-semibold text-gray-400">
            Subtotal
          </Text>
          <Text className="text-lg font-semibold">$ 0.00</Text>
        </View>
        <View className="w-full flex-row justify-between items-center p-4">
          <Text className="text-base font-semibold text-gray-400">
            Tax (10%)
          </Text>
          <Text className="text-lg font-semibold">$ 0.00</Text>
        </View>
        <View className="w-full flex-row justify-between items-center p-4">
          <Text className="text-base font-semibold text-gray-400">Fee</Text>
          <Text className="text-lg font-semibold">$ 0.00</Text>
        </View>
      </View>
      <View className="flex flex-col border-b border-gray-300">
        <View className="w-full flex-row justify-between items-center p-4">
          <Text className="text-base font-semibold text-gray-400">Card</Text>
          <View className="flex-row items-center">
            <Image
              source={require("../../assets/master-card.webp")}
              className="w-10 h-10"
            />
            <Text className="text-gray-400">**** 1234</Text>
          </View>
        </View>
      </View>
      <View className="flex flex-col">
        <View className="w-full flex-row justify-between items-center p-4">
          <Text className="text-base font-semibold text-gray-400">Total</Text>
          <View className="flex-row items-center">
            {status ? (
              <Text className="text-base font-semibold px-2 py-1 bg-green-200 rounded-xl text-green-600">
                Success
              </Text>
            ) : (
              <Text className="text-base font-semibold px-2 py-1 bg-red-200 rounded-xl text-red-600">
                {" "}
                Failed
              </Text>
            )}
            <Text className="text-green-700 text-base ml-2">$3,040</Text>
          </View>
        </View>
      </View>
      <View className="w-full flex-col items-center">
        <Text className="mb-2">How was your experience?</Text>
        <AirbnbRating showRating={false} size={20} />
      </View>
      <TouchableOpacity className="bg-sky-300 rounded-md w-full flex-row items-center justify-center py-3 mt-4">
        <Icon source={"home"} color="white" className="mr-2" size={30} />
        <Text className="text-white text-base font-semibold">Back To Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckOutStatusScreen;
