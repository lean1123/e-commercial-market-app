import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const FilterSubtitleItem = ({ title }) => {
  return (
    <View className="w-full flex-row justify-between items-center">
      <Text className="font-bold text-lg">{title}</Text>
      <TouchableOpacity>
        <FontAwesomeIcon icon={faArrowDown} color="gray" size={16} />
      </TouchableOpacity>
    </View>
  );
};

export default FilterSubtitleItem;
