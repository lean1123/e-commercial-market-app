import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../configurations/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchNumOfItemsInCart } from "../hooks/slices/cartSlice";

export default function Header({ title, parent, notShowCart }) {
  const navigate = useNavigation();
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const { numOfItemsInCart } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchNumOfItemsInCart({ userId: user?.uid }));
  }, [dispatch, user]);
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
            <AntDesign name="shoppingcart" size={30} color="gray" />
            {numOfItemsInCart > 0 && (
              <View className="w-5 h-5 bg-red-600 rounded-full flex justify-center items-center absolute left-4 -top-1">
                <Text className="text-white font-bold">{numOfItemsInCart}</Text>
              </View>
            )}
          </TouchableOpacity>
          <Image src={user?.photoURL} className="w-10 h-10 rounded-full" />
        </View>
      )}
    </View>
  );
}
