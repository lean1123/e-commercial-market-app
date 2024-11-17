import { View, Text } from "react-native";
import React from "react";

const data = {
  id: 1,
  title: "Notification 1",
  content:
    "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua  Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
  seen: false,
};

export default function NotificationDetail({ item }) {
  item = item || data;
  return (
    <View className="flex-1 bg-white p-5">
      <Text className="text-lg font-bold">{item.title}</Text>
      <Text className="text-base">{item.content}</Text>
    </View>
  );
}
