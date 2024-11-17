import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationScreen from "../screens/NotificationScreen";
import Header from "../components/Header";
import NotificationDetail from "../screens/NotificationDetail";

const Stack = createStackNavigator();

const NotificationStack = () => {
  return (
    <Stack.Navigator initialRouteName="NotificationScreen">
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          header: () => <Header title="Notification" />,
        }}
      />
      <Stack.Screen
        name="NotificationDetail"
        options={{
          header: () => <Header title="Notification Detail" parent={false} />,
        }}
        component={NotificationDetail}
      >
        {/* {(item) => <NotificationDetail />} */}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default NotificationStack;
