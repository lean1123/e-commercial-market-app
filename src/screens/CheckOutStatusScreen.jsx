import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-paper";
import { AirbnbRating } from "react-native-ratings";
import { useDispatch } from "react-redux";

// import { auth } from "../configurations/firebaseConfig";
// import { fetchNumOfItemsInCart } from "../hooks/slices/cartSlice";

import { fetchNumOfItemsInCart } from "../hooks/slices/cartSlice";
import { auth } from "../configurations/firebaseConfig";

const CheckOutStatusScreen = ({ route }) => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const { status } = route.params;
  const dispatch = useDispatch();

  return (
    <View className="flex flex-1 items-center justify-center p-5">
      <View className="items-center">
        {status === "success" ? (
          <Icon source={"check-circle"} size={100} color="green" />
        ) : (
          <Icon source={"close-circle"} size={100} color="red" />
        )}
        {status === "success" ? (
          <Text className="text-green-600 text-xl font-semibold">
            Order Placed Successfully
          </Text>
        ) : (
          <Text className="text-red-600 text-xl font-semibold">
            Order Placed Failed
          </Text>
        )}
      </View>
      <View className="flex flex-col border-b border-gray-300"></View>

      <View className="flex flex-col">
        <View className="w-full flex-row justify-between items-center p-4">
          <View className="flex-row items-center">
            {status === "success" ? (
              <Text className="text-base font-semibold px-2 py-1 bg-green-200 rounded-xl text-green-600">
                Success
              </Text>
            ) : (
              <Text className="text-base font-semibold px-2 py-1 bg-red-200 rounded-xl text-red-600">
                Failed
              </Text>
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="bg-sky-300 rounded-md w-full flex-row items-center justify-center py-3 mt-4"
        onPress={() => {
          navigation.navigate("HomeScreen");

          dispatch(fetchNumOfItemsInCart({ userId: user?.uid }));

          //           dispatch(fetchNumOfItemsInCart({ userId: auth.currentUser.uid }));
        }}
      >
        <Icon source={"home"} color="white" className="mr-2" size={30} />
        <Text className="text-white text-base font-semibold">Back To Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckOutStatusScreen;
