import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyInfoScreen from "../screens/MyInfoScreen";
import Header from "../components/Header";
import MyOrderScreen from "../screens/MyOrderScreen";
import AddProductScreen from "../screens/AddProductScreen";
import MyReviewScreen from "../screens/MyReviewScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createStackNavigator();

const MyInfoStack = () => {
  return (
    <Stack.Navigator initialRouteName="myInfoScreen">
      <Stack.Screen
        name="myInfoScreen"
        component={MyInfoScreen}
        options={{
          header: () => (
            <Header title="My Info" parent={false} notShowCart={true} />
          ),
        }}
      />
      <Stack.Screen
        name="MyOrderScreen"
        component={MyOrderScreen}
        options={{
          header: () => (
            <Header title="My Orders" parent={false} notShowCart={true} />
          ),
        }}
      />
      <Stack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={{
          header: () => (
            <Header title="Add new product" parent={false} notShowCart={true} />
          ),
        }}
      />
      <Stack.Screen
        name="MyReviews"
        component={MyReviewScreen}
        options={{
          header: () => (
            <Header title="My Reviews" parent={false} notShowCart={true} />
          ),
        }}
      />
      <Stack.Screen
        name="MyAccountScreen"
        component={MyAccountScreen}
        options={{
          header: () => (
            <Header title="My Profile" parent={false} notShowCart={true} />
          ),
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          header: () => (
            <Header title="Chat bot" parent={false} notShowCart={true} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MyInfoStack;
