import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../configurations/firebaseConfig";

export default function Header({ title, parent, notShowCart }) {
  const navigate = useNavigation();
  const user = auth.currentUser;
  return (
    <View className="flex-row h-[90px] bg-white justify-between items-center border-b-[1px] border-gray-100 pt-8 px-5 pb-2">
      <View className="flex-row items-center gap-2">
        {!parent && (
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <AntDesign name="left" size={14} color="gray" />
          </TouchableOpacity>
        )}
        <Text className="text-[16px] font-bold">{title}</Text>
      </View>
      {!notShowCart && (
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={() => {
              navigate.navigate("CartScreen");
            }}
          >
            <AntDesign name="shoppingcart" size={24} color="gray" />
          </TouchableOpacity>
          <Image src={user?.photoURL} className="w-10 h-10 rounded-full" />
        </View>
      )}
    </View>
  );
}
