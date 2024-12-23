import { View, Text, Image } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMoneyBill, faStar } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductCardItem = ({ product }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="p-3 flex-1 w-52 bg-slate-100 rounded-md shadow-md mr-4"
      onPress={() =>
        navigation.navigate("ProductDetail", {
          type: "productDetail",
          data: product,
        })
      }
    >
      <Image
        source={{ uri: product.image[0] || "https://picsum.photos/200" }}
        className="w-full h-40 rounded-md mb-6"
      />
      <Text className="text-lg font-bold mb-4">
        {product?.name.length > 16
          ? `${product?.name.substring(0, 16)}...`
          : product?.name}
      </Text>
      <View className="flex-row justify-between mb-4">
        <View className="flex-row items-center">
          <FontAwesomeIcon icon={faStar} color="#fde047" size={20} />
          <Text className="ml-1 text-sm font-bold"> {product.rating}</Text>
        </View>
        <View className="flex-row items-center">
          <FontAwesomeIcon icon={faMoneyBill} color="#38bdf8" />
          <Text className="ml-1 text-sm font-bold text-sky-400">
            {" "}
            {product?.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardItem;
