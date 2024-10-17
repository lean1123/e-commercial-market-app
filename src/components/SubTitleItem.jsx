import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SubTitleItem = ({ title, onGetAll }) => {
  return (
    <View className="flex-row justify-between items-center mb-5">
      <Text className="font-bold text-xl">{title}</Text>
      <TouchableOpacity
        className="p-2 bg-slate-300 rounded-md flex-row items-center"
        onPress={() => {
          if (onGetAll) onGetAll();
        }}
      >
        <Text className="mr-2">View all</Text>
        <FontAwesomeIcon icon={faArrowRight} />
      </TouchableOpacity>
    </View>
  );
};

export default SubTitleItem;
