import { View, Text, Button } from "react-native";
import React from "react";

const OrtherScreen = ({ navigation, route }) => {
  return (
    <View>
      <Text>OrtherScreen</Text>
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
