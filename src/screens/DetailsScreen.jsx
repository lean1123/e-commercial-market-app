import { View, Text, Button } from "react-native";
import React from "react";

const DetailsScreen = ({ navigation, route }) => {
  const { content } = route.params;
  return (
    <View>
      <Button
        title="Go to HomeScreen"
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
      ></Button>
      <Text>{content}</Text>
    </View>
  );
};

export default DetailsScreen;
