import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "1",
    name: "Product 1",
    price: 100,
    picUrl:
      "https://th.bing.com/th/id/R.091041199673c891a15abb759026d141?rik=WLlR%2fd8FPDl3PQ&pid=ImgRaw&r=0",
  },
  {
    id: "2",
    name: "Product 2",
    price: 200,
    picUrl:
      "https://th.bing.com/th/id/R.091041199673c891a15abb759026d141?rik=WLlR%2fd8FPDl3PQ&pid=ImgRaw&r=0",
  },
  {
    id: "3",
    name: "Product 3",
    price: 300,
    picUrl:
      "https://th.bing.com/th/id/R.091041199673c891a15abb759026d141?rik=WLlR%2fd8FPDl3PQ&pid=ImgRaw&r=0",
  },
  {
    id: "4",
    name: "Product 4",
    price: 400,
    picUrl:
      "https://th.bing.com/th/id/R.091041199673c891a15abb759026d141?rik=WLlR%2fd8FPDl3PQ&pid=ImgRaw&r=0",
  },
];

const FavouriteScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white p-5">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-row justify-between items-center p-4 border rounded-md border-gray-200 mb-2"
            onPress={() => navigation.navigate("ProductDetail", { item })}
          >
            <View className="flex-row items-center">
              <Image
                source={{ uri: item.picUrl }}
                className="w-16 h-16 rounded-lg"
              />
              <View className="ml-4">
                <Text className="font-bold text-lg">{item.name}</Text>
                <Text className="text-gray-400">{item.price}</Text>
              </View>
            </View>
            <View>
              <Text className="text-red-500">Remove</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default FavouriteScreen;
