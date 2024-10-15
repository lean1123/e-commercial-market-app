import { View, Text, Button } from "react-native";
import React from "react";

const CategoryDetailsScreen = ({ navigation, route }) => {
  return (
    <View>
      <Button
        title="Go to HomeScreen"
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
      ></Button>
      <Text>Details</Text>
    </View>
  );
};

export default CategoryDetailsScreen;
