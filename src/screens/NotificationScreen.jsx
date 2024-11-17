import { View, Text, FlatList } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: 1,
    title: "Notification 1",
    content: "Content 1",
    seen: false,
  },
  {
    id: 2,
    title: "Notification 2",
    content: "Content 2",
    seen: true,
  },
  {
    id: 3,
    title: "Notification 3",
    content: "Content 3",
    seen: false,
  },
  {
    id: 4,
    title: "Notification 4",
    content: "Content 4",
    seen: true,
  },
];

const NotificationScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white p-5">
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="border rounded-md mb-2 border-gray-200 p-4 flex-row justify-between items-start"
            onPress={() => navigation.navigate("NotificationDetail", { item })}
          >
            <View>
              <Text className="font-bold text-lg">{item.title}</Text>
              <Text className="text-gray-400">{item.content}</Text>
            </View>
            <View className={`${!item.seen} && "bg-red-50 p-2 rounded-xl"`}>
              <Text
                className={`${item.seen ? "text-gray-400" : "text-red-500"}`}
              >
                {item.seen ? "" : "New"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default NotificationScreen;
