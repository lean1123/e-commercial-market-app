import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

const SearchBarItem = () => {
  const navigation = useNavigation();
  return (
    <View className="w-full flex-row items-center justify-between">
      <View className="w-4/5 rounded-md p-2 flex-row items-center bg-slate-100">
        <FontAwesomeIcon icon={faSearch} />
        <TextInput placeholder="Search for product" className="ml-2 w-full" />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("FilterScreen");
        }}
        className="bg-slate-100 w-1/6 flex-row justify-center items-center p-3 rounded-md"
      >
        <FontAwesomeIcon icon={faFilter} size={16} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBarItem;
