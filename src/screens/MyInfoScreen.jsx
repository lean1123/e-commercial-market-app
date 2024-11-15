import { View, Text, Button } from "react-native";
import React from "react";
import { auth } from "../../firebaseConfig";

const MyInfoScreen = () => {
  return (
    <View>
      <Text>MyInfoScreen</Text>
      <Button
        title="logout"
        onPress={() => {
          console.log("logout");
          try {
            auth.signOut();
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </View>
  );
};

export default MyInfoScreen;
