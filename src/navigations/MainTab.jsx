import {
  AntDesign,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import FavouriteStack from "./FavouriteStack";
import HomeStack from "./HomeStack";
import InboxStack from "./InboxStack";
import MyInfoStack from "./MyInfoStack";
import SearchStack from "./SearchStack";

const Tab = createBottomTabNavigator();

function MainTab() {
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
        name="Search"
        component={SearchStack}
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
              Search
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={size} color={color} />
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
          tabBarBadge: "99+",
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxStack}
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
              Inbox
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="comment-text-outline"
              size={size}
              color={color}
            />
          ),
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
