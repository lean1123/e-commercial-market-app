import { View, Text, Button } from "react-native";
import React from "react";

const OrtherScreen = ({ navigation, route }) => {
  const { category } = route.params;
  return (
    <View>
      <Text>{category.name}</Text>
      <Button
        title="Go Back"
        onPress={() => {
          navigation.goBack();
        }}
      ></Button>
    </View>
  );
};

export default OrtherScreen;
