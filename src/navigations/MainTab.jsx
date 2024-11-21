import {
  AntDesign,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import FavouriteStack from "./FavouriteStack";
import HomeStack from "./HomeStack";
import MyInfoStack from "./MyInfoStack";
import NotificationStack from "./NotificationStack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNumOfUnreadNotifications } from "../hooks/slices/notificationSlice";
import { auth } from "../configurations/firebaseConfig";

const Tab = createBottomTabNavigator();

function MainTab() {
  const { numOfUnreadNotifications } = useSelector(
    (state) => state.notification
  );
  const user = auth.currentUser;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNumOfUnreadNotifications({ userId: user.uid }));
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 80,
          paddingBottom: 15,
          paddingTop: 15,
        },
        tabBarActiveTintColor: "cyan",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginBottom: 3,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Favourites"
        component={FavouriteStack}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginBottom: 3,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Favourites
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="hearto" size={size} color={color} />
          ),
          //tabBarBadge: "99+",
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationStack}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginBottom: 3,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Notification
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="comment-text-outline"
              size={size}
              color={color}
            />
          ),
          tabBarBadge:
            numOfUnreadNotifications > 0 ? numOfUnreadNotifications : null,
        }}
      />
      <Tab.Screen
        name="MyInfo"
        component={MyInfoStack}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginBottom: 3,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Account
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="circle-user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
