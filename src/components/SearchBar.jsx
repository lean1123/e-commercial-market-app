import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  return (
    <View className="w-full flex-row items-center justify-between mb-5">
      <View className="w-4/5 rounded-md p-2 flex-row items-center bg-slate-100">
        <FontAwesomeIcon icon={faSearch} />
        <TextInput placeholder="Search for product" className="ml-2 w-full" />
      </View>
      <TouchableOpacity className="bg-slate-100 w-1/6 flex-row justify-center items-center p-3 rounded-md">
        <FontAwesomeIcon icon={faFilter} size={16} />
      </TouchableOpacity>
    </View>
  );
}
