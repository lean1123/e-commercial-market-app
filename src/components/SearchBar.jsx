import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../hooks/slices/searchSlice";

export default function SearchBar() {
  const navigation = useNavigation();
  const { searchValue } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log({ searchValue });
  }, [searchValue]);
  return (
    <View className="w-full flex-row items-center justify-between mb-5">
      <View className="w-4/5 rounded-md p-2 flex-row items-center bg-slate-100">
        <FontAwesomeIcon icon={faSearch} />
        <TextInput
          placeholder="Search for product"
          className="ml-2 w-full"
          onChangeText={(text) => {
            console.log({ text });
            dispatch(setSearchValue(text));
          }}
        />
      </View>
      <TouchableOpacity
        className="bg-slate-100 w-1/6 flex-row justify-center items-center p-3 rounded-md"
        onPress={() => navigation.navigate("FilterScreen")}
      >
        <FontAwesomeIcon icon={faFilter} size={16} />
      </TouchableOpacity>
    </View>
  );
}
