import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import OrtherScreen from "../screens/OrtherScreen";
import CategoryDetailsScreen from "../screens/CategoryDetailsScreen";
import Header from "../components/Header";
import CategoryDetail from "../screens/CategoryDetail";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={
        {
          //headerShown: false,
        }
      }
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: () => <Header title="Home" parent={true} />,
        }}
      />
      <Stack.Screen name="Orther" component={OrtherScreen} />
      {/* <Stack.Screen
        name="CategoryDetailsScreen"
        //component={CategoryDetailsScreen}
        options={{
          header: () => <Header title="Electronics" />,
        }}
      >
        {() => <CategoryDetail />}
      </Stack.Screen> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
