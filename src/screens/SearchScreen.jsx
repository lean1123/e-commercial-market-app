import { View, Text, ScrollView } from "react-native";
import React from "react";
import SearchBar from "../components/SearchBar";

const SearchScreen = () => {
  return (
    <ScrollView className="flex-1 bg-white p-5">
      <SearchBar />
      <View>
        <Text>No result</Text>
      </View>
    </ScrollView>
  );
};

export default SearchScreen;
